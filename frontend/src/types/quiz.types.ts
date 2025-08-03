
export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  answers: Answer[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
}


export interface QuizCreateData {
    title: string;
    questions: {
        text: string;
        type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
        answers: {
            text: string;
            isCorrect: boolean;
        }[];
    }[];
}