'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, toggleTodo } from '@/utils/api';
import { Todo } from '@/types/todo';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import { useState } from 'react';
import TodoFilter from './TodoFilter';
import TodoItem from './TodoItem';
import TodoLoading from './TodoLoading';

type TabType = 'all' | 'active' | 'completed';

const TodoList = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [currentTab, setCurrentTab] = useState<TabType>('all');

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isPending) {
    return <TodoLoading />;
  }

  if (isError) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }

  const filteredTodos = todos?.filter((todo) => {
    switch (currentTab) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleToggle = (todo: Todo) => {
    toggleMutation.mutate({ id: todo.id, completed: todo.completed });
  };

  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const handleUpdateTitle = async (id: string) => {
    if (editText.trim() !== '') {
      await updateTodoMutation.mutateAsync({ id, title: editText });
      setEditingId(null);
      setEditText('');
    }
  };

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
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
      {filteredTodos?.length === 0 ? (
        <div className="flex h-[42px] items-center justify-center text-gray-500">
          {getEmptyMessage()}
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {filteredTodos?.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              editText={editText}
              onEditClick={handleEditClick}
              onEditChange={setEditText}
              onEditSubmit={handleUpdateTitle}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
