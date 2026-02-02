export type ToolCategory = 'pdf' | 'image' | 'text' | 'converter' | 'generator' | 'code' | 'social';

// Configuration structure for each tool including metadata and i18n support
export interface ToolConfig {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  componentKey: string;
  icon: string;
  // Internationalization content for different languages
  locales?: Record<string, {
    title: string;
    description: string;
    content: {
      overview: string;
      howTo: string[];
      features: string[];
      faq: {
        question: string;
        answer: string;
      }[];
    };
  }>;
  // Related tools to suggest next
  nextSteps?: { slug: string; label: string }[];
  // Legacy support until full migration
  content?: {
    overview: string;
    howTo: string[];
    features: string[];
    faq: {
      question: string;
      answer: string;
    }[];
  };
}