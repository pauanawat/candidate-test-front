# Candidate Test Front

This project is hosted at [https://candidate-test-frontend.netlify.app/](https://candidate-test-frontend.netlify.app/)

## Getting Started with the App Locally

### Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/pauanawat/candidate-test-front.git

2. Navigate to the project directory:

   ```bash
   cd candidate-test-frontend
   
3. Install the project dependencies:

   ```bash
   npm install

4. Edit api url config :

   1. Go to src/const/config.ts.
   
   2. comment:
   ```bash
    //API_URL: 'https://candidate-test-backend-3aaa43f87169.herokuapp.com',
   ```
   3. uncomment:
   ```bash
    API_URL: 'http://localhost:3001'
   ```
   
### Running the App

- Running the App using npm command:

   ```bash
   npm start

- Running the App using docker:

   - Build docker image:
      ```bash
      docker build -t frontend .

   - Run docker container:
      ```bash
      docker run -p 3000:3000 --name frontend frontend

This project will be running in local at [http://localhost:3000](http://localhost:3000)
