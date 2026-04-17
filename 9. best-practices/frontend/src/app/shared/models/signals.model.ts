export interface SignalsTopic {
  title: string;
  description: string;
  keyPoints: string[];
  example: string;
  analogy: string;
  tag: string;
  orderIndex: number;
}

export interface SignalsQuiz {
  question: string;
  codeSnippet: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  orderIndex: number;
}
