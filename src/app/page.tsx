import TodoList from '@/features/todos/components/TodoList';

export default function Home() {
  return (
    <div className="mx-auto rounded-md bg-white p-6 shadow-md lg:max-w-lg">
      {/* 제목: 모바일에서는 text-2xl, 데스크탑에서는 text-3xl */}
      <h1 className="mb-6 text-center text-2xl font-bold lg:text-3xl">
        Todo List
      </h1>
      {/* 할 일 추가 input과 버튼 */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="새 할 일을 입력하세요"
          className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="rounded-r-md bg-blue-500 px-4 text-white hover:bg-blue-600">
          추가
        </button>
      </div>
      {/* 할 일 목록 */}
      <TodoList />
    </div>
  );
}
