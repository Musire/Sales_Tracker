import dynamic from 'next/dynamic';

type PanelProps = {
  data?: any;
};


export const PANEL_REGISTRY: Record<string, React.ComponentType<PanelProps>> = {
    'test-component': dynamic(() => import('./TestComponent')),
    'create-company': dynamic(() => import('@/forms/CreateCompanyForm')),
    'update-company': dynamic(() => import('@/forms/UpdateCompanyForm')),
    'create-architect': dynamic(() => import('@/forms/CreateArchitectForm')),
    'update-architect': dynamic(() => import('@/forms/UpdateArchitectForm')),
};