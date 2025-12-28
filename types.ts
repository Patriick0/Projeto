
export enum ReportCategory {
  SECURITY = 'SEGURANÇA',
  INFRASTRUCTURE = 'INFRAESTRUTURA',
  SERVICE = 'SERVIÇO'
}

export enum SecurityType {
  HARASSMENT = 'Assédio',
  THEFT = 'Roubo/Furto',
  AGGRESSION = 'Agressão',
  SUSPICIOUS = 'Atitude Suspeita'
}

export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface ReportData {
  lineId: string;
  vehicleId: string;
  category: ReportCategory;
  subCategory?: string;
  description: string;
  location?: LocationData;
  media?: File | null;
  timestamp: number;
  isDiscrete: boolean;
}

export interface SupportTicket {
  id: string;
  protocol: string;
  subject: string;
  message: string;
  status: 'PENDING' | 'ANSWERED' | 'CLOSED';
  timestamp: number;
  response?: string;
}

export type ViewState = 'LOGIN' | 'TERMS' | 'HOME' | 'FORM' | 'DISCRETE' | 'SUCCESS' | 'STATS' | 'MAP' | 'PROFILE' | 'PROFILE_EDIT' | 'ACHIEVEMENTS' | 'PRIVACY_SETTINGS' | 'SETTINGS' | 'SUPPORT' | 'MY_ROUTE';
