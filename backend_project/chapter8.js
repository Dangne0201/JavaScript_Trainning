// Tên key dùng để lưu danh sách todo trong Local Storage.
const TODO_STORAGE_KEY = 'todos';

// Địa chỉ API blogs do json-server cung cấp.
const BLOG_API_URL = 'http://localhost:8000/blogs';

// Tạo một số nguyên ngẫu nhiên trong khoảng từ min đến max.
// Dùng để tạo id cho todo mới.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Đọc danh sách todo từ Local Storage.
// Local Storage chỉ lưu được chuỗi nên cần JSON.parse để đổi chuỗi thành array.
function getTodos() {
  return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || '[]');
}

// Hiển thị thông báo thành công hoặc lỗi lên giao diện.
function setMessage(elementId, text, isError = false) {
  const element = document.querySelector(`#${elementId}`);
  element.textContent = text;
  element.classList.toggle('error', isError);
}

// Đọc todo từ Local Storage và vẽ lại toàn bộ các dòng trong bảng.
function renderTodos() {
  const tableBody = document.querySelector('#todo-table tbody');
  const todos = getTodos();
  tableBody.innerHTML = '';

  todos.forEach((todo) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${todo.id}</td>
      <td>${todo.name}</td>
      <td><button class="delete-btn todo-delete-btn" data-id="${todo.id}">Xóa</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Bắt sự kiện submit form tạo todo mới.
document.querySelector('#todo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#todo-name');
  const name = input.value.trim();

  // Không làm gì nếu người dùng chưa nhập tên todo.
  if (!name) return;

  const todos = getTodos();
  todos.push({ id: getRandomInt(1, 1000000), name });
  // JSON.stringify đổi array thành chuỗi để Local Storage có thể lưu được.
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  input.value = '';
  renderTodos();
  setMessage('todo-message', 'Đã thêm todo thành công.');
});

// Bắt sự kiện click ở tbody để xử lý nút xóa todo.
// event.target là phần tử thực sự được người dùng click.
document.querySelector('#todo-table tbody').addEventListener('click', (event) => {
  if (!event.target.classList.contains('todo-delete-btn')) return;

  const id = Number(event.target.dataset.id);
  // filter tạo ra array mới, chỉ giữ lại những todo không trùng id cần xóa.
  const todos = getTodos().filter((todo) => todo.id !== id);
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  renderTodos();
  setMessage('todo-message', 'Đã xóa todo.');
});

// Tạo một dòng HTML trong bảng blog từ dữ liệu của một blog.
function createBlogRow(blog) {
  const row = document.createElement('tr');
  row.dataset.id = blog.id;
  row.innerHTML = `
    <td>${blog.id}</td>
    <td>${blog.title}</td>
    <td>${blog.author}</td>
    <td>${blog.content}</td>
    <td><button class="delete-btn blog-delete-btn" data-id="${blog.id}">Xóa</button></td>
  `;
  return row;
}

// Lấy danh sách blog từ API bằng phương thức GET rồi hiển thị lên bảng.
// async/await giúp viết code gọi API dễ đọc hơn.
async function loadBlogs() {
  try {
    const response = await fetch(BLOG_API_URL); // GET là phương thức mặc định.
    if (!response.ok) throw new Error('Không thể lấy danh sách blog.');

    const blogs = await response.json(); // Đổi dữ liệu JSON từ server thành array JavaScript.
    const tableBody = document.querySelector('#blog-table tbody');
    tableBody.innerHTML = '';
    blogs.forEach((blog) => tableBody.appendChild(createBlogRow(blog)));
  } catch (error) {
    setMessage('blog-message', `${error.message} Hãy chạy npm run dev trước.`, true);
  }
}

// Bắt sự kiện submit form và gửi blog mới lên API bằng phương thức POST.
document.querySelector('#blog-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const blog = {
    title: document.querySelector('#blog-title').value.trim(),
    author: document.querySelector('#blog-author').value.trim(),
    content: document.querySelector('#blog-content').value.trim()
  };

  try {
    const response = await fetch(BLOG_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // JSON.stringify đổi object JavaScript thành chuỗi JSON để gửi lên server.
      body: JSON.stringify(blog)
    });
    if (!response.ok) throw new Error('Không thể tạo blog.');

    const newBlog = await response.json();
// Bắt sự kiện click ở tbody để xử lý nút xóa blog.
    document.querySelector('#blog-table tbody').appendChild(createBlogRow(newBlog));
    event.target.reset();
    setMessage('blog-message', 'Đã thêm blog thành công.');
  } catch (error) {
    setMessage('blog-message', `${error.message} Hãy kiểm tra json-server.`, true);
  }
});

document.querySelector('#blog-table tbody').addEventListener('click', async (event) => {
  if (!event.target.classList.contains('blog-delete-btn')) return;

  const button = event.target;
  // data-id trong HTML được đọc bằng dataset.id.
  const id = button.dataset.id;
  button.disabled = true;

  try {
    // Gọi API DELETE /blogs/:id để xóa blog trên server.
    const response = await fetch(`${BLOG_API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Không thể xóa blog.');

    button.closest('tr').remove();
    setMessage('blog-message', 'Đã xóa blog.');
  } catch (error) {
    button.disabled = false;
    setMessage('blog-message', `${error.message} Hãy kiểm tra json-server.`, true);
  }
});

// Chạy hai chức năng khởi tạo khi file JavaScript được load.
renderTodos();
loadBlogs();
