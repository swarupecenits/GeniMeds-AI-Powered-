import React, { useState } from 'react';

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const specialties = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Orthopedic', 
    'Neurologist', 'Pediatrician', 'Gynecologist', 'Psychiatrist', 
    'Ophthalmologist', 'ENT Specialist'
  ];

  const sampleDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.8,
      experience: '15 years',
      location: 'Downtown Medical Center',
      price: '$150',
      availability: 'Available Today',
      image: '👩‍⚕️',
      nextSlots: ['10:00 AM', '2:00 PM', '4:30 PM']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Physician',
      rating: 4.9,
      experience: '12 years',
      location: 'City Health Clinic',
      price: '$100',
      availability: 'Available Tomorrow',
      image: '👨‍⚕️',
      nextSlots: ['9:00 AM', '11:30 AM', '3:00 PM']
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      rating: 4.7,
      experience: '10 years',
      location: 'Skin Care Institute',
      price: '$120',
      availability: 'Available This Week',
      image: '👩‍⚕️',
      nextSlots: ['1:00 PM', '3:30 PM', '5:00 PM']
    },
    {
      id: 4,
      name: 'Dr. Robert Wilson',
      specialty: 'Orthopedic',
      rating: 4.6,
      experience: '20 years',
      location: 'Bone & Joint Center',
      price: '$200',
      availability: 'Available Next Week',
      image: '👨‍⚕️',
      nextSlots: ['8:00 AM', '10:30 AM', '2:30 PM']
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Pediatrician',
      rating: 4.9,
      experience: '8 years',
      location: 'Children\'s Health Center',
      price: '$90',
      availability: 'Available Today',
      image: '👩‍⚕️',
      nextSlots: ['9:30 AM', '1:30 PM', '4:00 PM']
    },
    {
      id: 6,
      name: 'Dr. James Thompson',
      specialty: 'Neurologist',
      rating: 4.8,
      experience: '18 years',
      location: 'Neuro Care Center',
      price: '$250',
      availability: 'Available This Week',
      image: '👨‍⚕️',
      nextSlots: ['11:00 AM', '2:30 PM', '5:30 PM']
    }
  ];

  const filteredDoctors = sampleDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || doctor.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleBookAppointment = () => {
    if (selectedDoctor && appointmentDate && appointmentTime) {
      alert(`Appointment booked successfully!\n\nDoctor: ${selectedDoctor.name}\nDate: ${appointmentDate}\nTime: ${appointmentTime}\n\nYou will receive a confirmation email shortly.`);
      setSelectedDoctor(null);
      setAppointmentDate('');
      setAppointmentTime('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-green-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Healthcare Providers</h1>
          <p className="text-gray-600">Search and book appointments with qualified medical professionals</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Doctors</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Doctor name or specialty..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="City or clinic name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-200">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{doctor.image}</div>
                <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-green-600 font-medium">{doctor.specialty}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{doctor.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-1">{doctor.rating}</span>
                    <span className="text-yellow-500">⭐</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-green-600">{doctor.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-xs">{doctor.location}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">{doctor.availability}</span>
                </div>
                <div className="text-xs text-gray-600">
                  Next slots: {doctor.nextSlots.join(', ')}
                </div>
              </div>

              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Appointment Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Book Appointment</h3>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{selectedDoctor.image}</div>
                <h4 className="text-lg font-semibold text-gray-800">{selectedDoctor.name}</h4>
                <p className="text-green-600">{selectedDoctor.specialty}</p>
                <p className="text-sm text-gray-600">{selectedDoctor.location}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select time slot</option>
                    {selectedDoctor.nextSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">Consultation Fee:</span>
                    <span className="text-green-600 font-bold">{selectedDoctor.price}</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    💳 Payment will be processed after confirmation
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={!appointmentDate || !appointmentTime}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDoctors;
