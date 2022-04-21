const kanjiList = JSON.parse(localStorage.getItem('kanji-list')) || []
loadpr()

function loadpr() {
    let out = ''
    for (let key in kanjiList) {
        out += '<tr>'
        out += '<td class="kanji-table">' + kanjiList[key].knj + '</td>'
        out += '<td>' + kanjiList[key].trns + '</td>'
        out += '<td><a href="#" onclick="deleteKanji(this)" data-id="'+key+'">Удалить</a></td>'
        out += '</tr>'
    }
    $('tbody').html(out)
}

function deleteKanji(e) {
    let itemtodelete = kanjiList.splice(e.getAttribute("data-id"),1)
    let newarr = kanjiList.filter(el => !itemtodelete.includes(el))
    
    localStorage.setItem("kanji-list", JSON.stringify(newarr))
    document.querySelector('tbody').innerHTML = ''
    loadpr()
}

