import { ReportCategory, SecurityType } from './types';
import { ShieldAlert, Wrench, Clock, AlertTriangle, EyeOff } from 'lucide-react';

export const CATEGORIES = [
  {
    id: ReportCategory.SECURITY,
    label: 'Segurança',
    icon: ShieldAlert,
    color: 'bg-red-500',
    description: 'Assédio, roubo ou violência.'
  },
  {
    id: ReportCategory.INFRASTRUCTURE,
    label: 'Infraestrutura',
    icon: Wrench,
    color: 'bg-bh-blue',
    description: 'Ar-condicionado, bancos, limpeza.'
  },
  {
    id: ReportCategory.SERVICE,
    label: 'Serviço',
    icon: Clock,
    color: 'bg-bh-yellow',
    textColor: 'text-black',
    description: 'Atrasos, direção perigosa, queima de parada.'
  }
];

export const SECURITY_OPTIONS = [
  { id: SecurityType.HARASSMENT, label: 'Assédio', icon: EyeOff, triggerDiscrete: true },
  { id: SecurityType.THEFT, label: 'Roubo/Furto', icon: AlertTriangle, triggerDiscrete: false },
  { id: SecurityType.AGGRESSION, label: 'Agressão Física', icon: ShieldAlert, triggerDiscrete: false },
  { id: SecurityType.SUSPICIOUS, label: 'Atitude Suspeita', icon: AlertTriangle, triggerDiscrete: false },
];