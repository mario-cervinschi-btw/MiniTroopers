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

export interface PracticeCategory {
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  items: PracticeItem[];
}

export interface PracticeCategorySummary {
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  itemCount: number;
}

export interface PracticeCategoryWithItems extends PracticeCategorySummary {
  items: PracticeItem[];
}
