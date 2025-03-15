import { Trash2 } from 'lucide-react';
import React from 'react';

const TodoList = () => {
  return (
    <div className="mx-auto">
      <ul>
        <li className="flex w-full items-center justify-between border-b border-gray-200 p-3">
          <div className="flex w-full items-center">
            <input type="checkbox" className="mr-3" />
            <span className="text-gray-800">샘플 할 일 항목</span>
          </div>
          <button className="text-red-500 hover:text-red-700">
            <Trash2 size={20} />
          </button>
        </li>
        <li className="flex items-center justify-between border-b border-gray-200 p-3">
          <div className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <span className="text-gray-800">또 다른 할 일 항목</span>
          </div>
          <button className="text-red-500 hover:text-red-700">
            <Trash2 size={20} />
          </button>
        </li>
        {/* 필요한 만큼 할 일 항목을 추가 */}
      </ul>
    </div>
  );
};

export default TodoList;
