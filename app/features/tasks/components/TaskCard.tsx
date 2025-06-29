import React from 'react';
import { Card, CardContent } from '~/common/components/ui/card';
import { Star, X } from 'lucide-react';

export interface TaskCardProps {
  id: string;
  title: string;
  isCompleted: boolean;
  isStarred: boolean;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ 
  id, 
  title, 
  isCompleted, 
  isStarred, 
  onToggleComplete, 
  onToggleStar, 
  onDelete 
}: TaskCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            className="w-4 h-4" 
            checked={isCompleted}
            onChange={() => onToggleComplete(id)}
          />
          <span className={`flex-1 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
            {title}
          </span>
          <button 
            className={`${isStarred ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-300 hover:text-yellow-500'}`}
            onClick={() => onToggleStar(id)}
          >
            <Star className="w-5 h-5" fill={isStarred ? "currentColor" : "none"} />
          </button>
          <button 
            className="text-red-500 hover:text-red-600"
            onClick={() => onDelete(id)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
} 