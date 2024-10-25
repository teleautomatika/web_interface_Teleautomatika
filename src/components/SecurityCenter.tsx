import React from 'react';
import { Shield, Key, Smartphone, AlertTriangle } from 'lucide-react';

const SecurityCenter = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-light">Security Center</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-light mb-4">Security Status</h3>
          <div className="space-y-4">
            {[
              {
                name: 'Multi-Factor Authentication',
                status: 'Enabled',
                icon: Key,
                color: 'text-green-400'
              },
              {
                name: 'Hardware Wallet',
                status: 'Connected',
                icon: Shield,
                color: 'text-green-400'
              },
              {
                name: 'Transaction Signing',
                status: 'Required',
                icon: Smartphone,
                color: 'text-green-400'
              }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span>{item.name}</span>
                </div>
                <span className={item.color}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-light mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                action: 'Wallet Connection',
                time: '2 minutes ago',
                status: 'success'
              },
              {
                action: 'Failed Login Attempt',
                time: '1 hour ago',
                status: 'warning'
              },
              {
                action: 'Security Settings Updated',
                time: '1 day ago',
                status: 'success'
              }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${
                    activity.status === 'success' ? 'text-green-400' : 'text-yellow-400'
                  }`} />
                  <div>
                    <p>{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;