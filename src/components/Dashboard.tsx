import React, { useState } from 'react';
import { Layout, Brain } from 'lucide-react';
import PortfolioOverview from './PortfolioOverview';
import AIAssistant from './AIAssistant';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = {
    overview: {
      icon: Layout,
      name: 'Overview',
      component: <PortfolioOverview />
    },
    ai: {
      icon: Brain,
      name: 'AI Assistant',
      component: <AIAssistant />
    }
  };

  return (
    <div className="h-screen bg-black text-white">
      <div className="flex h-full">
        <div className="w-20 bg-white/5 border-r border-white/10 p-4">
          {Object.entries(tabs).map(([key, { icon: Icon, name }]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full aspect-square mb-4 rounded-xl flex flex-col items-center justify-center transition-colors gap-1 group ${
                activeTab === key ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/10'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {tabs[activeTab as keyof typeof tabs].component}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;