import React, { useState, useEffect } from 'react';

const breathingExercises = [
  { name: '4-7-8 Breathing', inhale: 4, hold: 7, exhale: 8, description: 'Great for relaxation and sleep' },
  { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, description: 'Reduces stress and improves focus' },
  { name: 'Deep Breathing', inhale: 6, hold: 2, exhale: 6, description: 'Simple and effective for beginners' }
];

const MeditationZone = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [selectedSound, setSelectedSound] = useState('');
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(4);

  const meditationSessions = [
    {
      id: 1,
      title: 'Morning Energizer',
      duration: '10 minutes',
      description: 'Start your day with positive energy and focus',
      difficulty: 'Beginner',
      icon: '🌅',
      category: 'Morning'
    },
    {
      id: 2,
      title: 'Stress Relief',
      duration: '15 minutes',
      description: 'Release tension and find inner peace',
      difficulty: 'Intermediate',
      icon: '🌊',
      category: 'Stress Relief'
    },
    {
      id: 3,
      title: 'Sleep Preparation',
      duration: '20 minutes',
      description: 'Prepare your mind for restful sleep',
      difficulty: 'Beginner',
      icon: '🌙',
      category: 'Sleep'
    },
    {
      id: 4,
      title: 'Focus & Concentration',
      duration: '12 minutes',
      description: 'Enhance mental clarity and concentration',
      difficulty: 'Advanced',
      icon: '🎯',
      category: 'Focus'
    },
    {
      id: 5,
      title: 'Anxiety Relief',
      duration: '8 minutes',
      description: 'Calm anxiety and find emotional balance',
      difficulty: 'Beginner',
      icon: '🕊️',
      category: 'Anxiety'
    },
    {
      id: 6,
      title: 'Mindful Walking',
      duration: '25 minutes',
      description: 'Practice mindfulness while moving',
      difficulty: 'Intermediate',
      icon: '🚶‍♀️',
      category: 'Movement'
    }
  ];

  const relaxingSounds = [
    { id: 1, name: 'Ocean Waves', icon: '🌊', category: 'Nature' },
    { id: 2, name: 'Forest Rain', icon: '🌧️', category: 'Nature' },
    { id: 3, name: 'Campfire', icon: '🔥', category: 'Nature' },
    { id: 4, name: 'Birds Singing', icon: '🐦', category: 'Nature' },
    { id: 5, name: 'White Noise', icon: '📻', category: 'Ambient' },
    { id: 6, name: 'Tibetan Bowls', icon: '🎵', category: 'Instrumental' },
    { id: 7, name: 'Gentle Piano', icon: '🎹', category: 'Instrumental' },
    { id: 8, name: 'Wind Chimes', icon: '🎐', category: 'Ambient' }
  ];

  const breathingExercises = [
    { name: '4-7-8 Breathing', inhale: 4, hold: 7, exhale: 8, description: 'Great for relaxation and sleep' },
    { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, description: 'Reduces stress and improves focus' },
    { name: 'Deep Breathing', inhale: 6, hold: 2, exhale: 6, description: 'Simple and effective for beginners' }
  ];

  // Breathing exercise timer
  useEffect(() => {
    const getPhaseCount = () => {
      if (!activeSession?.exercise) return 4;
      const exercise = breathingExercises.find(e => e.name === activeSession.exercise);
      if (breathingPhase === 'inhale') return exercise.inhale;
      if (breathingPhase === 'hold') return exercise.hold;
      return exercise.exhale;
    };

    let interval;
    if (activeSession?.type === 'breathing' && isPlaying) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          if (prev <= 1) {
            setBreathingPhase(current => {
              if (current === 'inhale') return 'hold';
              if (current === 'hold') return 'exhale';
              return 'inhale';
            });
            return getPhaseCount();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession, isPlaying, breathingPhase, breathingExercises]);

  const startMeditation = (session) => {
    setActiveSession({ ...session, type: 'meditation' });
    setIsPlaying(true);
    setSessionTime(parseInt(session.duration) * 60);
  };

  const startBreathing = (exercise) => {
    setActiveSession({ 
      title: exercise.name, 
      description: exercise.description,
      exercise: exercise.name,
      type: 'breathing' 
    });
    setIsPlaying(true);
    setBreathingPhase('inhale');
    setBreathingCount(exercise.inhale);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const stopSession = () => {
    setActiveSession(null);
    setIsPlaying(false);
    setSessionTime(0);
    setBreathingPhase('inhale');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Meditation Zone</h1>
          <p className="text-gray-600">Find peace, reduce stress, and improve your mental well-being</p>
        </div>

        {/* Active Session Display */}
        {activeSession && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50 mb-8 text-center">
            <div className="text-6xl mb-4">{activeSession.icon || '🧘‍♀️'}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{activeSession.title}</h3>
            <p className="text-gray-600 mb-6">{activeSession.description}</p>
            
            {activeSession.type === 'meditation' && (
              <div className="text-4xl font-bold text-indigo-600 mb-6">
                {formatTime(sessionTime)}
              </div>
            )}

            {activeSession.type === 'breathing' && (
              <div className="mb-6">
                <div className="text-6xl mb-4">
                  {breathingPhase === 'inhale' && '⬆️'}
                  {breathingPhase === 'hold' && '⏸️'}
                  {breathingPhase === 'exhale' && '⬇️'}
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  {breathingPhase.charAt(0).toUpperCase() + breathingPhase.slice(1)}
                </div>
                <div className="text-4xl font-bold text-purple-600">
                  {breathingCount}
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Resume'}
              </button>
              <button
                onClick={stopSession}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200"
              >
                🛑 Stop
              </button>
            </div>
          </div>
        )}

        {/* Meditation Sessions */}
        {!activeSession && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Guided Meditation Sessions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meditationSessions.map((session) => (
                  <div key={session.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-200">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{session.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{session.title}</h3>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">{session.category}</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{session.difficulty}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                      <p className="text-indigo-600 font-medium">{session.duration}</p>
                    </div>
                    <button
                      onClick={() => startMeditation(session)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
                    >
                      Start Session
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Breathing Exercises */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Breathing Exercises</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {breathingExercises.map((exercise, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-200">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">🫁</div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{exercise.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                      <div className="text-xs text-indigo-600 mb-3">
                        Inhale {exercise.inhale}s • Hold {exercise.hold}s • Exhale {exercise.exhale}s
                      </div>
                    </div>
                    <button
                      onClick={() => startBreathing(exercise)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200"
                    >
                      Start Breathing
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Relaxing Sounds */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Relaxing Sounds</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {relaxingSounds.map((sound) => (
                  <div key={sound.id} className="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{sound.icon}</div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">{sound.name}</h4>
                      <p className="text-xs text-gray-600 mb-3">{sound.category}</p>
                      <button
                        onClick={() => {
                          setSelectedSound(selectedSound === sound.name ? '' : sound.name);
                          alert(`${selectedSound === sound.name ? 'Stopped' : 'Playing'}: ${sound.name}`);
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedSound === sound.name
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                            : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white'
                        }`}
                      >
                        {selectedSound === sound.name ? '⏸️ Stop' : '▶️ Play'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Quick Relaxation</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => alert('Starting 1-minute quick meditation...')}
                  className="p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 text-center"
                >
                  <div className="text-2xl mb-2">⚡</div>
                  <div>1-Minute Break</div>
                </button>
                <button
                  onClick={() => alert('Starting progressive muscle relaxation...')}
                  className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 text-center"
                >
                  <div className="text-2xl mb-2">💪</div>
                  <div>Muscle Relaxation</div>
                </button>
                <button
                  onClick={() => alert('Starting visualization exercise...')}
                  className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 text-center"
                >
                  <div className="text-2xl mb-2">🌈</div>
                  <div>Visualization</div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MeditationZone;
