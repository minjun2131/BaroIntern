import { toggleTodo } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '@/types/todo';

interface ToggleTodoInput {
  id: string;
  completed: boolean;
}

interface Context {
  previousTodos: Todo[] | undefined;
}

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ToggleTodoInput, Context>({
    mutationFn: toggleTodo,
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // 낙관적 업데이트
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => {
        return old.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !completed, date: new Date().toISOString() }
            : todo,
        );
      });

      return { previousTodos };
    },
    onError: (err, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('할 일 완료 상태 변경에 실패했습니다:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
