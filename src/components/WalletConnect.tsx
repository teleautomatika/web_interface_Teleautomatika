import React, { useState } from 'react';
import { Shield, Wallet } from 'lucide-react';

interface WalletConnectProps {
  onConnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConnect();
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
      <div className="space-y-6">
        <div className="flex items-center justify-center w-20 h-20 mx-auto bg-blue-500/10 rounded-xl">
          <Wallet className="w-10 h-10 text-blue-400" />
        </div>
        
        <h3 className="text-xl font-light text-center text-white">
          Connect Your Wallet
        </h3>

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-light tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isConnecting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Connect Wallet
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;