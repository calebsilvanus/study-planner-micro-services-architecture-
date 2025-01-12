# Study Planner - Microservice Architecture

Welcome to **Study Planner**, a feature-rich microservice-based application designed to help students effectively organize and manage their academic schedules.

---

## Features
- **User Authentication**: Secure login using Auth0, restricted to university emails ending with `@final.edu.tr`.
- **Schedule Management**: Plan and organize daily, weekly, or semester-long study activities.
- **Task Notifications**: Get reminders for upcoming deadlines and tasks.
- **Cross-Platform Access**: Seamless user experience on web and mobile platforms.
- **Scalable Architecture**: Built with microservices for performance and reliability.

---

## Tech Stack

### Backend
- **Language**: Python
- **Framework**: FastAPI
- **Containerization**: Docker

### Frontend
- **Library**: React
- **Runtime**: Node.js

### Database
- **Firestore**: Used for real-time, scalable, and flexible data storage.

### Authentication
- **Auth0**: Secure authentication system configured to accept only university emails ending with `@final.edu.tr`.

---

## Architecture Overview
This application follows a microservice architecture to ensure modularity and scalability. The core services include:

1. **Authentication Service**:
   - Manages user registration and login via Auth0.
   - Enforces email domain restrictions for `@final.edu.tr`.

2. **Schedule Management Service**:
   - Backend APIs for CRUD operations on study plans and tasks.
   - Powered by FastAPI.

3. **Frontend Service**:
   - User-friendly interface built with React.
   - Communicates with backend services via REST APIs.

4. **Database Service**:
   - Firestore integration for storing and retrieving user data.

---

## Installation and Setup

### Prerequisites
Ensure the following are installed on your system:
- Python 3.9+
- Node.js 18+
- Docker

### Clone the Repository
```bash
git clone https://github.com/your-username/study-planner.git
cd study-planner
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Setup
1. Build the Docker containers:
   ```bash
   docker-compose build
   ```
2. Start the application:
   ```bash
   docker-compose up
   ```

---

## Environment Variables
Create a `.env` file in the root directory with the following variables:

### Backend:
```
FIRESTORE_PROJECT_ID=your-firestore-project-id
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
EMAIL_DOMAIN=@final.edu.tr
```

### Frontend:
```
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_API_BASE_URL=http://localhost:8000
```

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact
For questions or support, please reach out to the project maintainer at **[abiodunadesesan@gmail.com]**.

