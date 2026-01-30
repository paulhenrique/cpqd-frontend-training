import React, { ReactNode } from 'react';

interface DashboardTemplateProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
}

export const DashboardTemplate = ({ header, sidebar, children }: DashboardTemplateProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Area */}
      <header className="bg-white shadow-sm h-16 flex items-center px-6 border-b border-gray-200">
        {header || <span className="font-bold text-lg text-gray-700">Operations Center</span>}
      </header>

      <div className="flex flex-1">
        {/* Sidebar Area */}
        {sidebar && (
          <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
            {sidebar}
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
