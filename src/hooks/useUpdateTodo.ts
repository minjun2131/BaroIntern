import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/utils/api';
import { Todo } from '@/types/todo';

interface UpdateTodoParams {
  id: string;
  title: string;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: UpdateTodoParams) => updateTodo(id, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
