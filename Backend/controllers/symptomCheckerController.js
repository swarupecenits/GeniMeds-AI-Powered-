const { AzureOpenAI } = require('openai');

const endpoint = "https://t-magandhi-4440-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview";
const deployment = "gpt-4o-mini";

const analyzeSymptoms = async (req, res) => {
  try {
    const { 
      symptoms, 
      severity, 
      duration, 
      age, 
      gender, 
      additionalInfo 
    } = req.body;

    // Validate required fields
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least one symptom'
      });
    }

    // Create a comprehensive prompt for symptom analysis
    const symptomList = symptoms.join(', ');
    const patientInfo = [];
    
    if (age) patientInfo.push(`Age: ${age}`);
    if (gender) patientInfo.push(`Gender: ${gender}`);
    if (severity) patientInfo.push(`Severity: ${severity}`);
    if (duration) patientInfo.push(`Duration: ${duration}`);
    
    const patientDetails = patientInfo.length > 0 ? `\nPatient Details: ${patientInfo.join(', ')}` : '';
    const additionalDetails = additionalInfo ? `\nAdditional Information: ${additionalInfo}` : '';

    const prompt = `You are an experienced medical AI assistant. A patient is presenting with the following symptoms for preliminary analysis. Please provide the top 3 most likely conditions based on the symptoms described.

Symptoms: ${symptomList}${patientDetails}${additionalDetails}

Please analyze these symptoms and provide:

1. The top 3 most likely conditions/diseases (ranked by probability)
2. For each condition, include:
   - Condition name
   - Probability percentage (realistic medical assessment)
   - Brief description of the condition
   - 3-4 recommended actions or care suggestions
   - Urgency level (Low, Medium, High)

Important guidelines:
- Base your analysis on evidence-based medical knowledge
- Consider the patient's age and gender if provided
- Account for symptom severity and duration
- Be conservative with high-urgency assessments
- Always recommend consulting healthcare professionals
- Avoid definitive diagnoses - this is preliminary assessment only
- Focus on common conditions that match the symptom pattern

Format your response as a JSON object with this structure:
{
  "analysis": {
    "summary": "Brief overall assessment of symptoms",
    "conditions": [
      {
        "name": "Condition Name",
        "probability": "XX%",
        "description": "Brief description of the condition",
        "recommendations": [
          "Recommendation 1",
          "Recommendation 2",
          "Recommendation 3",
          "Recommendation 4"
        ],
        "urgency": "Low/Medium/High"
      }
    ],
    "generalAdvice": "General advice for the patient",
    "whenToSeekCare": "When to seek immediate medical attention"
  }
}

Respond only with valid JSON, no additional text.`;

    console.log('Sending symptom analysis request to OpenAI...');
    
    // Create Azure OpenAI client
    const client = new AzureOpenAI({
      endpoint: endpoint,
      apiKey: process.env.AZURE_AI_API_KEY,
      deployment: deployment,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-12-01-preview"
    });
    
    const completion = await client.chat.completions.create({
      model: deployment,
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant specializing in symptom analysis. Always provide helpful, accurate, and responsible medical guidance while emphasizing the importance of professional medical consultation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.3, // Lower temperature for more consistent medical advice
    });

    let analysisResult;
    try {
      analysisResult = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      // Fallback response if JSON parsing fails
      analysisResult = {
        analysis: {
          summary: "Unable to parse detailed analysis. Please consult a healthcare professional for proper evaluation.",
          conditions: [
            {
              name: "Consultation Recommended",
              probability: "N/A",
              description: "Based on your symptoms, we recommend consulting with a healthcare professional for proper evaluation and diagnosis.",
              recommendations: [
                "Schedule an appointment with your primary care physician",
                "Keep track of your symptoms and their progression",
                "Stay hydrated and get adequate rest",
                "Seek immediate care if symptoms worsen"
              ],
              urgency: "Medium"
            }
          ],
          generalAdvice: "Please consult with a qualified healthcare professional for accurate diagnosis and treatment.",
          whenToSeekCare: "Seek immediate medical attention if you experience severe symptoms, difficulty breathing, chest pain, or if your condition rapidly worsens."
        }
      };
    }

    console.log('Symptom analysis completed successfully');

    res.json({
      success: true,
      analysis: analysisResult.analysis,
      inputSummary: {
        symptoms: symptoms,
        severity: severity || 'Not specified',
        duration: duration || 'Not specified',
        age: age || 'Not specified',
        gender: gender || 'Not specified'
      }
    });

  } catch (error) {
    console.error('Error in symptom analysis:', error);
    
    // Handle rate limits and other API errors gracefully
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        error: 'Service temporarily unavailable due to high demand. Please try again in a moment.',
        retryAfter: '30 seconds'
      });
    }

    if (error.status === 401) {
      return res.status(500).json({
        success: false,
        error: 'Service configuration error. Please contact support.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'An error occurred while analyzing symptoms. Please try again or consult a healthcare professional.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get common symptoms list
const getCommonSymptoms = async (req, res) => {
  try {
    const commonSymptoms = [
      'Headache', 'Fever', 'Cough', 'Sore throat', 'Fatigue', 'Nausea',
      'Dizziness', 'Chest pain', 'Shortness of breath', 'Abdominal pain',
      'Back pain', 'Joint pain', 'Skin rash', 'Loss of appetite',
      'Difficulty sleeping', 'Runny nose', 'Muscle aches', 'Vomiting',
      'Diarrhea', 'Constipation', 'Weight loss', 'Weight gain',
      'Sweating', 'Chills', 'Blurred vision', 'Memory problems'
    ];

    res.json({
      success: true,
      symptoms: commonSymptoms
    });
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch symptoms list'
    });
  }
};

module.exports = {
  analyzeSymptoms,
  getCommonSymptoms
};
