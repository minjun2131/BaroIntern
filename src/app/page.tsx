import { fetchTodos } from '@/utils/api';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { Suspense } from 'react';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  return (
    <div className="mx-auto mb-12 w-full max-w-[90%] rounded-md bg-white p-6 shadow-md sm:max-w-[768px]">
      {/* 제목: 모바일에서는 text-2xl, 데스크탑에서는 text-3xl */}
      <h1 className="mb-6 text-center text-2xl font-bold text-purple-800 lg:text-3xl">
        Todo List
      </h1>
      {/* 할 일 추가 input과 버튼 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TodoForm />
        <Suspense>
          <TodoList />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
