import React, { useState } from 'react';

const HealthTracker = () => {
  const [activeTab, setActiveTab] = useState('vitals');
  const [newReading, setNewReading] = useState({
    type: '',
    value: '',
    unit: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5)
  });

  const vitalSigns = [
    { name: 'Blood Pressure', unit: 'mmHg', icon: '🩸', color: 'red', normalRange: '120/80' },
    { name: 'Heart Rate', unit: 'bpm', icon: '❤️', color: 'pink', normalRange: '60-100' },
    { name: 'Temperature', unit: '°F', icon: '🌡️', color: 'orange', normalRange: '98.6' },
    { name: 'Blood Sugar', unit: 'mg/dL', icon: '🍯', color: 'yellow', normalRange: '70-100' },
    { name: 'Weight', unit: 'lbs', icon: '⚖️', color: 'blue', normalRange: 'varies' },
    { name: 'Oxygen Saturation', unit: '%', icon: '🫁', color: 'green', normalRange: '95-100' }
  ];

  const sampleReadings = [
    { id: 1, type: 'Blood Pressure', value: '118/75', unit: 'mmHg', date: '2025-06-26', time: '08:30', status: 'Normal' },
    { id: 2, type: 'Heart Rate', value: '72', unit: 'bpm', date: '2025-06-26', time: '08:30', status: 'Normal' },
    { id: 3, type: 'Weight', value: '165', unit: 'lbs', date: '2025-06-25', time: '07:00', status: 'Normal' },
    { id: 4, type: 'Blood Sugar', value: '92', unit: 'mg/dL', date: '2025-06-25', time: '12:00', status: 'Normal' },
    { id: 5, type: 'Temperature', value: '98.2', unit: '°F', date: '2025-06-24', time: '19:00', status: 'Normal' }
  ];

  const healthGoals = [
    { id: 1, title: 'Daily Steps', target: '10,000 steps', current: '7,842 steps', progress: 78, icon: '👟' },
    { id: 2, title: 'Water Intake', target: '8 glasses', current: '6 glasses', progress: 75, icon: '💧' },
    { id: 3, title: 'Sleep Hours', target: '8 hours', current: '7.5 hours', progress: 94, icon: '😴' },
    { id: 4, title: 'Exercise Minutes', target: '30 min', current: '25 min', progress: 83, icon: '🏃‍♀️' }
  ];

  const insights = [
    { title: 'Blood Pressure Trend', description: 'Your BP has been stable for the past week', status: 'good', icon: '📈' },
    { title: 'Heart Rate Variability', description: 'Consider adding cardio exercise to improve HR', status: 'warning', icon: '💓' },
    { title: 'Weight Management', description: 'You\'re on track with your weight goals', status: 'good', icon: '🎯' },
    { title: 'Sleep Quality', description: 'Try to maintain consistent sleep schedule', status: 'info', icon: '🌙' }
  ];

  const handleAddReading = () => {
    if (newReading.type && newReading.value) {
      alert(`Health reading added!\n\n${newReading.type}: ${newReading.value} ${newReading.unit}\nDate: ${newReading.date} at ${newReading.time}`);
      setNewReading({
        type: '',
        value: '',
        unit: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Tracker</h1>
          <p className="text-gray-600">Monitor your vital signs and track your wellness journey</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white/60 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/50">
            {['vitals', 'goals', 'insights', 'add-reading'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 mx-1 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white/30'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Vital Signs */}
          {activeTab === 'vitals' && (
            <>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {vitalSigns.map((vital) => (
                  <div key={vital.name} className="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50 text-center hover:shadow-xl transition-all duration-200">
                    <div className="text-3xl mb-2">{vital.icon}</div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{vital.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">Normal: {vital.normalRange}</p>
                    <button className="w-full px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-xs font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200">
                      Track
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Readings</h3>
                <div className="space-y-3">
                  {sampleReadings.map((reading) => (
                    <div key={reading.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {vitalSigns.find(v => v.name === reading.type)?.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{reading.type}</div>
                          <div className="text-sm text-gray-600">{reading.date} at {reading.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800">{reading.value} {reading.unit}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reading.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reading.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Health Goals */}
          {activeTab === 'goals' && (
            <div className="grid md:grid-cols-2 gap-6">
              {healthGoals.map((goal) => (
                <div key={goal.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{goal.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{goal.title}</h4>
                      <p className="text-sm text-gray-600">Target: {goal.target}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{goal.current}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">{goal.progress}%</div>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200">
                    Update Progress
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Health Insights */}
          {activeTab === 'insights' && (
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{insight.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{insight.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          insight.status === 'good' ? 'bg-green-100 text-green-800' :
                          insight.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {insight.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Reading */}
          {activeTab === 'add-reading' && (
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Add Health Reading</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vital Sign Type
                  </label>
                  <select
                    value={newReading.type}
                    onChange={(e) => {
                      const selectedVital = vitalSigns.find(v => v.name === e.target.value);
                      setNewReading({
                        ...newReading, 
                        type: e.target.value,
                        unit: selectedVital?.unit || ''
                      });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select vital sign</option>
                    {vitalSigns.map((vital) => (
                      <option key={vital.name} value={vital.name}>{vital.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reading Value
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newReading.value}
                      onChange={(e) => setNewReading({...newReading, value: e.target.value})}
                      placeholder="Enter value"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <div className="px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg min-w-16 text-center text-sm text-gray-600">
                      {newReading.unit || 'unit'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={newReading.date}
                      onChange={(e) => setNewReading({...newReading, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={newReading.time}
                      onChange={(e) => setNewReading({...newReading, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddReading}
                  disabled={!newReading.type || !newReading.value}
                  className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
                >
                  Add Reading
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;
