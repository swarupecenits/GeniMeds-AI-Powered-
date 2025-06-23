const { AzureOpenAI } = require("openai");
const multer = require('multer');

// Setup Azure OpenAI client, Replace with your Azure OpenAI credentials in environment variables
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_AI_API_KEY;
const apiVersion = "2024-04-01-preview";
const deployment = "gpt-4o-mini";
const model = "gpt-4o-mini";

const client = new AzureOpenAI({
  endpoint,
  apiKey,
  apiVersion,
  deployment
});

const upload = multer({ dest: 'uploads/' });

const SYSTEM_PROMPT = `You are GeniMeds a medical assistant AI built to help non-medical users understand the contents of their prescription. 

Your task is to:
1. Read the input text of a prescription (may include medicine names, dosages, instructions).
2. Extract and list all medicines found in the prescription with relevant details (medicine name, dosage, form, and usage instructions).
3. For each medicine:
   a. Explain in simple, patient-friendly terms what the medicine is used for.
   b. Provide key **benefits** (pros) of taking the medicine.
   c. Provide potential **downsides or risks** (cons), including common side effects.
   d. Mention any important **precautions** (e.g., do not mix with alcohol, not for pregnant women, etc.)

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

 End with:
Disclaimer: I am an AI assistant, not a licensed medical professional. Always consult your doctor or pharmacist before taking any medication.
`

const analyzeText = async (req, res) => {
  const { prescription_text } = req.body;

  if (!prescription_text) {
    console.warn('No prescription text provided in request body');
    return res.status(400).json({
      success: false,
      error: "`prescription_text` is required."
    });
  }

  console.log("Received text:", prescription_text);

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prescription_text }
      ],
      temperature: 0.3,
      max_tokens: 512
    });

    const analysis = response.choices[0]?.message?.content?.trim();

    console.log("Analysis result:", analysis);

    return res.json({
      success: true,
      receivedText: prescription_text,
      analysis
    });

  } catch (error) {
    const errorMessage = error?.response?.data || error.message;
    console.error("Error during Azure OpenAI request:", errorMessage);

    return res.status(500).json({
      success: false,
      error: "Failed to analyze prescription text.",
      details: errorMessage
    });
  }
};

// TODO: Currently not working with Azure OpenAI, will work on this tomorrow
async function analyzeFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded." });
  }

  const filePath = req.file.path;
  const fileName = req.file.originalname;

  try {
    console.log(`📄 Processing uploaded file: ${fileName}`);

    const fileContent = await fs.readFile(filePath, "utf-8");

    console.log("📝 File content extracted, sending to AI...");

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: fileContent }
      ],
      temperature: 0.3,
      max_tokens: 1024
    });

    const analysis = response.choices[0]?.message?.content?.trim();

    console.log("Analysis generated for file.");

    res.json({
      success: true,
      fileName,
      analysis
    });

  } catch (error) {
    const errorMessage = error?.response?.data || error.message;
    console.error("Error analyzing uploaded file:", errorMessage);
    res.status(500).json({
      success: false,
      error: "Failed to analyze uploaded file.",
      details: errorMessage
    });
  } finally {
    
    try {
      await fs.unlink(filePath);
      console.log(`Deleted uploaded file: ${filePath}`);
    } catch (delErr) {
      console.warn(`Failed to delete uploaded file: ${filePath}`, delErr);
    }
  }
}

module.exports = {
  analyzeText,
  analyzeFile,
  upload
};
