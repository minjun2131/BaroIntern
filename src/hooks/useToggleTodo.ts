import { toggleTodo } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '@/types/todo';

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodo,
    onMutate: async ({ id, completed }) => {
      // 진행 중인 todos 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // 이전 상태 저장
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // 낙관적으로 UI 업데이트
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => {
        return old.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo,
        );
      });

      // 이전 상태 반환 (롤백을 위해)
      return { previousTodos };
    },
    onError: (err, _, context) => {
      // 에러 발생 시 이전 상태로 롤백
      queryClient.setQueryData(['todos'], context?.previousTodos);
      console.error('할 일 완료 상태 변경에 실패했습니다:', err);
    },
    onSettled: () => {
      // 성공/실패 여부와 관계없이 서버와 동기화
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
