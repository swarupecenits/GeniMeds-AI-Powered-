import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import MarkdownRenderer from '../components/MarkdownRenderer';

const AiChat = () => {
  const [analysisMode, setAnalysisMode] = useState('prescription'); // 'prescription' or 'lab-reports'
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m GeniMeds AI assistant. How can I help you today? You can upload your prescriptions and ask me any questions you have!',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    console.log('Messages state changed:', messages);
  }, [messages]);

  
  useEffect(() => {
    console.log('uploadedFiles state changed:', uploadedFiles);
  }, [uploadedFiles]);

  // Handle mode change and update welcome message
  const handleModeChange = (newMode) => {
    setAnalysisMode(newMode);
    
    // Update the welcome message based on mode
    const welcomeMessage = newMode === 'prescription' 
      ? 'Hello! I\'m GeniMeds AI assistant. How can I help you today? You can upload your prescriptions and ask me any questions you have!'
      : 'Hello! I\'m GeniMeds Lab Analysis assistant. Upload your lab reports and I\'ll help you understand your test results in simple terms!';
    
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: welcomeMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      }
    ]);
    
    // Clear uploaded files when switching modes
    setUploadedFiles([]);
    setInputMessage('');
  };
  const handleFileUpload = async (e) => {
    console.log('File upload triggered:', e.target.files);
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'text/plain'];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 40 * 1024 * 1024; // 40MB limit to match backend
      
      if (!isValidType) {
        console.warn(`File ${file.name} has invalid type: ${file.type}`);
      }
      if (!isValidSize) {
        console.warn(`File ${file.name} is too large: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      }
      
      return isValidType && isValidSize;
    });

    console.log('Valid files:', validFiles);

    if (validFiles.length > 0) {
      // Check total files don't exceed backend limit (10 files)
      const totalFiles = uploadedFiles.length + validFiles.length;
      if (totalFiles > 10) {
        alert('Maximum 10 files allowed. Please remove some files first.');
        e.target.value = '';
        return;
      }
      
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
    
    if (validFiles.length !== files.length) {
      const invalidCount = files.length - validFiles.length;
      alert(`${invalidCount} file(s) were skipped due to invalid type or size (max 40MB).`);
    }
    
    e.target.value = '';
  };

  
  const isSendDisabled = () => {
    const hasTextInput = inputMessage.trim() !== '';
    const hasUploadedFiles = uploadedFiles.length > 0;
    
    
    return !hasTextInput && !hasUploadedFiles;
  };

  const handleSendMessage = async () => {
    if (isSendDisabled()) return;

    console.log('Starting handleSendMessage...');
    console.log('Input message:', inputMessage);
    console.log('Uploaded files:', uploadedFiles);

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage || (uploadedFiles.length > 0 ? 
        `Analyze the uploaded ${analysisMode === 'prescription' ? 'prescription' : 'lab report'} files` : 
        ''),
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      files: uploadedFiles.length > 0 ? uploadedFiles : undefined
    };

    console.log('Adding user message:', newMessage);
    setMessages(prev => {
      console.log('Previous messages:', prev);
      const newMessages = [...prev, newMessage];
      console.log('New messages array:', newMessages);
      return newMessages;
    });
    setInputMessage('');
    setIsLoading(true);

    try {
      let response;
      
      // Determine API endpoints based on analysis mode
      const uploadEndpoint = analysisMode === 'prescription' 
        ? 'https://genimeds-backend.onrender.com/api/ai-chat/upload-analyze'
        : 'https://genimeds-backend.onrender.com/api/lab-analysis/upload-analyze';
      
      const chatEndpoint = analysisMode === 'prescription'
        ? 'https://genimeds-backend.onrender.com/api/ai-chat/chat'
        : 'https://genimeds-backend.onrender.com/api/lab-analysis/chat';
      
        if (uploadedFiles.length > 0) {
        console.log(`Processing uploaded files for ${analysisMode} analysis...`);
        const formData = new FormData();
        
        // Append all files with the name 'files' to match backend expectation
        uploadedFiles.forEach((file, index) => {
          formData.append('files', file);
          console.log(`Added file ${index + 1}: ${file.name}`);
        });
        
        // Append message if provided
        if (inputMessage.trim()) {
          formData.append('message', inputMessage);
        }
        
        const fileResponse = await fetch(uploadEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        console.log('File response status:', fileResponse.status);
        console.log('File response ok:', fileResponse.ok);

        if (!fileResponse.ok) {
          const errorData = await fileResponse.json().catch(() => ({}));
          console.log('File response error:', errorData);
          throw new Error(errorData.error || `File processing failed: ${fileResponse.status}`);
        }

        const data = await fileResponse.json();
        console.log('File data received:', data);
        
        if (!data.success) {
          throw new Error(data.error || 'File processing failed');
        }

        // Create AI response from file processing
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.response || data.analysis || 'File processed successfully',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })
        };
        
        console.log('Adding AI response:', aiResponse);
        setMessages(prev => {
          const newMessages = [...prev, aiResponse];
          return newMessages;
        });
        
        setUploadedFiles([]);
      } else {        console.log(`Sending text message to ${analysisMode} backend...`);
        response = await fetch(chatEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            message: inputMessage
          })
        });
      }      // Handle response for text-only messages
      if (!uploadedFiles.length) {
        console.log('Main response status:', response.status);
        console.log('Main response ok:', response.ok);
      
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.log('Response error data:', errorData);
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        console.log('Response data received:', data);
      
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.response || data.analysis || data.message || 'No response received',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })
        };
        
        console.log('Adding AI response:', aiResponse);
        setMessages(prev => {
          console.log('Previous messages before AI response:', prev);
          const newMessages = [...prev, aiResponse];
          console.log('New messages array with AI response:', newMessages);
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error calling backend API:', error);
      
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };
      
      console.log('Adding error response:', errorResponse);
      setMessages(prev => {
        console.log('Previous messages before error response:', prev);
        const newMessages = [...prev, errorResponse];
        console.log('New messages array with error response:', newMessages);
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (indexToRemove) => {
    console.log('Removing file at index:', indexToRemove);
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, index) => index !== indexToRemove);
      console.log('Files after removal:', newFiles);
      return newFiles;
    });
  };

  const clearAllFiles = () => {
    setUploadedFiles([]);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
    {/* I will be leaving comment of each section here to avoid confusion. Feel free to change the UI */}
    
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main chat container */}
      <div className="relative z-10 flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 backdrop-blur-md bg-white/30 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                GeniMeds AI {analysisMode === 'prescription' ? '💊' : '🔬'}
              </h1>
              <p className="text-sm text-gray-600">
                {analysisMode === 'prescription' ? 'Prescription Analysis' : 'Lab Reports Analysis'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/70 text-gray-800 shadow-lg shadow-gray-200/50 border border-white/50'
                }`}
              >
                {message.type === 'ai' ? (
                  <MarkdownRenderer 
                    content={message.content} 
                    className="text-sm leading-relaxed"
                  />
                ) : (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                )}
                {message.files && (
                  <div className="mt-2 space-y-1">
                    {message.files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs opacity-80">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className={`text-xs mt-2 opacity-60 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg shadow-gray-200/50 border border-white/50">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">AI is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>        {/* Uploaded files preview */}
        {uploadedFiles.length > 0 && (
          <div className="px-4 py-2 bg-white/50 backdrop-blur-md border-t border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                {analysisMode === 'prescription' ? 'Prescription Files' : 'Lab Report Files'} ({uploadedFiles.length}/10):
              </span>
              <button
                onClick={clearAllFiles}
                className="text-xs text-red-600 hover:text-red-800 transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 rounded-lg px-3 py-2 text-xs bg-white/70 text-gray-700 backdrop-blur-sm border border-white/50 min-w-0"
                >
                  <div className="flex items-center space-x-1 min-w-0">
                    {/* File type icon */}
                    {file.type.includes('image') ? (
                      <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    ) : file.type.includes('pdf') ? (
                      <svg className="w-3 h-3 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    )}
                    
                    <div className="min-w-0 flex-1">
                      <div className="truncate max-w-24 font-medium">{file.name}</div>
                      <div className="text-gray-500 text-xs">
                        {(file.size / (1024 * 1024)).toFixed(1)}MB
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                    title="Remove file"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-blue-600">
              {analysisMode === 'prescription' 
                ? `What do you want to know about your ${uploadedFiles.length > 1 ? 'prescriptions' : 'prescription'}?`
                : `What do you want to know about your ${uploadedFiles.length > 1 ? 'lab reports' : 'lab report'}?`
              }
            </div>
          </div>
        )}

        {/* Fixed bottom controls: Analysis Mode Toggle + Input Area */}
        <div className="fixed bottom-0 left-0 w-full z-50 bg-transparent" style={{right: 0}}>
          {/* Analysis Mode Toggle */}
          <div className="px-4 py-3 backdrop-blur-md bg-white/20 border-t border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 bg-white/60 rounded-full p-1 backdrop-blur-sm shadow-lg">
                <button
                  onClick={() => handleModeChange('prescription')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    analysisMode === 'prescription'
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/30'
                  }`}
                >
                  <span>💊</span>
                  <span>Prescription</span>
                </button>
                <button
                  onClick={() => handleModeChange('lab-reports')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    analysisMode === 'lab-reports'
                      ? 'bg-green-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-green-600 hover:bg-white/30'
                  }`}
                >
                  <span>🔬</span>
                  <span>Lab Reports</span>
                </button>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div className="p-4 backdrop-blur-md bg-white/30 border-t border-white/20 max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              {/* File upload button */}
              <button
                onClick={triggerFileUpload}
                className="flex-shrink-0 p-3 bg-white/70 hover:bg-white/90 backdrop-blur-md rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-gray-200/50 border border-white/50 group disabled:opacity-50 disabled:cursor-not-allowed relative"
                title={`Upload ${analysisMode === 'prescription' ? 'prescription' : 'lab report'} files (PDF, Image, or Text) - ${uploadedFiles.length}/10 files selected`}
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>              {/* File count indicator */}
                {uploadedFiles.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                    {uploadedFiles.length}
                  </div>
                )}
                {/* Hover indicator dot - only show when no files */}
                {uploadedFiles.length === 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
              </button>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Message input */}
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    analysisMode === 'prescription' 
                      ? "Ask about your prescription or medicine..." 
                      : "Ask about your lab results or test values..."
                  }
                  className="w-full px-4 py-3 pr-12 bg-white/70 backdrop-blur-md rounded-xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none transition-all duration-200 placeholder-gray-500"
                  rows="1"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>

              {/* Send button */}
              <button
                onClick={handleSendMessage}
                disabled={isSendDisabled()}
                className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/25 disabled:shadow-gray-400/25 disabled:cursor-not-allowed group"
              >
                <svg className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
