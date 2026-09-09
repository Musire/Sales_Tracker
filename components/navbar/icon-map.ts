import type { LucideIcon } from 'lucide-react'
import {
    Briefcase,
    DraftingCompass,
    Home,
    UserShield
} from 'lucide-react'

export const iconMap = {
    home: Home,
    architects: DraftingCompass,
    companies: Briefcase,
    account: UserShield,
} as const

export type IconKey = keyof typeof iconMap

export function getIcon(key?: IconKey): LucideIcon | null {
    return key ? iconMap[key] : null
}