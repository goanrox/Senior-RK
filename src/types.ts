
export enum DeviceBrand {
  SAMSUNG = 'Samsung',
  MOTOROLA = 'Motorola',
  PIXEL = 'Google Pixel',
  REVVL = 'T-Mobile REVVL'
}

export interface AppInfo {
  name: string;
  status: 'safe' | 'warning' | 'danger';
  reason: string;
  alternative?: string;
  score?: number;
}

export interface DeviceInstruction {
  brand: DeviceBrand;
  steps: string[];
  note?: string;
  safeModeSteps?: {
    enter: string[];
    uninstall: string[];
    exit: string[];
  };
}
