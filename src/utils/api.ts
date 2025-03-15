const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/todos';

export const fetchTodos = async () => {
  try {
    const res = await fetch(`${BASE_URL}`);
    if (!res.ok) {
      throw new Error('할 일 목록을 가져오는데 실패했습니다.');
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (title: string) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date: new Date(), completed: false }),
    });

    if (!res.ok) {
      throw new Error('할 일을 추가하는데 문제가 생겼습니다.');
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('할 일을 삭제하는데 문제가 생겼습니다.');
    }
  } catch (error) {
    throw error;
  }
};

export const toggleTodo = async ({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }),
    });

    if (!res.ok) {
      throw new Error('할 일 완료 상태를 변경하는데 문제가 생겼습니다.');
    }
  } catch (error) {
    throw error;
  }
};
