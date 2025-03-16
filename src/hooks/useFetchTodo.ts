import { fetchTodos } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱된 데이터 유지
  });
};
