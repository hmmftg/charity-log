import { ResourceProps } from '@refinedev/core';
import { DefinitionResources, DefinitionRoutes } from './pages/definition';
import { VisitsResources, VisitsRoutes } from './pages/visits';

export function AppResources(translate: (key: string, options?: any, defaultMessage?: string) => string):ResourceProps[]{
    return [
        ...DefinitionResources(translate),
        ...VisitsResources(translate),
    ];
  }
  
  export function AppRoutes(){ 
      return <>
          {DefinitionRoutes()}
          {VisitsRoutes()}
          </>
  }