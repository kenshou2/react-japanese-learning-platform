import { type Word, type Token, type Sentence } from "../types/DictionaryEntry";

function renderToken(token: Token, key: string | number) {
  return token.furigana ? (
    <ruby key={key}>
      {token.base}
      <rt>{token.furigana}</rt>
    </ruby>
  ) : (
    <span key={key}>{token.base}</span>
  );
}

export default function applyFurigana(value: Word | Sentence): React.ReactNode {
  if (!Array.isArray(value) || value.length === 0) return null;
    
  const isSentence = Array.isArray(value[0]);

  if (isSentence) {
    // value is Sentence (Word[])
    const sentence = value as Sentence;
    return sentence.map((word, wi) => (
      <span key={wi}>
        {word.map((token, ti) => renderToken(token, `${wi}-${ti}`))}
      </span>
    ));
  } else {
    // value is Word (Token[])
    const word = value as Word;
    return word.map((token, ti) => renderToken(token, ti));
  }
}