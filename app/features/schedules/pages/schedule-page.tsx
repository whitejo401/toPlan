import React from 'react';
import type { Route } from "./+types/schedule-page";

export default function SchedulePage({ params }: Route.ComponentProps) {
  const { scheduleId } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Schedule {scheduleId}</h1>
        <p className="text-gray-600 mt-2">Schedule details and content will be displayed here.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="space-y-6">
          {/* Schedule content will go here */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Schedule Information</h3>
            <div className="space-y-2">
              {/* Schedule details will go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 