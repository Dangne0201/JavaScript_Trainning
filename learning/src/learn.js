// var name = "Eric"; // không có kiểm soát phạm vi của biến, rộng nhưng tìm ẩn lỗi, ít khi dùng var

// const name1 = "Other Name"; // không thể gán giá trị

// let age = 20; // có thể gán giá trị, kiểm soát phạm vi của biến

// console.log(name);
// console.log(name1);
// console.log(age);

// const Myage = 30; 
// Myage = 40; 

// console.log(Myage); // sẽ báo lỗi vì không thể gán giá trị cho const

// // ========================================================================================

// // number

// const Myage = 30;
// const Myscore = 9.1;

// console.log(Myage);
// console.log(Myscore);

// // string

// const Myname = "Eric";
// const Myfullname = "Eric Tran";

// console.log(Myname);
// console.log(Myfullname);

// // boolean

// const isMale = true;
// const isFemale = false;

// console.log(isMale);
// console.log(isFemale);

// // undefined

// let Myaddress; 
// console.log(Myaddress); // sẽ trả về undefined vì chưa gán giá trị

// // null

// const Mycity = null;
// console.log(Mycity); // sẽ trả về null vì đã gán giá trị null


// // ========================================================================================


// // object: key: value

// const Myobject = {
//   name: "Eric",
//   age: 30,
//   isMale: true
// };
// console.log(Myobject);

// // array: [value1, value2, value3]

// const Myarray = ["Eric", 30, true];
// console.log(Myarray);

// // ========================================================================================


// console.log("Hello World");
// console.warn("This is a warning message");
// console.error("This is an error message");


// let name = "Eric";
// let age = 30;

// console.log("My name is " + name + " and I am " + age + " years old."); // không dùng template string, khộng đẹp, khó đọc, dễ lỗi khi gán giá trị biến
// console.log(`My name is ${name} and I am ${age} years old.`); // dùng template string, đẹp, dễ đọc, không lỗi khi gán giá trị biến
// console.log("Name: ", name, "Age: ", age); // dùng console.log nhiều biến, đẹp, dễ đọc, không lỗi khi gán giá trị biến

// // ========================================================================================

// // if / else

// let age = 20;
// if (age >= 18) {
//   console.log("You are an adult.");
// } else {
//   console.log("You are not an adult.");
// }

// let score = 9.1;
// if (score >= 9) {
//   console.log("You are an excellent student.");
// } else if (score >= 7) {
//   console.log("You are a good student.");
// } else {
//   console.log("You need to work harder.");
// }

// // ========================================================================================

// // switch / case

// let score = 9;
// // switch (score) {
// //   case 10:
// //     console.log("You are an excellent student.");
// //     break;
// //   case 9:
// //     console.log("You are a good student.");
// //     break;
// //   default:
// //     console.log("You need to work harder.");
// // }

// switch (score) {
//     case (score >= 9 && score <= 10):
//         console.log("You are an excellent student.");
//         break;
//     case (score >= 7 && score < 9):
//         console.log("You are a good student.");
//         break;
//     default:
//         console.log("You need to work harder.");
// }

// // ========================================================================================

// // for loop

// let Name = ["Eric", "Tran", "Nguyen", "Le", "Pham"];
// for (let i = 0; i < Name.length; i++) {
//   console.log(Name[i]);
// }

// // ========================================================================================

// // while loop

// let Adress = ["Hanoi", "Ho Chi Minh", "Da Nang", "Hai Phong", "Can Tho"];
// let i = 0;
// while (i < Adress.length) {
//   console.log(Adress[i]);
//   i++;
// }

// // ========================================================================================

// // break / continue

// let Name = ["Eric", "Tran", "Nguyen", "Le", "Pham"];
// for (let i = 0; i < Name.length; i++) {
//   if (Name[i] === "Nguyen") {
//     break;
//   } // === là so sánh giá trị và kiểu dữ liệu, == là so sánh giá trị, không so sánh kiểu dữ liệu
//   console.log(Name[i]);
// }
// let Address = ["Hanoi", "Ho Chi Minh", "Da Nang", "Hai Phong", "Can Tho"];
// for (let i = 0; i < Address.length; i++) {
//   if (Address[i] === "Hanoi") {
//     continue;
//   }
//   console.log(Address[i]);
// }

// // ========================================================================================

// // function

// function greet(name) {
//   console.log(`Hello, ${name}!`);
// }

// greet("Alice"); // Output: Hello, Alice!
// greet("Bob");   // Output: Hello, Bob!

// // sum of two numbers

// function sum(a, b) {
//   return a + b;
// }

// console.log(sum(5, 3)); // Output: 8
// console.log(sum("Hello ", "World!")); // Output: Hello, World!

// // ========================================================================================

// // Arrow function

// const greet = (name) => {
//   console.log(`Hello, ${name}!`);
// }; // Arrow function, không cần từ khóa function, không cần return nếu chỉ có 1 dòng lệnh, không cần dấu ngoặc nhọn nếu chỉ có 1 dòng lệnh, không cần dấu ngoặc đơn nếu chỉ có 1 tham số, không thể sử dụng this bên trong arrow function

// greet("Alice"); // Output: Hello, Alice!
// greet("Bob");   // Output: Hello, Bob!

// (function() {
//   console.log("This is an IIFE (Immediately Invoked Function Expression)");
// })(); // Output: This is an IIFE (Immediately Invoked Function Expression), thực hiện ngay lập tức khi được định nghĩa, không cần gọi hàm, không cần đặt tên hàm, không thể gọi lại hàm, không thể truy cập biến bên trong hàm từ bên ngoài hàm

// // ========================================================================================

// // Scope: phạm vi của biến, kiểm soát phạm vi của biến, tránh lỗi khi gán giá trị biến

// let globalVar = "I am a global variable"; // có thể truy cập từ bất kỳ đâu trong chương trình

// function myFunction() {
//   let localVar = "I am a local variable"; // chỉ có thể truy cập từ bên trong hàm
//   console.log(globalVar); // Output: I am a global variable
//   console.log(localVar); // Output: I am a local variable
// }

// myFunction();

// // =========================================================================================

// // Array: truy cập phần tử trong mảng, thêm phần tử vào mảng, xóa phần tử khỏi mảng, tìm kiếm phần tử trong mảng, sắp xếp mảng, lọc mảng, lặp qua mảng

// let myArray = ["Eric", "Tran", "Nguyen", "Le", "Pham"];

// console.log("in ra index 0 của mảng: ", myArray[0]); // Output: Eric
// console.log("in ra index 5 của mảng: ", myArray[5]); // Output: undefined, vì mảng chỉ có 5 phần tử, index từ 0 đến 4
// console.log("độ dài của mảng: ", myArray.length); // Output: 5

// console.log("thêm phần tử vào cuối mảng: ", myArray.push("Vo")); // Output: 6, vì mảng đã có 5 phần tử, thêm 1 phần tử vào cuối mảng, độ dài của mảng tăng lên 6
// console.log("sau khi thêm phần tử vào cuối mảng: ", myArray); // Output: ["Eric", "Tran", "Nguyen", "Le", "Pham", "Vo"]

// console.log("xóa phần tử cuối cùng của mảng: ", myArray.pop()); // Output: Vo, xóa phần tử cuối cùng của mảng, trả về giá trị của phần tử bị xóa
// console.log("sau khi xóa phần tử cuối cùng: ", myArray); // Output: ["Eric", "Tran", "Nguyen", "Le", "Pham"]

// console.log("xóa phần tử đầu tiên của mảng: ", myArray.shift()); // Output: Eric, xóa phần tử đầu tiên của mảng, trả về giá trị của phần tử bị xóa
// console.log("sau khi xóa phần tử đầu tiên: ", myArray);

// console.log("thêm phần tử vào đầu mảng: ", myArray.unshift("Nguyen")); // Output: 5, vì mảng đã có 4 phần tử, thêm 1 phần tử vào đầu mảng, độ dài của mảng tăng lên 5
// console.log("sau khi thêm phần tử vào đầu mảng: ", myArray); // Output: ["Nguyen", "Tran", "Nguyen", "Le", "Pham"]

// console.log("xóa phần tử thứ 3 của mảng: ", myArray.splice(2, 1)); // Output: ["Nguyen"], xóa phần tử thứ 3 của mảng, bắt đầu từ index 2, xóa 1 phần tử, trả về giá trị của phần tử bị xóa
// console.log("sau khi xóa phần tử thứ 3: ", myArray); // Output: ["Nguyen", "Tran", "Le", "Pham"]

// console.log("thêm phần tử vào mảng, bắt đầu từ index 2, xóa 0 phần tử, thêm 'Nguyen': ", myArray.splice(2, 0, "Nguyen")); // Output: [], thêm phần tử vào mảng, bắt đầu từ index 2, xóa 0 phần tử, thêm "Nguyen", trả về giá trị của phần tử bị xóa
// console.log("sau khi thêm phần tử vào mảng: ", myArray); // Output: ["Nguyen", "Tran", "Nguyen", "Le", "Pham"]

// console.log("thay đổi giá trị phần tử thứ 3 của mảng, bắt đầu từ index 2: ", myArray[2] = "Le"); // Output: ["Nguyen"], thay đổi giá trị phần tử thứ 3 của mảng, bắt đầu từ index 2, xóa 1 phần tử, thêm "Le", trả về giá trị của phần tử bị xóa
// console.log("sau khi thay đổi giá trị phần tử thứ 3: ", myArray); // Output: ["Nguyen", "Tran", "Le", "Le", "Pham"]

// console.log("tìm kiếm phần tử trong mảng: ", myArray.indexOf("Le")); // Output: 2, tìm kiếm phần tử "Le" trong mảng, trả về index của phần tử đầu tiên tìm thấy, nếu không tìm thấy trả về -1

// console.log("tìm kiếm phần tử trong mảng: ", myArray.includes("Le")); // Output: true, tìm kiếm phần tử "Le" trong mảng, trả về true nếu tìm thấy, false nếu không tìm thấy

// console.log("sắp xếp mảng: ", myArray.sort()); // Output: ["Le", "Le", "Nguyen", "Pham", "Tran"], sắp xếp mảng theo thứ tự tăng dần, nếu là số thì sắp xếp theo giá trị số, nếu là chuỗi thì sắp xếp theo bảng chữ cái

// console.log("lọc mảng: ", myArray.filter((item) => item === "Le")); // Output: ["Le", "Le"], lọc mảng, trả về mảng mới chứa các phần tử thỏa mãn điều kiện, nếu không có phần tử nào thỏa mãn điều kiện thì trả về mảng rỗng

// filter là một phương thức của mảng trong JavaScript, được sử dụng để lọc các phần tử trong mảng dựa trên một điều kiện nhất định. Kết quả của phương thức filter là một mảng mới chứa các phần tử thỏa mãn điều kiện, mà không làm thay đổi mảng gốc.

// console.log("lặp qua mảng: ", myArray.forEach((item) => console.log(item))); // Output: Le, Le, Nguyen, Pham, Tran, lặp qua mảng, thực hiện hàm callback cho mỗi phần tử trong mảng, không trả về giá trị

// console.log(myArray.forEach(function(item) { console.log(item); })); // Output: Le, Le, Nguyen, Pham, Tran, lặp qua mảng, thực hiện hàm callback cho mỗi phần tử trong mảng, không trả về giá trị

// forEach là một phương thức của mảng trong JavaScript, được sử dụng để lặp qua từng phần tử của mảng và thực hiện một hàm callback trên mỗi phần tử đó. Tuy nhiên, forEach không trả về giá trị, chỉ thực hiện hàm callback cho mỗi phần tử trong mảng.

// const newArray = myArray.map((item) => item.toUpperCase()); // Output: ["LE", "LE", "NGUYEN", "PHAM", "TRAN"], lặp qua mảng, thực hiện hàm callback cho mỗi phần tử trong mảng, trả về mảng mới chứa các giá trị được thay đổi bởi hàm callback
// console.log("mảng mới sau khi lặp qua mảng: ", newArray); // Output: ["LE", "LE", "NGUYEN", "PHAM", "TRAN"], in ra mảng mới sau khi lặp qua mảng

// const newArray2 = myArray.map((item) => item.length); // Output: [2, 2, 6, 4, 4], lặp qua mảng, thực hiện hàm callback cho mỗi phần tử trong mảng, trả về mảng mới chứa các giá trị được thay đổi bởi hàm callback
// console.log("mảng mới sau khi lặp qua mảng: ", newArray2); // Output: [2, 2, 6, 4, 4], in ra mảng mới sau khi lặp qua mảng

// const newArray3 = myArray.map((item) => item + " Tran"); // Output: ["Le Tran", "Le Tran", "Nguyen Tran", "Pham Tran", "Tran Tran"], lặp qua mảng, thực hiện hàm callback cho mỗi phần tử trong mảng, trả về mảng mới chứa các giá trị được thay đổi bởi hàm callback
// console.log("mảng mới sau khi lặp qua mảng: ", newArray3); // Output: ["Le Tran", "Le Tran", "Nguyen Tran", "Pham Tran", "Tran Tran"], in ra mảng mới sau khi lặp qua mảng

// const newArray4 = myArray.map((item) => item + " " + item.length); // Output: ["Le 2", "Le 2", "Nguyen 6", "Pham 4", "Tran 4"], lặp qua mảng, thực hiện hàm callback cho mỗi phần tử trong mảng, trả về mảng mới chứa các giá trị được thay đổi bởi hàm callback
// console.log("mảng mới sau khi lặp qua mảng: ", newArray4); // Output: ["Le 2", "Le 2", "Nguyen 6", "Pham 4", "Tran 4"], in ra

// map là một phương thức của mảng trong JavaScript, được sử dụng để lặp qua từng phần tử của mảng và thực hiện một hàm callback trên mỗi phần tử đó. Kết quả của hàm callback sẽ được lưu trữ trong một mảng mới, mà không làm thay đổi mảng gốc.

// // =========================================================================================

// Object: truy cập thuộc tính của đối tượng, thêm thuộc tính vào đối tượng, xóa thuộc tính khỏi đối tượng, tìm kiếm thuộc tính trong đối tượng, lặp qua đối tượng

// const myObject = {
//   name: "John",
//   age: 30,
//   city: "New York"
// };

// console.log("truy cập thuộc tính của đối tượng: ", myObject.name); // Output: John, truy cập thuộc tính của đối tượng bằng cách sử dụng dấu chấm
// console.log("truy cập thuộc tính của đối tượng: ", myObject["age"]); // Output: 30, truy cập thuộc tính của đối tượng bằng cách sử dụng dấu ngoặc vuông

// console.log("thêm thuộc tính vào đối tượng: ", myObject.country = "USA"); // Output: USA, thêm thuộc tính vào đối tượng bằng cách sử dụng dấu chấm
// console.log("sau khi thêm thuộc tính vào đối tượng: ", myObject); // Output: { name: 'John', age: 30, city: 'New York', country: 'USA' }, in ra đối tượng sau khi thêm thuộc tính

// console.log("xóa thuộc tính khỏi đối tượng: ", delete myObject.city); // Output: true, xóa thuộc tính khỏi đối tượng bằng cách sử dụng delete
// console.log("sau khi xóa thuộc tính khỏi đối tượng: ", myObject); // Output: { name: 'John', age: 30, country: 'USA' }, in ra đối tượng sau khi xóa thuộc tính

// console.log("tìm kiếm thuộc tính trong đối tượng: ", "name" in myObject); // Output: true, tìm kiếm thuộc tính trong đối tượng bằng cách sử dụng in
// console.log("tìm kiếm thuộc tính trong đối tượng: ", "city" in myObject); // Output: false, tìm kiếm thuộc tính trong đối tượng bằng cách sử dụng in

// console.log("lặp qua đối tượng: ", Object.keys(myObject)); // Output: [ 'name', 'age', 'country' ], lặp qua đối tượng bằng cách sử dụng Object.keys, trả về mảng chứa các thuộc tính của đối tượng
// console.log("lặp qua đối tượng: ", Object.values(myObject)); // Output: [ 'John', 30, 'USA' ], lặp qua đối tượng bằng cách sử dụng Object.values, trả về mảng chứa các giá trị của đối tượng

// console.log("lặp qua đối tượng: ", Object.entries(myObject)); // Output: [ [ 'name', 'John' ], [ 'age', 30 ], [ 'country', 'USA' ] ], lặp qua đối tượng bằng cách sử dụng Object.entries, trả về mảng chứa các cặp khóa-giá trị của đối tượng

// // ==========================================================================================

// const myObject = {
//   name: "John",
//   age: 30,
//   city: "New York"
// };

// // forEach: lặp qua các phần tử của mảng, trả về giá trị của phần tử

// Object.keys(myObject).forEach((key) => {
//   console.log(`Key: ${key}, Value: ${myObject[key]}`); // Output: Key: name, Value: John, Key: age, Value: 30, Key: city, Value: New York
// });

// // for...in: lặp qua các thuộc tính của đối tượng, trả về tên thuộc tính

// for (let key in myObject) {
//   console.log(`Key: ${key}, Value: ${myObject[key]}`); // Output: Key: name, Value: John, Key: age, Value: 30, Key: city, Value: New York
// }

// // for...of: lặp qua các phần tử của mảng, trả về giá trị của phần tử

// for (let value of Object.values(myObject)) {
//   console.log(`Value: ${value}`); // Output: Value: John, Value: 30, Value: New York
// }

// sự khác nhau giữa forEach, for...in và for...of là 
// forEach chỉ lặp qua các phần tử của mảng, 
// for...in lặp qua các thuộc tính của đối tượng, 
// for...of lặp qua các phần tử của mảng hoặc các đối tượng có thể lặp được (iterable objects) như Set, Map, String, Array, arguments object.

// // ==========================================================================================

// const element = document.getElementById("userName");
// console.log(element); // Output: <p id="userName">userName: hoidanIT</p>, truy cập phần tử HTML bằng id
// console.log(element.textContent); // Output: userName: hoidanIT, truy cập nội dung văn bản của phần tử HTML bằng id

// const myDiv = document.querySelector(".container");
// console.log(myDiv); // Output: <div class="container">...</div>, truy cập phần tử HTML bằng class
// console.log(myDiv.textContent); // Output: Hello, World!, truy cập nội dung văn bản của phần tử HTML bằng class

// const allMyDivs = document.querySelectorAll(".container");
// console.log(allMyDivs); // Output: NodeList(3) [div.container, div.container, div.container], truy cập tất cả các phần tử HTML bằng class
// // console.log(allMyDivs[0].textContent); // Output: Hello, World!, truy cập nội dung văn bản của phần tử HTML đầu tiên bằng class

// ==========================================================================================

// const element = document.getElementById("myButton");
// element.addEventListener("click", function() {
//   alert("Button clicked!");
// });
// console.log(element); // Output: <button id="myButton">Click me</button>, truy cập phần tử HTML bằng id

// // ==========================================================================================

// event: là một đối tượng trong JavaScript, chứa thông tin về sự kiện xảy ra trên phần tử HTML, ví dụ như click, mouseover, keydown, v.v...

// function handleClick(event) {
//   console.log("Button clicked!!!");
//   console.log(event);
// }

// // ==========================================================================================

// addEventListener: là một phương thức của phần tử HTML, được sử dụng để đăng ký một hàm xử lý sự kiện cho phần tử HTML, ví dụ như click, mouseover, keydown, v.v...

// const element = document.getElementById("myButton");
// element.addEventListener("click", function(event) {
//   console.log("Button clicked!!!");
//   console.log(event);
// });

// // cách khác

// const handleClick = () => {
//   console.log("Button clicked!!!");
//   console.log(event);
// }
// element.addEventListener("click", handleClick);

// // ===========================================================================================

// // Change text html element

const element = document.getElementById("myButton2");
// element.addEventListener("click", function() {
//   element.textContent = "Button clicked!";
// }); // textContent: thay đổi nội dung văn bản của phần tử, không thể chứa các thẻ HTML, an toàn nếu nội dung chứa mã độc

// element.addEventListener("click", function() {
//     element.innerHTML = "<strong>Button clicked!</strong>";
// }) // innerHTML: thay đổi nội dung HTML của phần tử, có thể chứa các thẻ HTML, nhưng không an toàn nếu nội dung chứa mã độc

// element.addEventListener("click", function() {
//     element.innerText = "Button clicked!";
// }) // innerText: thay đổi nội dung văn bản của phần tử, không thể chứa các thẻ HTML, an toàn nếu nội dung chứa mã độc, nhưng không được hỗ trợ trên tất cả các trình duyệt

// // ===========================================================================================
// ===========================================================================

// Bài tập: 2 nút bấm - In đậm và In nghiêng cho chữ to "Hello World"

// // getElementById: lấy phần tử HTML có id là "bigText" (thẻ h1 Hello World)
// const bigText = document.getElementById("bigText");

// // Nút "In đậm"
// const boldBtn = document.getElementById("boldBtn");
// boldBtn.addEventListener("click", function () { // addEventListener: lắng nghe sự kiện click
//     // nếu chữ ĐANG đậm thì bỏ đậm (normal), ngược lại thì làm đậm (bold)
//     if (bigText.style.fontWeight === "bold") {
//         bigText.style.fontWeight = "normal";
//     } else {
//         bigText.style.fontWeight = "bold";
//     }
// }); // style.fontWeight: thay đổi độ đậm của chữ (bold = đậm, normal = bình thường)

// // Nút "In nghiêng"
// const italicBtn = document.getElementById("italicBtn");
// italicBtn.addEventListener("click", function () {
//     // nếu chữ ĐANG nghiêng -> bỏ nghiêng, ngược lại -> làm nghiêng
//     if (bigText.style.fontStyle === "italic") {
//         bigText.style.fontStyle = "normal";
//     } else {
//         bigText.style.fontStyle = "italic";
//     }
// }); // style.fontStyle: thay đổi kiểu nghiêng của chữ (italic = nghiêng, normal = bình thường)
// // ===========================================================================

// // Thêm: đổi màu chữ và đổi màu nền (background)

// // Nút "Đổi màu chữ"
// const colorBtn = document.getElementById("colorBtn");
// colorBtn.addEventListener("click", function () {
//     // nếu chữ ĐANG màu đỏ thì đổi về đen, ngược lại thì đổi sang đỏ
//     if (bigText.style.color === "red") {
//         bigText.style.color = "black";
//     } else {
//         bigText.style.color = "red";
//     }
// }); // style.color: thay đổi màu chữ (red = đỏ, black = đen)

// // Nút "Đổi màu nền" (background)
// const bgBtn = document.getElementById("bgBtn");
// bgBtn.addEventListener("click", function () {
//     // nếu nền ĐANG màu vàng thì đổi về trắng, ngược lại thì đổi sang vàng
//     if (document.body.style.backgroundColor === "yellow") {
//         document.body.style.backgroundColor = "white";
//     } else {
//         document.body.style.backgroundColor = "yellow";
//     }
// }); // style.backgroundColor: thay đổi màu nền (yellow = vàng, white = trắng)

// ===========================================================================================

// Alert: là một hộp thoại thông báo, được sử dụng để hiển thị thông tin cho người dùng, hoặc yêu cầu người dùng xác nhận một hành động nào đó. Alert sẽ dừng tất cả các hoạt động trên trang web cho đến khi người dùng nhấn OK.

// confirm: là một hộp thoại xác nhận, được sử dụng để yêu cầu người dùng xác nhận một hành động nào đó. Confirm sẽ trả về true nếu người dùng nhấn OK, và false nếu người dùng nhấn Cancel.
// ===========================================================================

// Ví dụ đơn giản về Alert và Confirm

// // Nút "Alert": hiện hộp thoại thông báo, chỉ có nút OK
// const alertBtn = document.getElementById("alertBtn");
// alertBtn.addEventListener("click", function () {
//     alert("Hello World! Đây là hộp thoại Alert."); // alert(...): hiện hộp thoại thông báo, bấm OK để đóng lại
// });

// // Nút "Confirm": hiện hộp thoại xác nhận, có 2 nút OK và Cancel, trả về true hoặc false
// const confirmBtn = document.getElementById("confirmBtn");
// confirmBtn.addEventListener("click", function () {
//     const result = confirm("Bạn có chắc muốn xóa không?"); // confirm(...): trả về true nếu bấm OK, false nếu bấm Cancel
//     if (result) {
//         alert("Bạn đã bấm OK! 👌"); // result = true -> người dùng bấm OK
//     } else {
//         alert("Bạn đã bấm Cancel! 🙅"); // result = false -> người dùng bấm Cancel
//     }
// });

// ===========================================================================

// Ví dụ đơn giản về Prompt và LocalStorage

// Nút "Prompt": hiện hộp thoại có ô nhập liệu, trả về chuỗi người dùng gõ vào, hoặc trả về null nếu bấm Cancel
const promptBtn = document.getElementById("promptBtn");
promptBtn.addEventListener("click", function () {
    const name = prompt("Bạn tên là gì?"); // prompt(...): trả về chuỗi nhập vào (ví dụ: "Eric"?, hoặc null nếu bấm Cancel

    if (name) { // null là false, nên nếu bấm Cancel sẽ không vào đây
        alert("Xin chào, " + name + "!"); // dùng dấu + để nối chuỗi, giống bài template string
    }
});

// Nút "Lưu tên": lưu nội dung chữ to hiện tại vào LocalStorage (dữ liệu VẪN CÒN khi tải lại trang F5)
const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function () {
    localStorage.setItem("myName", bigText.textContent); // setItem(key, value): lưu 1 cặp tên - giá trị vào LocalStorage
    alert("Đã lưu tên: " + bigText.textContent + ". Hãy tải lại trang F5 để thấy dữ liệu vẫn còn!");
});

// Nút "Đọc tên": đọc dữ liệu đã lưu từ LocalStorage ra và hiện lên chữ to
const loadBtn = document.getElementById("loadBtn");
loadBtn.addEventListener("click", function () {
    const savedName = localStorage.getItem("myName"); // getItem(key): lấy giá trị theo tên key, không có thì trả về null
    if (savedName) { // nếu có dữ liệu thì hiện lên chữ to
        bigText.textContent = savedName; // textContent: thay đổi nội dung chữ, giống bài Change text
        displayName.textContent = "Tên đã lưu: " + savedName; // hiện kết quả lên ngay trên trang
        alert("Đã đọc tên: " + savedName);
    } else {
        alert("Chưa có tên nào được lưu. Hãy bấm nút Prompt rồi Lưu tên trước!");
    }
});

// Nút "Xóa tên": xóa dữ liệu đã lưu khỏi LocalStorage
const removeBtn = document.getElementById("removeBtn");
removeBtn.addEventListener("click", function () {
    localStorage.removeItem("myName"); // removeItem(key): xóa dữ liệu theo tên key
    bigText.textContent = "Hello World"; // đưa chữ to "Hello World" trở lại mặc định
displayName.textContent = "";
    alert("Đã xóa tên khỏi LocalStorage!");
});

// ===========================================================================

// Cách dễ hiểu hơn: nhập tên vào khung, bấm nút, tên sẽ hiện lên ngay trong cửa sổ trang web

const nameInput = document.getElementById("nameInput"); // nameInput: ô nhập tên, .value là dữ liệu người dùng gõ vào
const displayName = document.getElementById("displayName"); // displayName: thẻ p để hiện kết quả ngay trên trang

// Nút "Lưu và Hiện tên": lưu vào LocalStorage VÀ hiện tên lên trang ngay lập tức
const saveDisplayBtn = document.getElementById("saveDisplayBtn");
saveDisplayBtn.addEventListener("click", function () {
    const name = nameInput.value; // .value: lấy nội dung người dùng gõ trong ô nhập
    if (name) { // nếu ô nhập có dữ liệu (không rỗng)
        localStorage.setItem("myName", name); // setItem: lưu tên vào LocalStorage
        bigText.textContent = name; // hiện tên lên chữ to "Hello World"
        displayName.textContent = "Tên đã lưu: " + name; // hiện kết quả lên dòng dưới nút
        alert("Đã lưu tên: " + name + "! Hãy F5 tải lại trang rồi bấm Đọc tên để thấy dữ liệu vẫn còn.");
    } else {
        alert("Bạn chưa nhập tên. Hãy gõ tên vào khung trước!");
    }
});

// Tự động đọc LocalStorage ngay khi trang vừa mở: nếu có tên lưu rồi thì hiện lên luôn, không cần bấm gì
const savedOnLoad = localStorage.getItem("myName");
if (savedOnLoad) {

    bigText.textContent = savedOnLoad; // hiện tên lên chữ to
    displayName.textContent = "Tên đã lưu: " + savedOnLoad; // hiện lên dòng kết quả
}
    

// Prompt: là một hộp thoại yêu cầu người dùng nhập dữ liệu, được sử dụng để thu thập thông tin từ người dùng. Prompt sẽ trả về giá trị mà người dùng nhập vào, hoặc null nếu người dùng nhấn Cancel.

// LocalStorage: là một cơ chế lưu trữ dữ liệu trên trình duyệt web, cho phép lưu trữ dữ liệu dưới dạng key-value (cặp khóa-giá trị) trong bộ nhớ của trình duyệt. Dữ liệu được lưu trữ trong Local Storage sẽ tồn tại ngay cả khi người dùng đóng trình duyệt hoặc tắt máy tính, và chỉ bị xóa khi người dùng xóa dữ liệu trình duyệt hoặc xóa thủ công.

// ===========================================================================

// Ví dụ về xử lý bất đồng bộ và Promise

const displayAsync = document.getElementById("displayAsync"); // displayAsync: thẻ p để hiện kết quả lên màn hình

// Nút "Promise": tạo 1 Promise, 2 giây sau mới hoàn thành rồi hiện kết quả
const promiseBtn = document.getElementById("promiseBtn");
promiseBtn.addEventListener("click", function () {
    displayAsync.textContent = "Đang xử lý... ⏳ (chờ 2 giây))"; // hiện trạng thái đang chờ ngay lập tức

    const myPromise = new Promise(function (resolve, reject) { // Promise nhận 1 hàm, JavaScript tự đưa vào 2 chức năng: resolve( thành công ) và reject( thất bại )
        setTimeout(function () { // setTimeout: cài hẹn giờ, sau 2 giây mới chạy
            resolve("✅ Promise đã hoàn thành sau 2 giây!"); // resolve: báo THÀNH CÔNG và đẩy kết quả ra ngoài
        }, 2000); // 2000ms = 2 giây
    });

    myPromise.then(function (result) { // .then: chạy khi Promise thành công, nhận kết quả do resolve đẩy ra
        displayAsync.textContent = result; // hiện kết quả lên màn hình
    });
});

// Nút "Async/Await": cách viết NGẮN GỌN hơn cho cùng 1 việc — chờ rồi mới hiện
const asyncBtn = document.getElementById("asyncBtn");
asyncBtn.addEventListener("click", async function () { // async: đánh dấu hàm này có chứa await ở bên trong
    displayAsync.textContent = "Đang xử lý... ⏳ (chờ 2 giây))";

    const result = await wait2Seconds(); // await: TẠM DỪNG hàm tại đây, chờ Promise xong rồi mới chạy tiếp,, kết quả được gán vào biến
    displayAsync.textContent = result; // hiện kết quả lên màn hình
});

// Hàm trả về 1 Promise — sẽ "hoàn thành" sau 2 giây
function wait2Seconds() {
    return new Promise(function (resolve) { // resolve là chức năng báo thành công
        setTimeout(function () {
            resolve("✅ Async/Await đã hoàn thành sau 2 giây!");
        }, 2000);
    });
}

// Nút "Promise lỗi": ví dụ Promise bị THẤT BẠI (reject) — học cách bắt lỗi
const rejectBtn = document.getElementById("rejectBtn");
rejectBtn.addEventListener("click", function () {
    displayAsync.textContent = "Đang xử lý... ⏳ (chờ 2 giây))";

    const myPromise = new Promise(function (resolve, reject) { // lần này dùng reject thay vì resolve
        setTimeout(function () {
            reject("❌ Lỗi: không tải được dữ liệu!"); // reject: báo THẤT BẠI và đẩy lỗi ra ngoài
        }, 2000);
    });

    myPromise.then(function (result) { // .then: chỉ chạy khi Promise THÀNH CÔNG
        displayAsync.textContent = result;;
    }).catch(function (error) { // .catch: chạy khi Promise THẤT BẠI, nhận lỗi do reject đẩy ra
        displayAsync.textContent = error;;
    });
});
// ===========================================================================

// VÍ DỤ MINH HỌA BẤT ĐỒNG BỘ - Đồng bộ vs Bất đồng bộ
// Mẹo: bấm nút "Chạy đồng bộ" xong, TRANG SẼ BỊ ĐỨNG 3 giây (không bấm được nút nào!!). Rồi bấm nút "Chạy bất đồng bộ" — trang VẪN dùng bình thường, có thể bấm nút khác trong lúc chờ.



const displaySync = document.getElementById("displaySync"); // displaySync: thẻ p hiện trạng thái để so sánh

// 1. ĐỒNG BỘ (sync): việc chạy tuần tự, CHẶN HẾT mọi thứ cho đến khi xong
const syncBtn = document.getElementById("syncBtn");
syncBtn.addEventListener("click", function () {
    displaySync.textContent = "Đồng bộ: ĐANG chạy... (trang bị ĐỨNG 3 giây, THỬ BẤM nút khác xem sao!!!))";

    const startTime = Date.now(); // Date.now(): lấy mốc thời gian hiện tại (tính bằng mili giây)
    while (Date.now() - startTime < 3000) { // vòng lặp chạy liên tục đúng 3 giây
        // không làm gì cả — chỉ để kéo dài thời gian, chặn toàn bộ trang
    }
    // sau 3 giây mới tới được đây
    displaySync.textContent = "Đồng bộ: XONG sau 3 giây! Bạn đã thấy trang bị đứng chưa??";
});

// 2. BẤT ĐỒNG BỘ (async): hẹn giờ, KHÔNG chặn gì — trang vẫn dùng được, 3 giây sau tự báo xong
const asyncBtn2 = document.getElementById("asyncBtn2");
asyncBtn2.addEventListener("click", function () {
    displaySync.textContent = "Bất đồng bộ: ĐANG chạy... (trang VẪN dùng bình thường — thử bấm nút khác đi!!)";

    setTimeout(function () { // setTimeout: cài hẹn 3 giây — đặt 'cuộc hẹn' xong là code chạy tiếp ngay, không chờ không chặn
        displaySync.textContent = "Bất đồng bộ: XONG sau 3 giây! Trong lúc chờ bạn vẫn bấm được nút khác đấy!!";
    }, 3000); // 3000ms = 3 giây
});

// ===========================================================================
// Dòng code trong console dễ hiểu nhất về bất đồng bộ:
// console.log("1. tôi chạy TRƯỚC");
// setTimeout(function () { console.log("3. tôi chạy SAU (2 giây")); }, 2000);
// console.log("2. tôi chạy GIỮA");
// // Kết quả in ra: 1 ->  ồ 2 ->  ồ 3  (số 3 viết trước số 2 nhưng chạy SAU — vì setTimeout là bất đồng bộ!!)
// ===========================================================================================
// ===========================================================================

// VÍ DỤ HỌC FETCH và API — gọi http://localhost:8000/users (json-server đang chạy trong backend_project)
// NHỚ: phải bật server trước: cd backend_project -> npm start  (server chạy ở cổng 8000 theo json-server.jsonủ)

const displayFetch = document.getElementById("displayFetch"); // displayFetch: thẻ p báo trạng thái
const fetchList = document.getElementById("fetchList"); // fetchList: thẻ ul để hiện danh sách user lấy từ API

// 1. FETCH kiểu .then — lấy tất cả users
const fetchUsersBtn = document.getElementById("fetchUsersBtn");
fetchUsersBtn.addEventListener("click", function () {
    fetchList.innerHTML = ""; // xóa danh sách cũ
    displayFetch.textContent = "Đang tải dữ liệu từ API... ⏳";

    fetch("http://localhost:8000/users") // fetch(địa chỉ API): gửi yêu cầu lấy dữ liệu, trả về 1 Promise
        .then(function (response) { // chạy khi server TRẢ LỜI (dù thành công hay lỗi HTTP))
            return response.json(); // response.json(): đọc phần thân JSON từ câu trả lời, cũng là 1 Promise
        })
        .then(function (data) { // data: chính là mảng users nhận được
            data.forEach(function (user) { // forEach: lặp qua từng user trong mảng — giống vòng lặp bạn đã học
                const li = document.createElement("li"); // tạo 1 thẻ li mới
                li.textContent = user.id + ". " + user.name + " (" + user.email + ")"; // hiện id, name, email của user
                fetchList.appendChild(li); // appendChild: gắn thẻ li vào danh sách ul
            });
            displayFetch.textContent = "✅ Đã lấy " + data.length + " user từ API!";
        })
        .catch(function (error) { // chạy khi LỖI MẠNG (server tắt, sai link, mất mạng, CORS...)
            displayFetch.textContent = "❌ Lỗi: " + error.message + " (Kiểm tra server đã chạy chưa?)";
        });
});

// 2. FETCH kiểu async/await — lấy 1 user theo id
const fetchOneBtn = document.getElementById("fetchOneBtn");
fetchOneBtn.addEventListener("click", async function () { // async: hàm này có chứa await
    fetchList.innerHTML = "";
    displayFetch.textContent = "Đang tải user id=1... ⏳";

    try { // try: thử làm việc bên trong, nếu lỗi thì nhảy xuống catch
        const response = await fetch("http://localhost:8000/users/1"); // await: chờ server trả lời
        const user = await response.json(); // await: chờ đọc xong JSON
        const li = document.createElement("li");
        li.textContent = user.id + ". " + user.name + " (" + user.email + ")";
        fetchList.appendChild(li);
        displayFetch.textContent = "✅ Đã lấy user id=1 từ API!";
    } catch (error) { // catch: bắt lỗi — code trong này chạy nếu có lỗi
        displayFetch.textContent = "❌ Lỗi: " + error.message + " (Kiểm tra server đã chạy chưa?)";
    }
});

//  ồ 3. FETCH LỖI — cố tình gọi id KHÔNG TỒN TẠI để học bài học quan trọng về lỗi HTTP
const fetchErrBtn = document.getElementById("fetchErrBtn");
fetchErrBtn.addEventListener("click", function () {
    fetchList.innerHTML = "";
    displayFetch.textContent = "Đang gọi link SAI... ⏳";

    fetch("http://localhost:8000/users/99999") // id 99999 không tồn tại → server trả về lỗi HTTP 404
        .then(function (response) {
            // BÀI HỌC QUAN TRỌNG: fetch KHÔNG tự báo lỗi khi server trả về 404/500!
            // Nó vẫn coi là "trả lời xong" — mình PHẢI tự kiểm tra response.ok mới biết thành công hay không
            if (response.ok) { // response.ok = true khi mã trạng thái trong khoảng 200-299 (thành công)
                return response.json();
            } else {
                throw new Error("Server trả về mã lỗi: " + response.status); // throw: chủ động "ném" lỗi ra để catch bắt được
            }
        })
        .then(function (data) { // chạy khi mọi thứ đều OK — nhưng với link sai này sẽ không bao giờ tới đây
            displayFetch.textContent = "✅ Không ngờ lại có dữ liệu!";
        })
        .catch(function (error) { // bắt mọi lỗi (cả lỗi ném ra bằng throw lẫn lỗi mạng)
            displayFetch.textContent = "❌ Bắt được lỗi: " + error.message;
        });
});

// ===========================================================================================

// ===========================================================================
// LÝ THUYẾT QUAN TRỌNG: async là gì? Vì sao thấy nó "thay" được nhiều thứ?
// ===========================================================================

// 1. ĐỪNG NHẦM 3 THỨ NÀY:
//    - "BẤT ĐỒNG BỘ" là một KHÁI NIỆM (việc chạy ngầm, không chặn việc khác: setTimeout, fetch, đọc files...)
//    - "async" là một TỪ KHÓA (công tắc) gắn lên HÀM để xin phép dùng "await" ở bên trong hàm đó.

// 2. QUY TẮC DUY NHẤT CẦN NHỚ:
//    - "await" CHỈ dùng được bên trong hàm đã khai "async".  (Vi phạm -> lỗi syntax)

//  ồ 3. HÀM async TỰ ĐỘNG TRẢ VỀ 1 PROMISE:
//
//    async function foo() {
//        return "Xin chào";
//    }
//    // foo() KHÔNG trả về chuỗi "Xin chào" — nó trả về â PROMISE chứa chuỗi đó!
//    // Muốn lấy giá trị thật ra: foo().then(v => ...) hoặc: await foo()  (dùng trong hàm async khác)
//    // => vì vậy, mọi hàm async đều "tương thích" với nhau và với fetch — ai cũng trả Promise cả。


//ần ử 4. "await" LÀM GÌ?
//    - Tạm DỪNG hàm tại dòng có await, chờ Promise xong (resolve) rồi MỞ HỘP lấy giá trị thật gán cho biếnừ
//    - CHỈ dừng BÊN TRONG hàm đó thôi — phần còn lại của trang vẫn chạy bình thường (không treo trang!)


//ần  ồ 5. VÌ SAO THẤY NÓ "THAY" ĐƯỢC NHIỀU THỨ?
//    - "await" thay cho ".then(...)"  — khỏi viết chuỗi .then lồng nhau dài dòngừ
//    - "try { } catch { }" thay cho ".catch(...)" — bắt lỗi như code đồng bộ thườngừ
//    - Kết quả: code đọc dữ liệu trông TUẦN TỰ, dễ đọc như đọc sách, dễ suy nghĩ hơn nhiềuứ!
//
//    NHƯNG KHÔNG phải "thay hết" được:
//    - Muốn TẠO ra 1 Promise vẫn phải dùng "new Promise(...)" (ví dụ hàm wait2Seconds() ở trên)
//    - Bên dưới mui xe: async/await vẫn chạy bằng Promise + .then — nó chỉ là "cách viết gọn lại" (syntactic sugar) của Promise mà thôiừ
//    - Sự kiện DOM (click...), setInterval, v.v... vẫn là những thứ bất đồng bộ riêng — không liên quan gì đến async/await


//ần  ồ 6. SO SÁNH 2 CÁCH VIẾT — CÙNG 1 KẾT QUẢ:
//    // Cách 1: KHÔNG async (chuỗi .then)
//    // fetch(url).then(r => r.json()).then(data => console.log(data)).catch(e => console.log(e)));

//    // Cách 2: CÓ async/await (gọn, tuần tự)
//    // async function load() {
//    //     try {
//    //         const r = await fetch(url);
//    //         const data = await r.json();
//    //         console.log(data);
//    //     } catch (e) {
//    //         console.log(e);
//    //     }
//    // }
//    // => HAI ĐOẠN Y HỆT NHAU về kết quả — chỉ khác cách viết."


//ần  ồ 7. CÁCH NHẬN BIẾT TRÊN CODE:
//    - "async function load() {}"  hoặc  "const load = async () => {}"  hoặc  "addEventListener('click', async function () {})"
//    - Chỗ nào có "async" trước hàm  = chỗ đó sắp có "await" bên trong
//    - Trong bài này: nút "Async/Await"  (asyncBtn) và nút "Fetch 1 User" (fetchOneBtn) khai async vì bên trong có await fetch(...)


//ần  ồ 8. HÌNH DUNG BẰNG NHÀ HÀNG:
//    - Khách gọi món (gửi yêu cầu fetch) — bồi bàn KHÔNG đứng chờ, đi phục vụ bàn khác (đó là BẤT ĐỒNG BỘ)
//    - "async" = tấm biển "BỒI BÀN CHÍNH" dán trên áo → người này mới được phép NHẬN món từ bếp (await)
//    - "await" = "bồi bàn ơi, khi nào món xong thì mang ra cho tôi" — câu trả lời sẽ tới SAU, nhưng bồi bàn không đứng im chờ
//    - Khi món xong — bếp gọi, bồi bàn mang món ra cho đúng bàn  = Promise resolve() xong → code chạy tiếp ở dòng sau await
// ===========================================================================
// ===========================================================================
// VÍ DỤ HỌC CALLBACK và CALLBACK HELL
// ===========================================================================

const displayCallback = document.getElementById("displayCallback"); // displayCallback: thẻ p hiện từng bước quá trình

// ---------------------------------------------------------------------------
// 1. CALLBACK LÀ GÌ?
//    - Callback = "gọi lại" — là 1 HÀM được truyền VÀO hàm khác làm tham số,
//      và được "gọi lại" (chạy) SAU khi việc bên ngoài xong.
  //    - Mọi thứ bạn đã dùng từ đầu tới giờ đều là callback rồi:
//      addEventListener("click", function () {...})  — hàm thứ 2 là callback (chạy khi click)
//      setTimeout(function () {...}, 1000)          — hàm thứ 1 là callback (chạy sau 1 giây)
//      .then(function (data) {...})                — hàm trong .then là callback (chạy khi Promise xong)
// ---------------------------------------------------------------------------

// Nút "Callback": mô phỏng việc gọi món tại nhà hàng — thấy callback chạy như thế nào
const callbackBtn = document.getElementById("callbackBtn");
callbackBtn.addEventListener("click", function () {
    displayCallback.textContent = ""; // xóa dòng trước

    // "goiMon" nhận thêm 1 tham số là callback (hàm sẽ chạy sau khi món xong)
    function goiMon(mon, callback) { // callback ở đây là tham số — nó LÀ hàm nấu xong
        displayCallback.textContent = "🍳 Đang nấu " + mon + "... (chờ 1 giây))";
        setTimeout(function () { // mô phỏng nấu ăn mất 1 giây
            displayCallback.textContent = "✅ " + mon + " đã xong!";  // việc chính xong trước
            callback(); // GỌI LẠI callback — "gọi lại" hàm đã được truyền vào, báo cho bên ngoài biết đã xong
        }, 1000);
    }

    // Gọi hàm goiMon, truyền vào 1 callback: (hàm beep báo món xong)
    goiMon("Phở", function () { // hàm này KHÔNG chạy ngay — nó được "gọi lại" SAU 1 giây
        alert("🔔 Bưng món ra thôi! (callback đã được gọi lại vào đây))"); // chứng minh callback có chạy thật
    });
});

// ---------------------------------------------------------------------------
// 2. CALLBACK HELL LÀ GÌ?
//    - Là khi phải làm NHIỀU việc bất đồng bộ NỐI TIẾP (việc sau phụ thuộc việc trước —
//      nên phải đặt callback lồng BÊN TRONG callback trước)
//    - Kết quả: code lồng nhau ngày càng sâu — thành hình "KIM TỰ THÁP" — khó đọc, khó sửa, khó tìm lỗi。
//    - Đây CHÍNH LÀ lý do người ta sinh ra Promise (.then phẳng hơn) rồi async/await (tuần tự như sách)!!
// ---------------------------------------------------------------------------

// Nút "Callback Hell": 4 bước phụ thuộc nhau — mỗi bước phải chờ bước trước xong
const callbackHellBtn = document.getElementById("callbackHellBtn");
callbackHellBtn.addEventListener("click", function () {
    displayCallback.textContent = "Bắt đầu quy trình 4 bước... (mỗi bước chờ nhau, nhìn độ lõm sâu dần!!)";

    // Mô phỏng 1 công việc: nhận dữ liệu từ 4 nguồn NỐI TIẾP — bước sau cần dữ liệu bước trước
    function buoc1(cb) { // bước 1: sau 1 giây, "lấy được từ khóa"
        setTimeout(function () {
            displayCallback.textContent = "Bước 1 ✅: Đã lấy được TỪ KHÓA.  (chờ bước 2...)";
            cb("từ khóa"); // xong bước 1 thì gọi cb — đẩy dữ liệu sang bước kế tiếp
        }, 1000);
    }
    function buoc2(duLieuTruoc, cb) { // bước 2: cần dữ liệu bước 1 (_duLieuTruoc_)
        setTimeout(function () {
            displayCallback.textContent = "Bước 2 ✅: Đã lấy bài viết theo " + duLieuTruoc + ".";
            cb("bài viết");
        }, 1000);
    }
    function buoc3(duLieuTruoc, cb) {
        setTimeout(function () {
            displayCallback.textContent = "Bước 3 ✅: Đã lấy tác giả của " + duLieuTruoc + ".";
            cb("tác giả");
        }, 1000);
    }

    // CALLBACK HELL: gọi bước sau BÊN TRONG callback của bước trước — quan sát độ lõm tăng dần!!
    buoc1(function (d1) { // 1000ms -> sâu 1
        buoc2(d1, function (d2) { //          -> sâu 2
            buoc3(d2, function (d3) { //     -> sâu 3
                displayCallback.textContent = "🎉 XONG cả 3 bước! Kết quả cuối cùng: " + d3 + ".  NHÌN LẠI độ lõm — ĐÓ LÀ CALLBACK HELL!!";
                alert("🎉 Xong! Kết quả: " + d3);
            }); // đóng bước 3
        }); // đóng bước  ồ 2
    }); // đóng bước  ồ 1
});

// ---------------------------------------------------------------------------
// 3. GHI NHỚ — SỰ TIẾN HÓA CỦA CÁCH VIẾT code bất đồng bộ:
//    - THỜI ĐỒNG BỘ-đầu:  callback lồng nhau sâu (CALLBACK HELL) — khó đọc, khó sửa
//    - THỜI PROMISE:  .then().then().catch() — phẳng hơn, đọc xuôi được, dễ quản lý lỗi bằng .catch
//    - THỜI ASYNC/AWAIT:  await từng bước — code tuần tự, đọc như đọc sách — ĐƯỢC ƯA THÍCH NHẤT HIỆN NAY。

//    Ví dụ SO SÁNH 3 cách (cùng làm việc nói trên, 3 bước nối tiếp):
//    // 1) Callback Hell:  (nhìn phát sợ))
//    // buoc1(d1 => {
//    //     buoc2(d1, d2 => {
//    //         buoc3(d2, d3 => {
//    //             console.log("xong", d3);
//    //         });
//    //     });
//    // });
//
//    // 2) Promise:  (phẳng hơn nhiều)
//    // buoc1P().then(d1 => buoc2P(d1).then(d2 => buoc3P(d2).then(d3 => console.log("xong", d3)));
//
//    // 3) async/await:  (đọc như sách!)
//    // async function chay() {
//    //     const d1 = await buoc1P();
//    //     const d2 = await buoc2P(d1);
//    //     const d3 = await buoc3P(d2);
//    //     console.log("xong", d3);
//    // }
//    // => Callback Hell: chỉ còn là chuyện xưa khi có Promise + async/await — vì vậy hãy luôn dùng chúng!!
// ===========================================================================
// ===========================================================================
// 🖼️ BỨC TRANH NGẮN NHẤT: quá trình từ đầu -> đến async (nhìn là hiểu)
// ===========================================================================
//
//   CÙNG 1 việc: "nấu 3 món, món sau cần món trước" (viết 3 kiểu khác nhau)
//
//   ①  CALLBACK  (từ xưa nhất) — truyền hàm vào hàm:
//      nau("pho", () => {
//        nau("com", () => {
//          nau("chao", () => { xong(); });
//        });
//      });
//      ⇒ sâu dần như "cầu thang" = CALLBACK HELL 😵
//
//   ②  PROMISE  (đời sau) — .then nối nhau:
//      nau("pho").then(() => nau("com")).then(() => nau("chao")).then(xong)
//      ⇒ phẳng hơn, đọc xuôi được 🙂
//
//   ③  ASYNC/AWAIT  (hiện đại nhất) — chữ "chờ" đọc như sách:
//      await nau("pho");
//      await nau("com");
//      await nau("chao");
//      xong();
//      ⇒ 3 dòng thẳng tắp như code thường 🤩
//
//
//   ▶ GHI NHỚ 1 CÂU:
//      - Callback/truyền hàm.  -> lồng sâu (hell).  -> Promise/.then phẳng.  -> async/await như sách.

//   📊 TÓM TẮT SIÊU NGẮN (nhìn phát nhớ:
//      khái niệm chạy ngầm không chặn nhau  = BẤT ĐỒNG BỘ
//      hàm truyền vào hàm, chạy sau       = CALLBACK
//      lồng nhau sâu khó đọc               = CALLBACK HELL
//      lời hứa kết quả tương lai           = PROMISE
//      từ khóa xin phép dùng await          = ASYNC
//      chờ Promise xong rồi mới chạy tiếp  = AWAIT
// ===========================================================================
