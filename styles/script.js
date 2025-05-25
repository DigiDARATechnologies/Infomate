function checkQdrantStatus() {
    fetch('/check-qdrant', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const statusBox = document.getElementById('qdrant-status');
        if (data.success) {
            statusBox.innerHTML = `Qdrant Cloud Status: ${data.status.status_code === 200 ? 'Online' : 'Offline'}`;
        } else {
            statusBox.innerHTML = `Qdrant Cloud Status: Error - ${data.message}`;
        }
    })
    .catch(error => {
        document.getElementById('qdrant-status').innerHTML = 'Qdrant Cloud Status: Error - Could not reach server.';
        console.error('Error:', error);
    });
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    // Display user message
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="message user"><span>${userInput}</span></div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    document.getElementById('user-input').value = '';

    // Send message to Flask backend
    fetch('/chat', {
        method: 'POST',
        body: new FormData(createForm(userInput)),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Display bot response
            chatBox.innerHTML += `<div class="message bot"><span>${data.message}</span></div>`;
        } else {
            chatBox.innerHTML += `<div class="message bot"><span>Error: ${data.message}</span></div>`;
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        chatBox.innerHTML += `<div class="message bot"><span>Error: Could not reach the server.</span></div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        console.error('Error:', error);
    });
}

// Create a form to send data (since Flask expects form data)
function createForm(message) {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.name = 'message';
    input.value = message;
    form.appendChild(input);
    return form;
}

// Allow sending message with Enter key
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Check Qdrant Cloud status on page load
window.onload = checkQdrantStatus;