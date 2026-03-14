export interface ToolInput {
  key: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'textarea' | 'date' | 'time' | 'checkbox';
  placeholder?: string;
  default?: string;
  unit?: string;
  hint?: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  short_description: string;
  long_description?: string;
  how_it_works?: string;
  example?: string;
  keywords?: string[];
  inputs: ToolInput[];
  engine: string;
  faq?: ToolFAQ[];
  related_tools?: string[];
  seo_title?: string;
  seo_description?: string;
  popular?: boolean;
  disclaimer?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon?: string;
}
