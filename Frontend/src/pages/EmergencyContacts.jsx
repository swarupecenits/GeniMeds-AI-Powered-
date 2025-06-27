import React, { useState } from 'react';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      type: 'Primary Care',
      phone: '+1 (555) 123-4567',
      email: 'dr.johnson@healthcare.com',
      address: '123 Health St, Medical City, MC 12345',
      notes: 'My primary care physician',
      available24h: false
    },
    {
      id: 2,
      name: 'City Emergency Services',
      type: 'Emergency',
      phone: '911',
      email: 'emergency@city.gov',
      address: 'Emergency Response Center',
      notes: 'For life-threatening emergencies only',
      available24h: true
    },
    {
      id: 3,
      name: 'Mom',
      type: 'Family',
      phone: '+1 (555) 987-6543',
      email: 'mom@family.com',
      address: '456 Family Ave, Hometown, HT 67890',
      notes: 'Emergency contact',
      available24h: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    type: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    available24h: false
  });

  const contactTypes = [
    'Primary Care',
    'Specialist',
    'Emergency',
    'Family',
    'Friend',
    'Hospital',
    'Pharmacy',
    'Insurance',
    'Other'
  ];

  const emergencyNumbers = [
    { name: 'Emergency Services', number: '911', description: 'Police, Fire, Medical emergencies' },
    { name: 'Poison Control', number: '1-800-222-1222', description: 'Poisoning emergencies' },
    { name: 'Mental Health Crisis', number: '988', description: 'Suicide & Crisis Lifeline' },
    { name: 'Non-Emergency Medical', number: '311', description: 'Non-urgent medical advice' }
  ];

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      alert('Please fill in at least name and phone number');
      return;
    }

    const contact = {
      ...newContact,
      id: Date.now()
    };

    setContacts([...contacts, contact]);
    setNewContact({
      name: '',
      type: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
      available24h: false
    });
    setShowAddForm(false);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const handleCall = (phone) => {
    // In a real app, this would initiate a call
    window.open(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    // In a real app, this would open email client
    window.open(`mailto:${email}`);
  };

  const getTypeColor = (type) => {
    const colors = {
      'Primary Care': 'bg-blue-100 text-blue-800',
      'Specialist': 'bg-purple-100 text-purple-800',
      'Emergency': 'bg-red-100 text-red-800',
      'Family': 'bg-green-100 text-green-800',
      'Friend': 'bg-yellow-100 text-yellow-800',
      'Hospital': 'bg-red-100 text-red-800',
      'Pharmacy': 'bg-teal-100 text-teal-800',
      'Insurance': 'bg-gray-100 text-gray-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Emergency Contacts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keep your important contacts organized and easily accessible during emergencies.
          </p>
        </div>

        {/* Emergency Numbers Section */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-red-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Important Emergency Numbers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyNumbers.map((emergency, index) => (
              <div key={index} className="bg-white border border-red-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{emergency.name}</h3>
                <p className="text-2xl font-bold text-red-600 mb-2">{emergency.number}</p>
                <p className="text-sm text-gray-600">{emergency.description}</p>
                <button
                  onClick={() => handleCall(emergency.number)}
                  className="mt-3 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Call Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Contacts Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Your Emergency Contacts</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Contact
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
                  <div className="flex items-center gap-2">
                    {contact.available24h && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">24/7</span>
                    )}
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {contact.type && (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getTypeColor(contact.type)}`}>
                    {contact.type}
                  </span>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">{contact.phone}</span>
                  </div>

                  {contact.email && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">{contact.email}</span>
                    </div>
                  )}

                  {contact.address && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{contact.address}</span>
                    </div>
                  )}
                </div>

                {contact.notes && (
                  <p className="text-sm text-gray-600 mb-4 italic">{contact.notes}</p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCall(contact.phone)}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </button>
                  
                  {contact.email && (
                    <button
                      onClick={() => handleEmail(contact.email)}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Contact Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Contact</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newContact.type}
                    onChange={(e) => setNewContact({...newContact, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {contactTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={newContact.address}
                    onChange={(e) => setNewContact({...newContact, address: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full address"
                    rows="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newContact.notes}
                    onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes"
                    rows="2"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available24h"
                    checked={newContact.available24h}
                    onChange={(e) => setNewContact({...newContact, available24h: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="available24h" className="ml-2 block text-sm text-gray-900">
                    Available 24/7
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
