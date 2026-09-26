const authPanel = document.querySelector("#auth-panel");
const authForm = document.querySelector("#auth-form");
const authTitle = document.querySelector("#auth-title");
const authDescription = document.querySelector("#auth-description");
const authSubmit = document.querySelector("#auth-submit");
const authToggle = document.querySelector("#auth-toggle");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const account = document.querySelector("#account");
const usernameLabel = document.querySelector("#username-label");
const taskApp = document.querySelector("#task-app");
const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const message = document.querySelector("#message");
const taskCount = document.querySelector("#task-count");
const pageLabel = document.querySelector("#page-label");
const previousPage = document.querySelector("#previous-page");
const nextPage = document.querySelector("#next-page");

const state = {
  authMode: "login",
  user: null,
  page: 1,
  totalPages: 1,
  limit: 10,
};

const showMessage = (text = "", type = "error") => {
  message.textContent = text;
  message.classList.toggle("success", type === "success");
};

const formatDueDate = (value) => {
  const date = new Date(`${value.slice(0, 10)}T00:00:00.000Z`);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
};

const request = async (url, options = {}) => {
  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Could not connect to the server. Check that the app is running.",
    );
  }

  const result = response.headers
    .get("content-type")
    ?.includes("application/json")
    ? await response.json()
    : {};

  if (!response.ok) {
    const error = new Error(
      result.message || `Request failed (${response.status})`,
    );
    error.status = response.status;
    throw error;
  }
  return result;
};

const setAuthenticatedView = (user) => {
  state.user = user;
  authPanel.hidden = Boolean(user);
  taskApp.hidden = !user;
  account.hidden = !user;
  usernameLabel.textContent = user ? `Signed in as ${user.username}` : "";
  showMessage("");
};

const updateAuthForm = () => {
  const registering = state.authMode === "register";
  authTitle.textContent = registering ? "Create your account" : "Welcome back";
  authDescription.textContent = registering
    ? "Choose a username and a password of at least 12 characters."
    : "Sign in to view and manage your tasks.";
  authSubmit.textContent = registering ? "Create account" : "Sign in";
  authToggle.textContent = registering
    ? "I already have an account"
    : "Create an account";
  passwordInput.autocomplete = registering
    ? "new-password"
    : "current-password";
};

const renderTask = (task) => {
  const item = document.createElement("li");
  item.className = "task-card";

  const details = document.createElement("div");
  details.className = "task-details";
  const title = document.createElement("h3");
  title.textContent = task.title;

  const metadata = document.createElement("p");
  metadata.className = "task-metadata";
  const dueDate = task.dueDate ? formatDueDate(task.dueDate) : "No due date";
  metadata.textContent = `${task.status.replace("_", " ")} · ${task.priority} priority · ${dueDate}`;

  const tags = document.createElement("p");
  tags.className = "task-tags";
  tags.textContent = task.tags.length
    ? task.tags.map((tag) => `#${tag}`).join(" ")
    : "";
  details.append(title, metadata, tags);

  const actions = document.createElement("div");
  actions.className = "task-actions";
  const doneButton = document.createElement("button");
  doneButton.type = "button";
  doneButton.className = "button button-secondary";
  doneButton.textContent = task.status === "done" ? "Undo" : "Done";
  doneButton.addEventListener("click", () =>
    updateTask(task._id, { status: task.status === "done" ? "todo" : "done" }),
  );

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "button button-danger";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(task._id));
  actions.append(doneButton, deleteButton);

  const edit = document.createElement("details");
  edit.className = "edit-details";
  const editSummary = document.createElement("summary");
  editSummary.textContent = "Edit";
  const editForm = document.createElement("form");
  editForm.className = "edit-form";

  const titleInput = document.createElement("input");
  titleInput.value = task.title;
  titleInput.maxLength = 200;
  titleInput.required = true;
  titleInput.setAttribute("aria-label", "Task title");

  const statusInput = document.createElement("select");
  statusInput.setAttribute("aria-label", "Task status");
  [
    ["backlog", "Backlog"],
    ["todo", "To do"],
    ["in_progress", "In progress"],
    ["done", "Done"],
  ].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    statusInput.append(option);
  });
  statusInput.value = task.status;

  const priorityInput = document.createElement("select");
  priorityInput.setAttribute("aria-label", "Task priority");
  ["low", "medium", "high"].forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `${value[0].toUpperCase()}${value.slice(1)} priority`;
    priorityInput.append(option);
  });
  priorityInput.value = task.priority;

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.value = task.dueDate ? task.dueDate.slice(0, 10) : "";
  dueDateInput.setAttribute("aria-label", "Due date");

  const tagsInput = document.createElement("input");
  tagsInput.value = task.tags.join(", ");
  tagsInput.maxLength = 320;
  tagsInput.setAttribute("aria-label", "Tags, comma-separated");

  const saveButton = document.createElement("button");
  saveButton.className = "button";
  saveButton.type = "submit";
  saveButton.textContent = "Save changes";
  editForm.append(
    titleInput,
    statusInput,
    priorityInput,
    dueDateInput,
    tagsInput,
    saveButton,
  );
  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fields = {
      title: titleInput.value,
      status: statusInput.value,
      priority: priorityInput.value,
      dueDate: dueDateInput.value || null,
      tags: tagsInput.value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    await updateTask(task._id, fields);
  });
  edit.append(editSummary, editForm);

  item.append(details, actions, edit);
  return item;
};

const loadTasks = async () => {
  const params = new URLSearchParams({
    page: String(state.page),
    limit: String(state.limit),
    sortBy: document.querySelector("#sort-by").value,
    order: document.querySelector("#sort-order").value,
  });
  const search = document.querySelector("#search").value.trim();
  const status = document.querySelector("#filter-status").value;
  const priority = document.querySelector("#filter-priority").value;
  const tag = document.querySelector("#filter-tag").value.trim();
  if (search) params.set("q", search);
  if (status) params.set("status", status);
  if (priority) params.set("priority", priority);
  if (tag) params.set("tag", tag);

  const result = await request(`/api/tasks?${params}`);
  if (state.page > Math.max(1, result.pagination.totalPages)) {
    state.page = Math.max(1, result.pagination.totalPages);
    return loadTasks();
  }
  taskList.replaceChildren(...result.data.map(renderTask));
  state.totalPages = Math.max(1, result.pagination.totalPages);
  taskCount.textContent = `${result.pagination.total} task${result.pagination.total === 1 ? "" : "s"}`;
  pageLabel.textContent = `Page ${state.page} of ${state.totalPages}`;
  previousPage.disabled = state.page <= 1;
  nextPage.disabled = state.page >= state.totalPages;
};

const refreshTasks = async () => {
  try {
    await loadTasks();
    showMessage("");
  } catch (error) {
    showMessage(error.message);
  }
};

const updateTask = async (id, fields) => {
  try {
    await request(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
    });
    showMessage("Task updated.", "success");
    await loadTasks();
  } catch (error) {
    showMessage(error.message);
  }
};

const deleteTask = async (id) => {
  try {
    await request(`/api/tasks/${id}`, { method: "DELETE" });
    showMessage("Task deleted.", "success");
    await loadTasks();
  } catch (error) {
    showMessage(error.message);
  }
};

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const endpoint = state.authMode === "register" ? "register" : "login";
  try {
    const result = await request(`/api/auth/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value,
      }),
    });
    setAuthenticatedView(result.data);
    passwordInput.value = "";
    await loadTasks();
  } catch (error) {
    showMessage(error.message);
  }
});

authToggle.addEventListener("click", () => {
  state.authMode = state.authMode === "login" ? "register" : "login";
  updateAuthForm();
  showMessage("");
});

document.querySelector("#logout-button").addEventListener("click", async () => {
  try {
    await request("/api/auth/logout", { method: "POST" });
    setAuthenticatedView(null);
    taskList.replaceChildren();
  } catch (error) {
    showMessage(error.message);
  }
});

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const tags = document
    .querySelector("#task-tags")
    .value.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const dueDate = document.querySelector("#task-due-date").value;

  try {
    await request("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: document.querySelector("#task-title").value,
        priority: document.querySelector("#task-priority").value,
        dueDate: dueDate || null,
        tags,
      }),
    });
    taskForm.reset();
    document.querySelector("#task-priority").value = "medium";
    state.page = 1;
    showMessage("Task created.", "success");
    await loadTasks();
  } catch (error) {
    showMessage(error.message);
  }
});

document
  .querySelector("#filter-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    state.page = 1;
    await refreshTasks();
  });

previousPage.addEventListener("click", async () => {
  state.page = Math.max(1, state.page - 1);
  await refreshTasks();
});

nextPage.addEventListener("click", async () => {
  state.page = Math.min(state.totalPages, state.page + 1);
  await refreshTasks();
});

const initialize = async () => {
  updateAuthForm();
  try {
    const result = await request("/api/auth/me");
    setAuthenticatedView(result.data);
    await loadTasks();
  } catch (error) {
    setAuthenticatedView(null);
    if (error.status !== 401) showMessage(error.message);
  }
};

initialize();
