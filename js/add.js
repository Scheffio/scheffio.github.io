function add() {
    let addKanji = document.querySelector('.knj')
    let addMain = document.querySelector('.main')
    let addReading2 = document.querySelector('.reading2')
    let addReading3 = document.querySelector('.reading3')
    let addTrns = document.querySelector('.trns')

    if(addKanji.value != '' && addMain.value != '' && addReading2.value != '' && addReading3.value != '' && addTrns.value != '' ) {
        let obj = new Object()
        let mas = []
        obj.knj = addKanji.value
        obj.main = addMain.value
        obj.reading2 = addReading2.value
        obj.reading3 = addReading3.value
        obj.trns = addTrns.value
    
        let isExist = localStorage.getItem("kanji-list")
    
        if(isExist) {
            let existedmas = JSON.parse(localStorage.getItem("kanji-list"))
            existedmas.push(obj)
            localStorage.setItem("kanji-list", JSON.stringify(existedmas))
        }else if(!isExist) {
            mas.push(obj)
            localStorage.setItem("kanji-list", JSON.stringify(mas))
        } 
    }
}