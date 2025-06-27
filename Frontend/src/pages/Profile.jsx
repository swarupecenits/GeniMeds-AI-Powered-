import React, { useState } from 'react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for demonstration
  const samplePrescriptions = [
    {
      id: 1,
      medicineName: "Amoxicillin 500mg",
      doctorName: "Dr. Sarah Johnson",
      dosage: "3 times daily",
      duration: "7 days",
      date: "2025-06-20",
      status: "Active"
    },
    {
      id: 2,
      medicineName: "Lisinopril 10mg",
      doctorName: "Dr. Michael Chen",
      dosage: "Once daily",
      duration: "30 days",
      date: "2025-06-18",
      status: "Active"
    },
    {
      id: 3,
      medicineName: "Ibuprofen 200mg",
      doctorName: "Dr. Sarah Johnson",
      dosage: "As needed",
      duration: "PRN",
      date: "2025-06-15",
      status: "Completed"
    }
  ];

  const sampleLabReports = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      date: "2025-06-22",
      status: "Normal",
      doctor: "Dr. Robert Wilson",
      highlights: ["Hemoglobin: 14.2 g/dL", "WBC Count: 7,200/μL", "Platelets: 285,000/μL"]
    },
    {
      id: 2,
      testName: "Lipid Panel",
      date: "2025-06-20",
      status: "Attention Required",
      doctor: "Dr. Michael Chen",
      highlights: ["Total Cholesterol: 220 mg/dL", "HDL: 45 mg/dL", "LDL: 140 mg/dL"]
    },
    {
      id: 3,
      testName: "Blood Glucose",
      date: "2025-06-18",
      status: "Normal",
      doctor: "Dr. Sarah Johnson",
      highlights: ["Fasting Glucose: 92 mg/dL", "HbA1c: 5.4%"]
    }
  ];

  const sampleReminders = [
    {
      id: 1,
      medicineName: "Amoxicillin 500mg",
      nextDose: "2025-06-26T14:00",
      frequency: "3 times daily",
      status: "Active"
    },
    {
      id: 2,
      medicineName: "Lisinopril 10mg",
      nextDose: "2025-06-27T08:00",
      frequency: "Once daily",
      status: "Active"
    },
    {
      id: 3,
      medicineName: "Vitamin D3",
      nextDose: "2025-06-27T09:00",
      frequency: "Once daily",
      status: "Active"
    }
  ];

  const userProfile = {
    name: "Manav Gandhi",
    email: "manav.gandhi2302@gmail.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    bloodType: "O+",
    emergencyContact: "Jane Doe - (555) 987-6543"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Health Profile</h1>
          <p className="text-gray-600">Manage your health information and track your medical journey</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white/60 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/50">
            {['overview', 'prescriptions', 'lab-reports', 'reminders'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 mx-1 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/30'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid gap-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Personal Information Card */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Personal Info</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div><span className="font-medium text-gray-600">Name:</span> <span className="text-gray-800">{userProfile.name}</span></div>
                  <div><span className="font-medium text-gray-600">Email:</span> <span className="text-gray-800">{userProfile.email}</span></div>
                  <div><span className="font-medium text-gray-600">Phone:</span> <span className="text-gray-800">{userProfile.phone}</span></div>
                  <div><span className="font-medium text-gray-600">DOB:</span> <span className="text-gray-800">{userProfile.dateOfBirth}</span></div>
                  <div><span className="font-medium text-gray-600">Blood Type:</span> <span className="text-gray-800">{userProfile.bloodType}</span></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Health Summary</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{samplePrescriptions.length}</div>
                    <div className="text-sm text-blue-700">Prescriptions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{sampleLabReports.length}</div>
                    <div className="text-sm text-green-700">Lab Reports</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{sampleReminders.filter(r => r.status === 'Active').length}</div>
                    <div className="text-sm text-purple-700">Active Reminders</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">2</div>
                    <div className="text-sm text-orange-700">Upcoming Visits</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center p-2 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">Lab Report Added</div>
                      <div className="text-gray-600">CBC Test - 2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">Prescription Updated</div>
                      <div className="text-gray-600">Amoxicillin - 4 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">Reminder Set</div>
                      <div className="text-gray-600">Vitamin D3 - 1 week ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">My Prescriptions</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
                  Add Prescription
                </button>
              </div>
              <div className="grid gap-4">
                {samplePrescriptions.map((prescription) => (
                  <div key={prescription.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{prescription.medicineName}</h3>
                            <p className="text-sm text-gray-600">Prescribed by {prescription.doctorName}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Dosage</span>
                            <p className="text-gray-800">{prescription.dosage}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Duration</span>
                            <p className="text-gray-800">{prescription.duration}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Date Prescribed</span>
                            <p className="text-gray-800">{new Date(prescription.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          prescription.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {prescription.status}
                        </span>
                        <button className="mt-2 text-blue-600 hover:text-blue-800 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lab Reports Tab */}
          {activeTab === 'lab-reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Lab Reports</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
                  Upload Report
                </button>
              </div>
              <div className="grid gap-4">
                {sampleLabReports.map((report) => (
                  <div key={report.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{report.testName}</h3>
                            <p className="text-sm text-gray-600">Ordered by {report.doctor}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Test Date</span>
                            <p className="text-gray-800">{new Date(report.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Key Results</span>
                            <div className="space-y-1">
                              {report.highlights.map((highlight, index) => (
                                <p key={index} className="text-sm text-gray-700">• {highlight}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === 'Normal' 
                            ? 'bg-green-100 text-green-800' 
                            : report.status === 'Attention Required'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {report.status}
                        </span>
                        <button className="mt-2 text-blue-600 hover:text-blue-800 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reminders Tab */}
          {activeTab === 'reminders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Medicine Reminders</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                  Set New Reminder
                </button>
              </div>
              <div className="grid gap-4">
                {sampleReminders.map((reminder) => (
                  <div key={reminder.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{reminder.medicineName}</h3>
                            <p className="text-sm text-gray-600">{reminder.frequency}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Next Dose</span>
                            <p className="text-gray-800">
                              {new Date(reminder.nextDose).toLocaleDateString()} at {new Date(reminder.nextDose).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Time Until Next Dose</span>
                            <p className="text-gray-800">
                              {Math.ceil((new Date(reminder.nextDose) - new Date()) / (1000 * 60 * 60))} hours
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          reminder.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {reminder.status}
                        </span>
                        <div className="flex space-x-2 mt-2">
                          <button className="text-green-600 hover:text-green-800 transition-colors" title="Mark as taken">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit reminder">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors" title="Delete reminder">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
