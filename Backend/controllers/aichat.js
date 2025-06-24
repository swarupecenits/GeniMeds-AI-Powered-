const { AIProjectClient } = require('@azure/ai-projects');
const { DefaultAzureCredential } = require('@azure/identity');



const endpoint = "https://t-magandhi-4440-resource.services.ai.azure.com/api/projects/t-magandhi-4440";
const deployment = "gpt-4o-mini"; // Replace with your deployment name
const fs = require('fs');
const express = require('express');

const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');

require('dotenv').config();


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});






const upload = multer({
    storage: storage,
    limits: {
        fileSize: 40 * 1024 * 1024, // 10MB limit
        files: 10 // Max 10 files
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|md|csv|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
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

// Process uploaded files
async function processFiles(files) {
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
            console.error(`Error processing file ${file.originalname}:`, error);
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

// Create messages array with images and text
function createMessagesWithFiles(userMessage, systemPrompt, processedFiles) {
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
    let textContent = userMessage || "Please analyze the uploaded files.";
    
    // Add text from PDFs and text files
    const textFiles = processedFiles.filter(f => f.type === 'pdf' || f.type === 'text');
    if (textFiles.length > 0) {
        textContent += "\n\nExtracted text from uploaded documents:\n";
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
                detail: "high" // Use "high" for detailed analysis, "low" for faster processing
            }
        });
    });
    
    messages.push({
        role: "user",
        content: userContent
    });
    
    return messages;
}
const systemPrompt=`You are GeniMeds a medical assistant AI built to help non-medical users understand the contents of their prescription. 

Your task is to:
1. Read the input text of a prescription (may include medicine names, dosages, instructions).
2. Extract and list all medicines found in the prescription with relevant details (medicine name, dosage, form, and usage instructions).
3. For each medicine:
   a. Explain in simple, patient-friendly terms what the medicine is used for.
   b. If mentioned in the prescription or if you find something in the image, mention whether it is a **tablet**, **capsule**, **syrup**, or other form. Also mention when to take the medicine (for eg. twice a day,once a week etc) with dosage details.
   c. Provide key **benefits** (pros) of taking the medicine.
   d. Provide potential **downsides or risks** (cons), including common side effects.
   e. Mention any important **precautions** (e.g., do not mix with alcohol, not for pregnant women, etc.)

Always include a friendly tone, and make the explanation accessible to someone with no medical background.

At the end, include this disclaimer:
---
 Disclaimer: I am an AI assistant, not a licensed medical professional. Always consult your doctor or pharmacist before taking any medication.
---

### Input format examples you may receive:
- Freeform text like: "Take Paracetamol 500mg twice daily for fever."
- Multiple drugs listed: "Amoxicillin 500mg, Ibuprofen 200mg after food, Vitamin D once a week"

### Output format:

Prescription Summary:

**1. Medicine Name:** Amoxicillin 500mg  
- **Use:** Fights bacterial infections like throat or ear infections.  
- **Pros:** Effective against common infections, widely used.  
- **Cons:** Can cause upset stomach, allergic reactions in some people.  
- **Precautions:** Avoid if allergic to penicillin. Take with food to reduce stomach upset.

**2. Medicine Name:** Ibuprofen 200mg  
- **Use:** Reduces pain, inflammation, and fever.  
- **Pros:** Fast-acting pain relief.  
- **Cons:** May cause stomach pain or increase blood pressure if overused.  
- **Precautions:** Take with food. Not suitable for people with ulcers or kidney issues.

...

You can also receive normal questions like "What is the use of Paracetamol?" or "What are the side effects of Ibuprofen?" Answer it based on the knowledge you have about these medicines.


 End with:
Disclaimer: I am an AI assistant, not a licensed medical professional. Always consult your doctor or pharmacist before taking any medication.
`


// Main chat function with file support
async function chatWithFiles(req, res) {
    try {
        const { message} = req.body;
        const files = req.files || [];
        
        console.log(`Processing ${files.length} files...`);
        
        // Process uploaded files
        const processedFiles = await processFiles(files);
        console.log(`Successfully processed ${processedFiles.length} files`);
        
        // Create AI client
        const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
        const client = await project.inference.azureOpenAI({
            apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-12-01-preview"
        });
        
        // Create messages with files
        const messages = createMessagesWithFiles(
            message, 
            systemPrompt || "You are a helpful AI assistant that can analyze images, documents, and text. Provide detailed and accurate analysis of the uploaded content.",
            processedFiles
        );
        
        console.log('Sending request to AI model...');
        // Get AI response
        // const chatCompletion=await client.responses.create({model: deployment,
        //     messages: messages,
        //     max_tokens: 2000,
        //     temperature: 0.7,
        //     tools: [
        //         {   "type": "web_search"
        // }
        //     ]
        // });
        
        const chatCompletion = await client.chat.completions.create({
           model: deployment,
            messages: messages,
            max_tokens: 2000,
            temperature: 0.7
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
            usage: chatCompletion.usage
        };
        
        console.log('AI analysis completed successfully');
        res.json(response);
        
    } catch (error) {
        console.error('Error in chat with files:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.stack
        });
    }
}
// Simple chat function without files
async function simpleChat(req, res) {
    try {
        const {message} = req.body;
        
        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }
        
        // Create AI client
        const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
        const client = await project.inference.azureOpenAI({
            apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-12-01-preview"
        });
        
        // Create messages
        const messages = [
            {
                role: "system",
                content: systemPrompt || "You are a helpful AI assistant."
            },
            {
                role: "user",
                content: message
            }
        ];
        
        // Get AI response
        const chatCompletion = await client.chat.completions.create({
            model: deployment,
            messages: messages,
            max_tokens: 1000,
            temperature: 0.7
        });
        
        const response = {
            success: true,
            response: chatCompletion.choices[0].message.content,
            usage: chatCompletion.usage
        };
        
        res.json(response);
        
    } catch (error) {
        console.error('Error in simple chat:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// Legacy function for backward compatibility
async function getResponse() {
    const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
    const client = await project.inference.azureOpenAI({
        apiVersion: "2024-12-01-preview"
    });

    const chatCompletion = await client.chat.completions.create({
        model: deployment,
        messages: [
            { role: "system", content: "You are a helpful writing assistant" },
            { role: "user", content: "Write me a poem about flowers" },
        ],
    });

    console.log(`\n==================== 🌷 COMPLETIONS POEM ====================\n`);
    console.log(chatCompletion.choices[0].message.content);
}

module.exports = {
    upload: upload.array('files', 10),
    chatWithFiles,
    simpleChat,
    getResponse
};