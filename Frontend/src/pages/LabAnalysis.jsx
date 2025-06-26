import React, { useState, useRef } from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

const LabAnalysis = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: 'Welcome to GeniMeds Lab Report Analysis! Upload your lab reports (images, PDFs, or text files) and I\'ll help you understand your test results in simple terms.',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper function to build conversation history from messages
  const buildConversationHistory = () => {
    return messages
      .filter(msg => msg.type !== 'system') // Exclude system messages
      .map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const maxFileSize = 40 * 1024 * 1024; // 40MB
    const maxFiles = 10;

    if (uploadedFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }

    files.forEach(file => {
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" is too large. Maximum size is 40MB.`);
        return;
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'text/markdown', 'text/csv'];
      if (!validTypes.includes(file.type)) {
        alert(`File "${file.name}" is not a supported format. Please upload images, PDFs, or text files.`);
        return;
      }

      validFiles.push(file);
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove file from upload list
  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Check if send is disabled
  const isSendDisabled = () => {
    return isLoading || (inputMessage.trim() === '' && uploadedFiles.length === 0);
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (isSendDisabled()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage || 'Please analyze my lab reports.',
      files: uploadedFiles.map(f => ({ name: f.name, size: f.size })),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (uploadedFiles.length > 0) {
        // Handle file upload with lab analysis
        const formData = new FormData();
        
        uploadedFiles.forEach((file) => {
          formData.append('files', file);
        });
        
        if (inputMessage.trim()) {
          formData.append('message', inputMessage);
        }
        
        // Add conversation history
        formData.append('conversationHistory', JSON.stringify(buildConversationHistory()));
        
        const fileResponse = await fetch('http://localhost:5000/api/lab-analysis/upload-analyze', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!fileResponse.ok) {
          throw new Error(`HTTP error! status: ${fileResponse.status}`);
        }

        const data = await fileResponse.json();
        
        if (data.success) {
          const aiMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: data.response,
            filesProcessed: data.filesProcessed,
            usage: data.usage,
            timestamp: new Date()
          };

          setMessages(prev => [...prev, aiMessage]);
          setUploadedFiles([]); // Clear uploaded files after successful analysis
        } else {
          throw new Error(data.error || 'Lab analysis failed');
        }
        
      } else {
        // Handle text-only lab consultation
        const textResponse = await fetch('http://localhost:5000/api/lab-analysis/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            message: inputMessage,
            conversationHistory: buildConversationHistory()
          })
        });

        if (!textResponse.ok) {
          throw new Error(`HTTP error! status: ${textResponse.status}`);
        }

        const data = await textResponse.json();
        
        if (data.success) {
          const aiMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: data.response,
            usage: data.usage,
            timestamp: new Date()
          };

          setMessages(prev => [...prev, aiMessage]);
        } else {
          throw new Error(data.error || 'Lab consultation failed');
        }
      }
    } catch (error) {
      console.error('Error in lab analysis:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `Sorry, I encountered an error while analyzing your lab reports: ${error.message}. Please try again or contact support if the problem persists.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔬 Lab Reports Analysis
          </h1>
          <p className="text-gray-600">
            Upload your lab reports and get easy-to-understand explanations of your test results
          </p>
        </div>

        {/* Chat Messages */}
        <div className="bg-white rounded-lg shadow-md mb-6 h-96 overflow-y-auto">
          <div className="p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : message.type === 'system'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.type === 'assistant' ? (
                    <MarkdownRenderer content={message.content} />
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                  
                  {/* Show uploaded files info */}
                  {message.files && message.files.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-blue-400">
                      <p className="text-sm opacity-90">
                        📎 Uploaded: {message.files.map(f => f.name).join(', ')}
                      </p>
                    </div>
                  )}
                  
                  {/* Show files processed info */}
                  {message.filesProcessed && message.filesProcessed.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-sm text-gray-600">
                        ✅ Analyzed: {message.filesProcessed.map(f => f.filename).join(', ')}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span className="text-gray-600">Analyzing your lab reports...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* File Upload Section */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              📋 Lab Reports to Analyze ({uploadedFiles.length}/10)
            </h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex space-x-4">
            {/* File Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              disabled={isLoading}
            >
              <span>📎</span>
              <span>Upload Lab Reports</span>
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.md,.csv"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {/* Message Input */}
            <div className="flex-1 flex space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask questions about your lab results or add context for analysis..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="2"
                disabled={isLoading}
              />
              
              <button
                onClick={handleSendMessage}
                disabled={isSendDisabled()}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  isSendDisabled()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            Supported formats: Images (JPG, PNG, GIF), PDFs, Text files • Max 40MB per file • Up to 10 files
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabAnalysis;
