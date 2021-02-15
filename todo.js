const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

function savedToDos() { // 로컬 스토리지에 toDos 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) { // 새 항목 추가
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); // 배열에 새 항목 추가
    savedToDos(); // 로컬 스토리지에 새 항목 추가
}

function handleSubmit(event) { // 사용자가 투두 리스트 입력시 새 항목 추가함
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() { // 로컬 스토리지에 있는 투두 리스트 불러오기
    const loadToDos = localStorage.getItem(TODOS_LS);
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}
function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}
init();