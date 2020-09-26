var chatIcon = document.getElementById('chat-icon')

document.addEventListener('DOMContentLoaded', () => {

    // open chat after clicked
    chatIcon.addEventListener('click', () => {
        socket.emit('new user')

        gsap.to('#chat', {
            duration: .4,
            display: 'block',
            opacity: 1,
            height: '38rem'
        })
        chatIcon.style.display = 'none'

        var closeIcon = document.getElementById('close-icon')
        closeIcon.addEventListener('click', () => {
            gsap.to('#chat', {
                duration: .3,
                display: 'none',
                opacity: 0,
                height: '0rem'
            })
            chatIcon.style.display = 'block'
        })

        var submitButton = document.getElementById('submit')

        submitButton.addEventListener('click', () => {
            var messInput = document.getElementById('message-input')
            const text = messInput.value

            if (text === '') {
                return messInput.classList.add('invalid')
            }
            socket.emit('client-send-message', text)
            createClientMsg(text)
            messInput.value = ''
            messInput.blur()
           
        })
    })
    socket.on('admin-message', (msg) => {
        console.log('i have got something')
        createAdminMsg(msg)
    })

})

function createClientMsg(text) {
    const messages = document.getElementById('messages-container')
    var msgElement = document.createElement('div')
    msgElement.setAttribute('class', 'message');
    var par = document.createElement('p')
    par.setAttribute('class', 'client');
    var node = document.createTextNode(text);

    par.appendChild(node)
    msgElement.appendChild(par)
    messages.appendChild(msgElement)
}

function createAdminMsg(text) {
    const messages = document.getElementById('messages-container')
    var msgElement = document.createElement('div')
    msgElement.setAttribute('class', 'message');
    var par = document.createElement('p')
    par.setAttribute('class', 'admin');
    var node = document.createTextNode(text);

    par.appendChild(node)
    msgElement.appendChild(par)
    messages.appendChild(msgElement)
}


