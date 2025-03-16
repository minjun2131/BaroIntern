import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '@/utils/api';

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => addTodo(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
