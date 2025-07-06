import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import type { Route } from "./+types/board-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Badge } from '~/common/components/ui/badge';
import { ArrowLeft, Plus, X, Star, Users, Briefcase, Home, Gamepad2, Heart, CheckCircle, Clock, AlertCircle, Baby, ShoppingCart, Utensils, Car, Move } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inprogress' | 'done';
  isStarred: boolean;
  boardId: string;
  assignee?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface Board {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  createdAt: string;
}

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

// 가족 구성원 옵션 - 더 따뜻한 색상으로 업데이트
const FAMILY_MEMBERS = [
  { value: 'mom', label: '엄마', color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'dad', label: '아빠', color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { value: 'son', label: '아들', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'daughter', label: '딸', color: 'bg-violet-100 text-violet-700 border-violet-200' },
  { value: 'family', label: '가족 모두', color: 'bg-amber-100 text-amber-700 border-amber-200' },
];

// 카테고리 옵션 - 더 부드러운 색상으로 업데이트
const CATEGORIES = [
  { value: 'childcare', label: '육아', icon: Baby, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'shopping', label: '쇼핑', icon: ShoppingCart, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'meal', label: '식사', icon: Utensils, color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'transport', label: '교통', icon: Car, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { value: 'house', label: '집안일', icon: Home, color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

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
  return [];
};

export default function BoardPage({ params }: Route.ComponentProps) {
  const { boardId } = params;
  const navigate = useNavigate();
  
  const [board, setBoard] = useState<Board | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isLoading, setIsLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    // localStorage에서 보드 데이터 로드
    const boards = loadBoards();
    const foundBoard = boards.find(b => b.id === boardId);
    
    if (foundBoard) {
      setBoard(foundBoard);
      
      // localStorage에서 해당 보드의 태스크들을 로드
      const savedTasks = localStorage.getItem(`board-${boardId}-tasks`);
      if (savedTasks) {
        try {
          setTasks(JSON.parse(savedTasks));
        } catch (error) {
          console.error('태스크 데이터 로딩 실패:', error);
          setTasks([]);
        }
      } else {
        // Family Board에 특화된 초기 샘플 데이터
        const initialTasks: Task[] = boardId === '1' ? [
          {
            id: '1',
            title: '아들 저녁 감기약 투약',
            description: '저녁 7시에 감기약 복용',
            status: 'todo',
            isStarred: true,
            boardId: boardId,
            assignee: 'mom',
            category: 'childcare',
            priority: 'high'
          },
          {
            id: '2',
            title: '학용품 구매',
            description: '공책, 연필, 지우개',
            status: 'inprogress',
            isStarred: false,
            boardId: boardId,
            assignee: 'dad',
            category: 'shopping',
            priority: 'medium'
          },
          {
            id: '3',
            title: '주말 가족 나들이 계획',
            description: '놀이공원 vs 박물관',
            status: 'todo',
            isStarred: true,
            boardId: boardId,
            assignee: 'family',
            category: 'house',
            priority: 'low'
          }
        ] : boardId === '2' ? [
          {
            id: '4',
            title: '프로젝트 계획서 작성',
            status: 'todo',
            isStarred: true,
            boardId: boardId,
            priority: 'high'
          },
          {
            id: '5',
            title: '클라이언트 미팅',
            status: 'done',
            isStarred: false,
            boardId: boardId,
            priority: 'medium'
          }
        ] : [];
        setTasks(initialTasks);
      }
    } else {
      setBoard(null);
    }
    
    setIsLoading(false);
  }, [boardId]);

  // localStorage에 태스크 저장
  useEffect(() => {
    if (board && tasks.length >= 0) {
      localStorage.setItem(`board-${boardId}-tasks`, JSON.stringify(tasks));
    }
  }, [tasks, boardId, board]);

  // 드래그 앤 드롭 핸들러
  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', (e.currentTarget as HTMLElement).outerHTML);
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: 'todo' | 'inprogress' | 'done') => {
    e.preventDefault();
    
    if (draggedTask && draggedTask.status !== newStatus) {
      setTasks(tasks.map(task =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      ));
    }
    setDraggedTask(null);
  };

  const handleAddTask = (status: 'todo' | 'inprogress' | 'done') => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || undefined,
        status,
        isStarred: false,
        boardId: boardId,
        assignee: newTaskAssignee || undefined,
        category: newTaskCategory || undefined,
        priority: newTaskPriority
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskAssignee('');
      setNewTaskCategory('');
      setNewTaskPriority('medium');
      setIsAddingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleStar = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const handleMoveTask = (taskId: string, newStatus: 'todo' | 'inprogress' | 'done') => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleCancelAdd = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskAssignee('');
    setNewTaskCategory('');
    setNewTaskPriority('medium');
    setIsAddingTask(null);
  };

  // 우선순위 아이콘과 색상
  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3 text-red-500" />;
      case 'medium': return <Clock className="w-3 h-3 text-amber-500" />;
      case 'low': return <CheckCircle className="w-3 h-3 text-emerald-500" />;
      default: return null;
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-400 mx-auto mb-4"></div>
          <p className="text-slate-600">가족 보드를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 보드를 찾을 수 없을 때
  if (!board) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">보드를 찾을 수 없어요</h2>
            <p className="text-slate-600 mb-6">
              요청하신 가족 보드가 존재하지 않거나 삭제되었을 수 있어요.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/boards">
                <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  보드 목록으로 돌아가기
                </Button>
              </Link>
              <Button variant="outline" onClick={() => navigate(-1)}>
                이전 페이지
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = board.icon;
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  // Family Board를 위한 따뜻한 색상의 컬럼 설정 - 더 가족적인 색상으로 업데이트
  const columns = [
    { 
      id: 'todo', 
      title: '🌅 오늘 할 일', 
      tasks: todoTasks, 
      color: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200',
      headerColor: 'text-amber-800',
      allowAddTask: true
    },
    { 
      id: 'inprogress', 
      title: '⚡ 진행 중', 
      tasks: inProgressTasks, 
      color: 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200',
      headerColor: 'text-sky-800',
      allowAddTask: false
    },
    { 
      id: 'done', 
      title: '🎉 완료!', 
      tasks: doneTasks, 
      color: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200',
      headerColor: 'text-emerald-800',
      allowAddTask: false
    }
  ];

  // Family Board인지 확인
  const isFamilyBoard = boardId === '1' || board.name.toLowerCase().includes('family');

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/boards">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800 hover:bg-white/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              보드 목록
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl ${board.color} flex items-center justify-center shadow-lg`}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-1">{board.name}</h1>
            <p className="text-slate-600 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              {board.description}
            </p>
          </div>
        </div>

        {/* 가족 보드 통계 - 더 따뜻하고 현대적인 디자인 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-amber-700 mb-1">{tasks.length}</div>
              <div className="text-sm text-amber-600 font-medium">전체 할 일</div>
            </CardContent>
          </Card>
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-rose-700 mb-1">{todoTasks.length}</div>
              <div className="text-sm text-rose-600 font-medium">남은 할 일</div>
            </CardContent>
          </Card>
          <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-sky-700 mb-1">{inProgressTasks.length}</div>
              <div className="text-sm text-sky-600 font-medium">진행 중</div>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-emerald-700 mb-1">{doneTasks.length}</div>
              <div className="text-sm text-emerald-600 font-medium">완료 🎉</div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div 
            key={column.id} 
            className={`rounded-2xl border-2 ${column.color} p-6 shadow-lg min-h-[500px]`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as any)}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`font-bold text-xl ${column.headerColor}`}>{column.title}</h3>
              <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">
                {column.tasks.length}
              </Badge>
            </div>
            
            <div className="space-y-4">
              {/* 태스크 추가 폼 - 오직 "오늘 할 일"에만 표시 */}
              {column.allowAddTask && (
                <>
                  {isAddingTask === column.id ? (
                    <Card className="border-2 border-dashed border-amber-300 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-5 space-y-4">
                        <Input
                          placeholder="할 일을 입력하세요"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleAddTask(column.id as any)}
                          autoFocus
                          className="text-base border-amber-200 focus:border-amber-400"
                        />
                        <Input
                          placeholder="설명 (선택사항)"
                          value={newTaskDescription}
                          onChange={(e) => setNewTaskDescription(e.target.value)}
                          className="text-sm border-amber-200 focus:border-amber-400"
                        />
                        
                        {isFamilyBoard && (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-semibold text-slate-700 mb-2 block">담당자</label>
                              <select
                                value={newTaskAssignee}
                                onChange={(e) => setNewTaskAssignee(e.target.value)}
                                className="w-full p-2 border border-amber-200 rounded-lg text-sm focus:border-amber-400 focus:outline-none"
                              >
                                <option value="">선택안함</option>
                                {FAMILY_MEMBERS.map(member => (
                                  <option key={member.value} value={member.value}>{member.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-700 mb-2 block">카테고리</label>
                              <select
                                value={newTaskCategory}
                                onChange={(e) => setNewTaskCategory(e.target.value)}
                                className="w-full p-2 border border-amber-200 rounded-lg text-sm focus:border-amber-400 focus:outline-none"
                              >
                                <option value="">선택안함</option>
                                {CATEGORIES.map(category => (
                                  <option key={category.value} value={category.value}>{category.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleAddTask(column.id as any)}
                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-medium"
                          >
                            추가하기
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={handleCancelAdd}
                            className="flex-1 border-amber-300 hover:bg-amber-50"
                          >
                            취소
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingTask(column.id)}
                      className="w-full border-dashed border-2 border-amber-300 h-14 hover:bg-white/70 transition-all duration-200 text-amber-700 font-medium"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      새 할 일 추가
                    </Button>
                  )}
                </>
              )}

              {/* 태스크 목록 */}
              {column.tasks.length === 0 && (!column.allowAddTask || isAddingTask !== column.id) ? (
                <div className="text-center py-16 text-slate-500">
                  <div className="text-6xl mb-4">
                    {column.id === 'todo' && '📝'}
                    {column.id === 'inprogress' && '⚡'}
                    {column.id === 'done' && '🎉'}
                  </div>
                  <div className="text-sm font-medium">아직 할 일이 없어요</div>
                  {column.allowAddTask && (
                    <div className="text-xs mt-1 text-slate-400">위 버튼을 눌러 새로운 할 일을 추가해보세요</div>
                  )}
                </div>
              ) : (
                column.tasks.map((task) => {
                  const assignee = FAMILY_MEMBERS.find(m => m.value === task.assignee);
                  const category = CATEGORIES.find(c => c.value === task.category);
                  const CategoryIcon = category?.icon;
                  
                  return (
                    <Card 
                      key={task.id} 
                      className="group hover:shadow-xl transition-all duration-300 border-white/50 bg-white/90 backdrop-blur-sm cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Move className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <h4 className="font-semibold text-base leading-relaxed text-slate-800">
                                {task.title}
                              </h4>
                            </div>
                            {task.description && (
                              <p className="text-sm text-slate-600 leading-relaxed mb-3">{task.description}</p>
                            )}
                            
                            {/* 가족 구성원, 카테고리, 우선순위 표시 */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {assignee && (
                                <Badge className={`${assignee.color} text-xs border font-medium`}>
                                  {assignee.label}
                                </Badge>
                              )}
                              {category && (
                                <Badge className={`${category.color} text-xs border font-medium flex items-center gap-1`}>
                                  {CategoryIcon && <CategoryIcon className="w-3 h-3" />}
                                  {category.label}
                                </Badge>
                              )}
                              {task.priority && (
                                <div className="flex items-center gap-1">
                                  {getPriorityIcon(task.priority)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 ml-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStar(task.id)}
                              className={`p-2 ${task.isStarred ? 'text-amber-500' : 'text-slate-400'} hover:text-amber-500`}
                            >
                              <Star className="w-4 h-4" fill={task.isStarred ? "currentColor" : "none"} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-rose-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* 태스크 이동 버튼들 */}
                        <div className="flex gap-2 flex-wrap">
                          {column.id !== 'todo' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMoveTask(task.id, 'todo')}
                              className="text-xs px-3 py-1 h-7 hover:bg-amber-50 border-amber-200 text-amber-700"
                            >
                              할 일로
                            </Button>
                          )}
                          {column.id !== 'inprogress' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMoveTask(task.id, 'inprogress')}
                              className="text-xs px-3 py-1 h-7 hover:bg-sky-50 border-sky-200 text-sky-700"
                            >
                              진행중으로
                            </Button>
                          )}
                          {column.id !== 'done' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMoveTask(task.id, 'done')}
                              className="text-xs px-3 py-1 h-7 hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                            >
                              완료! 🎉
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 