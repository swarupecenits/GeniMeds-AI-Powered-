import React, { useState } from 'react';

const MentalHealth = () => {
  const [currentMood, setCurrentMood] = useState('');
  const [stressLevel, setStressLevel] = useState(5);
  const [selectedJournal, setSelectedJournal] = useState('');
  const [activeTab, setActiveTab] = useState('mood-tracker');

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-800' },
    { emoji: '😌', label: 'Calm', color: 'bg-green-100 text-green-800' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-800' },
    { emoji: '😰', label: 'Anxious', color: 'bg-orange-100 text-orange-800' },
    { emoji: '😡', label: 'Angry', color: 'bg-red-100 text-red-800' }
  ];

  const wellnessTips = [
    {
      title: "Practice Deep Breathing",
      description: "Take 5 deep breaths, inhaling for 4 counts, holding for 4, and exhaling for 6.",
      icon: "🫁",
      category: "Breathing"
    },
    {
      title: "Take a Nature Walk",
      description: "Spend 10-15 minutes outdoors to reduce stress and improve mood.",
      icon: "🌿",
      category: "Exercise"
    },
    {
      title: "Practice Gratitude",
      description: "Write down 3 things you're grateful for today.",
      icon: "🙏",
      category: "Mindfulness"
    },
    {
      title: "Stay Hydrated",
      description: "Drink a glass of water. Dehydration can affect mood and energy.",
      icon: "💧",
      category: "Health"
    }
  ];

  const moodHistory = [
    { date: '2025-06-26', mood: 'Happy', stress: 3 },
    { date: '2025-06-25', mood: 'Calm', stress: 4 },
    { date: '2025-06-24', mood: 'Anxious', stress: 7 },
    { date: '2025-06-23', mood: 'Happy', stress: 2 },
    { date: '2025-06-22', mood: 'Neutral', stress: 5 }
  ];

  const handleMoodSubmit = () => {
    if (currentMood) {
      alert(`Mood "${currentMood}" logged successfully! Keep tracking your mental wellness.`);
      setCurrentMood('');
      setStressLevel(5);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mental Health Care</h1>
          <p className="text-gray-600">Track your mood, manage stress, and nurture your mental wellness</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white/60 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/50">
            {['mood-tracker', 'wellness-tips', 'stress-relief', 'journal'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 mx-1 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-white/30'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Mood Tracker */}
          {activeTab === 'mood-tracker' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Current Mood Selection */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {moods.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => setCurrentMood(mood.label)}
                      className={`p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                        currentMood === mood.label ? mood.color + ' ring-2 ring-purple-500' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <div className="text-sm font-medium">{mood.label}</div>
                    </button>
                  ))}
                </div>

                {/* Stress Level */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Stress Level: {stressLevel}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <button
                  onClick={handleMoodSubmit}
                  disabled={!currentMood}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
                >
                  Log My Mood
                </button>
              </div>

              {/* Mood History */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Mood History</h3>
                <div className="space-y-3">
                  {moodHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {moods.find(m => m.label === entry.mood)?.emoji}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{entry.mood}</div>
                          <div className="text-sm text-gray-600">{entry.date}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Stress: {entry.stress}/10
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wellness Tips */}
          {activeTab === 'wellness-tips' && (
            <div className="grid md:grid-cols-2 gap-6">
              {wellnessTips.map((tip, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{tip.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{tip.title}</h4>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{tip.category}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{tip.description}</p>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                        Try This Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stress Relief */}
          {activeTab === 'stress-relief' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 text-center">
                <div className="text-5xl mb-4">🧘‍♀️</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Quick Meditation</h4>
                <p className="text-gray-600 mb-4">5-minute guided meditation for instant calm</p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200">
                  Start Meditation
                </button>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 text-center">
                <div className="text-5xl mb-4">🎵</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Calming Sounds</h4>
                <p className="text-gray-600 mb-4">Nature sounds and white noise for relaxation</p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                  Play Sounds
                </button>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 text-center">
                <div className="text-5xl mb-4">🫁</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Breathing Exercise</h4>
                <p className="text-gray-600 mb-4">Guided breathing techniques for stress relief</p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                  Start Breathing
                </button>
              </div>
            </div>
          )}

          {/* Journal */}
          {activeTab === 'journal' && (
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mental Health Journal</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How was your day? What are you thinking about?
                  </label>
                  <textarea
                    value={selectedJournal}
                    onChange={(e) => setSelectedJournal(e.target.value)}
                    placeholder="Express your thoughts and feelings here... Writing can help process emotions and reduce stress."
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {selectedJournal.length} characters
                  </div>
                  <div className="space-x-3">
                    <button
                      onClick={() => setSelectedJournal('')}
                      className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => {
                        alert('Journal entry saved! Keep expressing your thoughts for better mental health.');
                        setSelectedJournal('');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
