document.getElementById("add-task-btn").addEventListener("click", function () {
    const taskTitle = document.getElementById("task-title").value;
    const dueDate = document.getElementById("task-due-date").value;
    const priority = document.getElementById("task-priority").value;
    const status = document.getElementById("task-status").value;
    const comments = document.getElementById("task-comments").value;

    if (taskTitle === "" || dueDate === "") {
        alert("업무 제목과 날짜를 입력해주세요.");
        return;
    }

    // 업무 항목 생성
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    // 우선순위에 따라 색상 설정
    taskItem.classList.add(priority);

    // 업무 내용 추가
    taskItem.innerHTML = `
        <div>
            <strong>${taskTitle}</strong> <br>
            <small>기한: ${dueDate} | 상태: ${status} | 비고: ${comments}</small>
        </div>
        <button class="delete-btn">삭제</button>
    `;

    // 삭제 버튼 기능
    taskItem.querySelector(".delete-btn").addEventListener("click", function () {
        taskItem.remove();
    });

    // 업무 목록에 추가
    document.getElementById("task-list-ul").appendChild(taskItem);

    // 폼 초기화
    document.getElementById("task-title").value = "";
    document.getElementById("task-due-date").value = "";
    document.getElementById("task-priority").value = "high";
    document.getElementById("task-status").value = "not_started";
    document.getElementById("task-comments").value = "";
});

// 검색 기능
document.getElementById("search").addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(function (task) {
        const taskTitle = task.querySelector("strong").textContent.toLowerCase();
        if (taskTitle.includes(searchTerm)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});
