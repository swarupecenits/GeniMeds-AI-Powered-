import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import MarkdownRenderer from '../components/MarkdownRenderer';

const Home = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m GeniMeds AI assistant. How can I help you today?',
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
    console.log('uploadedFiles state changed:', uploadedFiles);
  }, [uploadedFiles]);

  const handleFileUpload = async (e) => {
    console.log('File upload triggered:', e.target.files);
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'text/plain'];
      return validTypes.includes(file.type);
    });

    console.log('Valid files:', validFiles);

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
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

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage || (uploadedFiles.length > 0 ? 'Analyze the uploaded files' : ''),
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      files: uploadedFiles.length > 0 ? uploadedFiles : undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let response;
      
      if (uploadedFiles.length > 0) {
       
        const formData = new FormData();
        formData.append('document', uploadedFiles[0]); 
        const fileResponse = await fetch('http://localhost:5000/api/analyze/file', {  //This endpoint doesn't work yet, will continue working on this tomorrow
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!fileResponse.ok) {
          const errorData = await fileResponse.json().catch(() => ({}));
          throw new Error(errorData.error || `File processing failed: ${fileResponse.status}`);
        }

        const fileData = await fileResponse.json();
        
        if (!fileData.success || !fileData.analysis) {
          throw new Error('No text could be extracted from the uploaded files');
        }

        
        response = await fetch('http://localhost:5000/api/analyze/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            prescription_text: fileData.analyzedText || inputMessage
          })
        });
        
        
        setUploadedFiles([]);
      } else {
       
        response = await fetch('http://localhost:5000/api/analyze/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            prescription_text: inputMessage
          })
        });
      }
    
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
    
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: data.analysis || data.message || 'No response received',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };
      setMessages(prev => [...prev, aiResponse]);
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
      setMessages(prev => [...prev, errorResponse]);
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
              <h1 className="text-xl font-semibold text-gray-800">GeniMeds AI</h1>
              <p className="text-sm text-gray-600">Always here to help</p>
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
        </div>

        {/* Uploaded files preview */}
        {uploadedFiles.length > 0 && (
          <div className="px-4 py-2 bg-white/50 backdrop-blur-md border-t border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Uploaded Files:</span>
              <button
                onClick={clearAllFiles}
                className="text-xs text-red-600 hover:text-red-800 transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 rounded-full px-3 py-1 text-xs bg-white/70 text-gray-700 backdrop-blur-sm border border-white/50"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="truncate max-w-20">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-1 text-red-500 hover:text-red-700 transition-colors"
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
              What do you want to know about your file?
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-4 backdrop-blur-md bg-white/30 border-t border-white/20">
          <div className="flex items-end space-x-3">
            {/* File upload button */}
            <button
              onClick={triggerFileUpload}
              className="flex-shrink-0 p-3 bg-white/70 hover:bg-white/90 backdrop-blur-md rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-gray-200/50 border border-white/50 group disabled:opacity-50 disabled:cursor-not-allowed relative"
              title="Upload file (PDF, Image, or Text)"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {/* Small indicator dot */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                placeholder="Type your message..."
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
  );
};

export default Home;
