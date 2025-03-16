import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/utils/api';
import { Todo } from '@/types/todo';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => {
        return old.filter((todo) => todo.id !== todoId);
      });

      return { previousTodos };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
      console.error('할 일 삭제에 실패했습니다:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
