export interface Quiz {
  question: string;
  codeSnippet: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  orderIndex: number;
}
