interface KanaTable {
    thead: string[];
    tbody: string[][];
}

const hiraganaSeion: KanaTable = {
    thead: ['', '', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'],
    tbody: [
        ['a', 'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ',],
        ['i', 'い', 'き', 'し', 'ち', 'に', 'ひ', 'み', '', 'り', ''],
        ['u', 'う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'ゆ', 'る', 'を',],
        ['e', 'え', 'け', 'せ', 'て', 'ね', 'へ', 'め', '', 'れ', ''],
        ['o', 'お', 'こ', 'そ', 'と', 'の', 'ほ', 'も', 'よ', 'ろ', 'ん',],
    ],
}
const hiraganaDakuon: KanaTable = {
    thead: ['', 'g', 'z', 'd', 'b', 'p'],
    tbody: [
        ['a', 'が', 'ざ', 'だ', 'ば', 'ぱ',],
        ['i', 'ぎ', 'じ', 'ぢ', 'び', 'ぴ',],
        ['u', 'ぐ', 'ず', 'づ', 'ぶ', 'ぷ',],
        ['e', 'げ', 'ぜ', 'で', 'べ', 'ぺ',],
        ['o', 'ご', 'ぞ', 'ど', 'ぼ', 'ぽ',],
    ],
}

const katakanaSeion: KanaTable = {
    thead: ['', '', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'],
    tbody: [
        ['a', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ',],
        ['i', 'イ', 'キ', 'シ', 'チ', 'ニ', 'ヒ', 'ミ', '', 'リ', ''],
        ['u', 'ウ', 'ク', 'ス', 'ツ', 'ヌ', 'フ', 'ム', 'ユ', 'ル', 'ヲ',],
        ['e', 'エ', 'ケ', 'セ', 'テ', 'ネ', 'ヘ', 'メ', '', 'レ', ''],
        ['o', 'オ', 'コ', 'ソ', 'ト', 'ノ', 'ホ', 'モ', 'ヨ', 'ロ', 'ン',],
    ],
}
const katakanaDakuon: KanaTable = {
    thead: ['', 'g', 'z', 'd', 'b', 'p'],
    tbody: [
        ['a', 'ガ', 'ザ', 'ダ', 'バ', 'パ',],
        ['i', 'ギ', 'ジ', 'ヂ', 'ビ', 'ピ',],
        ['u', 'グ', 'ズ', 'ヅ', 'ブ', 'プ',],
        ['e', 'ゲ', 'ゼ', 'デ', 'ベ', 'ペ',],
        ['o', 'ゴ', 'ゾ', 'ド', 'ボ', 'ポ',],
    ],
}

export default function KanaTable() {

    return (
        <div className="px-[10%] py-[5%] flex flex-wrap justify-center gap-10 text-3xl">
            <div className="flex flex flex-wrap justify-center gap-5 overflow-scroll">
                <KanaTableConstrucor kanaTable={hiraganaSeion} label="Hiragana" />
                <KanaTableConstrucor kanaTable={hiraganaDakuon} label="Dakuon" />
            </div>
            <div className="flex flex flex-wrap justify-center gap-5 overflow-scroll">
                <KanaTableConstrucor kanaTable={katakanaSeion} label="Katakana" />
                <KanaTableConstrucor kanaTable={katakanaDakuon} label="Dakuon" />
            </div>
        </div>
    )
}

function KanaTableConstrucor({kanaTable, label}: {kanaTable: KanaTable, label: string}) {

    return (
        <div className="flex flex-col items-center gap-2 overflow-x-scroll">            
            <table className="border-separate border-spacing-3 font-bold">
                <thead>
                    <tr>
                        {kanaTable.thead.map(character =>
                            <th>{character}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {kanaTable.tbody.map(characterRow =>
                        <tr>
                            {characterRow.map((character, i) =>
                                i === 0
                                ? <th>{character}</th>
                                : <td className="border-1 border-neutral-600 p-2 rounded-lg shadow-[0px_4px_0px_4px] shadow-neutral-500 dark:shadow-neutral-700">{character}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table> 
            <h2 className="ml-5 my-2 w-[50%] text-xl border-1 border-neutral-600 p-2 rounded-lg shadow-[0px_4px_0px_4px] shadow-neutral-500 dark:shadow-neutral-700 text-neutral-500 dark:text-neutral-400 text-4xl text-center font-bold">{label}</h2>               
        </div>
    )
}