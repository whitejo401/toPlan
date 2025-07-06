import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Route } from "./+types/boards-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Plus, Trash2, Users, Briefcase, Home, Gamepad2 } from 'lucide-react';

interface Board {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  createdAt: string;
}

const iconOptions = [
  { icon: Users, name: 'Family', color: 'bg-green-500' },
  { icon: Briefcase, name: 'Work', color: 'bg-blue-500' },
  { icon: Home, name: 'Home', color: 'bg-yellow-500' },
  { icon: Gamepad2, name: 'Personal', color: 'bg-purple-500' },
];

// 아이콘 이름을 통해 아이콘 컴포넌트를 가져오는 헬퍼 함수
const getIconByName = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'Users': Users,
    'Briefcase': Briefcase,
    'Home': Home,
    'Gamepad2': Gamepad2,
  };
  return iconMap[iconName] || Users;
};

// localStorage에서 보드 데이터 로드
const loadBoards = (): Board[] => {
  try {
    const savedBoards = localStorage.getItem('user-boards');
    if (savedBoards) {
      const parsedBoards = JSON.parse(savedBoards);
      return parsedBoards.map((board: any) => ({
        ...board,
        icon: getIconByName(board.iconName)
      }));
    }
  } catch (error) {
    console.error('보드 데이터 로딩 실패:', error);
  }
  
  // 기본 보드들
  return [
    {
      id: '1',
      name: 'Family Board',
      description: '가족과 함께하는 일정과 할 일들',
      icon: Users,
      color: 'bg-green-500',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Work Board',
      description: '업무 관련 프로젝트와 태스크들',
      icon: Briefcase,
      color: 'bg-blue-500',
      createdAt: new Date().toISOString()
    }
  ];
};

// localStorage에 보드 데이터 저장
const saveBoards = (boards: Board[]) => {
  try {
    const boardsToSave = boards.map(board => ({
      ...board,
      iconName: board.icon.name // 아이콘 컴포넌트를 이름으로 저장
    }));
    localStorage.setItem('user-boards', JSON.stringify(boardsToSave));
  } catch (error) {
    console.error('보드 데이터 저장 실패:', error);
  }
};

export default function BoardsPage({}: Route.ComponentProps) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  // 컴포넌트 마운트 시 보드 데이터 로드
  useEffect(() => {
    const loadedBoards = loadBoards();
    setBoards(loadedBoards);
    
    // 기본 보드가 없으면 localStorage에 저장
    if (!localStorage.getItem('user-boards')) {
      saveBoards(loadedBoards);
    }
  }, []);

  // 보드 변경 시 localStorage에 저장
  useEffect(() => {
    if (boards.length > 0) {
      saveBoards(boards);
    }
  }, [boards]);

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      const selectedIcon = iconOptions[selectedIconIndex];
      const newBoard: Board = {
        id: Date.now().toString(),
        name: newBoardName.trim(),
        description: newBoardDescription.trim() || '새로운 보드입니다.',
        icon: selectedIcon.icon,
        color: selectedIcon.color,
        createdAt: new Date().toISOString()
      };
      setBoards([...boards, newBoard]);
      setNewBoardName('');
      setNewBoardDescription('');
      setSelectedIconIndex(0);
      setIsCreating(false);
    }
  };

  const handleDeleteBoard = (boardId: string) => {
    // 보드 삭제 시 해당 보드의 태스크도 삭제
    localStorage.removeItem(`board-${boardId}-tasks`);
    setBoards(boards.filter(board => board.id !== boardId));
  };

  const handleCancelCreate = () => {
    setNewBoardName('');
    setNewBoardDescription('');
    setSelectedIconIndex(0);
    setIsCreating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Boards</h1>
        <p className="text-gray-600">다양한 영역별로 할 일을 관리해보세요</p>
      </div>

      {/* 빠른 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{boards.length}</div>
            <div className="text-sm text-gray-600">전체 보드</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {boards.reduce((total, board) => {
                const tasks = localStorage.getItem(`board-${board.id}-tasks`);
                return total + (tasks ? JSON.parse(tasks).filter((t: any) => t.status === 'done').length : 0);
              }, 0)}
            </div>
            <div className="text-sm text-gray-600">완료된 할 일</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {boards.reduce((total, board) => {
                const tasks = localStorage.getItem(`board-${board.id}-tasks`);
                return total + (tasks ? JSON.parse(tasks).filter((t: any) => t.status !== 'done').length : 0);
              }, 0)}
            </div>
            <div className="text-sm text-gray-600">진행 중인 할 일</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 새 보드 생성 카드 */}
        {isCreating ? (
          <Card>
            <CardHeader>
              <CardTitle>새 보드 만들기</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="보드 이름"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateBoard()}
                  autoFocus
                />
              </div>
              <div>
                <Input
                  placeholder="보드 설명 (선택사항)"
                  value={newBoardDescription}
                  onChange={(e) => setNewBoardDescription(e.target.value)}
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">아이콘 선택:</p>
                <div className="flex gap-2">
                  {iconOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedIconIndex(index)}
                        className={`p-2 rounded-lg border-2 transition-colors ${
                          selectedIconIndex === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded ${option.color} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateBoard} className="flex-1">
                  생성
                </Button>
                <Button variant="outline" onClick={handleCancelCreate} className="flex-1">
                  취소
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
            <CardContent className="p-6">
              <Button 
                onClick={() => setIsCreating(true)}
                variant="ghost" 
                className="w-full h-full min-h-[120px] flex flex-col items-center justify-center gap-2"
              >
                <Plus className="w-8 h-8 text-gray-400" />
                <span className="text-gray-600">새 보드 만들기</span>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 기존 보드들 */}
        {boards.map((board) => {
          const IconComponent = board.icon;
          const tasks = localStorage.getItem(`board-${board.id}-tasks`);
          const taskCount = tasks ? JSON.parse(tasks).length : 0;
          const completedCount = tasks ? JSON.parse(tasks).filter((t: any) => t.status === 'done').length : 0;
          
          return (
            <Card key={board.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${board.color} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{board.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {taskCount}개 할 일 · {completedCount}개 완료
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm(`"${board.name}" 보드를 삭제하시겠습니까? 모든 할 일이 함께 삭제됩니다.`)) {
                        handleDeleteBoard(board.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>{board.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link to={`/boards/${board.id}`}>
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    보드 열기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 