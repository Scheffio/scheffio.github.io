window.onload = () => {
    genKanji()
    document.querySelector('.kanji-input').focus()
    randomKanji(kanjiList)
    setKanji()
}


if (localStorage.getItem('kanji-list') == null || localStorage.getItem('kanji-list').length == 2) {
    localStorage.setItem('kanji-list', JSON.stringify([{
            "knj": "飲",
            "main": "no",
            "reading2": "nomu",
            "reading3": "nomu",
            "trns": "пить"
        },
        {
            "knj": "行",
            "main": "i",
            "reading2": "kou",
            "reading3": "gyou",
            "trns": "идти"
        },
        {
            "knj": "彼",
            "main": "kare",
            "reading2": "kono",
            "reading3": "kare",
            "trns": "он | она"
        },
        {
            "knj": "代",
            "main": "dai",
            "reading2": "ka",
            "reading3": "ka",
            "trns": "возраст"
        },
        {
            "knj": "留",
            "main": "ryuu",
            "reading2": "re",
            "reading3": "to",
            "trns": "останавливаться"
        },
        {
            "knj": "族",
            "main": "zoku",
            "reading2": "zoku",
            "reading3": "zoku",
            "trns": "семья | племя"
        },
        {
            "knj": "親",
            "main": "oya",
            "reading2": "shin",
            "reading3": "shita",
            "trns": "родители | личное"
        },
        {
            "knj": "店",
            "main": "mise",
            "reading2": "ten",
            "reading3": "ten",
            "trns": "заведение | ларёк"
        }
    ]))
}

const kanjiList = JSON.parse(localStorage.getItem('kanji-list')) || []
const block = document.querySelector('.kanji-block')
const kanjiTitle = block.querySelector('.kanji')
const kanjiTranslate = block.querySelector('.translate')
const volume = document.querySelector('.volume')

let rand = 0

function randomKanji(mas) {
    rand = Math.floor(Math.random() * mas.length)
    block.dataset.kanji = rand

    if(volume.classList.contains('volumeOff')) {
        volume.setAttribute('src', '/img/volumeOff.png')
    }else {
        pronounce(kanjiList[block.dataset.kanji]['main'])
    }
}

volume.addEventListener('click', function() {
    this.classList.toggle('volumeOff')
})


function getKanjiByIndex(index) {
    return kanjiList[index]
}

function setKanji() {
    kanjiTitle.innerHTML = kanjiList[block.dataset.kanji]["knj"]
    kanjiTranslate.innerHTML = kanjiList[block.dataset.kanji]["trns"]
}

function genKanji() {
    if (kanjiList.length == 0) return;

    document.querySelector('.kanji-input').addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            let inpt = document.querySelector('.kanji-input').value.toLowerCase()
            if (inpt == kanjiList[rand]['main'] || inpt == kanjiList[rand]['reading2'] || inpt == kanjiList[rand]['reading3']) {
                kanjiTitle.classList.add('true')
                kanjiTitle.classList.remove('false')
                setTimeout(() => {
                    kanjiTitle.classList.remove('true')
                    document.querySelector('.readings').classList.remove('clicked')
                    document.querySelector('.readings').innerHTML = "Чтение"
                    document.querySelector('.kanji-input').value = ''
                    getKanjiByIndex(randomKanji(kanjiList))
                    setKanji()
                }, 500)
            } else {
                kanjiTitle.classList.add('false')
                kanjiTitle.classList.remove('true')
                setTimeout(() => {
                    kanjiTitle.classList.remove('false')
                    document.querySelector('.kanji-input').value = ''
                }, 500)
            }
        }
    })
}

document.querySelector('.readings').addEventListener('click', function () {
    this.classList.toggle('clicked');

    if (this.classList.contains('clicked')) {
        this.innerHTML = `${kanjiList[block.dataset.kanji]['main']} | ${kanjiList[rand]['reading2']} | ${kanjiList[rand]['reading3']}`
    } else {
        this.innerHTML = 'Чтения'
    }

})


function pronounce(word) {
    const text = new SpeechSynthesisUtterance(word)
    const voice = 'Microsoft Ayumi - Japanese (Japan)'
    const synth = window.speechSynthesis
    
    let voices = []
    voices = synth.getVoices()
    
    for(i = 0; i < voices.length ; i++) {
        if(voices[i].name === voice) {
            text.voice = voices[i];
        }
    }

    synth.speak(text)
}
