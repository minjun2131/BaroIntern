import { fetchTodos } from '@/utils/api';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import TodoForm from '@/components/TodoForm';
import dynamic from 'next/dynamic';

const TodoList = dynamic(() => import('@/components/TodoList'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
    </div>
  ),
});

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="mx-auto mb-12 w-full max-w-[90%] rounded-md bg-white p-6 shadow-md sm:max-w-[768px]">
      {/* 제목: 모바일에서는 text-2xl, 데스크탑에서는 text-3xl */}
      <h1 className="mb-6 text-center text-2xl font-bold text-purple-800 lg:text-3xl">
        Todo List
      </h1>
      {/* 할 일 추가 input과 버튼 */}
      <HydrationBoundary state={dehydratedState}>
        <TodoForm />
        <TodoList />
      </HydrationBoundary>
    </div>
  );
}
