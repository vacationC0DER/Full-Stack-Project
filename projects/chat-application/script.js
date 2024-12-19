// script.js

document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        addMessage('user', messageText);
        messageInput.value = '';
        // Simulate bot response
        setTimeout(() => {
            addMessage('bot', getBotResponse(messageText));
        }, 1000);
    }
});

/**
 * Adds a message to the chat box.
 * @param {string} sender - 'user' or 'bot'
 * @param {string} text - The message text
 */
function addMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.textContent = text;

    messageDiv.appendChild(textSpan);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Generates a simple bot response.
 * @param {string} userMessage - The user's message
 * @returns {string} - Bot's response
 */
function getBotResponse(userMessage) {
    // Simple echo bot logic
    return `You said: "${userMessage}". How can I assist you further?`;
}