const { AzureOpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');

require('dotenv').config();

const endpoint = "https://t-magandhi-4440-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview";
const deployment = "gpt-4o-mini";

// Configure multer for lab report file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads/lab-reports';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, 'lab-report-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 40 * 1024 * 1024, // 40MB limit
        files: 10 // Max 10 files
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|md|csv/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type for lab report. Please upload images, PDFs, or text files.'));
        }
    }
});

// Helper function to encode image to base64
function encodeImageToBase64(imagePath) {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const ext = path.extname(imagePath).toLowerCase();
        
        let mimeType;
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                mimeType = 'image/jpeg';
                break;
            case '.png':
                mimeType = 'image/png';
                break;
            case '.gif':
                mimeType = 'image/gif';
                break;
            default:
                mimeType = 'image/jpeg';
        }
        
        return {
            base64: base64Image,
            mimeType: mimeType
        };
    } catch (error) {
        console.error('Error encoding image:', error);
        return null;
    }
}

// Helper function to extract text from PDF
async function extractTextFromPDF(pdfPath) {
    try {
        const pdfBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(pdfBuffer);
        return data.text;
    } catch (error) {
        console.error('Error extracting PDF text:', error);
        return null;
    }
}

// Helper function to read text files
function readTextFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading text file:', error);
        return null;
    }
}

// Process uploaded lab report files
async function processLabReportFiles(files) {
    const processedFiles = [];
    
    for (const file of files) {
        const ext = path.extname(file.originalname).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
        const isPDF = ext === '.pdf';
        const isText = ['.txt', '.md', '.csv'].includes(ext);
        
        try {
            if (isImage) {
                // Encode image as base64 for vision model
                const imageData = encodeImageToBase64(file.path);
                if (imageData) {
                    processedFiles.push({
                        type: 'image',
                        filename: file.originalname,
                        base64: imageData.base64,
                        mimeType: imageData.mimeType,
                        size: file.size
                    });
                }
            } else if (isPDF) {
                // Extract text from PDF
                const text = await extractTextFromPDF(file.path);
                if (text) {
                    processedFiles.push({
                        type: 'pdf',
                        filename: file.originalname,
                        text: text,
                        size: file.size
                    });
                }
            } else if (isText) {
                // Read text file
                const text = readTextFile(file.path);
                if (text) {
                    processedFiles.push({
                        type: 'text',
                        filename: file.originalname,
                        text: text,
                        size: file.size
                    });
                }
            }
        } catch (error) {
            console.error(`Error processing lab report file ${file.originalname}:`, error);
        } finally {
            // Clean up uploaded file
            try {
                fs.unlinkSync(file.path);
            } catch (cleanupError) {
                console.error(`Error cleaning up file ${file.path}:`, cleanupError);
            }
        }
    }
    
    return processedFiles;
}

// Create messages array with lab report images and text
function createLabReportMessages(userMessage, systemPrompt, processedFiles) {
    const messages = [];
    
    // Add system message
    if (systemPrompt) {
        messages.push({
            role: "system",
            content: systemPrompt
        });
    }
    
    // Create user message content
    const userContent = [];
    
    // Add text content
    let textContent = userMessage || "Please analyze the uploaded lab reports and provide detailed medical insights.";
    
    // Add text from PDFs and text files
    const textFiles = processedFiles.filter(f => f.type === 'pdf' || f.type === 'text');
    if (textFiles.length > 0) {
        textContent += "\n\nExtracted text from uploaded lab report documents:\n";
        textFiles.forEach(file => {
            textContent += `\n--- ${file.filename} ---\n${file.text}\n`;
        });
    }
    
    userContent.push({
        type: "text",
        text: textContent
    });
    
    // Add images
    const imageFiles = processedFiles.filter(f => f.type === 'image');
    imageFiles.forEach(file => {
        userContent.push({
            type: "image_url",
            image_url: {
                url: `data:${file.mimeType};base64,${file.base64}`,
                detail: "high" // Use "high" for detailed medical analysis
            }
        });
    });
    
    messages.push({
        role: "user",
        content: userContent
    });
    
    return messages;
}

// Lab report specific system prompt
const labReportSystemPrompt = `You are GeniMeds Lab Report Analyzer, a specialized medical AI assistant designed to help non-medical users understand their  medical laboratory test results.

Your task is to:
1. Analyze the provided lab report (may include blood tests, urine tests, imaging reports, etc.)
2. Extract and identify all test parameters with their values and reference ranges
3. For each test parameter:
   a. Explain in simple, patient-friendly terms what the test measures
   b. Indicate if the value is Normal, High, or Low compared to reference ranges
   c. Explain what High or Low values might indicate (potential health implications)
   d. Provide general lifestyle or dietary recommendations if applicable
   e. Highlight any critical values that need immediate medical attention

4. Provide an overall summary of the lab report findings
5. Suggest follow-up actions or consultations if needed

Always use a friendly, reassuring tone while being informative. Make explanations accessible to someone with no medical background.

### Output format:

**Lab Report Analysis Summary:**

**Patient Information:** [If available - Name, Age, Date of test]

**Test Results:**

**1. Test Name:** Complete Blood Count (CBC)
- **Hemoglobin:** 12.5 g/dL (Normal range: 12.0-15.5 g/dL) ✅ **Normal**
  - *What it measures:* Oxygen-carrying protein in red blood cells
  - *Your result:* Within healthy range, good oxygen transport capability

- **White Blood Cell Count:** 12,000/μL (Normal range: 4,000-11,000/μL) ⚠️ **High**
  - *What it measures:* Infection-fighting cells in your blood  
  - *High values may indicate:* Possible infection, inflammation, or stress response
  - *Recommendation:* Consult your doctor for further evaluation

**2. Test Name:** Lipid Panel
- **Total Cholesterol:** 220 mg/dL (Normal: <200 mg/dL) ⚠️ **High**
  - *What it measures:* Total cholesterol levels in blood
  - *High values may indicate:* Increased cardiovascular risk
  - *Recommendations:* Consider dietary changes, exercise, follow up with doctor

**Overall Summary:**
Your lab results show [summary of key findings]. Most values are within normal ranges, but attention should be paid to [specific concerns].

**Next Steps:**
- Schedule follow-up with your healthcare provider for [specific concerns]
- Consider lifestyle modifications for [specific parameters]
- Repeat testing in [timeframe] if recommended

**🚨 Critical Values:** [If any critical values that need immediate attention]

---
**Important Disclaimer:** I am an AI assistant, not a licensed medical professional. These interpretations are for educational purposes only. Always consult your doctor or healthcare provider for proper medical advice and treatment decisions. Do not make any changes to medications or treatments based solely on this analysis.
---`;

// Main lab report analysis function
async function analyzeLabReports(req, res) {
    try {
        const { message, conversationHistory } = req.body;
        const files = req.files || [];
        
        console.log(`Processing ${files.length} lab report files...`);
        
        // Process uploaded files
        const processedFiles = await processLabReportFiles(files);
        console.log(`Successfully processed ${processedFiles.length} lab report files`);
        
        // Create AI client
        const client = new AzureOpenAI({
            endpoint: endpoint,
            apiKey: process.env.AZURE_AI_API_KEYS,
            deployment: deployment,
            apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-12-01-preview"
        });
        
        // Build conversation context
        const messages = [
            {
                role: "system",
                content: labReportSystemPrompt
            }
        ];
        
        // Add previous conversation history
        if (conversationHistory && Array.isArray(conversationHistory)) {
            conversationHistory.forEach(msg => {
                if (msg.role && msg.content) {
                    messages.push({
                        role: msg.role,
                        content: msg.content
                    });
                }
            });
        }
        
        // Create current message with lab report files
        const currentMessage = createLabReportMessages(
            message, 
            null, // Don't add system prompt again
            processedFiles
        );
        
        // Add current user message (skip system message from createLabReportMessages)
        messages.push(currentMessage[currentMessage.length - 1]);
        
        console.log(`Sending lab report analysis request with ${messages.length} messages and ${processedFiles.length} files...`);
        
        const chatCompletion = await client.chat.completions.create({
            model: deployment,
            messages: messages,
            max_tokens: 3000, // Increased for detailed lab analysis
            temperature: 0.3 // Lower temperature for more consistent medical analysis
        });
     
        const aiResponse = chatCompletion.choices[0].message.content;
        
        // Prepare response
        const response = {
            success: true,
            response: aiResponse,
            filesProcessed: processedFiles.map(f => ({
                filename: f.filename,
                type: f.type,
                size: f.size
            })),
            usage: chatCompletion.usage,
            analysisType: 'lab-report',
            // Return updated conversation history
            conversationHistory: [
                ...messages.slice(1), // Exclude system message
                {
                    role: "assistant",
                    content: aiResponse
                }
            ]
        };
        
        console.log('Lab report analysis completed successfully');
        res.json(response);
        
    } catch (error) {
        console.error('Error in lab report analysis:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.stack,
            analysisType: 'lab-report'
        });
    }
}

// Simple lab report chat function without files
async function simpleLabReportChat(req, res) {
    try {
        const { message, conversationHistory } = req.body;
        
        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'Message is required for lab report consultation'
            });
        }
        
        // Create AI client
        const client = new AzureOpenAI({
            endpoint: endpoint,
            apiKey: process.env.AZURE_AI_API_KEYS,
            deployment: deployment,
            apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-12-01-preview"
        });
        
        // Build conversation context
        const messages = [
            {
                role: "system",
                content: labReportSystemPrompt
            }
        ];
        
        // Add previous conversation history
        if (conversationHistory && Array.isArray(conversationHistory)) {
            conversationHistory.forEach(msg => {
                if (msg.role && msg.content) {
                    messages.push({
                        role: msg.role,
                        content: msg.content
                    });
                }
            });
        }
        
        // Add current user message
        messages.push({
            role: "user",
            content: message
        });
        
        console.log(`Sending lab report consultation with ${messages.length} messages to AI...`);
        
        // Get AI response
        const chatCompletion = await client.chat.completions.create({
            model: deployment,
            messages: messages,
            max_tokens: 2000,
            temperature: 0.3 // Lower temperature for consistent medical responses
        });
        
        const response = {
            success: true,
            response: chatCompletion.choices[0].message.content,
            usage: chatCompletion.usage,
            analysisType: 'lab-report-chat',
            // Return updated conversation history
            conversationHistory: [
                ...messages.slice(1), // Exclude system message
                {
                    role: "assistant",
                    content: chatCompletion.choices[0].message.content
                }
            ]
        };
        
        res.json(response);
        
    } catch (error) {
        console.error('Error in lab report chat:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            analysisType: 'lab-report-chat'
        });
    }
}

module.exports = {
    upload: upload.array('files', 10),
    analyzeLabReports,
    simpleLabReportChat
};
