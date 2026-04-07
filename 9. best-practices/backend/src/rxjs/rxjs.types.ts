export interface RxjsTopic {
  title: string;
  description: string;
  keyPoints: string[];
  example: string;
  analogy: string;
  tag: string;
  orderIndex: number;
}

export interface RxjsQuiz {
  question: string;
  codeSnippet: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  orderIndex: number;
}

export interface FlowchartNode {
  id: string;
  question: string;
  yesLabel: string;
  noLabel: string;
  yesNext: string | null;
  noNext: string | null;
  result: string | null;
}
