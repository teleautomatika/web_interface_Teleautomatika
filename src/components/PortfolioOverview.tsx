import React from 'react';
import { TrendingUp, DollarSign, Bitcoin } from 'lucide-react';

const PortfolioOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-light">Total Value</h3>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-light mb-2">$45,420.65</div>
          <div className="flex items-center gap-2 text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+12.5% this month</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-light">Crypto Holdings</h3>
            <Bitcoin className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl font-light mb-2">2.45 BTC</div>
          <div className="flex items-center gap-2 text-orange-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+5.8% 24h</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-light">Available Balance</h3>
            <DollarSign className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-light mb-2">$12,350.00</div>
          <div className="flex items-center gap-2 text-blue-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Available for trading</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;