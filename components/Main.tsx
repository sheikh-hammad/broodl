import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode; // Typing for children props
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col p-4 sm:p-8">
      {children}
    </main>
  );
};

export default Main;
