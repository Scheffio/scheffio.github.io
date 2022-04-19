window.onload = () => {
    genKanji()
    document.querySelector('.kanji-input').focus()
}

let arr = JSON.parse(localStorage.getItem('kanji-list'))

function genKanji() {

    let kanji = document.querySelector('.kanji')
    let translate = document.querySelector('.translate')
    let readings = document.querySelector('.readings')

    var rand = Math.floor(Math.random() * arr.length)

    kanji.innerHTML = arr[rand]['knj']
    translate.innerHTML = arr[rand]['trns']
    readings.innerHTML = `${arr[rand]['main']} | ${arr[rand]['reading2']} | ${arr[rand]['reading3']}`

    document.querySelector('.kanji-input').addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            let inpt = document.querySelector('.kanji-input').value.toLowerCase()
            if(inpt == arr[rand]['main'] || inpt == arr[rand]['reading2'] || inpt == arr[rand]['reading3']) {
                kanji.classList.add('true')
                kanji.classList.remove('false')
                setTimeout(()=> {
                    kanji.classList.remove('true')
                    document.querySelector('.kanji-input').value = ''
                    genKanji()
                }, 500)
            }else {
                kanji.classList.add('false')
                kanji.classList.remove('true')
                setTimeout(()=> {
                    kanji.classList.remove('false')
                    document.querySelector('.kanji-input').value = ''
                }, 500)
            }
        }
    })
}


