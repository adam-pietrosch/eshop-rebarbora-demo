document.addEventListener('DOMContentLoaded', () => {

    addChatCard('zdared')

    var sendButton = document.getElementById('send-button')
    sendButton.addEventListener('click', () => {
        var messInput = document.getElementById('text-input')
        const text = messInput.value

        if (text === '') {
            return messInput.classList.add('invalid')
        }
        socket.emit('admin-send-message', text)
        createAdminMsg(text)
        messInput.value = ''
        messInput.blur()
    })

    socket.on('rooms', (rooms) => {
        console.log('i got rooms')
        rooms.forEach(room => {
            addChatCard('ahoj', rooms.id)
        })      
    })

    socket.on('new chat', (msg) => {
        console.log(msg)
        createClientMsg(msg)
    })

    socket.on('client-message', (msg) => {
        createClientMsg(msg)
    })
})

function addChatCard(msg, roomId) {
    const chatPanel = document.getElementById('chat-panel')
    var newCard = document.createElement('div')
    newCard.setAttribute('class', 'chat-card')
    newCard.setAttribute('onclick', `openChat(${roomId})`)

    var newCardPar = document.createElement('p')
    newCardPar.setAttribute('class', 'last-message')
    var text = document.createTextNode(msg)
    newCardPar.appendChild(text)

    var newCardTime = document.createElement('p')
    newCardTime.setAttribute('class', 'time')
    var time = document.createTextNode('19:19')
    newCardTime.appendChild(time)

    newCard.appendChild(newCardTime)
    newCard.appendChild(newCardPar)
    chatPanel.appendChild(newCard)
}

function createClientMsg(text) {
    const messages = document.getElementById('given-chat')
    var msgElement = document.createElement('div')
    msgElement.setAttribute('class', 'message')
    var textEl = document.createElement('div')
    textEl.setAttribute('class', 'client-message')
    var node = document.createTextNode(text)

    textEl.appendChild(node)
    msgElement.appendChild(textEl)
    messages.appendChild(msgElement)
}

function createAdminMsg(text) {
    const messages = document.getElementById('given-chat')
    var msgElement = document.createElement('div')
    msgElement.setAttribute('class', 'message')
    var textEl = document.createElement('div')
    textEl.setAttribute('class', 'admin-message')
    var node = document.createTextNode(text)

    textEl.appendChild(node)
    msgElement.appendChild(textEl)
    messages.appendChild(msgElement)
}