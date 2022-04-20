const kanjiList = JSON.parse(localStorage.getItem('kanji-list')) || []

function normalize(value) {
    let {
        knj: kanji,
        trns: translate,
        main
    } = value

    return {
        kanji,
        main,
        translate
    }
}

function getKanjiByIndex(index) {
    return normalize(kanjiList[index])
}

function getRandomKanjiList() {
    return kanjiList.sort(() => Math.random() - 0.5).slice(0, 4).map(normalize)
}

function getRandomIndex() {
    return Math.floor(Math.random() * kanjiList.length)
}

const block = document.querySelector('.kanji-block')
const kanjiTitle = block.querySelector('.kanji')
const kanjiTranslate = block.querySelector('.translate')

function setKanji(kanji) {
    kanjiTitle.textContent = kanji.kanji
    kanjiTranslate.textContent = kanji.translate
}

let buttons = document.querySelectorAll('.quick-buttons button')

buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
        game.select(i)
    })
})

const game = {
    currentLevel: 0,
    levels: 10,
    points: 0,
    list: [],
    select(index) {
        if (index == this.index) {
            this.points += 10
        } else {
            this.points -= 10
        }
        console.log(this.points)
        this.render()
    },
    render() {
        this.list = getRandomKanjiList()
        this.index = Math.floor(Math.random() * 4)
        let currentKanji = this.list[this.index]
        setKanji(currentKanji)
        this.list.forEach((element, i) => {
            buttons[i].textContent = element.main
        })
    }
}

game.render()