import { useGetIdentity } from '@refinedev/core';
import { getRoleBasedResources } from '../resources/RoleBasedResources';

// Hook to get role-based resources for the Refine provider
export const useAppResources = () => {
  const { data: identity } = useGetIdentity();
  
  const userRole = identity?.role || 'Patient';
  return getRoleBasedResources(userRole);
};
