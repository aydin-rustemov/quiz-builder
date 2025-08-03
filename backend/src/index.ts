// src/index.ts

import express from 'express';
import quizRoutes from './routes/quiz.routes';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors())

app.use('/quizzes', quizRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Quiz Builder API!');
});
 
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});