import { UserRole } from "@/generated/prisma/enums"

export type NavItem = {
  label: string
  href?: string // Make href optional since an action button might not link anywhere
  icon?: string
  index?: boolean
  isAction?: boolean // Flag to identify the modal button
}


export const navByRole: Record<UserRole, NavItem[]> = {
  ADMIN: [
    { 
      label: 'Home',
      icon: 'home',
      href: `/home`,
    },
    { 
      label: 'Architects',
      icon: 'architects',
      href: `/architects` 
    },
    { 
      label: 'Companies',
      icon: 'companies',
      href: `/companies` 
    },
    { 
      label: 'Account',
      icon: 'account',
      href: `/account` 
    },
  ],
  ARCHITECT: [

  ],
  END_USER: [
      { 
        label: 'Inicio', 
        href: `/dashboard`,
        icon: 'home',
        index: true 
      },
      { 
        label: 'Historial', 
        href: `/history`,
        icon: 'history'
      },
      { 
        label: 'Reserva', 
        icon: 'booking',
        href: `/booking` 
      },
  ],
}

export function getNav(role: UserRole) {
  return navByRole[role] ?? []
}