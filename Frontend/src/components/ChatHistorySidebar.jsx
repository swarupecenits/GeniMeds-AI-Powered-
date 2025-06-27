import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { auth } from '../firebase/firebase';
import { FaHistory, FaTrash, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';

const ChatHistorySidebar = ({ 
  isOpen, 
  onClose, 
  onSelectSession, 
  currentSessionId, 
  onNewChat 
}) => {
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTitle, setEditingTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchChatSessions();
    }
  }, [isOpen]);

  const fetchChatSessions = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(API_ENDPOINTS.CHAT_HISTORY.SESSIONS, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setChatSessions(data.chatSessions);
      }
    } catch (err) {
      console.error('Error fetching chat sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this chat?')) return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(API_ENDPOINTS.CHAT_HISTORY.SESSION(sessionId), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setChatSessions(prev => prev.filter(session => session.sessionId !== sessionId));
        if (currentSessionId === sessionId) {
          onNewChat(); // Start a new chat if current one is deleted
        }
      }
    } catch (err) {
      console.error('Error deleting chat session:', err);
    }
  };

  const startEditTitle = (session, e) => {
    e.stopPropagation();
    setEditingTitle(session.sessionId);
    setNewTitle(session.title);
  };

  const saveTitle = async (sessionId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(API_ENDPOINTS.CHAT_HISTORY.UPDATE_TITLE(sessionId), {
        method: 'PUT',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
      });

      if (response.ok) {
        setChatSessions(prev => 
          prev.map(session => 
            session.sessionId === sessionId 
              ? { ...session, title: newTitle }
              : session
          )
        );
        setEditingTitle(null);
      }
    } catch (err) {
      console.error('Error updating chat title:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none lg:border-r lg:border-gray-200
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FaHistory className="text-cyan-600" />
            <h2 className="font-semibold text-gray-800">Chat History</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onNewChat}
              className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              title="New Chat"
            >
              <FaPlus />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Chat Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            </div>
          ) : chatSessions.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              <FaHistory className="mx-auto text-4xl mb-4 text-gray-300" />
              <p>No chat history yet</p>
              <p className="text-sm">Start a conversation to see it here</p>
            </div>
          ) : (
            <div className="p-2">
              {chatSessions.map((session) => (
                <div
                  key={session.sessionId}
                  className={`
                    p-3 mb-2 rounded-lg cursor-pointer transition-colors group relative
                    ${currentSessionId === session.sessionId 
                      ? 'bg-cyan-50 border border-cyan-200' 
                      : 'hover:bg-gray-50'
                    }
                  `}
                  onClick={() => onSelectSession(session.sessionId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {editingTitle === session.sessionId ? (
                        <input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onBlur={() => saveTitle(session.sessionId)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveTitle(session.sessionId);
                            if (e.key === 'Escape') setEditingTitle(null);
                          }}
                          className="w-full p-1 text-sm font-medium border border-cyan-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <h3 className="font-medium text-gray-800 truncate text-sm">
                          {session.title}
                        </h3>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(session.lastActivity)}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`
                          text-xs px-2 py-1 rounded-full
                          ${session.analysisMode === 'prescription' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                          }
                        `}>
                          {session.analysisMode === 'prescription' ? 'Prescription' : 'Lab Reports'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => startEditTitle(session, e)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Edit title"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      <button
                        onClick={(e) => deleteSession(session.sessionId, e)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete chat"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatHistorySidebar;
