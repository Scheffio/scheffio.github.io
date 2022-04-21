const words = ['Новичков', 
                'Любителей', 
                'Опытных', 
                'Профессионалов', 
                'Носителей']

const text = document.querySelector('.text')

setInterval(() => {
    let rand = Math.floor(Math.random() * words.length)
    text.innerHTML = words[rand]
    
}, 1500)