import React from 'react';
import { Refine } from '@refinedev/core';
import { useAppResources } from '../hooks/useAppResources';

interface DynamicRefineProps {
  children: React.ReactNode;
  [key: string]: any;
}

export const DynamicRefine: React.FC<DynamicRefineProps> = ({ children, ...props }) => {
  const resources = useAppResources();
  
  return (
    <Refine
      {...props}
      resources={resources}
    >
      {children}
    </Refine>
  );
};
