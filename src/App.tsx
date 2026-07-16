import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  ShoppingCart,
  Users,
  Wrench,
  Activity,
  AlertTriangle,
  CheckCircle,
  User,
  LogOut,
  Clock,
  ShieldCheck,
  ClipboardCheck,
  TrendingUp,
  Package
} from 'lucide-react';

import { CNCMachine, SalesOrder, WorkforceEmployee, ToolInventoryItem, QCLog, MaintenanceLog, UserProfile } from './types';
import {
  INITIAL_MACHINES,
  INITIAL_ORDERS,
  INITIAL_EMPLOYEES,
  INITIAL_TOOLS,
  INITIAL_QC_LOGS,
  INITIAL_MAINTENANCE_LOGS,
  INITIAL_PROFILE
} from './data';

// Import Modular Views
import LoginView from './components/LoginView';
import Toast, { ToastMessage } from './components/Toast';
import Modal from './components/Modal';
import DashboardView from './components/DashboardView';
import ProductionView from './components/ProductionView';
import OrdersView from './components/OrdersView';
import WorkforceView from './components/WorkforceView';
import InventoryView from './components/InventoryView';
import QualityView from './components/QualityView';
import MaintenanceView from './components/MaintenanceView';
import ProfileView from './components/ProfileView';

export default function App() {
  // Authentication State (hardcoded credentials in LoginView)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('cnc_authenticated') === 'true';
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('cnc_active_tab') || 'dashboard';
  });

  // Global Lists States (saved in local storage)
  const [machines, setMachines] = useState<CNCMachine[]>(() => {
    const saved = localStorage.getItem('cnc_machines');
    return saved ? JSON.parse(saved) : INITIAL_MACHINES;
  });

  const [orders, setOrders] = useState<SalesOrder[]>(() => {
    const saved = localStorage.getItem('cnc_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [employees, setEmployees] = useState<WorkforceEmployee[]>(() => {
    const saved = localStorage.getItem('cnc_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [tools, setTools] = useState<ToolInventoryItem[]>(() => {
    const saved = localStorage.getItem('cnc_tools');
    return saved ? JSON.parse(saved) : INITIAL_TOOLS;
  });

  const [qcLogs, setQcLogs] = useState<QCLog[]>(() => {
    const saved = localStorage.getItem('cnc_qc_logs');
    return saved ? JSON.parse(saved) : INITIAL_QC_LOGS;
  });

  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>(() => {
    const saved = localStorage.getItem('cnc_maintenance_logs');
    return saved ? JSON.parse(saved) : INITIAL_MAINTENANCE_LOGS;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cnc_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // UI state: Toasts and Modals
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown' | null>(null);

  // Time stamp state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Save states to local storage on changes
  useEffect(() => {
    localStorage.setItem('cnc_authenticated', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('cnc_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('cnc_machines', JSON.stringify(machines));
  }, [machines]);

  useEffect(() => {
    localStorage.setItem('cnc_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cnc_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('cnc_tools', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem('cnc_qc_logs', JSON.stringify(qcLogs));
  }, [qcLogs]);

  useEffect(() => {
    localStorage.setItem('cnc_maintenance_logs', JSON.stringify(maintenanceLogs));
  }, [maintenanceLogs]);

  useEffect(() => {
    localStorage.setItem('cnc_profile', JSON.stringify(profile));
  }, [profile]);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sleek Simulated Telemetry Engine (Updates active machine statistics every 3 seconds)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      setMachines((prevMachines) => {
        return prevMachines.map((m) => {
          if (m.status !== 'running') return m;

          // Increment progress by 1-4%
          const nextProgress = m.progress + Math.floor(Math.random() * 4) + 1;
          
          // Slight jitter fluctuations for RPM and Temperature metrics
          const rpmOffset = Math.floor((Math.random() - 0.5) * 150);
          const loadOffset = Math.floor((Math.random() - 0.5) * 8);
          const tempOffset = (Math.random() - 0.5) * 2;

          let targetSpindleSpeed = m.spindleSpeed + rpmOffset;
          if (targetSpindleSpeed < 0) targetSpindleSpeed = 1000;

          let targetLoad = m.load + loadOffset;
          if (targetLoad < 10) targetLoad = 60;
          if (targetLoad > 98) targetLoad = 90;

          let targetTemp = m.temp + tempOffset;
          if (targetTemp < 30) targetTemp = 50;
          if (targetTemp > 85) {
            // Trigger critical warning block!
            targetTemp = 82;
          }

          // If job completes (hits 100)
          if (nextProgress >= 100) {
            // Create a successful QC log & release machine cell to idle
            const randomDeviation = (Math.random() - 0.5) * 0.02; // -0.01 to +0.01
            const isPass = Math.abs(randomDeviation) < 0.012;

            const newQC: QCLog = {
              id: `QC-${Math.floor(Math.random() * 9000) + 1000}`,
              partNumber: `PRT-${m.jobName.slice(0, 4)}-${Math.floor(Math.random() * 900) + 100}`,
              orderId: 'ORD-9081',
              inspector: m.operator,
              dimensionsStatus: isPass ? 'pass' : 'fail',
              surfaceFinish: Math.random() > 0.3 ? 'excellent' : 'good',
              deviationMM: parseFloat(randomDeviation.toFixed(3)),
              timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
            };

            // Trigger success toast asynchronously
            setTimeout(() => {
              addToast(`Machine ${m.name} completed batch cycle: ${m.jobName}! Metrology log dispatched.`, 'success');
              setQcLogs(prevQC => [newQC, ...prevQC]);
            }, 50);

            return {
              ...m,
              progress: 0,
              status: 'idle',
              jobName: 'No active job',
              spindleSpeed: 0,
              load: 0,
              temp: 32.5,
              feedRate: 0,
              runTimeHours: parseFloat((m.runTimeHours + 2.5).toFixed(1))
            };
          }

          return {
            ...m,
            progress: nextProgress,
            spindleSpeed: targetSpindleSpeed,
            load: targetLoad,
            temp: targetTemp,
            runTimeHours: parseFloat((m.runTimeHours + 0.05).toFixed(2))
          };
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Toast adder function
  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenModal = (type: 'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Tactical machine cell commands
  const handleTriggerEStop = (id: string) => {
    setMachines((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'error',
              jobName: 'CRITICAL E-STOP',
              spindleSpeed: 0,
              load: 0,
              progress: 0,
              temp: 24.5,
              feedRate: 0
            }
          : m
      )
    );
    addToast(`EMERGENCY SHUTDOWN (E-STOP) triggered on Machine unit ${id}!`, 'info');
  };

  const handleCalibrateMachine = (id: string) => {
    setMachines((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'maintenance',
              jobName: 'Spindle Calibration Run',
              progress: 0,
              temp: 35.0,
              load: 10
            }
          : m
      )
    );
    addToast(`Spindle Alignment Calibration Sequence initiated on Unit ${id}.`, 'info');
  };

  const handleToggleJobState = (id: string) => {
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        if (m.status === 'running') {
          addToast(`Production Cycle paused on Machine cell ${m.name}.`, 'info');
          return { ...m, status: 'idle', spindleSpeed: 0, load: 0 };
        } else {
          addToast(`Production Cycle resumed on Machine cell ${m.name}.`, 'success');
          return {
            ...m,
            status: 'running',
            spindleSpeed: 9500,
            load: 75,
            jobName: m.jobName === 'No active job' ? 'General-Bracket-F' : m.jobName,
            feedRate: m.feedRate === 0 ? 800 : m.feedRate
          };
        }
      })
    );
  };

  const handleChangeOrderStatus = (id: string, status: 'pending' | 'in-production' | 'completed' | 'cancelled') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    addToast(`Purchase Order ${id} updated to status: ${status.toUpperCase()}.`, 'success');
  };

  const handleChangeEmployeeStatus = (id: string, status: 'active' | 'on-leave' | 'off-duty') => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    addToast(`Personnel ${id} roster state set to: ${status.toUpperCase()}.`, 'success');
  };

  const handleResolveMaintenance = (logId: string, machineId: string) => {
    setMaintenanceLogs((prev) =>
      prev.map((log) => (log.id === logId ? { ...log, status: 'resolved' } : log))
    );
    setMachines((prev) =>
      prev.map((m) => (m.id === machineId ? { ...m, status: 'idle', temp: 30.2, jobName: 'No active job' } : m))
    );
    addToast(`Maintenance ticket ${logId} signed off. Machine cell reset to active state.`, 'success');
  };

  // Form Submissions from Master Modal
  const handleModalFormSubmit = (type: string, payload: any) => {
    const timestampStr = new Date().toISOString().slice(0, 16).replace('T', ' ');

    switch (type) {
      case 'add-machine': {
        const newMch: CNCMachine = {
          id: payload.id || `MCH-${Math.floor(Math.random() * 900) + 100}`,
          name: payload.name || 'CNC Custom Lathe',
          type: payload.type || '5-Axis Mill',
          status: 'idle',
          jobName: payload.jobName || 'No active job',
          operator: payload.operator || 'Jane Doe',
          progress: 0,
          temp: 32.0,
          load: 0,
          feedRate: 0,
          spindleSpeed: 0,
          runTimeHours: 0
        };
        setMachines((prev) => [...prev, newMch]);
        addToast(`CNC Machine Cell ${newMch.name} added to floor map!`, 'success');
        break;
      }
      case 'new-order': {
        const newOrd: SalesOrder = {
          id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
          customer: payload.customer || 'NASA Aerospace Corp',
          partName: payload.partName || 'Fuselage Ring',
          quantity: payload.quantity || 50,
          orderDate: new Date().toISOString().slice(0, 10),
          dueDate: payload.dueDate || '2200-01-01',
          status: 'pending',
          priority: payload.priority || 'medium',
          cost: payload.cost || 12000
        };
        setOrders((prev) => [...prev, newOrd]);
        addToast(`Sales Order Contract ${newOrd.id} cataloged successfully!`, 'success');
        break;
      }
      case 'add-employee': {
        const newEmp: WorkforceEmployee = {
          id: `EMP-${Math.floor(Math.random() * 900) + 100}`,
          name: payload.name || 'Alex Carter',
          role: payload.role || 'Milling Operator',
          shift: payload.shift || 'day',
          status: payload.status || 'active',
          efficiency: payload.efficiency || 90,
          contact: payload.contact || 'a.carter@cnc-ops.com',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
        };
        setEmployees((prev) => [...prev, newEmp]);
        addToast(` Roster update: ${newEmp.name} enrolled in ${newEmp.shift.toUpperCase()} Shift!`, 'success');
        break;
      }
      case 'update-stock': {
        setTools((prev) =>
          prev.map((t) => {
            if (t.id === payload.id) {
              const nextQty = t.quantity + (payload.addQty || 0);
              const nextStatus = nextQty > t.minRequired ? 'good' : nextQty > 5 ? 'worn' : 'critical';
              return { ...t, quantity: nextQty, status: nextStatus };
            }
            return t;
          })
        );
        addToast(`Tool Stock replenished for Catalog ID: ${payload.id}!`, 'success');
        break;
      }
      case 'add-tool': {
        const newTl: ToolInventoryItem = {
          id: `TOL-${Math.floor(Math.random() * 900) + 100}`,
          name: payload.name || 'Taper Shank Reamer',
          category: payload.category || 'endmill',
          status: 'good',
          quantity: payload.quantity || 10,
          minRequired: payload.minRequired || 4,
          location: payload.location || 'Cabinet A - Drawer 1',
          lastCalibrated: timestampStr.slice(0, 10)
        };
        setTools((prev) => [...prev, newTl]);
        addToast(`New Tooling item ${newTl.name} registered into inventory!`, 'success');
        break;
      }
      case 'log-inspection': {
        const newQC: QCLog = {
          id: `QC-${Math.floor(Math.random() * 9000) + 1000}`,
          partNumber: payload.partNumber || 'PRT-WING-201',
          orderId: payload.orderId || 'ORD-9081',
          inspector: payload.inspector || 'A. Volkov',
          dimensionsStatus: payload.dimensionsStatus || 'pass',
          surfaceFinish: payload.surfaceFinish || 'excellent',
          deviationMM: payload.deviationMM || 0.002,
          timestamp: timestampStr
        };
        setQcLogs((prev) => [newQC, ...prev]);
        addToast(`Metrology Inspection file logged for part ${newQC.partNumber}!`, 'success');
        break;
      }
      case 'log-breakdown': {
        const newLog: MaintenanceLog = {
          id: `MNT-${Math.floor(Math.random() * 900) + 100}`,
          machineId: payload.machineId || 'MCH-101',
          machineName: payload.machineName || 'CNC Mill Alpha',
          issue: payload.issue || 'Spindle alignment deviation alarm',
          type: 'breakdown',
          reportedBy: payload.reportedBy || 'Marcus Vance',
          timestamp: timestampStr,
          status: 'pending',
          cost: payload.cost || 500
        };
        setMaintenanceLogs((prev) => [...prev, newLog]);
        // Set machine state to error
        setMachines((prev) =>
          prev.map((m) => (m.id === payload.machineId ? { ...m, status: 'error', spindleSpeed: 0, load: 0, progress: 0 } : m))
        );
        addToast(`Fault logged on Spindle unit ${newLog.machineName}. Emergency breakdown sequence launched!`, 'info');
        break;
      }
      default:
        break;
    }
  };

  // Profile updating
  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    addToast('Operator Settings updated successfully!', 'success');
  };

  // Navigations sidebar buttons list
  const sidebarItems = [
    { id: 'dashboard', label: 'Command Center', icon: <Activity className="w-4 h-4" /> },
    { id: 'production', label: 'Production Floor', icon: <Cpu className="w-4 h-4" /> },
    { id: 'orders', label: 'Sales & Orders', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'workforce', label: 'HR & Workforce', icon: <Users className="w-4 h-4" /> },
    { id: 'inventory', label: 'Tool & Inventory', icon: <Package className="w-4 h-4" /> },
    { id: 'quality', label: 'Quality Control', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Maintenance Log', icon: <Wrench className="w-4 h-4" /> },
    { id: 'profile', label: 'Manage Profile', icon: <User className="w-4 h-4" /> }
  ];

  // Route views
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            machines={machines}
            orders={orders}
            tools={tools}
            qcLogs={qcLogs}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'production':
        return (
          <ProductionView
            machines={machines}
            onTriggerEStop={handleTriggerEStop}
            onCalibrateMachine={handleCalibrateMachine}
            onToggleJobState={handleToggleJobState}
            onOpenModal={handleOpenModal}
          />
        );
      case 'orders':
        return (
          <OrdersView
            orders={orders}
            onOpenModal={handleOpenModal}
            onChangeOrderStatus={handleChangeOrderStatus}
          />
        );
      case 'workforce':
        return (
          <WorkforceView
            employees={employees}
            onOpenModal={handleOpenModal}
            onChangeEmployeeStatus={handleChangeEmployeeStatus}
          />
        );
      case 'inventory':
        return (
          <InventoryView
            tools={tools}
            onOpenModal={handleOpenModal}
          />
        );
      case 'quality':
        return (
          <QualityView
            qcLogs={qcLogs}
            onOpenModal={handleOpenModal}
          />
        );
      case 'maintenance':
        return (
          <MaintenanceView
            maintenanceLogs={maintenanceLogs}
            machines={machines}
            onOpenModal={handleOpenModal}
            onResolveMaintenance={handleResolveMaintenance}
          />
        );
      case 'profile':
        return (
          <ProfileView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      default:
        return <div className="text-gray-400 font-mono text-center py-20">Navigational index failure. Tab state reset required.</div>;
    }
  };

  // If not authenticated, render LoginView first
  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background Glowing Ambiance */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[65%] h-[65%] rounded-full ambient-glow-1" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[65%] h-[65%] rounded-full ambient-glow-2" />
      </div>

      {/* Primary Layout Shell */}
      <div className="flex flex-1 relative z-10">
        {/* SIDEBAR NAVIGATION (Desktop) */}
        <aside className="w-64 hidden xl:flex flex-col border-r border-white/10 glass-panel-heavy p-4 relative shrink-0">
          <div className="flex items-center gap-3 px-2 py-4 border-b border-white/10 mb-6">
            <div className="p-2 bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
              <Cpu className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <h1 className="font-display font-bold text-sm tracking-tight text-white uppercase">
                Operations Hub
              </h1>
              <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block">CNC Command V1.4</span>
            </div>
          </div>

          <nav className="space-y-1.5 flex-1">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/25 glow-cyan font-bold shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-white/10 pt-4 mt-auto">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/25 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </aside>

        {/* PRIMARY CONTAINER (Header + Main scrollable view) */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* HEADER ROW */}
          <header className="h-16 border-b border-white/10 glass-panel flex items-center justify-between px-6 shrink-0">
            {/* Mobile / Compact logo and navigation drawer shortcut */}
            <div className="flex items-center gap-3 xl:hidden">
              <Cpu className="w-5 h-5 text-neon-cyan" />
              <span className="font-display font-bold text-xs uppercase text-white">CNC HUB</span>
            </div>

            {/* Quick stats / date label (Desktop) */}
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-[10px]">
                <Clock className="w-3.5 h-3.5 text-neon-cyan" />
                {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()} UTC
              </span>
              <span className="text-white/10">|</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> ISO 9001 METROLOGY SECURE
              </span>
            </div>

            {/* Profile Avatar & quick actions */}
            <div className="flex items-center gap-4">
              <div className="xl:hidden flex gap-2">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-md px-2 py-1 text-xs font-mono text-gray-300 focus:outline-none focus:border-neon-cyan"
                >
                  {sidebarItems.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity text-left cursor-pointer"
              >
                <div className="text-right hidden sm:block">
                  <span className="block text-xs font-semibold text-white">{profile.name}</span>
                  <span className="block text-[9px] font-mono text-gray-500 uppercase">Supervisor</span>
                </div>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-8.5 h-8.5 rounded-lg object-cover border border-neon-cyan/25 shadow-[0_0_8px_rgba(6,182,212,0.1)]"
                />
              </button>
            </div>
          </header>

          {/* SCROLLABLE CENTRAL MODULE CANVAS */}
          <main className="flex-1 overflow-y-auto p-6 scrollbar">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-w-7xl mx-auto"
            >
              {renderActiveView()}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Floating Success Toasts notifications wrapper */}
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* Universal Modal Form container */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalType(null);
        }}
        modalType={modalType}
        machines={machines}
        tools={tools}
        onSubmit={handleModalFormSubmit}
      />
    </div>
  );
}
