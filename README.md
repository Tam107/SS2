# HANU Automated Essay Scoring System [CLICK HERE TO WATCH VIDEO DEMO](https://www.youtube.com/watch?v=J5JIV6D6vKk&ab_channel=Vi%E1%BA%BFtV%C4%A9nhH%E1%BB%93)
[![Watch the video](https://img.youtube.com/vi/J5JIV6D6vKk/maxresdefault.jpg)](https://www.youtube.com/watch?v=J5JIV6D6vKk)
## Overview
The HANU Automated Essay Scoring (AES) System is a web-based application designed to assist Hanoi University (HANU) students in improving their IELTS Writing Task 2 proficiency. By leveraging advanced artificial intelligence, specifically OpenAI's GPT-4.1 large language model, the system provides automated essay scoring and detailed feedback. The system integrates a user-friendly interface built with ReactJS, secure authentication via OAuth2, and scalable data management using MongoDB. It supports both students and educators by combining AI-driven evaluations with optional teacher feedback, ensuring comprehensive and accurate assessments.

## Features
- **Automated Essay Scoring**: Utilizes OpenAI's GPT-4.1 to evaluate essays based on IELTS Writing Task 2 criteria, including task response, lexical resource, grammatical range and accuracy, and coherence and cohesion.
- **Real-Time Feedback**: Provides immediate, detailed feedback on grammar, structure, coherence, and vocabulary, enabling students to revise and improve their writing autonomously.
- **Teacher Integration**: Allows educators to provide manual feedback, which is combined with AI-generated scores for a hybrid evaluation approach. The system uses reinforcement learning from human feedback (RLHF) to refine AI scoring.
- **Secure Authentication**: Implements OAuth2 for secure login via Google accounts or email verification, ensuring user data protection.
- **User-Friendly Interface**: Built with ReactJS and styled using TailwindCSS, offering a responsive and intuitive experience across devices.
- **Essay History**: Enables students to track past submissions, review feedback, and monitor progress over time.
- **Admin Dashboard**: Facilitates management of user accounts and teacher registrations, ensuring system integrity.
- **AI Assistant**: Includes a chat feature for real-time support in English and Vietnamese.

## Technology Stack
- **Frontend**: ReactJS, TailwindCSS
- **Backend**: NodeJS
- **Database**: MongoDB (NoSQL)
- **AI Model**: OpenAI GPT-4.1 (via OpenAI API)
- **Authentication**: OAuth2 (Google Cloud API)
- **API Integration**: RESTful APIs for seamless front-end and back-end communication

## System Architecture
The HANU AES system follows a modular architecture to ensure efficiency and scalability:
1. **User Interface**: Built with ReactJS, allowing users to submit essays, view feedback, and access submission history.
2. **Authentication**: OAuth2 handles secure login, supporting Google account integration and email verification.
3. **Essay Processing**: Essays are submitted to the backend, where the OpenAI API evaluates content based on IELTS criteria. If teacher feedback is available, it is integrated to enhance AI scoring via RLHF.
4. **Data Management**: MongoDB stores user profiles, essay submissions, and feedback, supporting scalable handling of unstructured text data.
5. **Admin Management**: An admin dashboard enables oversight of user accounts and teacher onboarding.

## Installation and Setup
### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- OpenAI API key
- Google Cloud API credentials for OAuth2
- Git

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/hanu-aes-system.git
   cd hanu-aes-system
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   MONGODB_URI=your_mongodb_connection_string
   ```
4. **Run the Application**:
   ```bash
   npm start
   ```
5. **Access the Application**:
   Open `http://localhost:3000` in your browser.

## Usage
1. **Login**: Sign in using a Google account or register with an email and verify via the confirmation link.
2. **Essay Submission**: Navigate to the homepage, choose or generate an essay topic, write your essay, and submit it for evaluation.
3. **Feedback**: Receive AI-generated scores and detailed comments based on IELTS criteria. Optionally, request teacher feedback for a hybrid evaluation.
4. **History**: Review past submissions and feedback to track progress.
5. **Admin Tasks**: Admins can approve teacher registrations and manage user accounts via the dashboard.

## Future Enhancements
- **Model Benchmarking**: Compare GPT-4.1 with other large language models (e.g., Grok, Claude, Gemini) to optimize performance.
- **Multilingual Support**: Add support for non-English essay submissions.
- **Plagiarism Detection**: Integrate tools to ensure originality of submissions.
- **Comparative Testing**: Conduct extensive testing to evaluate score correlation with human raters and feedback relevance.

## Contributors
- **Nguyễn Thành Tâm** – Class 2C22C
- **Đặng Quỳnh Trang** – Class 2C22C
- **Hồ Viết Vĩnh** –  Class 2C22C


## Acknowledgments
This project was developed as part of a research initiative at Hanoi University to enhance IELTS Writing Task 2 preparation through AI-driven solutions. We thank our supervisor and the university for their support.
