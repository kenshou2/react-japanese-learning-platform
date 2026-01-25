export type Token = {
  base: string;
  furigana?: string;
};
export type Word = Token[];
export type Sentence = Word[];

export interface DictionaryEntry {
    id: number;
    word: Word;
    name: string; // for search function
    translations: string[];
    kana: string;    
    partOfSpeech: string;
    examples: {
        example: Sentence;
        translation: string;
    }[];
    audio?: string;
}