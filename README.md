# 🚀 ResuMatch — AI-Powered Resume Ecosystem

![ResuMatch Banner](./assets/banner.png)

## 🌟 Overview

**ResuMatch** is a state-of-the-art, full-stack MERN application designed to empower job seekers with AI-driven insights. It provides deep resume analysis, ATS (Applicant Tracking System) optimization, and instant professional template generation—all protected by military-grade security and multi-factor authentication.

---

## ✨ Key Features

### 📄 Intelligent Resume Parsing
*   **Multi-Format Support**: Seamlessly process **PDF** and **DOCX** files.
*   **AI Extraction**: Utilizes advanced regex and structured parsing to extract name, contact info, skills, experience, and education from raw text.
*   **Dynamic Mapping**: Converts unstructured resumes into clean, actionable JSON data.

### 📊 Precision ATS Scoring
*   **Multi-Dimensional Analysis**: Evaluates resumes across 8 critical dimensions.
*   **Real-time Insights**: Get an instant **0–100 ATS Score** with a grade (Excellent, Good, Average, etc.).
*   **Actionable Feedback**: Receive specific "Positives" and "Areas for Improvement" to help beat the bots.

### 🔐 Ironclad Security
*   **JWT & MFA**: Secure authentication with JSON Web Tokens and Time-based One-Time Passwords (TOTP) via Google Authenticator.
*   **Data Encryption**: All Personally Identifiable Information (PII) is encrypted using **AES-256-CBC**.
*   **Safe Storage**: Industry-standard **bcrypt** password hashing with 12 salt rounds.
*   **Advanced Middleware**: Integrated protection against NoSQL injection, brute force attacks, and XSS.

### 🎨 Instant Resume Generation
*   **Professional Templates**: Choose from 6 distinct, modern designs.
*   **Auto-Population**: Your parsed resume data or user profile automatically fills the templates perfectly.
*   **One-Click PDF**: Download polished resumes ready for application.

---

## 🛠️ Tech Stack

<div align="center">

| Component | technologies |
| :--- | :--- |
| **Frontend** | React 18, Ant Design, Bootstrap 5, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Security** | JWT, Speakeasy (MFA), Crypto.js, Helmet |
| **Parsing** | pdf-parse, Mammoth, Custom Resume Parser |
| **DevOps** | Docker, Docker Compose, Winston Logging |

</div>

---

## 🚦 Getting Started

### Prerequisites

*   Node.js (v18+)
*   MongoDB (Local or Atlas)
*   npm or yarn

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Nidhigupta2203/ResuMatch.git
    cd ResuMatch
    ```

2.  **Install Dependencies**
    ```bash
    # Root & Backend
    npm install

    # Frontend
    npm run client-install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    SECRET_KEY=your_jwt_secret
    ENCRYPTION_KEY=your_32_char_aes_key
    BCRYPT_SALT_ROUNDS=12
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

## 🐳 Docker Deployment

Run the entire ecosystem with a single command:

```bash
docker-compose up --build
```

---

## 🛡️ Security Compliance (OWASP Alignment)

| Vulnerability | Mitigation Strategy |
| :--- | :--- |
| **Broken Access Control** | JWT-based route protection & user-scoped data access. |
| **Cryptographic Failures** | AES-256-CBC for PII; bcrypt for secure secrets. |
| **Injection** | express-mongo-sanitize & input normalization. |
| **Auth Failures** | Multi-Factor Authentication (TOTP) & brute-force rate limiting. |

---

## 👤 Author

**Nidhi Gupta**
*   Full Stack Developer | Security Enthusiast | MERN Specialist
*   [GitHub](https://github.com/Nidhigupta2203) | [LinkedIn](https://www.linkedin.com/in/nidhi-gupta-2203/)

---

<p align="center">Made with ❤️ for the Job Hunting community.</p>
