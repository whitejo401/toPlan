import React from 'react';
import type { Route } from "./+types/board-page";

export default function BoardPage({ params }: Route.ComponentProps) {
  const { boardId } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Board {boardId}</h1>
        <p className="text-gray-600 mt-2">Board details and content will be displayed here.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Board columns will go here */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">To Do</h3>
            <div className="space-y-2">
              {/* Task cards will go here */}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">In Progress</h3>
            <div className="space-y-2">
              {/* Task cards will go here */}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Done</h3>
            <div className="space-y-2">
              {/* Task cards will go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 