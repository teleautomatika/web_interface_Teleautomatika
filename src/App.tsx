import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';
import NeuronLogo from './components/NeuronLogo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleConnect = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!isAuthenticated ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md space-y-12">
            <div className="w-40 h-40 mx-auto">
              <NeuronLogo />
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-thin tracking-wider">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Teleautomatika
                </span>
              </h1>
              <p className="text-xl text-gray-400 font-light">
                Your Hyperself AI Banking
              </p>
            </div>

            <WalletConnect onConnect={handleConnect} />
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;