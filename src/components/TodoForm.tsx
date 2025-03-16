'use client';

import { useState } from 'react';
import { useAddTodo } from '@/hooks/useAddTodo';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const addTodoMutation = useAddTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '') {
      await addTodoMutation.mutateAsync(title);
      setTitle('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새 할 일을 입력하세요"
        className="flex-1 rounded-md border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-base"
      />
      <button
        type="submit"
        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 sm:text-base"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
