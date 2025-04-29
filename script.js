import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/dist/module/supabase.js';

const supabaseUrl = 'https://mhjzddcdfwjxpkjiumdl.supabase.co';
const supabaseAnonKey = '<YOUR_ANON_KEY>';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

let currentTaskId = null;
let taskSubscription = null;
let draggedTaskId = null;
let mentionSuggestions = [];

// DOM
const commentModal = document.getElementById('comment-modal');
const commentsList = document.getElementById('comments-list');
const commentInput = document.getElementById('comment-input');
const btnPostComment = document.getElementById('btn-post-comment');

// 댓글 모달 열기
async function openCommentModal(taskId) {
  currentTaskId = taskId;
  commentModal.classList.add('show');
  loadComments();
  subscribeComments();
}

// 댓글 로드
async function loadComments() {
  const { data } = await supabase.from('comments')
    .select('id, taskId, content, author, createdAt')
    .eq('taskId', currentTaskId)
    .order('createdAt');
  commentsList.innerHTML = '';
  data.forEach(c => {
    const div = document.createElement('div'); div.className = 'comment-item';
    const html = c.content.replace(/@(\\w+)/g, '<span class="mention">@$1</span>');
    div.innerHTML = `<div>${html}</div><small>${c.author} · ${new Date(c.createdAt).toLocaleString()}</small>`;
    commentsList.appendChild(div);
  });
}

// 댓글 작성
btnPostComment.onclick = async () => {
  const content = commentInput.value.trim();
  if (!content) return;
  const user = supabase.auth.user();
  await supabase.from('comments').insert([{ taskId: currentTaskId, content, author: user.email }]);
  commentInput.value = '';
};

// 멘션 자동완성 기능
commentInput.addEventListener('input', async (e) => {
  const text = e.target.value;
  const mentionPattern = /@([a-zA-Z0-9_]+)$/;
  const match = mentionPattern.exec(text);
  if (match) {
    const mentionText = match[1];
    mentionSuggestions = await getMentions(mentionText);
    showMentionSuggestions(e.target);
  } else {
    hideMentionSuggestions();
  }
});

// 멘션 자동완성 가져오기 (예시: 이메일 목록 또는 사용자 목록)
async function getMentions(prefix) {
  const { data } = await supabase.from('users').select('email').ilike('email', `%${prefix}%`);
  return data.map(user => user.email);
}

// 멘션 자동완성 UI 표시
function showMentionSuggestions(inputField) {
  const rect = inputField.getBoundingClientRect();
  const suggestionsList = document.createElement('div');
  suggestionsList.className = 'mention-suggestions';
  mentionSuggestions.forEach(suggestion => {
    const item = document.createElement('div');
    item.className = 'mention-suggestion';
    item.textContent = suggestion;
    item.onclick = () => insertMention(suggestion);
    suggestionsList.appendChild(item);
  });
  document.body.appendChild(suggestionsList);
  suggestionsList.style.left = rect.left + 'px';
  suggestionsList.style.top = rect.bottom + 'px';
}

// 멘션 삽입
function insertMention(mention) {
  const currentValue = commentInput.value;
  const mentionPosition = currentValue.lastIndexOf('@');
  commentInput.value = currentValue.slice(0, mentionPosition) + '@' + mention + ' ';  // Add mention
  hideMentionSuggestions();
}

// 멘션 목록 숨기기
function hideMentionSuggestions() {
  const suggestionsList = document.querySelector('.mention-suggestions');
  if (suggestionsList) suggestionsList.remove();
}

// 댓글 모달 닫기
function closeCommentModal() {
  commentModal.classList.remove('show');
  if (taskSubscription) supabase.removeSubscription(taskSubscription);
}

// 댓글 구독
function subscribeComments() {
  if (taskSubscription) supabase.removeSubscription(taskSubscription);
  taskSubscription = supabase.from(`comments:taskId=eq.${currentTaskId}`).on('*', () => loadComments()).subscribe();
}
