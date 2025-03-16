import { toggleTodo } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '@/types/todo';

interface ToggleTodoInput {
  id: string;
  completed: boolean;
  title: string;
  date: string;
}

interface Context {
  previousTodos: Todo[] | undefined;
}

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ToggleTodoInput, Context>({
    mutationFn: ({ id, completed }) => toggleTodo({ id, completed }),
    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => {
        return old.map((oldTodo) =>
          oldTodo.id === todo.id
            ? {
                ...oldTodo,
                completed: !todo.completed,
                date: new Date().toISOString(),
              }
            : oldTodo,
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
