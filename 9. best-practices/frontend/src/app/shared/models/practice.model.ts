export interface PracticeCategorySummary {
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  itemCount: number;
}

export interface PracticeItem {
  title: string;
  summary: string;
  details: string;
  whyItMatters: string;
  goodExample: string;
  badExample: string;
  tags: string[];
  orderIndex: number;
}

export interface PracticeCategoryDetails extends PracticeCategorySummary {
  items: PracticeItem[];
}
