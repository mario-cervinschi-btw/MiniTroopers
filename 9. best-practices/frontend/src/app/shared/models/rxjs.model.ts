export interface RxjsTopic {
  title: string;
  description: string;
  keyPoints: string[];
  example: string;
  analogy: string;
  tag: string;
  orderIndex: number; //comment
}

export interface RxjsQuiz {
  question: string;
  codeSnippet: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  orderIndex: number;
}
