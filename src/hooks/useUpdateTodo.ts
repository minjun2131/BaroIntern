import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/utils/api';
import { Todo } from '@/types/todo';

interface UpdateTodoInput {
  id: string;
  title: string;
  completed: boolean;
}

interface Context {
  previousTodos: Todo[] | undefined;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, UpdateTodoInput, Context>({
    mutationFn: ({ id, title, completed }) =>
      updateTodo(id, { title, completed }),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      const newTodos = (previousTodos || []).map((todo) =>
        todo.id === newTodo.id
          ? {
              ...todo,
              title: newTodo.title,
              completed: newTodo.completed,
              date: new Date().toISOString(),
            }
          : todo,
      );

      queryClient.setQueryData<Todo[]>(['todos'], newTodos);

      return { previousTodos };
    },
    onError: (err, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('할 일 수정에 실패했습니다:', err);
    },
    onSuccess: () => {
      const currentTodos = queryClient.getQueryData<Todo[]>(['todos']);
      if (currentTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], currentTodos);
      }
    },
  });
};
