import React from 'react';
import type { Route } from "./+types/groups-page";

export default function GroupsPage({}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Groups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Group cards will go here */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Sample Group</h3>
          <p className="text-gray-600 text-sm">This is a sample group description.</p>
        </div>
      </div>
    </div>
  );
} 