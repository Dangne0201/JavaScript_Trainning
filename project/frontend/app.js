const taskForm = document.querySelector('#task-form');
const taskTitle = document.querySelector('#task-title');
const taskList = document.querySelector('#task-list');
const message = document.querySelector('#message');

const showMessage = (text = '') => {
  message.textContent = text;
};

const loadTasks = async () => {
  const response = await fetch('/api/tasks');
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Could not load tasks');
  }

  taskList.innerHTML = '';
  result.data.forEach((task) => {
    const item = document.createElement('li');
    const title = document.createElement('span');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    title.textContent = task.title;
    doneButton.textContent = task.status === 'done' ? 'Undo' : 'Done';
    deleteButton.textContent = 'Delete';

    doneButton.addEventListener('click', () => updateTask(task));
    deleteButton.addEventListener('click', () => deleteTask(task._id));

    item.append(title, ' ', doneButton, ' ', deleteButton);
    taskList.append(item);
  });
};

const updateTask = async (task) => {
  await fetch(`/api/tasks/${task._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: task.title,
      status: task.status === 'done' ? 'todo' : 'done',
    }),
  });

  await loadTasks();
};

const deleteTask = async (id) => {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  await loadTasks();
};

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskTitle.value }),
    });
    taskTitle.value = '';
    showMessage('');
    await loadTasks();
  } catch (error) {
    showMessage(error.message);
  }
});

loadTasks().catch((error) => showMessage(error.message));
