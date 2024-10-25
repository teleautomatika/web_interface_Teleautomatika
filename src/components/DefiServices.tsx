import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, RefreshCcw, Lock } from 'lucide-react';

const DefiServices = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-light">DeFi Services</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Staking',
            description: 'Earn rewards by staking your assets',
            apy: '12.5%',
            icon: Lock,
            color: 'blue'
          },
          {
            title: 'Liquidity Pools',
            description: 'Provide liquidity and earn fees',
            apy: '18.2%',
            icon: RefreshCcw,
            color: 'purple'
          },
          {
            title: 'Yield Farming',
            description: 'Maximize returns through yield farming',
            apy: '15.8%',
            icon: ArrowUpRight,
            color: 'green'
          }
        ].map((service, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <service.icon className={`w-8 h-8 text-${service.color}-400`} />
              <span className="text-lg font-light text-green-400">{service.apy} APY</span>
            </div>
            <h3 className="text-xl font-light mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{service.description}</p>
            <button className="w-full py-2 px-4 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
              Get Started
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-light mb-4">Active Positions</h3>
        <div className="space-y-4">
          {[
            {
              asset: 'DOT/USDT LP',
              value: '$12,450.00',
              profit: '+$245.80',
              apy: '15.8%'
            },
            {
              asset: 'Staked DOT',
              value: '$8,320.00',
              profit: '+$126.40',
              apy: '12.5%'
            }
          ].map((position, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <div>
                <h4 className="font-light">{position.asset}</h4>
                <p className="text-sm text-gray-400">{position.value}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400">{position.profit}</p>
                <p className="text-sm text-gray-400">{position.apy} APY</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefiServices;