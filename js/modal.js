const btn = document.querySelector(".modal-content a")
const close = document.querySelector(".close")
const modal = document.querySelector('.modal')
const openbtn = document.querySelector(".hardcore-btn")

openbtn.addEventListener("click", () => {
    modal.classList.remove('closing')
    modal.classList.add('opened')
})

close.addEventListener('click', () => {
    modal.classList.add('closing')
    setTimeout(() => {
        modal.classList.remove('opened')
    }, 500)
})
