window.onload = () => {
    genhiragana()
    document.querySelector('.hiragana-input').focus()
    randomhiragana(hiraganaList)
    sethiragana()
}


if (localStorage.getItem('hiragana-list') == null || localStorage.getItem('hiragana-list').length == 2) {
    localStorage.setItem('hiragana-list', JSON.stringify([{
            "knj": "あ",
            "main": "A",
        },
        {
            "knj": "い",
            "main": "I",
        },
        {
            "knj": "う",
            "main": "U",
        },
        {
            "knj": "え",
            "main": "E",
        },
        {
            "knj": "お",
            "main": "O",
        },
        {
            "knj": "か",
            "main": "KA",
        },
        {
            "knj": "き",
            "main": "KI",
        },
        {
            "knj": "く",
            "main": "KU",
        },
        {
            "knj": "け",
            "main": "KE",
        },
        {
            "knj": "こ",
            "main": "KO",
        },
        {
            "knj": "さ",
            "main": "SA",
        },
        {
            "knj": "し",
            "main": "SHI",
        },
        {
            "knj": "す",
            "main": "SU",
        },
        {
            "knj": "せ",
            "main": "SE",
        },
        {
            "knj": "そ",
            "main": "SO",
        },
        {
            "knj": "た",
            "main": "TA",
        },
        {
            "knj": "ち",
            "main": "CHI",
        },
        {
            "knj": "つ",
            "main": "TSU",
        },
        {
            "knj": "て",
            "main": "TE",
        },
        {
            "knj": "と",
            "main": "TO",
        },
        {
            "knj": "な",
            "main": "NA",
        },
        {
            "knj": "に",
            "main": "NI",
        },
        {
            "knj": "ぬ",
            "main": "NU",
        },
        {
            "knj": "ね",
            "main": "NE",
        },
        {
            "knj": "の",
            "main": "NO",
        },
        {
            "knj": "は",
            "main": "HA",
        },
        {
            "knj": "ひ",
            "main": "HI",
        },
        {
            "knj": "ふ",
            "main": "FU",
        },
        {
            "knj": "へ",
            "main": "HE",
        },
        {
            "knj": "ほ",
            "main": "HO",
        },
        {
            "knj": "ま",
            "main": "MA",
        },
        {
            "knj": "み",
            "main": "MI",
        },
        {
            "knj": "む",
            "main": "MU",
        },
        {
            "knj": "め",
            "main": "ME",
        },
        {
            "knj": "も",
            "main": "MO",
        },
        {
            "knj": "や",
            "main": "YA",
        },
        {
            "knj": "ゆ",
            "main": "YU",
        },
        {
            "knj": "よ",
            "main": "YO",
        },
        {
            "knj": "ら",
            "main": "RA",
        },
        {
            "knj": "り",
            "main": "RI",
        },
        {
            "knj": "る",
            "main": "RU",
        },
        {
            "knj": "れ",
            "main": "RE",
        },
        {
            "knj": "ろ",
            "main": "RO",
        },
        {
            "knj": "わ",
            "main": "WA",
        },
        {
            "knj": "を",
            "main": "WO (O)",
        },
        {
            "knj": "ん",
            "main": "N",
        }
    ]))
}

const hiraganaList = JSON.parse(localStorage.getItem('hiragana-list')) || []
const block = document.querySelector('.hiragana-block')
const hiraganaTitle = block.querySelector('.hiragana')
const hiraganaReading = block.querySelector('.hiragana-reading')

let rand = 0

function randomhiragana(mas) {
    rand = Math.floor(Math.random() * mas.length)
    block.dataset.hiragana = rand
}

function gethiraganaByIndex(index) {
    return hiraganaList[index]
}

function sethiragana() {
    hiraganaTitle.innerHTML = hiraganaList[block.dataset.hiragana]["knj"]
}

function genhiragana() {
    if (hiraganaList.length == 0) return;

    document.querySelector('.hiragana-input').addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            let inpt = document.querySelector('.hiragana-input').value.toUpperCase()
            console.log(inpt);
            console.log(hiraganaList[rand]['main']);
            if (inpt == hiraganaList[rand]['main']) {
                hiraganaTitle.classList.add('true')
                hiraganaTitle.classList.remove('false')
                setTimeout(() => {
                    hiraganaTitle.classList.remove('true')
                    document.querySelector('.hiragana-reading').classList.toggle('clicked')
                    document.querySelector('.hiragana-reading').innerHTML = "Чтение"
                    document.querySelector('.hiragana-input').value = ''
                    gethiraganaByIndex(randomhiragana(hiraganaList))
                    sethiragana()
                }, 500)
            } else {
                hiraganaTitle.classList.add('false')
                hiraganaTitle.classList.remove('true')
                setTimeout(() => {
                    hiraganaTitle.classList.remove('false')
                    document.querySelector('.hiragana-input').value = ''
                }, 500)
            }
        }
    })
}

document.querySelector('.hiragana-reading').addEventListener('click', function () {
    this.classList.toggle('clicked');

    if (this.classList.contains('clicked')) {
        this.innerHTML = `${hiraganaList[block.dataset.hiragana]['main']}`
    } else {
        this.innerHTML = 'Чтение'
    }

})