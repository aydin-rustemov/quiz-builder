Quiz Builder - Full-Stack JS Assessment
This is a full-stack web application built as part of a technical assessment. It allows users to create, view, and manage custom quizzes. The application features a Node.js (Express.js/Nest.js) backend and a React (Next.js) frontend.

✨ Features
Create Quizzes: Build custom quizzes with a title and multiple questions.

Dynamic Question Forms: Easily add or remove questions on the fly during quiz creation.

Multiple Question Types: Supports various question formats:

Boolean: True/False options.

Input: A short text-based answer.

Checkbox: Multiple choice with one or more correct answers.

Quiz Dashboard: View a list of all created quizzes, showing their titles and the number of questions.

Detailed Quiz View: Inspect the full structure and questions of any individual quiz in a read-only format.

Delete Quizzes: Remove quizzes directly from the dashboard.

🛠️ Tech Stack
Backend
Runtime: Node.js

Framework: Express.js / Nest.js (Hansını istifadə etmisinizsə qeyd edin)

Language: TypeScript

ORM: Prisma

Database: Supabase (PostgreSQL)

Frontend
Framework: Next.js

Library: React.js

Language: TypeScript

Styling: Tailwind CSS / CSS Modules (Hansını istifadə etmisinizsə qeyd edin)

Code Quality: ESLint & Prettier

"Getting Started" bölməsini bununla əvəz edin:
🚀 Getting Started
Follow these instructions to set up and run the project locally.

Prerequisites
Node.js (v18 or later)

npm or yarn

1. Clone the Repository
Bash

git clone <your-github-repository-url>
cd quiz-builder
2. Backend Setup
This project uses Supabase for the PostgreSQL database.

Bash

# Go to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file from the example
cp .env.example .env
Now, open the .env file and add your Supabase connection strings. You can find these in your Supabase project dashboard under Project Settings > Database.

.env

Kod snippet'i

# Port for the backend server
PORT=5000

# Connection string for the application (used for connection pooling)
DATABASE_URL="postgresql://postgres.[YOUR-SUPABASE-ID]:[YOUR-PASSWORD]@[YOUR-SUPABASE-HOST]:6543/postgres?pgbouncer=true"

# Direct connection string (often used for migrations)
DIRECT_URL="postgresql://postgres.[YOUR-SUPABASE-ID]:[YOUR-PASSWORD]@[YOUR-SUPABASE-HOST]:5432/postgres"
Important: Make sure your prisma/schema.prisma file is configured to use the DATABASE_URL from the environment variables.

Now, apply the database migrations using your direct connection URL:

Bash

# Apply database migrations
npx prisma migrate dev

# (Optional) Seed the database with sample data
npx prisma db seed
3. Frontend Setup
Navigate to the frontend directory in a new terminal window:

Bash

# Go to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env.local file from the example
cp .env.local.example .env.local
The .env.local file should point to your local backend API URL.

.env.local

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
4. Running the Application
Start the Backend Server (in the /backend directory):

Bash

npm run dev
The backend should now be running on http://localhost:5000.

Start the Frontend Server (in the /frontend directory):

Bash

npm run dev
The frontend development server will start.

Open your browser and navigate to http://localhost:3000 to use the application.

📋 API Endpoints
The backend server provides the following REST API endpoints:

Method	Endpoint	Description
POST	/quizzes	Creates a new quiz.
GET	/quizzes	Returns a list of all quizzes with their titles.
GET	/quizzes/:id	Returns the full details of a single quiz.
DELETE	/quizzes/:id	Deletes a specific quiz from the database.