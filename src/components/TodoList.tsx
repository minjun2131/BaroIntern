'use client';

import { Todo } from '@/types/todo';
import { useState } from 'react';
import TodoFilter from './TodoFilter';
import TodoItem from './TodoItem';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '@/utils/api';

type TabType = 'all' | 'active' | 'completed';

const TodoList = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('all');

  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (currentTab) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="mx-auto w-full">
      <TodoFilter currentTab={currentTab} onTabChange={setCurrentTab} />
      {filteredTodos.length === 0 ? (
        <div className="flex h-[42px] items-center justify-center text-gray-500">
          할 일이 없습니다.
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {filteredTodos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={false}
              editText=""
              onEditClick={() => {}}
              onEditChange={() => {}}
              onEditSubmit={() => {}}
              onToggle={() => {}}
              onDelete={() => {}}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
