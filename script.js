let reminders = [];
let reminderInterval;

function addReminder() {
  const text = document.getElementById('reminderText').value;
  const time = new Date(document.getElementById('reminderTime').value).getTime();
  
  if (!text || isNaN(time)) {
    alert("Please enter both reminder text and time.");
    return;
  }

  const id = Date.now();
  const reminder = { id, text, time, timeout: null };

  // Set a timeout for the reminder
  reminder.timeout = setTimeout(() => {
    alert(Reminder: ${text});
    deleteReminder(id);
  }, time - Date.now());

  reminders.push(reminder);
  renderReminders();
}

function editReminder(id) {
  const reminder = reminders.find(r => r.id === id);
  const newText = prompt("Edit reminder text:", reminder.text);
  const newTime = prompt("Edit reminder time (YYYY-MM-DD HH:MM):", new Date(reminder.time).toISOString().slice(0, 16));

  if (newText && newTime) {
    clearTimeout(reminder.timeout);
    reminder.text = newText;
    reminder.time = new Date(newTime).getTime();
    reminder.timeout = setTimeout(() => {
      alert(Reminder: ${newText});
      deleteReminder(id);
    }, reminder.time - Date.now());
    renderReminders();
  }
}

function deleteReminder(id) {
  const index = reminders.findIndex(r => r.id === id);
  if (index !== -1) {
    clearTimeout(reminders[index].timeout);
    reminders.splice(index, 1);
    renderReminders();
  }
}

function renderReminders() {
  const list = document.getElementById('reminderList');
  list.innerHTML = '';
  reminders.forEach(reminder => {
    const li = document.createElement('li');
    li.textContent = ${reminder.text} - ${new Date(reminder.time).toLocaleString()};
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editReminder(reminder.id);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteReminder(reminder.id);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}