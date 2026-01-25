export interface HeadingBlock {
  type: 'heading';
  id: string;
  text: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface ListBlock {
  type: 'list';
  items: string[];  
}

export interface ImageBlock {
  type: 'image';
  url: string;
  alt?: string;  
}

export interface VideoBlock {
  type: 'video';
  url: string;  
}

export interface NoteBlock {
  type: 'note';
  text: string;
}

export interface ImportantBlock {
  type: 'important';
  text: string;
}

export interface ReferenceBlock {
  type: 'reference';
  items: { name: string, url: string }[];  
}

export type ArticleContent =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | ImageBlock
  | VideoBlock
  | NoteBlock
  | ImportantBlock
  | ReferenceBlock;

export type ArticleTag = 'JLPT' | 'Grammar' | 'Vocabulary' | 'Culture';

export type Section = {
    id: string;
    text: string;
}

export interface Article {
    id: number;
    name: string;
    overview?: string;
    timeToRead: number;
    tags: ArticleTag[];    
    content: ArticleContent[];
    posterUrl: string;
}