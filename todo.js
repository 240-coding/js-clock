const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteTodo(event) { // 투두 리스트 항목 삭제
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); // li 태그 삭제
    const cleanToDos = toDos.filter(function(toDo) { // 삭제된 항목이 없는 새 배열 생성
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; // 기존 배열을 새로 만든 배열로 교체
    savedToDos(); // 로컬 스토리지에 새 배열 저장
}

function savedToDos() { // 로컬 스토리지에 toDos 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) { // 새 항목 추가
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo); // 삭제 버튼을 클릭하면 이벤트 실행
    li.appendChild(span);
    li.appendChild(delBtn);
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