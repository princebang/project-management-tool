// Supabase 초기화
const supabaseUrl = 'https://mhjzddcdfwjxpkjiumdl.supabase.co';  // 실제 프로젝트 URL로 교체
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oanpkZGNkZndqeHBraml1bWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODk4MTQsImV4cCI6MjA2MTQ2NTgxNH0.0iQOH_OhNjkq8RR64cKmEBkJ1vE5lnEd5OuDjnn0Iug'; // 실제 API 키로 교체
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Supabase 데이터 가져오기 예시
async function getData() {
    const { data, error } = await supabase
        .from('your_table')  // 테이블 이름으로 수정
        .select('*');
    if (error) {
        console.error('데이터 가져오기 실패:', error);
    } else {
        console.log('가져온 데이터:', data);
    }
}

getData();  // 데이터 가져오는 함수 호출

// SliderBarShow 오류 해결을 위한 객체 초기화
const someObject = {
    SliderBarShow: true  // 예시로 객체에 SliderBarShow 속성 추가
};

// SliderBarShow가 정의되었는지 확인 후 사용
if (someObject && someObject.SliderBarShow) {
    console.log('SliderBarShow가 활성화되었습니다.');
} else {
    console.log('SliderBarShow가 정의되지 않았습니다.');
}

// DOM 작업 예시: 버튼 클릭 시 동작
document.getElementById('someButton').addEventListener('click', () => {
    console.log('버튼이 클릭되었습니다.');
});
