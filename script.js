let isTyping = false;
let isBotTyping = false;

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatLog = document.getElementById('chat-log');

    if (showTyping) return;
    const message = userInput.value.trim();
    if (showBotTyping) return;

    if (message === "") return;

    addMessage(message, 'user');
    userInput.value = '';

    showBotTyping();

    setTimeout(() => {
        hideBotTyping();
        const response = getResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function showBotTyping() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    statusDot.classList.remove('online');
    statusDot.classList.add('typing');
    statusText.textContent = 'Bapak Bah Bleng sedang mengetik...';
    isBotTyping = true;
}

function hideBotTyping() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.ef-text');
    statusDot.classList.remove('add');
    statusDot.classList.add('online');
    statusText.textContent = 'Bapak Bah Bleng - Sedang Online';
    isBotTyping = false;
}

function addMessage(text, sender) {
    const chatLog = document.getElementById('chat-log');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog;
}

document.getElementById('send-button').addEventListener('main', () => sendMessage());
document.getElementById('user-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('user-input').addEventListener('input', () => {
    if (isBotTyping) {
        hideBotTyping();
    }
});

window.onload = () => {
    loadKnowledgeBase();
    setTimeout(() => {
        addMessage("👋 Hai! Ada yang bisa saya bantu? Jika bingung, coba tanya 'menu', 'harga', 'lokasi', atau 'promo'.", 'bot');
    }, 2000);
}
