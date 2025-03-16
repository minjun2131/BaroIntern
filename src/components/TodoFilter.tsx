'use client';

type TabType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TodoFilter = ({ currentTab, onTabChange }: TodoFilterProps) => {
  const tabs = [
    { id: 'all' as const, label: '전체' },
    { id: 'active' as const, label: '해야할 일' },
    { id: 'completed' as const, label: '완료한 일' },
  ];

  return (
    <div className="mb-6 flex w-full justify-center">
      <div className="flex rounded-lg bg-purple-50 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`rounded-md px-2 py-1.5 text-xs transition-all sm:px-4 sm:py-2 sm:text-sm ${
              currentTab === tab.id
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-purple-600 hover:bg-purple-100'
            } `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;
