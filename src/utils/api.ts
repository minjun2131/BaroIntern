import { TodoList } from '@/features/todos/types/todo';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL 환경 변수가 설정되지 않았습니다.');
}

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`요청 실패: ${res.status} - ${errorText}`);
  }
  return res.json();
};

/* 조회 */
export const fetchTodos = async (): Promise<TodoList[]> => {
  return request<TodoList[]>(BASE_URL, { cache: 'no-store' });
};

/* 생성 */
export const createTodo = async (title: string): Promise<TodoList> => {
  const today = new Date().toISOString().slice(0, 10);
  const newTodo = {
    title,
    date: today,
    completed: false,
  };

  return request<TodoList>(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  });
};

/* 수정 */
export const updateTodo = async (
  id: string,
  updatedFields: Partial<TodoList>,
): Promise<TodoList> => {
  return request<TodoList>(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFields),
  });
};

/* 삭제 */
export const deleteTodo = async (id: string): Promise<void> => {
  await request<void>(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};
