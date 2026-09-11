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
    'create-broker': dynamic(() => import('@/forms/CreateBrokerForm')),
    'update-broker': dynamic(() => import('@/forms/UpdateBrokerForm')),
    'create-sale': dynamic(() => import('@/forms/CreateSaleForm')),
    'update-sale': dynamic(() => import('@/forms/UpdateSaleForm')),
};