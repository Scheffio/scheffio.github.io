let burgerbtn = document.querySelector(".burger")
let menuBlock = document.querySelector(".menu")
let isShowed = false

burgerbtn.addEventListener("click", () => {
    if (!isShowed) {
        burgerbtn.classList.toggle("open-menu")
        menuBlock.classList.remove("hide-menu")
        menuBlock.classList.add("open-menu")
        isShowed = true
    } else if (isShowed) {
        menuBlock.classList.add("hide-menu")
        setTimeout(() => {
            menuBlock.classList.remove("open-menu")
        }, 500)
        burgerbtn.classList.toggle("open-menu")
        isShowed = false
    }
})
