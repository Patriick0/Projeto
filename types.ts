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

export type ViewState = 'LOGIN' | 'HOME' | 'FORM' | 'DISCRETE' | 'SUCCESS' | 'STATS' | 'MAP' | 'PROFILE';