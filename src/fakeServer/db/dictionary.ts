import type { DictionaryEntry } from "../../types/DictionaryEntry";

const AUDIO_BASE_URL = '/storage/dictionary/audio';
let dictionaryEntryId = 0;

let dictionary: DictionaryEntry[] = populateDictionary();

export const dictionaryDb = {
    getAll: () => {
        return [...dictionary];
    },
    getById: (id: number) => {
        const dictionaryEntry = dictionary.find(d => d.id === id);
        if (!dictionaryEntry) throw new Error(`Dictionary entry with ${id} not found.`);
        return dictionaryEntry;
    },
    create: (dictionaryEntry: Omit<DictionaryEntry, 'id'>) => {
        const newDictionaryEntry = {
            id: dictionaryEntryId++,
            ...dictionaryEntry
        };
        dictionary.push(newDictionaryEntry);
        return newDictionaryEntry;
    },
    update: (id: number, updates: Partial<DictionaryEntry>) => {
        const toUpdateIndex = dictionary.findIndex(d => d.id === id);
        if (toUpdateIndex === -1) throw new Error(`Dictionary entry with ${id} not found.`);
        dictionary[toUpdateIndex] = {...dictionary[toUpdateIndex], ...updates}
        return dictionary[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = dictionary.length;
        dictionary = dictionary.filter(d => d.id !== id);
        if (lengthBefore !== dictionary.length)
            return true;
        else throw new Error(`Dictionary entry with ${id} not found.`);        
    }
}

function populateDictionary(): DictionaryEntry[] {return [
  {
      id: dictionaryEntryId,
      word: [
          { base: "客", furigana: "きゃく" },
      ],
      name: "客",
      translations: ["Guest", "Customer", "Visitor"],
      kana: "きゃく",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "今日は" }],
                  [{ base: "多くの" }],
                  [{ base: "客", furigana: "きゃく" }],
                  [{ base: "が" }],
                  [{ base: "来", furigana: "き" }],
                  [{ base: "ました" }],
              ],
              translation: "Many guests came today."
          },
          {
              example: [
                  [{ base: "この" }],
                  [{ base: "レストラン" }],
                  [{ base: "は" }],
                  [{ base: "客", furigana: "きゃく" }],
                  [{ base: "が" }],
                  [{ base: "多い" }],
              ],
              translation: "This restaurant has many customers."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "加工", furigana: "かこう" },
      ],
      name: "加工",
      translations: ["Processing", "Manufacturing"],
      kana: "かこう",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "この" }],
                  [{ base: "野菜", furigana: "やさい" }],
                  [{ base: "は" }],
                  [{ base: "加工", furigana: "かこう" }],
                  [{ base: "されている" }],
              ],
              translation: "These vegetables have been processed."
          },
          {
              example: [
                  [{ base: "工場", furigana: "こうじょう" }],
                  [{ base: "で" }],
                  [{ base: "加工", furigana: "かこう" }],
                  [{ base: "を" }],
                  [{ base: "行", furigana: "おこな" }],
                  [{ base: "います" }],
              ],
              translation: "Processing is carried out at the factory."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "すやすや" },
      ],
      name: "すやすや",
      translations: ["Sleeping soundly", "Peacefully asleep"],
      kana: "すやすや",
      partOfSpeech: "adverb",
      examples: [
          {
              example: [
                  [{ base: "赤ちゃん", furigana: "あかちゃん" }],
                  [{ base: "が" }],
                  [{ base: "すやすや" }],
                  [{ base: "寝", furigana: "ね" }],
                  [{ base: "ている" }],
              ],
              translation: "The baby is sleeping peacefully."
          },
          {
              example: [
                  [{ base: "猫", furigana: "ねこ" }],
                  [{ base: "は" }],
                  [{ base: "ソファ" }],
                  [{ base: "で" }],
                  [{ base: "すやすや" }],
                  [{ base: "眠", furigana: "ねむ" }],
                  [{ base: "っている" }],
              ],
              translation: "The cat is sleeping soundly on the sofa."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "常に", furigana: "つねに" },
      ],
      name: "常に",
      translations: ["Always", "Constantly", "At all times"],
      kana: "つねに",
      partOfSpeech: "adverb",
      examples: [
          {
              example: [
                  [{ base: "彼", furigana: "かれ" }],
                  [{ base: "は" }],
                  [{ base: "常に", furigana: "つねに" }],
                  [{ base: "笑顔", furigana: "えがお" }],
                  [{ base: "だ" }],
              ],
              translation: "He is always smiling."
          },
          {
              example: [
                  [{ base: "安全", furigana: "あんぜん" }],
                  [{ base: "のため" }],
                  [{ base: "に" }],
                  [{ base: "常に", furigana: "つねに" }],
                  [{ base: "注意", furigana: "ちゅうい" }],
                  [{ base: "する" }],
              ],
              translation: "Always be careful for safety."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "組合", furigana: "くみあい" },
      ],
      name: "組合",
      translations: ["Union", "Association", "Guild"],
      kana: "くみあい",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "労働者", furigana: "ろうどうしゃ" }],
                  [{ base: "は" }],
                  [{ base: "組合", furigana: "くみあい" }],
                  [{ base: "に" }],
                  [{ base: "加入", furigana: "かにゅう" }],
                  [{ base: "した" }],
              ],
              translation: "The workers joined the union."
          },
          {
              example: [
                  [{ base: "農業", furigana: "のうぎょう" }],
                  [{ base: "組合", furigana: "くみあい" }],
                  [{ base: "が" }],
                  [{ base: "地域", furigana: "ちいき" }],
                  [{ base: "を" }],
                  [{ base: "支援", furigana: "しえん" }],
                  [{ base: "している" }],
              ],
              translation: "The agricultural association supports the local community."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "ペース" },
      ],
      name: "ペース",
      translations: ["Pace", "Speed", "Tempo"],
      kana: "ぺーす",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "自分", furigana: "じぶん" }],
                  [{ base: "の" }],
                  [{ base: "ペース" }],
                  [{ base: "で" }],
                  [{ base: "勉強", furigana: "べんきょう" }],
                  [{ base: "する" }],
              ],
              translation: "Study at your own pace."
          },
          {
              example: [
                  [{ base: "マラソン", furigana: "" }],
                  [{ base: "では" }],
                  [{ base: "ペース" }],
                  [{ base: "配分", furigana: "はいぶん" }],
                  [{ base: "が" }],
                  [{ base: "大事", furigana: "だいじ" }],
              ],
              translation: "Pace distribution is important in a marathon."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "始まる", furigana: "はじまる" },
      ],
      name: "始まる",
      translations: ["To begin", "To start"],
      kana: "はじまる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "映画", furigana: "えいが" }],
                  [{ base: "が" }],
                  [{ base: "始まる", furigana: "はじまる" }],
                  [{ base: "まで" }],
                  [{ base: "あと" }],
                  [{ base: "五分", furigana: "ごふん" }],
                  [{ base: "です" }],
              ],
              translation: "The movie will start in five minutes."
          },
          {
              example: [
                  [{ base: "授業", furigana: "じゅぎょう" }],
                  [{ base: "は" }],
                  [{ base: "九時", furigana: "くじ" }],
                  [{ base: "に" }],
                  [{ base: "始まる", furigana: "はじまる" }],
              ],
              translation: "The class begins at 9 o’clock."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "郊外", furigana: "こうがい" },
      ],
      name: "郊外",
      translations: ["Suburbs", "Outskirts"],
      kana: "こうがい",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "私", furigana: "わたし" }],
                  [{ base: "は" }],
                  [{ base: "郊外", furigana: "こうがい" }],
                  [{ base: "に" }],
                  [{ base: "住んでいる", furigana: "すん" }],
              ],
              translation: "I live in the suburbs."
          },
          {
              example: [
                  [{ base: "郊外", furigana: "こうがい" }],
                  [{ base: "には" }],
                  [{ base: "自然", furigana: "しぜん" }],
                  [{ base: "が" }],
                  [{ base: "多い", furigana: "おお" }],
              ],
              translation: "There is a lot of nature in the suburbs."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "夏休み", furigana: "なつやすみ" },
      ],
      name: "夏休み",
      translations: ["Summer vacation", "Summer holiday"],
      kana: "なつやすみ",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "私は" }],
                  [{ base: "夏休み", furigana: "なつやすみ" }],
                  [{ base: "に" }],
                  [{ base: "旅行", furigana: "りょこう" }],
                  [{ base: "に行く", furigana: "い" }],
              ],
              translation: "I will go on a trip during summer vacation."
          },
          {
              example: [
                  [{ base: "夏休み", furigana: "なつやすみ" }],
                  [{ base: "の" }],
                  [{ base: "計画", furigana: "けいかく" }],
                  [{ base: "を" }],
                  [{ base: "立てる", furigana: "た" }],
              ],
              translation: "I am making plans for summer vacation."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "膨れる", furigana: "ふくれる" },
      ],
      name: "膨れる",
      translations: ["To swell", "To puff up", "To sulk"],
      kana: "ふくれる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "風船", furigana: "ふうせん" }],
                  [{ base: "が" }],
                  [{ base: "膨れる", furigana: "ふくれる" }],
              ],
              translation: "The balloon is swelling."
          },
          {
              example: [
                  [{ base: "彼", furigana: "かれ" }],
                  [{ base: "は" }],
                  [{ base: "怒っ", furigana: "おこ" }],
                  [{ base: "て" }],
                  [{ base: "膨れる", furigana: "ふくれる" }],
              ],
              translation: "He is sulking angrily."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
    id: dictionaryEntryId,
    word: [
        { base: "勘違い", furigana: "かんちがい" },
    ],
    name: "勘違い",
    translations: ["Misunderstanding", "Mistaken assumption"],
    kana: "かんちがい",
    partOfSpeech: "noun",
    examples: [
        {
            example: [
                [{ base: "彼", furigana: "かれ" }],
                [{ base: "の" }],
                [{ base: "言葉", furigana: "ことば" }],
                [{ base: "を" }],
                [{ base: "勘違い", furigana: "かんちがい" }],
                [{ base: "してしまった" }],
            ],
            translation: "I misunderstood what he said."
        },
        {
            example: [
                [{ base: "それ", furigana: "" }],
                [{ base: "は" }],
                [{ base: "完全", furigana: "かんぜん" }],
                [{ base: "な" }],
                [{ base: "勘違い", furigana: "かんちがい" }],
                [{ base: "です" }],
            ],
            translation: "That is a complete misunderstanding."
        }
    ],
    audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "第一", furigana: "だいいち" },
      ],
      name: "第一",
      translations: ["First", "Primary", "Most important"],
      kana: "だいいち",
      partOfSpeech: "adjective",
      examples: [
          {
              example: [
                  [{ base: "安全", furigana: "あんぜん" }],
                  [{ base: "が" }],
                  [{ base: "第一", furigana: "だいいち" }],
                  [{ base: "です" }],
              ],
              translation: "Safety is the most important."
          },
          {
              example: [
                  [{ base: "彼", furigana: "かれ" }],
                  [{ base: "は" }],
                  [{ base: "第一", furigana: "だいいち" }],
                  [{ base: "に" }],
                  [{ base: "健康", furigana: "けんこう" }],
                  [{ base: "を" }],
                  [{ base: "考える", furigana: "かんが" }],
              ],
              translation: "He puts health first."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "実施", furigana: "じっし" },
          { base: "する" }
      ],
      name: "実施",
      translations: ["To implement", "To carry out", "To execute"],
      kana: "じっしする",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "新しい", furigana: "あたら" }],
                  [{ base: "ルール", furigana: "" }],
                  [{ base: "を" }],
                  [{ base: "実施", furigana: "じっし" }],
                  [{ base: "する" }],
              ],
              translation: "Implement the new rules."
          },
          {
              example: [
                  [{ base: "計画", furigana: "けいかく" }],
                  [{ base: "は" }],
                  [{ base: "予定通り", furigana: "よていどお" }],
                  [{ base: "に" }],
                  [{ base: "実施", furigana: "じっし" }],
                  [{ base: "された" }],
              ],
              translation: "The plan was carried out as scheduled."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "送別", furigana: "そうべつ" },
      ],
      name: "送別",
      translations: ["Farewell", "Send-off"],
      kana: "そうべつ",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "会社", furigana: "かいしゃ" }],
                  [{ base: "は" }],
                  [{ base: "送別", furigana: "そうべつ" }],
                  [{ base: "会", furigana: "かい" }],
                  [{ base: "を" }],
                  [{ base: "開く", furigana: "ひら" }],
                  [{ base: "予定", furigana: "よてい" }],
              ],
              translation: "The company plans to hold a farewell party."
          },
          {
              example: [
                  [{ base: "友達", furigana: "ともだち" }],
                  [{ base: "の" }],
                  [{ base: "送別", furigana: "そうべつ" }],
                  [{ base: "に" }],
                  [{ base: "参加", furigana: "さんか" }],
                  [{ base: "した" }],
              ],
              translation: "I attended my friend's farewell party."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "冷える", furigana: "ひえる" },
      ],
      name: "冷える",
      translations: ["To get cold", "To chill"],
      kana: "ひえる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "夜", furigana: "よる" }],
                  [{ base: "は" }],
                  [{ base: "気温", furigana: "きおん" }],
                  [{ base: "が" }],
                  [{ base: "冷える", furigana: "ひえる" }],
              ],
              translation: "The temperature gets cold at night."
          },
          {
              example: [
                  [{ base: "飲み物", furigana: "のみもの" }],
                  [{ base: "を" }],
                  [{ base: "冷える", furigana: "ひえる" }],
                  [{ base: "まで" }],
                  [{ base: "待つ" }],
              ],
              translation: "Wait until the drink cools down."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "すごい" },
      ],
      name: "すごい",
      translations: ["Amazing", "Incredible", "Awesome"],
      kana: "すごい",
      partOfSpeech: "adjective",
      examples: [
          {
              example: [
                  [{ base: "彼", furigana: "かれ" }],
                  [{ base: "の", furigana: "" }],
                  [{ base: "演技", furigana: "えんぎ" }],
                  [{ base: "は" }],
                  [{ base: "すごい" }],
              ],
              translation: "His performance is amazing."
          },
          {
              example: [
                  [{ base: "この", furigana: "" }],
                  [{ base: "景色", furigana: "けしき" }],
                  [{ base: "は" }],
                  [{ base: "本当に" }],
                  [{ base: "すごい" }],
              ],
              translation: "This view is truly incredible."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "閉める", furigana: "しめる" },
      ],
      name: "閉める",
      translations: ["To close", "To shut"],
      kana: "しめる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "窓", furigana: "まど" }],
                  [{ base: "を" }],
                  [{ base: "閉める", furigana: "しめる" }],
              ],
              translation: "Close the window."
          },
          {
              example: [
                  [{ base: "ドア", furigana: "" }],
                  [{ base: "を" }],
                  [{ base: "しっかり" }],
                  [{ base: "閉める", furigana: "しめる" }],
              ],
              translation: "Shut the door tightly."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "回数券", furigana: "かいすうけん" },
      ],
      name: "回数券",
      translations: ["Coupon ticket", "Book of tickets", "Multi-use pass"],
      kana: "かいすうけん",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "電車", furigana: "でんしゃ" }],
                  [{ base: "の" }],
                  [{ base: "回数券", furigana: "かいすうけん" }],
                  [{ base: "を" }],
                  [{ base: "買った", furigana: "か" }],
              ],
              translation: "I bought a book of train tickets."
          },
          {
              example: [
                  [{ base: "回数券", furigana: "かいすうけん" }],
                  [{ base: "は" }],
                  [{ base: "普通の切符", furigana: "ふつうのきっぷ" }],
                  [{ base: "より" }],
                  [{ base: "お得", furigana: "おとく" }],
              ],
              translation: "Coupon tickets are more economical than regular tickets."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "力", furigana: "ちから" },
      ],
      name: "力",
      translations: ["Power", "Strength", "Ability"],
      kana: "ちから",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "彼", furigana: "かれ" }],
                  [{ base: "は" }],
                  [{ base: "力", furigana: "ちから" }],
                  [{ base: "持", furigana: "も" }],
                  [{ base: "っている" }],
              ],
              translation: "He has strength."
          },
          {
              example: [
                  [{ base: "チーム", furigana: "" }],
                  [{ base: "の" }],
                  [{ base: "力", furigana: "ちから" }],
                  [{ base: "を" }],
                  [{ base: "合わせる", furigana: "あわ" }],
              ],
              translation: "Combine the team’s power."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "影響", furigana: "えいきょう" },
          { base: "する" }
      ],
      name: "影響",
      translations: ["Influence", "Effect", "Impact"],
      kana: "えいきょうする",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "天気", furigana: "てんき" }],
                  [{ base: "が" }],
                  [{ base: "計画", furigana: "けいかく" }],
                  [{ base: "に" }],
                  [{ base: "影響", furigana: "えいきょう" }],
                  [{ base: "する" }],
              ],
              translation: "The weather affects the plan."
          },
          {
              example: [
                  [{ base: "新しい政策", furigana: "せいさく" }],
                  [{ base: "は" }],
                  [{ base: "経済", furigana: "けいざい" }],
                  [{ base: "に" }],
                  [{ base: "影響", furigana: "えいきょう" }],
                  [{ base: "する" }],
              ],
              translation: "The new policy will impact the economy."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
    id: dictionaryEntryId,
    word: [
        { base: "本能", furigana: "ほんのう" },
    ],
    name: "本能",
    translations: ["Instinct", "Natural impulse"],
    kana: "ほんのう",
    partOfSpeech: "noun",
    examples: [
        {
            example: [
                [{ base: "動物", furigana: "どうぶつ" }],
                [{ base: "は" }],
                [{ base: "本能", furigana: "ほんのう" }],
                [{ base: "で" }],
                [{ base: "行動", furigana: "こうどう" }],
                [{ base: "する" }],
            ],
            translation: "Animals act on instinct."
        },
        {
            example: [
                [{ base: "危険", furigana: "きけん" }],
                [{ base: "を" }],
                [{ base: "察知", furigana: "さっち" }],
                [{ base: "するのは" }],
                [{ base: "本能", furigana: "ほんのう" }],
            ],
            translation: "Sensing danger is an instinct."
        }
    ],
    audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "暑い", furigana: "あつい" },
      ],
      name: "暑い",
      translations: ["Hot (weather)"],
      kana: "あつい",
      partOfSpeech: "adjective",
      examples: [
          {
              example: [
                  [{ base: "今日は" }],
                  [{ base: "とても" }],
                  [{ base: "暑い", furigana: "あつい" }],
              ],
              translation: "It’s very hot today."
          },
          {
              example: [
                  [{ base: "夏", furigana: "なつ" }],
                  [{ base: "は" }],
                  [{ base: "暑い", furigana: "あつい" }],
                  [{ base: "日", furigana: "ひ" }],
                  [{ base: "が" }],
                  [{ base: "続く", furigana: "つづ" }],
              ],
              translation: "Hot days continue throughout the summer."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "溺れる", furigana: "おぼれる" },
      ],
      name: "溺れる",
      translations: ["To drown", "To be overwhelmed (emotionally)"],
      kana: "おぼれる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "子供", furigana: "こども" }],
                  [{ base: "が" }],
                  [{ base: "川", furigana: "かわ" }],
                  [{ base: "で" }],
                  [{ base: "溺れた", furigana: "おぼ" }],
              ],
              translation: "The child drowned in the river."
          },
          {
              example: [
                  [{ base: "彼", furigana: "かれ" }],
                  [{ base: "は" }],
                  [{ base: "仕事", furigana: "しごと" }],
                  [{ base: "に" }],
                  [{ base: "溺れている", furigana: "おぼ" }],
              ],
              translation: "He is overwhelmed by work."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "加える", furigana: "くわえる" },
      ],
      name: "加える",
      translations: ["To add", "To include"],
      kana: "くわえる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "塩", furigana: "しお" }],
                  [{ base: "を" }],
                  [{ base: "料理", furigana: "りょうり" }],
                  [{ base: "に" }],
                  [{ base: "加える", furigana: "くわ" }],
              ],
              translation: "Add salt to the dish."
          },
          {
              example: [
                  [{ base: "新しい", furigana: "あたら" }],
                  [{ base: "メンバー", furigana: "" }],
                  [{ base: "を" }],
                  [{ base: "チーム", furigana: "" }],
                  [{ base: "に" }],
                  [{ base: "加える", furigana: "くわ" }],
              ],
              translation: "Include a new member in the team."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "見上げる", furigana: "みあげる" },
      ],
      name: "見上げる",
      translations: ["To look up", "To admire"],
      kana: "みあげる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "空", furigana: "そら" }],
                  [{ base: "を" }],
                  [{ base: "見上げる", furigana: "みあ" }],
              ],
              translation: "Look up at the sky."
          },
          {
              example: [
                  [{ base: "彼", furigana: "かれ" }],
                  [{ base: "の" }],
                  [{ base: "勇気", furigana: "ゆうき" }],
                  [{ base: "を" }],
                  [{ base: "見上げる", furigana: "みあ" }],
              ],
              translation: "I admire his courage."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "夜", furigana: "よる" },
      ],
      name: "夜",
      translations: ["Night", "Evening"],
      kana: "よる",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "夜", furigana: "よる" }],
                  [{ base: "は" }],
                  [{ base: "静か", furigana: "しずか" }],
                  [{ base: "です" }],
              ],
              translation: "The night is quiet."
          },
          {
              example: [
                  [{ base: "夜", furigana: "よる" }],
                  [{ base: "に" }],
                  [{ base: "散歩", furigana: "さんぽ" }],
                  [{ base: "する" }],
              ],
              translation: "Take a walk at night."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "備える", furigana: "そなえる" },
      ],
      name: "備える",
      translations: ["To prepare", "To equip"],
      kana: "そなえる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "災害", furigana: "さいがい" }],
                  [{ base: "に" }],
                  [{ base: "備える", furigana: "そな" }],
              ],
              translation: "Prepare for disasters."
          },
          {
              example: [
                  [{ base: "彼", furigana: "かれ" }],
                  [{ base: "は" }],
                  [{ base: "将来", furigana: "しょうらい" }],
                  [{ base: "に" }],
                  [{ base: "備えて", furigana: "そな" }],
                  [{ base: "貯金", furigana: "ちょきん" }],
                  [{ base: "する" }],
              ],
              translation: "He saves money to prepare for the future."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "判断", furigana: "はんだん" },
          { base: "する" }
      ],
      name: "判断",
      translations: ["To judge", "To decide", "To determine"],
      kana: "はんだんする",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "状況", furigana: "じょうきょう" }],
                  [{ base: "を" }],
                  [{ base: "判断", furigana: "はんだん" }],
                  [{ base: "する" }],
              ],
              translation: "Judge the situation."
          },
          {
              example: [
                  [{ base: "彼女", furigana: "かのじょ" }],
                  [{ base: "は" }],
                  [{ base: "冷静", furigana: "れいせい" }],
                  [{ base: "に" }],
                  [{ base: "判断", furigana: "はんだん" }],
                  [{ base: "する" }],
              ],
              translation: "She makes calm judgments."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "持ってくる", furigana: "もってくる" },
      ],
      name: "持ってくる",
      translations: ["To bring (something)"],
      kana: "もってくる",
      partOfSpeech: "verb",
      examples: [
          {
              example: [
                  [{ base: "明日", furigana: "あした" }],
                  [{ base: "は" }],
                  [{ base: "資料", furigana: "しりょう" }],
                  [{ base: "を" }],
                  [{ base: "持ってくる", furigana: "も" }],
              ],
              translation: "Bring the documents tomorrow."
          },
          {
              example: [
                  [{ base: "友達", furigana: "ともだち" }],
                  [{ base: "に" }],
                  [{ base: "プレゼント", furigana: "" }],
                  [{ base: "を" }],
                  [{ base: "持ってくる", furigana: "も" }],
              ],
              translation: "Bring a present for your friend."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
      id: dictionaryEntryId,
      word: [
          { base: "煙", furigana: "けむり" },
      ],
      name: "煙",
      translations: ["Smoke", "Fumes"],
      kana: "けむり",
      partOfSpeech: "noun",
      examples: [
          {
              example: [
                  [{ base: "煙", furigana: "けむり" }],
                  [{ base: "が" }],
                  [{ base: "空", furigana: "そら" }],
                  [{ base: "に" }],
                  [{ base: "上がる", furigana: "あ" }],
              ],
              translation: "Smoke rises into the sky."
          },
          {
              example: [
                  [{ base: "料理", furigana: "りょうり" }],
                  [{ base: "の" }],
                  [{ base: "煙", furigana: "けむり" }],
                  [{ base: "で" }],
                  [{ base: "目", furigana: "め" }],
                  [{ base: "が" }],
                  [{ base: "痛い", furigana: "いた" }],
              ],
              translation: "The smoke from the cooking makes my eyes hurt."
          }
      ],
      audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
  },
  {
    id: dictionaryEntryId,
    word: [
        { base: "適切", furigana: "てきせつ" },
    ],
    name: "適切",
    translations: ["Appropriate", "Proper", "Suitable"],
    kana: "てきせつ",
    partOfSpeech: "adjective",
    examples: [
        {
            example: [
                [{ base: "適切", furigana: "てきせつ" }],
                [{ base: "な" }],
                [{ base: "対応", furigana: "たいおう" }],
                [{ base: "を" }],
                [{ base: "する" }],
            ],
            translation: "Provide an appropriate response."
        },
        {
            example: [
                [{ base: "この", furigana: "" }],
                [{ base: "方法", furigana: "ほうほう" }],
                [{ base: "は" }],
                [{ base: "適切", furigana: "てきせつ" }],
                [{ base: "です" }],
            ],
            translation: "This method is suitable."
        }
    ],
    audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
},
{
    id: dictionaryEntryId,
    word: [
        { base: "ビザ" },
    ],
    name: "ビザ",
    translations: ["Visa (for travel)"],
    kana: "びざ",
    partOfSpeech: "noun",
    examples: [
        {
            example: [
                [{ base: "海外", furigana: "かいがい" }],
                [{ base: "旅行", furigana: "りょこう" }],
                [{ base: "には" }],
                [{ base: "ビザ", furigana: "" }],
                [{ base: "が" }],
                [{ base: "必要", furigana: "ひつよう" }],
            ],
            translation: "A visa is required for overseas travel."
        },
        {
            example: [
                [{ base: "彼", furigana: "かれ" }],
                [{ base: "は" }],
                [{ base: "ビザ", furigana: "" }],
                [{ base: "を" }],
                [{ base: "申請", furigana: "しんせい" }],
                [{ base: "した" }],
            ],
            translation: "He applied for a visa."
        }
    ],
    audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
},
{
    id: dictionaryEntryId,
    word: [
        { base: "座敷", furigana: "ざしき" },
    ],
    name: "座敷",
    translations: ["Tatami room", "Japanese-style room"],
    kana: "ざしき",
    partOfSpeech: "noun",
    examples: [
        {
            example: [
                [{ base: "家", furigana: "いえ" }],
                [{ base: "には" }],
                [{ base: "座敷", furigana: "ざしき" }],
                [{ base: "が" }],
                [{ base: "ある" }],
            ],
            translation: "The house has a tatami room."
        },
        {
            example: [
                [{ base: "座敷", furigana: "ざしき" }],
                [{ base: "で" }],
                [{ base: "お茶", furigana: "おちゃ" }],
                [{ base: "を" }],
                [{ base: "楽しむ", furigana: "たの" }],
            ],
            translation: "Enjoy tea in the tatami room."
        }
    ],
    audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
},
{
    id: dictionaryEntryId,
    word: [
        { base: "いつも" },
    ],
    name: "いつも",
    translations: ["Always", "All the time", "Usually"],
    kana: "いつも",
    partOfSpeech: "adverb",
    examples: [
        {
            example: [
                [{ base: "彼", furigana: "かれ" }],
                [{ base: "は" }],
                [{ base: "いつも" }],
                [{ base: "笑顔", furigana: "えがお" }],
            ],
            translation: "He is always smiling."
        },
        {
            example: [
                [{ base: "私は" }],
                [{ base: "いつも" }],
                [{ base: "朝", furigana: "あさ" }],
                [{ base: "に" }],
                [{ base: "ジョギング", furigana: "" }],
                [{ base: "を" }],
                [{ base: "する" }],
            ],
            translation: "I usually jog in the morning."
        }
    ],
    audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
},
{
    id: dictionaryEntryId,
    word: [
        { base: "婦人", furigana: "ふじん" },
    ],
    name: "婦人",
    translations: ["Woman", "Mrs.", "Lady"],
    kana: "ふじん",
    partOfSpeech: "noun",
    examples: [
        {
            example: [
                [{ base: "婦人", furigana: "ふじん" }],
                [{ base: "服", furigana: "ふく" }],
                [{ base: "売り場", furigana: "うりば" }],
                [{ base: "に" }],
                [{ base: "行く" }],
            ],
            translation: "Go to the women's clothing section."
        },
        {
            example: [
                [{ base: "その", furigana: "" }],
                [{ base: "婦人", furigana: "ふじん" }],
                [{ base: "は" }],
                [{ base: "親切", furigana: "しんせつ" }],
                [{ base: "だった" }],
            ],
            translation: "That lady was kind."
        }
    ],
    audio: `${AUDIO_BASE_URL}/${dictionaryEntryId++}.mp3`,
},
]};