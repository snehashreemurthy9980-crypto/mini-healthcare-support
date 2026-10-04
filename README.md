# HealthConnect – Mini Healthcare Support Web App

## Overview

HealthConnect is a concept-level healthcare support web application created for an NGO use case. It provides a simple digital entry point where patients can request support and volunteers can register to help.

The project focuses on clarity, responsive design, form validation, lightweight automation, and an FAQ assistant.

## Features

- Patient support registration
- Volunteer registration
- Responsive healthcare-themed UI
- Client-side form validation
- Automatic request confirmation
- Automatic request summary with request ID
- Latest request stored in browser LocalStorage
- Healthcare FAQ Assistant
- Suggested FAQ questions
- Mobile-friendly design

## AI / Automation Idea

The application contains a lightweight FAQ Assistant. It checks the user's question for relevant keywords and returns an appropriate predefined answer.

Example:

User: "How can I register?"

Assistant: "You can register by filling in the support form..."

For a production version, this component could be upgraded to a real AI assistant using the Gemini/OpenAI API and an NGO-specific knowledge base.

The form also provides automation by generating a request ID, confirmation message, timestamp, and structured request summary after submission.

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Browser LocalStorage
- Netlify / Vercel for deployment

No backend or paid API is required for the concept-level prototype.

## NGO Use Case

An NGO can use this type of application as a first-contact platform for:

1. Collecting patient support requests.
2. Registering volunteers.
3. Answering frequently asked questions automatically.
4. Giving users an immediate confirmation after submitting a request.

A production system could connect the form to a secure backend/database and notify NGO staff by email.

## Project Structure

```text
healthconnect/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run Locally

1. Download or clone the repository.
2. Open the project folder.
3. Double-click `index.html`, or use VS Code Live Server.
4. Test the registration form and FAQ Assistant.

## Deployment

The project is a static website and can be deployed directly on Netlify or Vercel.

### Netlify

1. Create/login to a Netlify account.
2. Choose Add new project / Deploy manually.
3. Upload the project folder.
4. Open the generated live URL.

## Future Improvements

- Secure backend database
- Firebase authentication
- NGO admin dashboard
- Real-time request tracking
- Email/SMS notifications
- Real AI chatbot with Gemini/OpenAI
- Verified emergency contacts
- Volunteer-to-request matching
- Role-based access control

## Disclaimer

This prototype is for educational and concept demonstration purposes. It does not provide medical diagnosis or emergency medical services.
