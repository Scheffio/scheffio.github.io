window.onload = () => {
    genwords()
    document.querySelector('.words-input').focus()
    randomwords(wordsList)
    setwords()
}


if (localStorage.getItem('words-list') == null || localStorage.getItem('words-list').length == 2) {
    localStorage.setItem('words-list', JSON.stringify([{
            "word": "コート",
            "reading": "ko-to",
            "translate": "пальто"
        },
        {
            "word": "どれ",
            "reading": "dore",
            "translate": "который"
        },
        {
            "word": "先に",
            "reading": "saki-ni",
            "translate": "первый"
        },
        {
            "word": "ポケット",
            "reading": "pokketo",
            "translate": "карман"
        },
        {
            "word": "テーブル",
            "reading": "te-buru",
            "translate": "стол"
        },
        {
            "word": "おさら",
            "reading": "osara",
            "translate": "тарелка"
        },
        {
            "word": "ならべる",
            "reading": "naraberu",
            "translate": "выстроить в линию"
        },
        {
            "word": "おく",
            "reading": "oku",
            "translate": "ставить"
        },
        {
            "word": "ナイフ",
            "reading": "naifu",
            "translate": "нож"
        },
        {
            "word": "フォーク",
            "reading": "fo-ku",
            "translate": "вилка"
        },
        {
            "word": "おはし",
            "reading": "ohashi",
            "translate": "палочки для еды"
        },
        {
            "word": "コーヒーカップ",
            "reading": "ko-hi-kappu",
            "translate": "чашка"
        },
        {
            "word": "つく",
            "reading": "tsuku",
            "translate": "прибывать"
        },
        {
            "word": "おしえる",
            "reading": "oshieru",
            "translate": "объяснить"
        },
        {
            "word": "はし",
            "reading": "hashi",
            "translate": "мост"
        },
        {
            "word": "わたる",
            "reading": "wataru",
            "translate": "переходить"
        },
        {
            "word": "まがる",
            "reading": "magaru",
            "translate": "поворачивать"
        }
    ]))
}

const wordsList = JSON.parse(localStorage.getItem('words-list')) || []
const block = document.querySelector('.words-block')
const wordsTitle = block.querySelector('.words')
const wordsTranslate = block.querySelector('.wordtranslate')
const wordsReading = block.querySelector('.wordreading')

let rand = 0

function randomwords(mas) {
    rand = Math.floor(Math.random() * mas.length)
    block.dataset.words = rand
}

function getwordsByIndex(index) {
    return wordsList[index]
}

function setwords() {
    wordsTitle.innerHTML = wordsList[block.dataset.words]["word"]
}

function genwords() {
    if (wordsList.length == 0) return;

    document.querySelector('.words-input').addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            let inpt = document.querySelector('.words-input').value.toLowerCase()
            if (inpt == wordsList[rand]['reading'] || inpt == wordsList[rand]['translate']) {
                wordsTitle.classList.add('true')
                wordsTitle.classList.remove('false')
                setTimeout(() => {
                    wordsTitle.classList.remove('true')
                    document.querySelector('.wordtranslate').classList.remove('clicked')
                    document.querySelector('.wordtranslate').innerHTML = "Перевод"
                    document.querySelector('.wordreading').classList.remove('clicked')
                    document.querySelector('.wordreading').innerHTML = "Чтение"
                    document.querySelector('.words-input').value = ''
                    getwordsByIndex(randomwords(wordsList))
                    setwords()
                }, 500)
            } else {
                wordsTitle.classList.add('false')
                wordsTitle.classList.remove('true')
                setTimeout(() => {
                    wordsTitle.classList.remove('false')
                    document.querySelector('.words-input').value = ''
                }, 500)
            }
        }
    })
}

document.querySelector('.wordreading').addEventListener('click', function () {
    this.classList.toggle('clicked');

    if (this.classList.contains('clicked')) {
        this.innerHTML = `${wordsList[block.dataset.words]['reading']}`
    } else {
        this.innerHTML = 'Чтение'
    }

})

document.querySelector('.wordtranslate').addEventListener('click', function () {
    this.classList.toggle('clicked');

    if (this.classList.contains('clicked')) {
        this.innerHTML = `${wordsList[block.dataset.words]['translate']}`
    } else {
        this.innerHTML = 'Перевод'
    }

})