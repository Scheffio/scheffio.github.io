window.onload = () => {
    genkatakana()
    document.querySelector('.katakana-input').focus()
    randomkatakana(katakanaList)
    setkatakana()
}


if (localStorage.getItem('katakana-list') == null || localStorage.getItem('katakana-list').length == 2) {
    localStorage.setItem('katakana-list', JSON.stringify([{
            "knj": "ア",
            "main": "A",
        },
        {
            "knj": "イ",
            "main": "I",
        },
        {
            "knj": "ウ",
            "main": "U",
        },
        {
            "knj": "エ",
            "main": "E",
        },
        {
            "knj": "オ",
            "main": "O",
        },
        {
            "knj": "カ",
            "main": "KA",
        },
        {
            "knj": "キ",
            "main": "KI",
        },
        {
            "knj": "ク",
            "main": "KU",
        },
        {
            "knj": "ケ",
            "main": "KE",
        },
        {
            "knj": "コ",
            "main": "KO",
        },
        {
            "knj": "サ",
            "main": "SA",
        },
        {
            "knj": "シ",
            "main": "SHI",
        },
        {
            "knj": "ス",
            "main": "SU",
        },
        {
            "knj": "セ",
            "main": "SE",
        },
        {
            "knj": "ソ",
            "main": "SO",
        },
        {
            "knj": "タ",
            "main": "TA",
        },
        {
            "knj": "チ",
            "main": "CHI",
        },
        {
            "knj": "ツ",
            "main": "TSU",
        },
        {
            "knj": "テ",
            "main": "TE",
        },
        {
            "knj": "ト",
            "main": "TO",
        },
        {
            "knj": "ナ",
            "main": "NA",
        },
        {
            "knj": "ニ",
            "main": "NI",
        },
        {
            "knj": "ヌ",
            "main": "NU",
        },
        {
            "knj": "ネ",
            "main": "NE",
        },
        {
            "knj": "ノ",
            "main": "NO",
        },
        {
            "knj": "ハ",
            "main": "HA",
        },
        {
            "knj": "ヒ",
            "main": "HI",
        },
        {
            "knj": "フ",
            "main": "FU",
        },
        {
            "knj": "ヘ",
            "main": "HE",
        },
        {
            "knj": "ホ",
            "main": "HO",
        },
        {
            "knj": "マ",
            "main": "MA",
        },
        {
            "knj": "ミ",
            "main": "MI",
        },
        {
            "knj": "ム",
            "main": "MU",
        },
        {
            "knj": "メ",
            "main": "ME",
        },
        {
            "knj": "モ",
            "main": "MO",
        },
        {
            "knj": "ヤ",
            "main": "YA",
        },
        {
            "knj": "ユ",
            "main": "YU",
        },
        {
            "knj": "ヨ",
            "main": "YO",
        },
        {
            "knj": "ラ",
            "main": "RA",
        },
        {
            "knj": "リ",
            "main": "RI",
        },
        {
            "knj": "ル",
            "main": "RU",
        },
        {
            "knj": "レ",
            "main": "RE",
        },
        {
            "knj": "ロ",
            "main": "RO",
        },
        {
            "knj": "ワ",
            "main": "WA",
        },
        {
            "knj": "ヲ",
            "main": "WO",
        },
        {
            "knj": "ン",
            "main": "N",
        }
    ]))
}

const katakanaList = JSON.parse(localStorage.getItem('katakana-list')) || []
const block = document.querySelector('.katakana-block')
const katakanaTitle = block.querySelector('.katakana')
const katakanaReading = block.querySelector('.katakana-reading')

let rand = 0

function randomkatakana(mas) {
    rand = Math.floor(Math.random() * mas.length)
    block.dataset.katakana = rand
}

function getkatakanaByIndex(index) {
    return katakanaList[index]
}

function setkatakana() {
    katakanaTitle.innerHTML = katakanaList[block.dataset.katakana]["knj"]
}

function genkatakana() {
    if (katakanaList.length == 0) return;

    document.querySelector('.katakana-input').addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            let inpt = document.querySelector('.katakana-input').value.toUpperCase()
            if (inpt == katakanaList[rand]['main']) {
                katakanaTitle.classList.add('true')
                katakanaTitle.classList.remove('false')
                setTimeout(() => {
                    katakanaTitle.classList.remove('true')
                    document.querySelector('.katakana-reading').classList.remove('clicked')
                    document.querySelector('.katakana-reading').innerHTML = "Чтение"
                    document.querySelector('.katakana-input').value = ''
                    getkatakanaByIndex(randomkatakana(katakanaList))
                    setkatakana()
                }, 500)
            } else {
                katakanaTitle.classList.add('false')
                katakanaTitle.classList.remove('true')
                setTimeout(() => {
                    katakanaTitle.classList.remove('false')
                    document.querySelector('.katakana-input').value = ''
                }, 500)
            }
        }
    })
}

document.querySelector('.katakana-reading').addEventListener('click', function () {
    this.classList.toggle('clicked');

    if (this.classList.contains('clicked')) {
        this.innerHTML = `${katakanaList[block.dataset.katakana]['main']}`
    } else {
        this.innerHTML = 'Чтение'
    }

})