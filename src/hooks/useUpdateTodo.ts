import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/utils/api';
import { Todo } from '@/types/todo';

interface UpdateTodoInput {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

interface Context {
  previousTodos: Todo[] | undefined;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, UpdateTodoInput, Context>({
    mutationFn: (todo) => updateTodo(todo.id, todo),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => {
        return old.map((todo) =>
          todo.id === newTodo.id
            ? { ...todo, ...newTodo, date: new Date().toISOString() }
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
