import type { Route } from "./+types/tasks-page";
import { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { TaskCard } from '../components/TaskCard';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  isStarred: boolean;
}

export default function TasksPage({}: Route.ComponentProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '아들 저녁 감기약 투약',
      isCompleted: false,
      isStarred: true
    },
    {
      id: '2', 
      title: '학용품 구매',
      isCompleted: false,
      isStarred: false
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const handleToggleStar = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        isCompleted: false,
        isStarred: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const handleCancelAdd = () => {
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>To Do List</CardTitle>
            <CardDescription>가족과 함께하는 일정 관리, 소통으로 더 나은 하루를 만들어보세요.</CardDescription>
          </CardHeader>
        </Card>
        
        {/* 새 태스크 추가 UI */}
        {isAddingTask ? (
          <Card>
            <div className="p-4 space-y-3">
              <Input
                placeholder="새로운 할 일을 입력하세요"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={handleAddTask} className="flex-1">
                  추가
                </Button>
                <Button variant="outline" onClick={handleCancelAdd} className="flex-1">
                  취소
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="p-4">
              <Button 
                onClick={() => setIsAddingTask(true)}
                variant="outline" 
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                새 할 일 추가
              </Button>
            </div>
          </Card>
        )}
        
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            isCompleted={task.isCompleted}
            isStarred={task.isStarred}
            onToggleComplete={handleToggleComplete}
            onToggleStar={handleToggleStar}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
} 