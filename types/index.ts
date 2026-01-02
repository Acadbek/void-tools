export type ToolCategory = 'pdf' | 'image' | 'text' | 'converter' | 'generator' | 'code' | 'social';

export interface ToolConfig {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  componentKey: string;
  icon: string;
  content: {
    overview: string;
    howTo: string[];
    features: string[];
    faq: {
      question: string;
      answer: string;
    }[];
  };
}