import React, { useState, useEffect } from 'react';
import { Brain, Users, AlertTriangle, TrendingUp, PieChart, Calculator, RefreshCw } from 'lucide-react';

const AIAdvice = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
      roi: number;
      trades: number;
      successRate: number;
    };
    strategy?: string[];
  }

  // Simulate autonomous agent behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentStates(prev => {
        const newStates = { ...prev };
        Object.keys(agents).forEach(agentId => {
          if (Math.random() > 0.7) {
            const performance = newStates[agentId]?.performance || {
              roi: 0,
              trades: 0,
              successRate: 0
            };
            
            // Simulate agent actions and performance updates
            performance.trades += 1;
            performance.roi += (Math.random() * 2 - 1) * 5;
            performance.successRate = (performance.roi > 0 ? 
              performance.successRate + Math.random() * 0.1 : 
              performance.successRate - Math.random() * 0.1);

            newStates[agentId] = {
              status: Math.random() > 0.5 ? 'analyzing' : 'executing',
              lastAction: generateAgentAction(agentId),
              performance,
              strategy: generateStrategy(agentId)
            };
          }
        });
        return newStates;
      });

      // Simulate market condition changes
      setMarketData(prev => ({
        volatility: Math.max(0.05, Math.min(0.4, prev.volatility + (Math.random() - 0.5) * 0.1)),
        trend: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'bullish' : 'bearish') : prev.trend,
        sentiment: Math.max(0, Math.min(1, prev.sentiment + (Math.random() - 0.5) * 0.1)),
        riskLevel: calculateRiskLevel()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const calculateRiskLevel = () => {
    const risk = Math.random();
    if (risk < 0.3) return 'low';
    if (risk < 0.7) return 'moderate';
    return 'high';
  };

  const generateAgentAction = (agentId: string) => {
    const actions = {
      risk: [
        'Adjusting portfolio hedging ratio',
        'Implementing stop-loss orders',
        'Rebalancing sector exposure',
        'Analyzing correlation matrices'
      ],
      opportunity: [
        'Scanning market anomalies',
        'Analyzing momentum signals',
        'Evaluating sector rotations',
        'Processing alternative data'
      ],
      portfolio: [
        'Optimizing asset allocation',
        'Calculating efficient frontier',
        'Adjusting position sizes',
        'Running Monte Carlo simulations'
      ],
      tax: [
        'Harvesting tax losses',
        'Optimizing lot selection',
        'Analyzing wash sales',
        'Calculating tax implications'
      ]
    };
    
    return actions[agentId as keyof typeof actions][
      Math.floor(Math.random() * actions[agentId as keyof typeof actions].length)
    ];
  };

  const generateStrategy = (agentId: string) => {
    const baseStrategies = {
      risk: [
        'Dynamic hedging based on volatility surface',
        'Cross-asset correlation management',
        'Options-based tail risk protection',
        'Systematic drawdown control'
      ],
      opportunity: [
        'Statistical arbitrage signals',
        'Alternative data sentiment analysis',
        'Cross-market inefficiency detection',
        'Momentum factor optimization'
      ],
      portfolio: [
        'Black-Litterman optimization',
        'Risk parity allocation',
        'Factor exposure balancing',
        'Dynamic rebalancing thresholds'
      ],
      tax: [
        'Tax-loss harvesting automation',
        'Lot optimization algorithm',
        'Wash sale prevention system',
        'Tax efficiency scoring'
      ]
    };

    return baseStrategies[agentId as keyof typeof baseStrategies];
  };

  const agents = {
    risk: {
      name: 'Risk Analyzer',
      description: 'Autonomous risk management and hedging',
      icon: AlertTriangle
    },
    opportunity: {
      name: 'Alpha Hunter',
      description: 'Identifies and executes alpha opportunities',
      icon: TrendingUp
    },
    portfolio: {
      name: 'Portfolio Optimizer',
      description: 'Dynamic portfolio optimization and execution',
      icon: PieChart
    },
    tax: {
      name: 'Tax Optimizer',
      description: 'Automated tax efficiency maximization',
      icon: Calculator
    }
  };

  return (
    <div className="h-full bg-white/5 rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-light">Autonomous Trading Agents</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Market Risk:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            marketData.riskLevel === 'low' ? 'bg-green-500/20 text-green-400' :
            marketData.riskLevel === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {marketData.riskLevel.toUpperCase()}
          </span>
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
                    <p>Last Action: {state.lastAction}</p>
                    {state.performance && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div>ROI: {state.performance.roi.toFixed(2)}%</div>
                        <div>Trades: {state.performance.trades}</div>
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
                  <h4 className="text-sm font-medium mb-2">Active Strategies:</h4>
                  <ul className="space-y-2">
                    {agentStates[selectedAgent].strategy?.map((strategy, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className={agentStates[selectedAgent].performance?.roi ?? 0 > 0 
                          ? 'text-green-400' 
                          : 'text-red-400'
                        }>
                          {agentStates[selectedAgent].performance?.roi.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span>{(agentStates[selectedAgent].performance?.successRate ?? 0 * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Trades:</span>
                        <span>{agentStates[selectedAgent].performance?.trades}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Market Conditions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Volatility:</span>
                        <span>{(marketData.volatility * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trend:</span>
                        <span className={marketData.trend === 'bullish' 
                          ? 'text-green-400' 
                          : 'text-red-400'
                        }>
                          {marketData.trend.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sentiment:</span>
                        <span>{(marketData.sentiment * 100).toFixed(1)}%</span>
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

export default AIAdvice;