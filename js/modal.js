const hardcoreBtn = document.querySelector(".hardcore-modal-content a")
const hardcoreModal = document.querySelector('.hardcore-modal')
const hardcoreOpenBtn = document.querySelector(".hardcore-btn")

const settingsBtn = document.querySelector(".settings-modal-content a")
const settingsModal = document.querySelector('.settings-modal')
const settingsOpenBtn = document.querySelector(".settings")

const close = document.querySelectorAll(".close")

hardcoreOpenBtn.addEventListener("click", () => {
    hardcoreModal.classList.remove('closing')
    hardcoreModal.classList.add('opened')
})

close.forEach((elem) => {
    elem.addEventListener('click', () => {
        hardcoreModal.classList.add('closing')
        settingsModal.classList.add('closing')
        setTimeout(() => {
            hardcoreModal.classList.remove('opened')
            settingsModal.classList.remove('opened')
        }, 500)
    })
})

settingsOpenBtn.addEventListener("click", () => {
    settingsModal.classList.remove('closing')
    settingsModal.classList.add('opened')
})
