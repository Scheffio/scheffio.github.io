const kanjiList = JSON.parse(localStorage.getItem('kanji-list')) || []
load()

function load() {
    let out = ''
    for (let key in kanjiList) {
        out += '<tr>'
        out += '<td class="kanji-table"><input id="newkanji" data-kanji="' + kanjiList[key].knj + '" value="' + kanjiList[key].knj + '"></td>'
        out += '<td><input id="new-translation" data-kanji="' + kanjiList[key].knj + '" value="' + kanjiList[key].trns + '"></td>'
        out += '<td><input id="new-pron1" data-kanji="' + kanjiList[key].knj + '" value="' + kanjiList[key].main + '"></td>'
        out += '<td><input id="new-pron2" data-kanji="' + kanjiList[key].knj + '" value="' + kanjiList[key].reading2 + '"></td>'
        out += '<td><input id="new-pron3" data-kanji="' + kanjiList[key].knj + '" value="' + kanjiList[key].reading3 + '"></td>'
        out += '<td><a href="#" onclick="save(this)" data-kanji="' + kanjiList[key].knj + '">Сохранить</a></td>'
        out += '</tr>'
    }
    $('tbody').html(out)
}

function save(e) {
    const oldkanji = e.dataset.kanji

    let newkanji = ''
    let newtranslation = ''
    let newmain = ''
    let newreading2 = ''
    let newreading3 = ''

    let obj = new Object()

    let isExist = localStorage.getItem("kanji-list")

    if(isExist) {
        let existedmas = JSON.parse(localStorage.getItem("kanji-list"))
        existedmas.forEach((elem) => {
            if(elem.knj == oldkanji) {
                document.querySelectorAll("input").forEach((input) => {
                    if(input.dataset.kanji = oldkanji) {
                        if(input.id == 'newkanji') {
                            newkanji = input.value
                        }else if(input.id == 'new-translation') {
                            newtranslation = input.value
                        }else if(input.id == 'newmain') {
                            newmain.id == input.value
                        }else if(input.id == 'newreading2') {
                            newreading2.id == input.value
                        }else if(input.id == 'newreading3') {
                            newreading3.id == input.value
                        }
                    } 
                })
                elem.knj = newkanji
                elem.trns = newtranslation
                elem.main = newmain
                elem.reading2 = newreading2
                elem.reading3 = newreading3
            }
        })
        existedmas.push(obj)
        localStorage.setItem("kanji-list", JSON.stringify(existedmas))
    }
}