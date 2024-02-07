const app = document.querySelector(".app");
const username = document.getElementById("username");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
let user = null;
const socket = io();

username.addEventListener("keypress", (event) => {
	// берём ник, отправляем на сервер и меняем стили у 1 блока(убираем)
	if (event.key == "Enter") {
		console.log(event.target.value);
		socket.emit("setname", event.target.value);
		app.style.display = "none";
		user = event.target.value;
	}
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (input.value != "") {
		socket.emit("messageFromClient", {
			name: user,
			msg: input.value,
		});
		input.value = "";
	}
});

socket.on("messageFromServer", (data) => {
	const item = document.createElement("li");
	item.innerHTML = `<bold>${data.name}</bold>: `;
	item.innerHTML += data.msg;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});
