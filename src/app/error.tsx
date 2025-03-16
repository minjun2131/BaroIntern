'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-semibold text-purple-900">
        앗! 문제가 발생했어요
      </h2>
      <p className="text-purple-600">
        데이터를 불러오는 중에 오류가 발생했습니다.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
      >
        다시 시도하기
      </button>
    </div>
  );
}
