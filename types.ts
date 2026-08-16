
export interface LinkProps {
  label: string;
  href: string;
}

export interface SectionProps {
  title: string;
  items: LinkProps[];
}

/**
 * Represents a chat message in the existential terminal.
 */
export interface Message {
  role: 'user' | 'model';
  text: string;
}
