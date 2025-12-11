export type ToolCategory = 'pdf' | 'image' | 'text' | 'converter' | 'generator';

export interface ToolConfig {
  slug: string;           // URL dagi nom (masalan: jpg-to-png)
  title: string;          // H1 sarlavha
  description: string;    // Meta description
  category: ToolCategory;
  componentKey: string;   // Qaysi komponentni yuklash kerakligi
  icon: string;
}
