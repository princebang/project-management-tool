// Supabase URL과 키 설정
const supabaseUrl = 'https://mhjzddcdfwjxpkjiumdl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oanpkZGNkZndqeHBraml1bWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODk4MTQsImV4cCI6MjA2MTQ2NTgxNH0.0iQOH_OhNjkq8RR64cKmEBkJ1vE5lnEd5OuDjnn0Iug';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 회원가입 버튼 클릭 이벤트 처리
document.getElementById('btn-signup').addEventListener('click', async () => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        alert(`Error: ${error.message}`);
    } else {
        alert('회원가입 성공!');
        // 회원가입 후 앱 섹션을 보여줌
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
    }
});

// 로그인 버튼 클릭 이벤트 처리
document.getElementById('btn-signin').addEventListener('click', async () => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert(`Error: ${error.message}`);
    } else {
        alert('로그인 성공!');
        // 로그인 후 앱 섹션을 보여줌
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
    }
});
