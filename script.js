// script.js

// Supabase 클라이언트 설정
const supabaseUrl = 'https://mhjzddcdfwjxpkjiumdl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oanpkZGNkZndqeHBraml1bWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODk4MTQsImV4cCI6MjA2MTQ2NTgxNH0.0iQOH_OhNjkq8RR64cKmEBkJ1vE5lnEd5OuDjnn0Iug'; // 예시로 제공된 키 (보안을 위해 실제 환경에서는 더 안전한 방법으로 관리)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 버튼 클릭 시 Supabase로 데이터 추가 및 상태 관리
document.getElementById("addButton").addEventListener("click", async () => {
    // 버튼 클릭 시 메시지 박스 초기화
    document.getElementById("messageBox").innerText = "데이터를 추가하는 중...";

    // Supabase에 데이터 추가하기
    const { data, error } = await supabase
        .from('tasks')  // 예시로 'tasks'라는 테이블을 사용한다고 가정
        .insert([{ task_name: '새로운 작업', completed: false }]);

    if (error) {
        document.getElementById("messageBox").innerText = `오류 발생: ${error.message}`;
    } else {
        document.getElementById("messageBox").innerText = "작업이 성공적으로 추가되었습니다!";
    }
});
