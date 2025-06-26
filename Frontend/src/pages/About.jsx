import React from 'react';
import { Link } from 'react-router-dom';
import { Card_Style } from '../components/Card_Style';

const About = () => {
  return (
    <section className="bg-white py-16 lg:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-grey-800 sm:text-5xl lg:text-6xl font-pj">
            About Genimeds
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-500 max-w-2xl mx-auto">
            Genimeds is your AI-powered health companion, delivering smart healthcare support at your fingertips. From understanding prescriptions to personalized health insights, we make healthcare simple and accessible.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Prescription Upload & Medicine Extraction */}
          <Card_Style
            containerClassName="col-span-1 bg-teal-600 min-h-[300px] rounded-2xl shadow-lg"
            className="p-6"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-base md:text-xl lg:text-2xl font-semibold text-white">
                Prescription Upload
              </h2>
              <p className="mt-4 text-left text-base text-neutral-100">
                Upload handwritten or scanned prescriptions to automatically extract medicine names, dosages, and frequencies using OCR and NLP technology.
              </p>
            </div>
            <img
              src="/presc.png"
              width={150}
              height={150}
              alt="Prescription Upload Illustration"
              className="absolute -right-2 -bottom-2 opacity-70 object-contain rounded-2xl"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Prescription')}
            />
          </Card_Style>

          {/* Card 2: Generic Medicine Alternatives */}
          <Card_Style
            containerClassName="col-span-1 bg-blue-600 min-h-[300px] rounded-2xl shadow-lg"
            className="p-6"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-base md:text-xl lg:text-2xl font-semibold text-white">
                Generic Alternatives
              </h2>
              <p className="mt-4 text-left text-base text-neutral-100">
                Find cost-effective generic drugs with price comparisons and manufacturer details from trusted sources like 1mg and NetMeds.
              </p>
            </div>
            <img
              src="/med.png"
              width={150}
              height={150}
              alt="Generic Medicine Illustration"
              className="absolute -right-2 -bottom-2 opacity-70 object-contain rounded-2xl"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Medicine')}
            />
          </Card_Style>

          {/* Card 3: AI Chatbot */}
          <Card_Style
            containerClassName="col-span-1 bg-pink-500 min-h-[300px] rounded-2xl shadow-lg"
            className="p-6"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-base md:text-xl lg:text-2xl font-semibold text-white">
                AI Chatbot
              </h2>
              <p className="mt-4 text-left text-base text-neutral-100">
                Ask natural language questions about medications and get clear answers on usage, side effects, and more, powered by advanced AI.
              </p>
            </div>
            <img
              src="/chatbot.png"
              width={150}
              height={150}
              alt="AI Chatbot Illustration"
              className="absolute -right-3 -bottom-5 opacity-70 object-contain rounded-2xl"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Chatbot')}
            />
          </Card_Style>

          {/* Card 4: Lab Report Analysis */}
          <Card_Style
            containerClassName="col-span-1 md:col-span-2 bg-orange-500 min-h-[300px] rounded-2xl shadow-lg"
            className="p-6"
          >
            <div className="max-w-md">
              <h2 className="text-left text-base md:text-xl lg:text-2xl font-semibold text-white">
                Lab Report Analysis
              </h2>
              <p className="mt-4 text-left text-base text-neutral-100">
                Upload lab reports to extract and interpret results, with AI highlighting abnormalities and providing simple, actionable explanations.
              </p>
            </div>
            <img
              src="/report.png"
              width={200}
              height={200}
              alt="Lab Report Illustration"
              className="absolute -right-4 -bottom-4 opacity-70 object-contain rounded-2xl"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/200?text=Lab+Report')}
            />
          </Card_Style>

          {/* Card 5: Medicine Reminders */}
          <Card_Style
            containerClassName="col-span-1 bg-cyan-600 min-h-[300px] rounded-2xl shadow-lg"
            className="p-6"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-base md:text-xl lg:text-2xl font-semibold text-white">
                Medicine Reminders
              </h2>
              <p className="mt-4 text-left text-base text-neutral-100">
                Set dosage schedules and receive timely reminders via SMS or email to stay on track with your medications.
              </p>
            </div>
            <img
              src="/reminder.png"
              width={150}
              height={150}
              alt="Medicine Reminder Illustration"
              className="absolute -right-2 -bottom-2 opacity-70 object-contain rounded-2xl"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Reminder')}
            />
          </Card_Style>

          {/* Card 6: Symptom Checker & User Profile */}
          <Card_Style
            containerClassName="col-span-1 md:col-span-2 lg:col-span-3 bg-purple-800 min-h-[300px] rounded-2xl shadow-lg"
            className="p-6"
          >
            <div className="max-w-lg">
              <h2 className="text-left text-base md:text-xl lg:text-2xl font-semibold text-white">
                Symptom Checker & User Profile
              </h2>
              <p className="mt-4 text-left text-base text-neutral-100">
                Enter symptoms for AI-driven condition suggestions and home remedies. Access your health history, including prescriptions, lab reports, and trends like hemoglobin levels, in a personalized profile.
              </p>
            </div>
            <img
              src="/symp.png"
              width={200}
              height={200}
              alt="Symptom Checker and Profile Illustration"
              className="absolute -right-4 -bottom-4 opacity-70 object-contain rounded-2xl w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/200?text=Profile')}
            />
          </Card_Style>
        </div>
      </div>
    </section>
  );
};

export default About;