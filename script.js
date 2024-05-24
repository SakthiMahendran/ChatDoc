document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
document.getElementById('upload-button').addEventListener('click', () => {
    document.getElementById('file-input').click();
});
document.getElementById('file-input').addEventListener('change', handleFileUpload);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    addMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    // Send message to backend
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.message;
        addMessage(botResponse, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage('An error occurred. Please try again later.', 'bot');
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const allowedExtensions = ['pdf', 'csv', 'xls'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        alert('Invalid file type. Please upload a .pdf, .csv, or .xls file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const fileContent = e.target.result;
        // Display the file content as a message
        addMessage(`Uploaded file: ${file.name}`, 'user');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = `Bot received the file: ${file.name}`;
            addMessage(botResponse, 'bot');
        }, 1000);
    };

    if (fileExtension === 'pdf') {
        reader.readAsArrayBuffer(file); // Read PDF as ArrayBuffer
    } else {
        reader.readAsText(file); // Read CSV and XLS as text
    }
}

function addMessage(text, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', `${sender}-message`);
    messageContainer.innerText = text;

    document.getElementById('messages').appendChild(messageContainer);
    document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
}
