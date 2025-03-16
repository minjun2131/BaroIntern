'use client';

import { Todo } from '@/types/todo';
import { useState } from 'react';
import TodoFilter from './TodoFilter';
import TodoItem from './TodoItem';
import TodoLoading from './TodoLoading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTodos } from '@/utils/api';
import { useToggleTodo } from '@/hooks/useToggleTodo';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';

type TabType = 'all' | 'active' | 'completed';

const TodoList = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [currentTab, setCurrentTab] = useState<TabType>('all');
  const queryClient = useQueryClient();

  const { data, isError, isPending } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const todos = data ?? [];

  const toggleMutation = useToggleTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  if (isError) {
    return (
      <div className="flex h-[42px] items-center justify-center text-red-500">
        데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

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

  const handleToggle = (todo: Todo) => {
    const optimisticTodos = todos.map((t: Todo) =>
      t.id === todo.id ? { ...t, completed: !todo.completed } : t,
    );
    queryClient.setQueryData(['todos'], optimisticTodos);

    toggleMutation.mutate(
      { id: todo.id, completed: todo.completed },
      {
        onError: () => {
          queryClient.setQueryData(['todos'], todos);
        },
      },
    );
  };

  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const handleUpdateTitle = (id: string) => {
    if (editText.trim() !== '') {
      const todo = todos.find((t: Todo) => t.id === id);
      if (todo) {
        const optimisticTodos = todos.map((t: Todo) =>
          t.id === id ? { ...t, title: editText } : t,
        );
        queryClient.setQueryData(['todos'], optimisticTodos);

        updateTodoMutation.mutate(
          {
            id,
            title: editText,
            completed: todo.completed,
          },
          {
            onError: () => {
              queryClient.setQueryData(['todos'], todos);
            },
            onSettled: () => {
              setEditingId(null);
              setEditText('');
            },
          },
        );
      }
    }
  };

  const handleDelete = (id: string) => {
    const optimisticTodos = todos.filter((t: Todo) => t.id !== id);
    queryClient.setQueryData(['todos'], optimisticTodos);

    deleteTodoMutation.mutate(id, {
      onError: () => {
        queryClient.setQueryData(['todos'], todos);
      },
    });
  };

  const getEmptyMessage = () => {
    switch (currentTab) {
      case 'active':
        return '해야 할 일이 없습니다.';
      case 'completed':
        return '완료한 일이 없습니다.';
      default:
        return '할 일이 없습니다.';
    }
  };

  return (
    <div className="mx-auto w-full">
      <TodoFilter currentTab={currentTab} onTabChange={setCurrentTab} />
      {filteredTodos.length === 0 ? (
        <div className="flex h-[42px] items-center justify-center text-gray-500">
          {getEmptyMessage()}
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {filteredTodos.map((todo: Todo) => (
            <TodoItem
              key={filteredTodos[0]?.id}
              todo={filteredTodos[0]}
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
