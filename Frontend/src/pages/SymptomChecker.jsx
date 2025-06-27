import React, { useState, useEffect } from 'react';

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commonSymptoms, setCommonSymptoms] = useState([]);
  const [error, setError] = useState('');

  // Fetch common symptoms from backend on component mount
  useEffect(() => {
    fetchCommonSymptoms();
  }, []);

  const fetchCommonSymptoms = async () => {
    try {
      const baseUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://genimeds-backend.onrender.com';
        
      const response = await fetch(`${baseUrl}/api/symptom-checker/symptoms`);
      const data = await response.json();
      
      if (data.success) {
        setCommonSymptoms(data.symptoms);
      } else {
        // Fallback to default symptoms if API fails
        setCommonSymptoms([
          'Headache', 'Fever', 'Cough', 'Sore throat', 'Fatigue', 'Nausea',
          'Dizziness', 'Chest pain', 'Shortness of breath', 'Abdominal pain',
          'Back pain', 'Joint pain', 'Skin rash', 'Loss of appetite',
          'Difficulty sleeping', 'Runny nose', 'Muscle aches', 'Vomiting'
        ]);
      }
    } catch (error) {
      console.error('Error fetching symptoms:', error);
      // Fallback to default symptoms
      setCommonSymptoms([
        'Headache', 'Fever', 'Cough', 'Sore throat', 'Fatigue', 'Nausea',
        'Dizziness', 'Chest pain', 'Shortness of breath', 'Abdominal pain',
        'Back pain', 'Joint pain', 'Skin rash', 'Loss of appetite',
        'Difficulty sleeping', 'Runny nose', 'Muscle aches', 'Vomiting'
      ]);
    }
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const baseUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://genimeds-backend.onrender.com';

      const requestData = {
        symptoms: selectedSymptoms,
        severity: severity,
        duration: duration,
        age: age,
        gender: gender,
        additionalInfo: additionalInfo
      };

      console.log('Sending symptom analysis request:', requestData);

      const response = await fetch(`${baseUrl}/api/symptom-checker/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      console.log('Received response:', data);

      if (data.success) {
        setResults(data.analysis);
      } else {
        setError(data.error || 'Failed to analyze symptoms');
        alert(`Error: ${data.error || 'Failed to analyze symptoms'}`);
      }
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      setError('Network error. Please check your connection and try again.');
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Symptom Checker</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms and get AI-powered insights about possible conditions. 
            This tool is for informational purposes only and should not replace professional medical advice.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Symptom Selection */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Your Symptoms</h2>
              <div className="grid grid-cols-2 gap-3">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-blue-500 text-white border-blue-500 transform scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity Level
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select severity</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="hours">Few hours</option>
                    <option value="1-2days">1-2 days</option>
                    <option value="week">About a week</option>
                    <option value="weeks">Several weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Your age"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Any other symptoms, concerns, or relevant medical history..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading || selectedSymptoms.length === 0}
                className={`w-full mt-6 p-4 font-semibold rounded-lg transition-all duration-200 ${
                  loading || selectedSymptoms.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Symptoms...
                  </div>
                ) : (
                  'Analyze Symptoms'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Selected Symptoms Display */}
        {selectedSymptoms.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Selected Symptoms:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-1">Analysis Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Analysis Results</h2>
              
              {/* Summary */}
              {results.summary && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">Analysis Summary</h3>
                  <p className="text-blue-700">{results.summary}</p>
                </div>
              )}
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> This is an AI-generated assessment and should not replace professional medical advice. 
                      Please consult a healthcare provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {results.conditions && results.conditions.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{result.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(result.urgency)}`}>
                          {result.urgency} Priority
                        </span>
                        <span className="text-lg font-bold text-blue-600">{result.probability}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{result.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Recommended Actions:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-gray-600">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* General Advice */}
              {results.generalAdvice && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">General Advice:</h4>
                  <p className="text-green-700">{results.generalAdvice}</p>
                </div>
              )}

              {/* When to Seek Care */}
              {results.whenToSeekCare && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">When to Seek Immediate Medical Attention:</h4>
                  <p className="text-red-700">{results.whenToSeekCare}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
