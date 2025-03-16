import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '@/utils/api';
import { Todo } from '@/types/todo';

interface Context {
  previousTodos: Todo[] | undefined;
}

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, string, Context>({
    mutationFn: (title: string) => addTodo(title),
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // 임시 ID 생성
      const tempId = `temp-${Date.now()}`;
      const newTodo: Todo = {
        id: tempId,
        title,
        completed: false,
        date: new Date().toISOString(),
      };

      // 낙관적 업데이트
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => {
        return [...old, newTodo];
      });

      return { previousTodos };
    },
    onError: (err, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('할 일 추가에 실패했습니다:', err);
    },
    onSuccess: (newTodo) => {
      // 성공 시 서버에서 받은 실제 todo로 업데이트
      const currentTodos = queryClient.getQueryData<Todo[]>(['todos']);
      if (currentTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], currentTodos);
      }
    },
  });
};
