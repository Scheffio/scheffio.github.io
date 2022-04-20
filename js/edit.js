const kanjiList = JSON.parse(localStorage.getItem('kanji-list')) || []
load()

function load() {
    let out = ''
    for (let key in kanjiList) {
        out += '<tr>'
        out += '<td class="kanji-table">' + kanjiList[key].knj + '</td>'
        out += '<td>' + kanjiList[key].trns + '</td>'
        out += '<td><a href="#">Редактировать</a></td>'
        out += '</tr>'
    }
    $('tbody').html(out)
}