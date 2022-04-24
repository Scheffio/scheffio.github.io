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

const hardcodeStartBtn = document.querySelector('.hardcore-modal-content > a')
const hardcodeAbout = document.querySelector('.hardcore-modal-content > p')
const modal = document.querySelector('.hardcore-modal')

hardcodeStartBtn.addEventListener('click', function () {
    this.classList.toggle('isHardcore')

    if(this.classList.contains('isHardcore')) {
        game.mode = 'hardcore'
        game.render()

        modal.classList.add('closing')
        setTimeout(() => {
            this.innerHTML = 'Остановить'
            hardcodeAbout.innerHTML = 'Что, уже наигрался?'
            modal.classList.remove('opened')
        }, 500)
    }else {
        game.mode = 'standart'
        game.render()

        modal.classList.add('closing')
        setTimeout(() => {
            this.innerHTML = 'Поехали'
            hardcodeAbout.innerHTML = 'В этом режиме недоступны переводы иероглифов. <br>Основные чтения заменены на побочные.\nУверены, что хотите попробовать?'
            modal.classList.remove('opened')
        }, 500)
    }
})

const translationOnlyBtn = document.querySelector('.translationMode')

translationOnlyBtn.addEventListener('click', function () {
    this.classList.toggle('isTranslationOnly')

    if(this.classList.contains('isTranslationOnly')) {
        this.textContent = 'A'

        game.mode = 'translationOnly'
        game.render()
    }else {
        this.textContent = 'あ'
        game.mode = 'standart'
        game.render()
    }
})

const saveSettings = document.querySelector('.settingsSaveBtn')
const levelAmmount = document.querySelector('.levelAmmount')

saveSettings.addEventListener('click', () => {
    game.levels = levelAmmount.value
    game.reset()
    game.render()

    settingsModal.classList.add('closing')
        setTimeout(() => {
            settingsModal.classList.remove('opened')
        }, 500)
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
        this.setVariants(this.list)

        if (progress)
            progress.value = 100 * (this.currentLevel / this.levels)
    },
    showResult() {
        document.querySelector('.score').innerHTML = this.points
        document.querySelector('.of').innerHTML = this.maxPoints
        if(this.points < 0) {
            document.querySelector('.scores').innerHTML = 'К сожалению, Вы ушли в минус.'
        }
    },
    setKanji(kanji) {
        kanjiTitle.textContent = kanji.kanji
        if (this.mode == 'standart'){
            kanjiTranslate.textContent = kanji.translate
        }else if(this.mode == 'hardcore') {
            kanjiTranslate.textContent = ''
        }else if(this.mode == 'translationOnly') {
            kanjiTranslate. textContent = ''
        }
    },
    getRandomReading(reading2,reading3) {
        let readingsArr = []

        readingsArr.push(reading2)
        readingsArr.push(reading3)

        return Math.floor(Math.random() * readingsArr.length)
    },
    setVariants(list) {
        list.forEach((element, i) => {
            if(this.mode == 'standart') {
                buttons[i].textContent = element.main
            }else if(this.mode == 'hardcore') {
                if(this.getRandomReading(element.reading2,element.reading3) == '0') {
                    buttons[i].textContent = element.reading2
                }else {
                    buttons[i].textContent = element.reading3
                }
            }else if(this.mode == 'translationOnly') {
                buttons[i].textContent = element.translate
            }
        })
    }
}

game.show()
game.render()