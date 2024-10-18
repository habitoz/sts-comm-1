const ws = new WebSocket('ws://localhost:3000');

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesDiv = document.getElementById('messages');

const sendMessage = () => {
    const message = messageInput.value;
    const li = document.createElement('li');
    li.classList.add(['sent'])
    li.textContent = message;
    messagesDiv.appendChild(li);

    if (message) {
        ws.send(JSON.stringify({ event: "BillProcessed", message })); // Send the message via WebSocket  
        messageInput.value = '';
    }
}
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
        event.preventDefault();
    }
});

// Event listener for receiving messages from the WebSocket server  
ws.onmessage = async (event) => {
    const data = await event.data.text();

    const li = document.createElement('li');
    li.classList.add(['received'])
    li.textContent = JSON.parse(data)?.message; // Get the message data received from the server  
    messagesDiv.appendChild(li);
};

// Optional: Handle WebSocket open event  
ws.onopen = () => {
    console.log('WebSocket connection established');
};

// Optional: Handle WebSocket error event  
ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

// Optional: Handle WebSocket close event  
ws.onclose = () => {
    console.log('WebSocket connection closed');
};