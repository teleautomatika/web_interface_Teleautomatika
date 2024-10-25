import React, { useState, useEffect } from 'react';
import { Brain, Users, AlertTriangle, TrendingUp, PieChart, Mail, FileText, RefreshCw } from 'lucide-react';

const AIMultiAgents = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agentStates, setAgentStates] = useState<Record<string, AgentState>>({});
  const [marketData, setMarketData] = useState({
    volatility: 0.15,
    trend: 'bullish',
    sentiment: 0.7,
    riskLevel: 'moderate'
  });

  interface AgentState {
    status: 'idle' | 'analyzing' | 'executing';
    lastAction?: string;
    performance?: {
      tasks: number;
      successRate: number;
      lastUpdate: Date;
    };
    currentTasks?: string[];
  }

  // Simulate autonomous agent behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentStates(prev => {
        const newStates = { ...prev };
        Object.keys(agents).forEach(agentId => {
          if (Math.random() > 0.7) {
            const performance = newStates[agentId]?.performance || {
              tasks: 0,
              successRate: 0.8,
              lastUpdate: new Date()
            };
            
            performance.tasks += 1;
            performance.successRate = Math.min(0.95, performance.successRate + (Math.random() * 0.1));
            performance.lastUpdate = new Date();

            newStates[agentId] = {
              status: Math.random() > 0.5 ? 'analyzing' : 'executing',
              lastAction: generateAgentAction(agentId),
              performance,
              currentTasks: generateTasks(agentId)
            };
          }
        });
        return newStates;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateAgentAction = (agentId: string) => {
    const actions = {
      investment: [
        'Analyzing market opportunities',
        'Executing trading strategy',
        'Rebalancing portfolio',
        'Monitoring risk metrics'
      ],
      task: [
        'Scheduling meetings',
        'Processing emails',
        'Creating task reports',
        'Organizing calendar'
      ],
      research: [
        'Analyzing market trends',
        'Generating business ideas',
        'Conducting competitor analysis',
        'Preparing market reports'
      ],
      finance: [
        'Processing payments',
        'Managing subscriptions',
        'Optimizing expenses',
        'Scheduling transactions'
      ]
    };
    
    return actions[agentId as keyof typeof actions][
      Math.floor(Math.random() * actions[agentId as keyof typeof actions].length)
    ];
  };

  const generateTasks = (agentId: string) => {
    const tasks = {
      investment: [
        'Monitor market volatility',
        'Update trading algorithms',
        'Analyze portfolio performance',
        'Execute scheduled trades'
      ],
      task: [
        'Process incoming emails',
        'Update task priorities',
        'Schedule meetings',
        'Generate progress reports'
      ],
      research: [
        'Analyze market trends',
        'Generate business proposals',
        'Update competitive analysis',
        'Create strategy documents'
      ],
      finance: [
        'Process pending payments',
        'Update expense reports',
        'Schedule recurring payments',
        'Optimize cash flow'
      ]
    };

    return tasks[agentId as keyof typeof tasks];
  };

  const agents = {
    investment: {
      name: 'Investment Agent',
      description: 'Autonomous investment management',
      icon: TrendingUp
    },
    task: {
      name: 'Task Manager',
      description: 'Automated task execution and coordination',
      icon: Brain
    },
    research: {
      name: 'Research Analyst',
      description: 'Market research and business intelligence',
      icon: FileText
    },
    finance: {
      name: 'Finance Manager',
      description: 'Automated financial operations',
      icon: PieChart
    }
  };

  return (
    <div className="h-full bg-white/5 rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-light">AI Multi-Agents</h2>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-yellow-400">Autonomous System Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 h-[calc(100%-4rem)]">
        <div className="space-y-4 overflow-auto pr-2">
          {Object.entries(agents).map(([id, agent]) => {
            const Icon = agent.icon;
            const state = agentStates[id];
            
            return (
              <div
                key={id}
                onClick={() => setSelectedAgent(id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedAgent === id
                    ? 'bg-blue-500/20 border-blue-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-blue-400" />
                    <h3 className="font-light">{agent.name}</h3>
                  </div>
                  {state?.status === 'executing' && (
                    <RefreshCw className="w-4 h-4 animate-spin text-green-400" />
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-2">{agent.description}</p>
                {state && (
                  <div className="text-xs text-gray-500">
                    <p>Current Action: {state.lastAction}</p>
                    {state.performance && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div>Tasks: {state.performance.tasks}</div>
                        <div>Success: {(state.performance.successRate * 100).toFixed(1)}%</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-6 overflow-auto">
          {selectedAgent && agentStates[selectedAgent] ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-light">
                    {agents[selectedAgent].name} Status
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  agentStates[selectedAgent].status === 'executing' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {agentStates[selectedAgent].status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Active Tasks:</h4>
                  <ul className="space-y-2">
                    {agentStates[selectedAgent].currentTasks?.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tasks Completed:</span>
                        <span>{agentStates[selectedAgent].performance?.tasks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span>{(agentStates[selectedAgent].performance?.successRate ?? 0 * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Update:</span>
                        <span>{agentStates[selectedAgent].performance?.lastUpdate.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">System Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU Usage:</span>
                        <span>{Math.floor(Math.random() * 30 + 20)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Memory:</span>
                        <span>{Math.floor(Math.random() * 40 + 30)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Network:</span>
                        <span className="text-green-400">Stable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Select an agent to view real-time status</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIMultiAgents;