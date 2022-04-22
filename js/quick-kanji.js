const kanjiList = JSON.parse(localStorage.getItem('kanji-list')) || []

function normalize(value) {
    let {
        knj: kanji,
        trns: translate,
        main,
        reading2,
        reading3
    } = value

    return {
        kanji,
        main,
        translate,
        reading2,
        reading3
    }
}

const hardcodeStartBtn = document.querySelector('.modal-content > a')
const hardcodeAbout = document.querySelector('.modal-content p')

hardcodeStartBtn.addEventListener('click', function () {
    this.classList.toggle('isHardcore')

    if(this.classList.contains('isHardcore')) {
        this.innerHTML = 'Остановить'
        hardcodeAbout.innerHTML = 'Что, уже наигрался?'

        kanjiTranslate.classList.toggle('hardcore')

        modal.classList.add('closing')
        setTimeout(() => {
            modal.classList.remove('opened')
        }, 500)

    }else {
        this.innerHTML = 'Поехали'
        hardcodeAbout.innerHTML = 'В этом режиме недоступны переводы иероглифов. <br>Основные чтения заменены на побочные.\nУверены, что хотите попробовать?'
       
        kanjiTranslate.classList.toggle('hardcore')
        modal.classList.add('closing')
        setTimeout(() => {
            modal.classList.remove('opened')
        }, 500)
    }
})

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
const progress = document.querySelector('progress')
const gameBlock = document.querySelector('.game')
const resultBlock = document.querySelector('.result')
const reset = document.querySelector('.reset')

reset.addEventListener('click', () => {
    game.reset()
})

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
    point: 10,
    state: 1,
    index: -1,
    list: [],
    mode: 'standart',
    selectable: true,
    get maxPoints() {
        return this.point * this.levels
    },
    show() {
        if (this.state == 0) this.showResult()

        gameBlock.classList.toggle('hidden', !this.state)
        resultBlock.classList.toggle('hidden', !!this.state)
    },
    reset() {
        this.points = 0
        this.state = 1
        this.currentLevel = 0
        this.show()
        this.render()
    },
    select(index) {
        if (!this.selectable) return;
        this.selectable = false;

        let clickedButton = buttons[index]
        let rightButton = buttons[this.index]
        let is = index == this.index

        if (is) {
            this.points += this.point
        } else {
            this.points -= this.point
            clickedButton.classList.add('wrong')
            setTimeout(() => clickedButton.classList.remove('wrong'), 700);
        }

        rightButton.classList.add('right')
        setTimeout(() => rightButton.classList.remove('right'), 700);

        this.currentLevel++;
        if (this.currentLevel >= this.levels) {
            this.state = +!this.state
            this.show()
            return;
        }

        setTimeout(this.render.bind(this), 800)
    },
    render() {
        this.selectable = true
        this.list = getRandomKanjiList()
        this.index = Math.floor(Math.random() * 4)

        let currentKanji = this.list[this.index]

        this.setKanji(currentKanji)
        this.list.forEach((element, i) => {
            buttons[i].textContent = element.main
        })

        if (progress)
            progress.value = 100 * (this.currentLevel / this.levels)
    },
    showResult() {
        resultBlock.querySelector('.score').textContent = this.points > 0 ?
            `${this.points} из ${this.maxPoints}` :
            'Вы ушли в минус'
    },
    setKanji(kanji) {
        kanjiTitle.textContent = kanji.kanji
        if (this.mode == 'standart')
            kanjiTranslate.textContent = kanji.translate
    }
}

game.show()
game.render()