import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/utils/api';
import { Todo } from '@/types/todo';

interface UpdateTodoParams {
  id: string;
  title: string;
}

interface Context {
  previousTodos: Todo[] | undefined;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, UpdateTodoParams, Context>({
    mutationFn: ({ id, title }) => updateTodo(id, { title }),
    onMutate: async ({ id, title }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => {
        return old.map((todo) =>
          todo.id === id
            ? { ...todo, title, date: new Date().toISOString() }
            : todo,
        );
      });

      return { previousTodos };
    },
    onError: (err, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('할 일 수정에 실패했습니다:', err);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
