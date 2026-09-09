import dynamic from 'next/dynamic';

type PanelProps = {
  data?: any;
};

export const PANEL_REGISTRY: Record<string, React.ComponentType<PanelProps>> = {
    'company-details': dynamic(() => import('@/domains/companies/components/CompanyDetails')),
};