let messages = [];
let isRecording = false;
document.getElementById('senderName').addEventListener('input', renderMessages);

function addMessage(sender, content, time, isHeader = false, status = '') {
    messages.push({ sender, content, time, isHeader, status });
    renderMessages();
}

function renderMessages() {
    const chatMessages = document.getElementById('chatMessages');
    const senderName = document.getElementById('senderName').value;
    chatMessages.innerHTML = '';
    messages.forEach((msg, index) => {
        if (msg.isHeader) {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'message-header';
            headerDiv.textContent = msg.content;
            chatMessages.appendChild(headerDiv);
        } else {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender === 'user' ? 'sent' : 'received'}`;
            
            if (msg.sender !== 'user' && (index === 0 || messages[index - 1].sender !== msg.sender)) {
                const senderNameDiv = document.createElement('div');
                senderNameDiv.className = 'sender-name';
                senderNameDiv.textContent = `~ ${senderName}`;
                messageDiv.appendChild(senderNameDiv);
            }
            
            const contentSpan = document.createElement('span');
            contentSpan.className = 'content';
            contentSpan.textContent = msg.content;
            messageDiv.appendChild(contentSpan);
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'time';
            timeSpan.textContent = msg.time;
            if (msg.sender === 'user') {
                const statusSpan = document.createElement('span');
                statusSpan.className = `status ${msg.status}`;
                statusSpan.innerHTML = msg.status === 'read' ? '&#10004;&#10004;' : '&#10004;';
                timeSpan.appendChild(statusSpan);
            }
            messageDiv.appendChild(timeSpan);
            
            chatMessages.appendChild(messageDiv);
        }
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.querySelector('.voice-record-btn').addEventListener('click', toggleVoiceRecord);

function sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();
    if (content) {
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        addMessage('user', content, time, false, 'sent');
        input.value = '';
    }
}

function toggleVoiceRecord() {
    const voiceButton = document.querySelector('.voice-record-btn i');
    isRecording = !isRecording;
    voiceButton.className = isRecording ? 'fas fa-stop' : 'fas fa-microphone';
    
    if (isRecording) {
        setTimeout(() => {
            toggleVoiceRecord();
            const now = new Date();
            const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            addMessage('user', '🎤 Ses kaydı', time, false, 'sent');
        }, 3000);
    }
}

// Emoji picker functionality
const emojiBtn = document.querySelector('.emoji-btn');
const emojiPicker = document.querySelector('.emoji-picker');

emojiBtn.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'flex' : 'none';
});

// Generator controls
document.getElementById('groupName').addEventListener('input', (e) => {
    document.getElementById('groupNameDisplay').textContent = e.target.value;
});

document.getElementById('groupMembers').addEventListener('input', (e) => {
    document.getElementById('groupMembersDisplay').textContent = e.target.value;
});

document.getElementById('statusBarTime').addEventListener('input', (e) => {
    document.getElementById('statusBarTimeDisplay').textContent = e.target.value;
});

document.getElementById('addNewMessage').addEventListener('click', () => {
    const sender = document.getElementById('newMessageSender').value;
    const content = document.getElementById('newMessageContent').value;
    const time = document.getElementById('newMessageTime').value;
    if (content) {
        addMessage(sender, content, time, false, sender === 'user' ? 'sent' : '');
        document.getElementById('newMessageContent').value = '';
    }
});

document.getElementById('clearMessages').addEventListener('click', () => {
    messages = [];
    renderMessages();
});

// Initialize with example messages
addMessage('system', 'Messages are encrypted.', '', true);
addMessage('other', 'how are u bro', 'ÖS 5:53');
addMessage('user', 'nice! urs?', 'ÖS 7:01');
addMessage('other', 'same!', 'ÖS 7:02');
addMessage('user', 'nice, wanna meet?', 'ÖS 7:03');
addMessage('other', 'when?', 'ÖS 7:03');
