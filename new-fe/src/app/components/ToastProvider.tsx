// components/ToasterProvider.tsx
'use client';

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'glass-card',
        duration: 3000,
      }}
    />
  );
};

export default ToasterProvider;
