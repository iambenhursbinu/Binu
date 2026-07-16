export interface CNCMachine {
  id: string;
  name: string;
  type: string; // e.g., "5-Axis Mill", "CNC Lathe", "Laser Cutter"
  status: 'running' | 'idle' | 'maintenance' | 'error';
  jobName: string;
  operator: string;
  progress: number; // 0 to 100
  temp: number; // °C
  load: number; // %
  feedRate: number; // mm/min
  spindleSpeed: number; // RPM
  runTimeHours: number;
}

export interface SalesOrder {
  id: string;
  customer: string;
  partName: string;
  quantity: number;
  orderDate: string;
  dueDate: string;
  status: 'pending' | 'in-production' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  cost: number;
}

export interface WorkforceEmployee {
  id: string;
  name: string;
  role: string;
  shift: 'day' | 'night' | 'swing';
  status: 'active' | 'on-leave' | 'off-duty';
  efficiency: number; // %
  contact: string;
  avatar: string;
}

export interface ToolInventoryItem {
  id: string;
  name: string;
  category: 'endmill' | 'drill' | 'insert' | 'coolant' | 'accessory';
  status: 'good' | 'worn' | 'critical';
  quantity: number;
  minRequired: number;
  location: string;
  lastCalibrated: string;
}

export interface QCLog {
  id: string;
  partNumber: string;
  orderId: string;
  inspector: string;
  dimensionsStatus: 'pass' | 'fail';
  surfaceFinish: 'excellent' | 'good' | 'fail';
  deviationMM: number;
  timestamp: string;
}

export interface MaintenanceLog {
  id: string;
  machineId: string;
  machineName: string;
  issue: string;
  type: 'scheduled' | 'breakdown' | 'calibration';
  reportedBy: string;
  timestamp: string;
  status: 'pending' | 'in-progress' | 'resolved';
  cost: number;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  badgeNo: string;
  department: string;
  phone: string;
  notificationSettings: {
    criticalAlerts: boolean;
    productionUpdates: boolean;
    maintenanceReminders: boolean;
  };
}
