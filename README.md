Secure Microservices with Authentication and Authorization

**Project Overview
This project consists of three main components:**
C# Authentication Service: Handles user management and token-based authentication.
Python Business Service: Provides protected endpoints secured by the C# service.
React Frontend: A simple web UI to interact with the backend services.

**Table of Contents**
Prerequisites
Project Structure
Setup and Installation
Running the Services
Testing the Services
Deploying with Helm
Environment Variables
Endpoints
Troubleshooting

**Prerequisites**
.NET SDK
Python 3.8+
Node.js and npm
Docker
Kubernetes and kubectl
Helm

**Project Structure**
.
├── auth-service
│   ├── Controllers
│   ├── Models
│   ├── DatabaseContext
│   ├── Program.cs
│   ├── appsettings.json
│   └── ...
├── business-service
│   ├── businessservice.py
│   ├── requirements.txt
│   └── ...
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
├── helm
│   ├── auth-service
│   │   ├── Chart.yaml
│   │   ├── values.yaml
│   │   └── templates
│   ├── business-service
│   │   ├── Chart.yaml
│   │   ├── values.yaml
│   │   └── templates
│   ├── frontend
│   │   ├── Chart.yaml
│   │   ├── values.yaml
│   │   └── templates
└── docker-compose.yml

**Setup and Installation**
1. C# Authentication Service
Navigate to the auth-service directory:
cd auth-service

Restore dependencies:
dotnet restore

Update the database:
dotnet ef database update

Run the service:
dotnet run

2. Python Business Service
Navigate to the business-service directory:
cd business-service

Create a virtual environment and activate it:
python -m venv venv

source venv/bin/activate
Install dependencies:
pip install -r requirements.txt

Run the service:
uvicorn main:app --reload

3. React Frontend
Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Run the frontend:
npm start

Running the Services
Using Docker Compose
Build Docker images:

docker-compose build
Run the services:
docker-compose up

Testing the Services
C# Authentication Service
Run unit tests:
dotnet test
Python Business Service
Run tests:
pytest
React Frontend
Run tests:
npm test
Deploying with Helm
Package the Helm charts:

helm package helm/auth-service
helm package helm/business-service
helm package helm/frontend
Deploy the Helm charts:

helm install auth-service ./auth-service-0.1.0.tgz
helm install business-service ./business-service-0.1.0.tgz
helm install frontend ./frontend-0.1.0.tgz

**Environment Variables**
C# Authentication Service
ConnectionStrings__DefaultConnection: Database connection string.
Jwt__Key: JWT secret key.
Jwt__Issuer: JWT issuer.

**Python Business Service**
SECRET_KEY: JWT secret key.

**Endpoints**
**C# Authentication Service**
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Authenticate a user and issue a JWT token.
GET /api/auth/admin: Protected endpoint accessible only to Admin users.

**Python Business Service**
GET /public-data: Open to all.
GET /protected-data: Requires a valid JWT.
GET /admin-data: Restricted to Admin users.

**React Frontend**
/login-signup: Login/Sign Up Page.
/protected-page: Login required to access this page.
/admin-page: Login required and restricted to Admin users.

**Troubleshooting**
Invalid Token Error: Ensure the JWT secret key and algorithm are the same in both the C# and Python services.
Network Errors: Verify that the services are running and accessible at the correct URLs.
SSL Errors: For development, you can disable SSL verification in Axios.
