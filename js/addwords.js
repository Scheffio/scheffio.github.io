function addword() {
    const word = document.querySelector('.word')
    const translate = document.querySelector('.word-translate')
    const reading = document.querySelector('.reading')

    if(word.value != '' && translate.value != '' && reading.value != '') {
        let obj = new Object()
        let mas = []
        obj.word = word.value
        obj.reading = reading.value
        obj.translate = translate.value
    
        let isExist = localStorage.getItem("words-list")
    
        if(isExist) {
            let existedmas = JSON.parse(localStorage.getItem("words-list"))
            existedmas.push(obj)
            localStorage.setItem("words-list", JSON.stringify(existedmas))
        }else if(!isExist) {
            mas.push(obj)
            localStorage.setItem("words-list", JSON.stringify(mas))
        } 
    }else {
        alert("Вы заполнили не все поля!")
    }
}
