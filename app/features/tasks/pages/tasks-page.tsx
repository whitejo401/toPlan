import type { Route } from "./+types/tasks-page";
import { Card, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card';
import { TaskCard } from '../components/TaskCard';

export default function TasksPage({}: Route.ComponentProps) {
  // 예시 데이터
  const tasks = [
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
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>To Do List</CardTitle>
            <CardDescription>가족과 함께하는 일정 관리, 소통으로 더 나은 하루를 만들어보세요.</CardDescription>
          </CardHeader>
        </Card>
        
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            isCompleted={task.isCompleted}
            isStarred={task.isStarred}  
          />
        ))}
      </div>
    </div>
  );
} 