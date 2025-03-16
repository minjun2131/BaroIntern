'use client';

import { Todo } from '@/types/todo';
import {
  Check,
  Edit2,
  Trash2,
  Calendar,
  Square,
  CheckSquare,
} from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editText: string;
  onEditClick: (todo: Todo) => void;
  onEditChange: (value: string) => void;
  onEditSubmit: (id: string) => void;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({
  todo,
  isEditing,
  editText,
  onEditClick,
  onEditChange,
  onEditSubmit,
  onToggle,
  onDelete,
}: TodoItemProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // 버튼 클릭 시에는 토글하지 않음
    if (!(e.target instanceof HTMLButtonElement) && !isEditing) {
      onToggle(todo);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div>테스트</div>
    // <li
    //   onClick={handleCardClick}
    //   className={`flex min-h-[90px] cursor-pointer flex-col justify-between rounded-lg p-3 shadow-sm transition-all sm:min-h-[100px] sm:p-5 ${
    //     todo.completed
    //       ? 'bg-gray-50 opacity-80'
    //       : 'bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 hover:from-purple-100 hover:via-purple-50 hover:to-purple-100 hover:shadow-md'
    //   }`}
    // >
    //   <div className="flex min-w-0 flex-col gap-1">
    //     {isEditing ? (
    //       <input
    //         type="text"
    //         value={editText}
    //         onChange={(e) => onEditChange(e.target.value)}
    //         onKeyDown={(e) => e.key === 'Enter' && onEditSubmit(todo.id)}
    //         className="w-full rounded border border-purple-200 px-2 py-1.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:px-4 sm:py-2 sm:text-base"
    //         autoFocus
    //         onClick={(e) => e.stopPropagation()} // 입력 중 클릭 이벤트 전파 방지
    //       />
    //     ) : (
    //       <>
    //         <div className="flex items-center gap-2">
    //           <button
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               onToggle(todo);
    //             }}
    //             className="rounded-full p-1 text-purple-600 hover:bg-purple-200 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    //           >
    //             {todo.completed ? (
    //               <CheckSquare size={20} className="sm:h-6 sm:w-6" />
    //             ) : (
    //               <Square size={20} className="sm:h-6 sm:w-6" />
    //             )}
    //           </button>
    //           <span
    //             className={`w-full truncate py-1 text-sm sm:py-2 sm:text-base ${
    //               todo.completed
    //                 ? 'text-gray-500 line-through'
    //                 : 'text-purple-900'
    //             }`}
    //           >
    //             {todo.title}
    //           </span>
    //         </div>
    //         <div className="flex items-center gap-1 pl-[7px] text-xs text-purple-400 sm:text-sm">
    //           <Calendar size={12} className="sm:h-4 sm:w-4" />
    //           <span>{formatDate(todo.date)}</span>
    //         </div>
    //       </>
    //     )}
    //   </div>
    //   <div className="mt-2 flex justify-end gap-1 sm:mt-3 sm:gap-2">
    //     {isEditing ? (
    //       <button
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           onEditSubmit(todo.id);
    //         }}
    //         className="rounded-full p-1.5 text-purple-600 hover:bg-purple-200 hover:text-purple-700 sm:p-2"
    //       >
    //         <Check size={16} className="sm:h-5 sm:w-5" />
    //       </button>
    //     ) : (
    //       <button
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           onEditClick(todo);
    //         }}
    //         className="rounded-full p-1.5 text-purple-600 hover:bg-purple-200 hover:text-purple-700 sm:p-2"
    //       >
    //         <Edit2 size={16} className="sm:h-5 sm:w-5" />
    //       </button>
    //     )}
    //     {!isEditing && (
    //       <button
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           onDelete(todo.id);
    //         }}
    //         className="rounded-full p-1.5 text-purple-600 hover:bg-purple-200 hover:text-purple-700 sm:p-2"
    //       >
    //         <Trash2 size={16} className="sm:h-5 sm:w-5" />
    //       </button>
    //     )}
    //   </div>
    // </li>
  );
};

export default TodoItem;
