const socket = io();

// Listen for form submission
document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('message-input');
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Listen for chat messages from the server
socket.on('chat message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  document.getElementById('messages').appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});