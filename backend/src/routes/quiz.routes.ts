
import { Router } from 'express';
import { createQuiz, getQuizzes, getQuizById, deleteQuiz } from '../controllers/quiz.controller';

const router = Router();

router.post('/', createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.delete('/:id', deleteQuiz);

export default router;