import React from 'react';
import { Loader } from 'lucide-react';

interface ModelLoaderProps {
  progress: number;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({ progress }) => {
  return (
    <div className="flex items-center gap-2 text-blue-400">
      <Loader className="w-4 h-4 animate-spin" />
      <span className="text-sm">
        Loading model... {progress > 0 ? `${Math.round(progress * 100)}%` : ''}
      </span>
    </div>
  );
};

export default ModelLoader;