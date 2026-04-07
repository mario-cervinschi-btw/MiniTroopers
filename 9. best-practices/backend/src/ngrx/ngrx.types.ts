export interface NgrxTopic {
  title: string;
  description: string;
  keyPoints: string[];
  example: string;
  analogy: string;
  tag: string;
  orderIndex: number;
}

export interface NgrxQuiz {
  question: string;
  codeSnippet: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  orderIndex: number;
}

export interface NgrxFlowStep {
  step: number;
  name: string;
  role: string;
  description: string;
  example: string;
  tip: string;
}
