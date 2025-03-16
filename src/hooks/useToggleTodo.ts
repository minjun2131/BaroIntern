import { toggleTodo } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: (_, { id, completed }) => {
      // ✅ 캐싱된 데이터 즉시 업데이트 (낙관적 업데이트 가능)
      queryClient.setQueryData(['todos'], (oldTodos: any) =>
        oldTodos?.map((todo: any) =>
          todo.id === id ? { ...todo, completed: !completed } : todo,
        ),
      );

      // ✅ 서버 데이터 최신화
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('할 일 완료 상태 변경에 실패했습니다:', error);
    },
  });
};
