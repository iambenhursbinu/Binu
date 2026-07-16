import { CNCMachine, SalesOrder, WorkforceEmployee, ToolInventoryItem, QCLog, MaintenanceLog, UserProfile } from './types';

export const INITIAL_MACHINES: CNCMachine[] = [
  {
    id: 'MCH-101',
    name: 'CNC Mill Alpha',
    type: '5-Axis Machining Center',
    status: 'running',
    jobName: 'Aero-Wing-Spar-X',
    operator: 'Marcus Vance',
    progress: 68,
    temp: 62.4,
    load: 82,
    feedRate: 1200,
    spindleSpeed: 12000,
    runTimeHours: 1420.5
  },
  {
    id: 'MCH-102',
    name: 'CNC Lathe Beta',
    type: 'Sub-Spindle Turning Center',
    status: 'running',
    jobName: 'Titanium-Axle-Pin',
    operator: 'Elena Rostova',
    progress: 42,
    temp: 58.1,
    load: 65,
    feedRate: 450,
    spindleSpeed: 3800,
    runTimeHours: 980.2
  },
  {
    id: 'MCH-103',
    name: 'CNC Gantry Gamma',
    type: 'Heavy Router Center',
    status: 'idle',
    jobName: 'No active job',
    operator: 'Sarah Connor',
    progress: 0,
    temp: 34.5,
    load: 5,
    feedRate: 0,
    spindleSpeed: 0,
    runTimeHours: 2150.1
  },
  {
    id: 'MCH-104',
    name: 'Laser Cutter Delta',
    type: 'Precision Fiber Laser',
    status: 'error',
    jobName: 'Bracket-Set-B',
    operator: 'Devon Kenji',
    progress: 15,
    temp: 84.2,
    load: 0,
    feedRate: 0,
    spindleSpeed: 0,
    runTimeHours: 640.8
  },
  {
    id: 'MCH-105',
    name: 'CNC Router Epsilon',
    type: '3-Axis Wood/Poly Center',
    status: 'maintenance',
    jobName: 'Calibrating spindles',
    operator: 'Aleksei Volkov',
    progress: 0,
    temp: 38.0,
    load: 12,
    feedRate: 0,
    spindleSpeed: 0,
    runTimeHours: 3110.4
  }
];

export const INITIAL_ORDERS: SalesOrder[] = [
  {
    id: 'ORD-9081',
    customer: 'SpaceX Propulsion Corp',
    partName: 'Turbine Housing Gen-4',
    quantity: 15,
    orderDate: '2026-07-01',
    dueDate: '2026-07-20',
    status: 'in-production',
    priority: 'high',
    cost: 48500
  },
  {
    id: 'ORD-9082',
    customer: 'Boeing Aero-Structures',
    partName: 'Main Spar Bracket',
    quantity: 120,
    orderDate: '2026-07-03',
    dueDate: '2026-08-05',
    status: 'pending',
    priority: 'medium',
    cost: 32400
  },
  {
    id: 'ORD-9083',
    customer: 'MedTech Surgical Inc',
    partName: 'Micro-Bone Screws (Titanium)',
    quantity: 2500,
    orderDate: '2026-07-05',
    dueDate: '2026-07-18',
    status: 'in-production',
    priority: 'high',
    cost: 18750
  },
  {
    id: 'ORD-9084',
    customer: 'Tesla Gigafactory 5',
    partName: 'Rotor End Cap V3',
    quantity: 450,
    orderDate: '2026-07-10',
    dueDate: '2026-08-15',
    status: 'pending',
    priority: 'low',
    cost: 67200
  },
  {
    id: 'ORD-9085',
    customer: 'Lockheed Martin Space',
    partName: 'Sat-Inertial Ring Holder',
    quantity: 4,
    orderDate: '2026-06-25',
    dueDate: '2026-07-10',
    status: 'completed',
    priority: 'high',
    cost: 95000
  }
];

export const INITIAL_EMPLOYEES: WorkforceEmployee[] = [
  {
    id: 'EMP-301',
    name: 'Marcus Vance',
    role: 'Lead Machinist',
    shift: 'day',
    status: 'active',
    efficiency: 94.8,
    contact: 'm.vance@cnc-ops.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'EMP-302',
    name: 'Elena Rostova',
    role: 'Lathe Operator Specialists',
    shift: 'day',
    status: 'active',
    efficiency: 89.2,
    contact: 'e.rostova@cnc-ops.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: 'EMP-303',
    name: 'Sarah Connor',
    role: 'Router Specialist & Safety Officer',
    shift: 'swing',
    status: 'active',
    efficiency: 91.5,
    contact: 's.connor@cnc-ops.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
  },
  {
    id: 'EMP-304',
    name: 'Devon Kenji',
    role: 'Apprentice Operator',
    shift: 'night',
    status: 'active',
    efficiency: 78.4,
    contact: 'd.kenji@cnc-ops.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: 'EMP-305',
    name: 'Aleksei Volkov',
    role: 'Quality Assurance Inspector',
    shift: 'day',
    status: 'active',
    efficiency: 96.0,
    contact: 'a.volkov@cnc-ops.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  {
    id: 'EMP-306',
    name: 'Jane Doe',
    role: 'Maintenance Technician',
    shift: 'night',
    status: 'off-duty',
    efficiency: 88.5,
    contact: 'j.doe@cnc-ops.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  }
];

export const INITIAL_TOOLS: ToolInventoryItem[] = [
  {
    id: 'TOL-201',
    name: 'Carbide Endmill 1/2" 4-Flute',
    category: 'endmill',
    status: 'good',
    quantity: 24,
    minRequired: 8,
    location: 'Cabinet A - Row 2',
    lastCalibrated: '2026-07-01'
  },
  {
    id: 'TOL-202',
    name: 'High-Speed Steel Drill Bit 1/4"',
    category: 'drill',
    status: 'worn',
    quantity: 15,
    minRequired: 12,
    location: 'Cabinet A - Row 4',
    lastCalibrated: '2026-06-20'
  },
  {
    id: 'TOL-203',
    name: 'Indexable Threading Insert 16ER',
    category: 'insert',
    status: 'critical',
    quantity: 3,
    minRequired: 20,
    location: 'Cabinet B - Drawer 1',
    lastCalibrated: '2026-07-10'
  },
  {
    id: 'TOL-204',
    name: 'Synthetic Soluble Coolant Concentrated (5 Gal)',
    category: 'coolant',
    status: 'good',
    quantity: 8,
    minRequired: 4,
    location: 'Chemical Storage Shed',
    lastCalibrated: 'N/A'
  },
  {
    id: 'TOL-205',
    name: 'CNC Calibration Ball-Bar Standard',
    category: 'accessory',
    status: 'good',
    quantity: 2,
    minRequired: 1,
    location: 'Metrology Lab Safe',
    lastCalibrated: '2026-05-15'
  }
];

export const INITIAL_QC_LOGS: QCLog[] = [
  {
    id: 'QC-1001',
    partNumber: 'TS-HP4-012',
    orderId: 'ORD-9081',
    inspector: 'Aleksei Volkov',
    dimensionsStatus: 'pass',
    surfaceFinish: 'excellent',
    deviationMM: 0.002,
    timestamp: '2026-07-13 08:15'
  },
  {
    id: 'QC-1002',
    partNumber: 'MSB-772-X9',
    orderId: 'ORD-9082',
    inspector: 'Aleksei Volkov',
    dimensionsStatus: 'pass',
    surfaceFinish: 'good',
    deviationMM: 0.015,
    timestamp: '2026-07-13 09:02'
  },
  {
    id: 'QC-1003',
    partNumber: 'MBS-TITAN-104',
    orderId: 'ORD-9083',
    inspector: 'Marcus Vance',
    dimensionsStatus: 'pass',
    surfaceFinish: 'excellent',
    deviationMM: -0.005,
    timestamp: '2026-07-12 16:40'
  },
  {
    id: 'QC-1004',
    partNumber: 'QC-OUTLIER-X',
    orderId: 'ORD-9081',
    inspector: 'Aleksei Volkov',
    dimensionsStatus: 'fail',
    surfaceFinish: 'fail',
    deviationMM: 0.125,
    timestamp: '2026-07-12 11:30'
  }
];

export const INITIAL_MAINTENANCE_LOGS: MaintenanceLog[] = [
  {
    id: 'MNT-401',
    machineId: 'MCH-104',
    machineName: 'Laser Cutter Delta',
    issue: 'Laser diode cooling loop blockage',
    type: 'breakdown',
    reportedBy: 'Devon Kenji',
    timestamp: '2026-07-13 06:45',
    status: 'in-progress',
    cost: 450
  },
  {
    id: 'MNT-402',
    machineId: 'MCH-101',
    machineName: 'CNC Mill Alpha',
    issue: 'Routine spindle alignment & lube',
    type: 'scheduled',
    reportedBy: 'Jane Doe',
    timestamp: '2026-07-11 14:00',
    status: 'resolved',
    cost: 120
  },
  {
    id: 'MNT-403',
    machineId: 'MCH-105',
    machineName: 'CNC Router Epsilon',
    issue: 'Z-axis ballscrew thermal calibration',
    type: 'calibration',
    reportedBy: 'Aleksei Volkov',
    timestamp: '2026-07-12 10:00',
    status: 'pending',
    cost: 320
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Ben Hur Sbinu',
  email: 'iambenhursbinu@gmail.com',
  role: 'Principal Full-Stack Engineer & Operations Director',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', // Premium profile photo placeholder
  badgeNo: 'CNC-OP-001',
  department: 'Operations & Engineering Management',
  phone: '+1 (555) 019-9231',
  notificationSettings: {
    criticalAlerts: true,
    productionUpdates: true,
    maintenanceReminders: true
  }
};
