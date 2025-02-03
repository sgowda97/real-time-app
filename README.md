# Collaboration App

A collaborative document management system. This application allows users to create, share, and collaborate on documents in real-time.

## Features

- **Document Management**: Create, edit, and manage documents with ease.
- **User Authentication**: Secure login and registration system.
- **Share & Collaborate**: Share documents with team members and track changes in real-time.

## Tech Stack

- **Database**: PostgreSQL
- **Orchestration**: Docker
- **Programming Languages**: JavaScript
- **Frontend Framework**: React, Slate.js
- **Backend Framework**: Node.js, Fastify

## Installation

Follow these steps to install and run the project locally:

### Prerequisites

- Docker installed on your system.
- Node.js (LTS version, 16 in this project) installed.

### Steps

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd collaboration-app
   ```
2. Update the docker-compose.yaml file as required, refer to .env in ./client and ./server if you need to change anything else.
3. ```bash
   docker-compose up
   ```

The application will be available at ```http://localhost:3000```.

## License
MIT