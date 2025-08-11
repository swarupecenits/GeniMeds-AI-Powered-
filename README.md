# GENIMEDS-AI-POWERED

*Transforming Healthcare with Intelligent, Seamless Solutions*
# Project  
**GeniMeds** – AI-powered healthcare web app that analyzes prescriptions/lab reports, checks symptoms with LLMs, sends medicine reminders, and offers wellness tools (mental health, meditation, health tracking, doctor discovery).

## What it does  
- AI Chat for medical queries with file upload (images/PDF) and analysis mode (prescription vs. lab report)  
- AI Symptom Checker: ranks top 3 likely conditions with probability, urgency, and care guidance  
- Email reminders for medicines/appointments via Azure Communication Services  
- Health modules: Mental Health, Meditation Zone, Health Tracker, Find Doctors, Emergency Contacts  
- Profile with consolidated health records (lab reports, prescriptions, reminders)  

## Key features delivered  
- Built end-to-end Symptom Checker (frontend + backend) using Azure OpenAI; structured medical JSON outputs  
- Lab report and prescription analysis with OCR (images/PDF), pdf-parse, and LLM summarization  
- Reminder service (backend API + UI) emailing through Azure Communication Services  
- Modern, responsive UI and navigation: Health Tools dropdown, Home feature showcase, protected routes  
- New modules with interactive UIs: Mental Health, Find Doctors (search/filter/book), Meditation, Health Tracker, Emergency Contacts  
- Profile page aggregating health data with clean, card-based design  

## Tech stack  
- **Frontend:** React 18, Vite, React Router, Tailwind-style utility classes, Firebase Auth (client), modular components  
- **Backend:** Node.js, Express, MongoDB/Mongoose, Multer (uploads), pdf-parse, Azure OpenAI (GPT-4o-mini), Azure Communication Services, Firebase Admin/JWT middleware  
- **AI/ML & OCR:** Azure OpenAI for chat/symptom analysis; Azure Computer Vision for OCR (via services)  
- **Auth & Security:** Firebase Auth integration, JWT, middleware guards (ProtectedRoute, auth middleware)  
- **Infra & DX:** Environment-based API endpoints, local dev via Vite/Node; Render/Azure-ready configs  

## Additional notes  
- Launched wellness modules (Mental Health, Meditation, Health Tracker, Find Doctors, Emergency Contacts) with modern, responsive UI and route-based navigation.  
- Integrated Firebase Auth and protected routes; standardized API access with environment-aware endpoints and robust error handling.  

**Keywords:** React, Vite, Tailwind, Node.js, Express, MongoDB, Azure OpenAI, Azure Communication Services, Firebase Auth, OCR, pdf-parse, Multer, REST APIs, Healthcare AI.


![Last Commit](https://img.shields.io/github/last-commit/swarupecenits/GeniMeds-AI-Powered-?color=blue&label=last%20commit)
![JavaScript](https://img.shields.io/badge/javascript-98.7%25-blue)
![Languages](https://img.shields.io/github/languages/count/swarupecenits/GeniMeds-AI-Powered-)

---

### Built with the tools and technologies:

![Express](https://img.shields.io/badge/-Express-black?style=flat&logo=express)
![JSON](https://img.shields.io/badge/-JSON-black?style=flat&logo=json)
![Markdown](https://img.shields.io/badge/-Markdown-black?style=flat&logo=markdown)
![npm](https://img.shields.io/badge/-npm-red?style=flat&logo=npm)
![Mongoose](https://img.shields.io/badge/-Mongoose-orange?style=flat&logo=mongoose)

![dotenv](https://img.shields.io/badge/-.ENV-yellow?style=flat)
![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?style=flat&logo=javascript)
![Nodemon](https://img.shields.io/badge/-Nodemon-brightgreen?style=flat&logo=nodemon)
![OpenAI](https://img.shields.io/badge/-OpenAI-purple?style=flat&logo=openai)
![Axios](https://img.shields.io/badge/-Axios-blueviolet?style=flat&logo=axios)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**GeniMeds-AI-Powered** is an innovative AI-driven platform designed to enhance medical data processing and decision-making in healthcare.  
Leveraging advanced machine learning models and generative AI, this project aims to assist healthcare professionals with tasks such as:

- Patient data analysis  
- Diagnostic support  
- Automated report generation  

The platform is built to be **scalable**, **secure**, and **easy to integrate** into existing medical workflows.

---

## Features

- 🔬 **Medical Data Analysis**: Process and analyze patient records using state-of-the-art AI models.  
- 🧐 **Generative AI Capabilities**: Generate medical reports or summaries from unstructured data using LLMs.  
- ☁️ **Scalable Deployment**: Deploy using Docker for cloud or on-premise setups.  
- 🔐 **Secure Data Handling**: Compliance with healthcare data standards (e.g., HIPAA).  
- 🔧 **Extensible Architecture**: Easily integrates with APIs/databases for real-time access.  

---

## Installation

### Prerequisites

- Node JS
- Vite
- Git  
- React

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/swarupecenits/GeniMeds-AI-Powered-.git
   cd GeniMeds-AI-Powered
   ```

2. **Install the dependencies (Using npm)**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root and add:
   ```env
   AZURE_OPENAI_API_KEY=your_api_key
   AZURE_OPENAI_ENDPOINT=your_endpoint
   DATABASE_URL=your_database_url
   ```

4. **Run the application**
   ```bash
   npm start
   ```

---

## Usage

### Run the Application Locally
```bash
npm run dev
```
Access at: [http://localhost:5173](http://localhost:5173)

### Example API Endpoints

- **Analyze Patient Data**
  ```bash
  curl -X POST "http://localhost:8000/analyze" \
    -H "Content-Type: application/json" \
    -d '{"patient_data": "Patient symptoms: fever, cough..."}'
  ```

- **Generate Report**
  ```bash
  curl -X POST "http://localhost:8000/report" \
    -H "Content-Type: application/json" \
    -d '{"data": "Lab results..."}'
  ```

---

## Project Structure

```
genimeds-ai/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── .env
│   ├── app.js
│   ├── server.js
│   └── package.json
└── Frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── firebase/
    │   └── pages/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Contributing

We welcome contributions to enhance **GeniMeds-AI-Powered**!

### To Contribute:

1. Fork the repository  
2. Create a feature branch  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes  
   ```bash
   git commit -m "Add YourFeature"
   ```
4. Push to your branch  
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request with a detailed description

✅ Please ensure your code passes tests and follows formatting.

---

## Contact

📬 **Maintainer**: [swarupecenits](https://github.com/swarupecenits)  
📧 **Email**: *swarupchanda1963@gmail.com*

---

> Built with ❤️ by the GeniMeds team to empower healthcare innovation.
