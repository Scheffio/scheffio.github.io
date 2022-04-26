const download = document.querySelector('.download')
const upload = document.querySelector('.upload')
const manage = document.querySelector('.saves-manage')

const downloadShow = document.querySelector('.saves-manage > a:nth-child(1)')
const uploadShow = document.querySelector('.saves-manage > a:nth-child(2)')
const backbtn = document.querySelectorAll('.show-back')

downloadShow.addEventListener('click', () => {
    download.classList.toggle('show')
    manage.classList.toggle('hide')
})

uploadShow.addEventListener('click', () => {
    upload.classList.toggle('show')
    manage.classList.toggle('hide')
})

backbtn.forEach((elem) => {
    elem.addEventListener('click', () => {
        download.classList.remove('show')
        upload.classList.remove('show')
        manage.classList.toggle('hide')
    })
})

const uploadKanji = document.querySelector('.upload-kanji')
const uploadWords = document.querySelector('.upload-words')

const downloadKanji = document.querySelector('.download-kanji')
const downloadWords = document.querySelector('.download-words')

uploadWords.addEventListener('change', onChange)
uploadKanji.addEventListener('change', onChange)

function onChange(event) {
    let reader = new FileReader()
    if (event.target.classList.contains('upload-words')) {
        reader.onload = loadWords
        reader.readAsText(event.target.files[0])
    } else {
        reader.onload = loadKanji
        reader.readAsText(event.target.files[0])
    }
}

function loadWords(event) {
    let uploadedSave = JSON.parse(event.target.result);
    localStorage.setItem('words-list', JSON.stringify(uploadedSave))
    alert('Слова успешно загружены!')
}

function loadKanji(event) {
    let uploadedSave = JSON.parse(event.target.result);
    localStorage.setItem('kanji-list', JSON.stringify(uploadedSave))
    alert('Канджи успешно загружены!')
}

function exportKanji(elem) {
    let data = "text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('kanji-list'))

    elem.setAttribute("href", "data:" + data);
    elem.setAttribute("download", "manabu-kanji.json");
}

function exportWords(elem) {
    let data = "text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('words-list'))

    elem.setAttribute("href", "data:" + data);
    elem.setAttribute("download", "manabu-words.json");
}