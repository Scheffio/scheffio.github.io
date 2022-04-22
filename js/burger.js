const burgerbtn = document.querySelector(".burger")
const menuBlock = document.querySelector(".menu")
let isShowed = false

const body = document.querySelector('body')


burgerbtn.addEventListener("click", () => {
    if (!isShowed) {
        burgerbtn.classList.toggle("open-menu")
        menuBlock.classList.remove("hide-menu")
        menuBlock.classList.add("open-menu")
        body.classList.toggle("open-menu")
        isShowed = true
    } else if (isShowed) {
        menuBlock.classList.add("hide-menu")
        body.classList.toggle("open-menu")
        setTimeout(() => {
            menuBlock.classList.remove("open-menu")
        }, 500)
        burgerbtn.classList.toggle("open-menu")
        isShowed = false
    }
})
