import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/dist/module/supabase.js';

const supabaseUrl = 'https://mhjzddcdfwjxpkjiumdl.supabase.co';
const supabaseAnonKey = '<YOUR_ANON_KEY>';  // 여기에 실제 Supabase Anon Key 입력
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// DOM 요소
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const btnSignUp = document.getElementById('btn-signup');
const btnSignIn = document.getElementById('btn-signin');

// 회원가입
btnSignUp.onclick = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  
  if (!email || !password) {
    return alert("이메일과 비밀번호를 입력하세요.");
  }

  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return alert('회원가입 실패: ' + error.message);
  }

  alert('회원가입 성공! 이메일을 확인하세요.');
};

// 로그인
btnSignIn.onclick = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    return alert("이메일과 비밀번호를 입력하세요.");
  }

  const { user, error } = await supabase.auth.signIn({ email, password });

  if (error) {
    return alert('로그인 실패: ' + error.message);
  }

  // 로그인 성공 시 앱 화면으로 전환
  alert('로그인 성공!');
  document.getElementById('auth-section').style.display = 'none'; // 로그인 후 화면 전환
  document.getElementById('app-section').style.display = 'block'; // 실제 앱 화면 보이기
};

// 로그아웃
async function signOut() {
  await supabase.auth.signOut();
  alert('로그아웃되었습니다!');
  // 로그인 화면으로 돌아가기
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('app-section').style.display = 'none';
}
