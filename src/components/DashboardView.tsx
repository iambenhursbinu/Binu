import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Thermometer, Gauge, Activity, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';
import { CNCMachine, SalesOrder, ToolInventoryItem, QCLog } from '../types';

interface DashboardViewProps {
  machines: CNCMachine[];
  orders: SalesOrder[];
  tools: ToolInventoryItem[];
  qcLogs: QCLog[];
  onNavigate: (tab: string) => void;
}

export default function DashboardView({ machines, orders, tools, qcLogs, onNavigate }: DashboardViewProps) {
  // Calculated status aggregates
  const activeMachinesCount = machines.filter((m) => m.status === 'running').length;
  const maintenanceCount = machines.filter((m) => m.status === 'maintenance').length;
  const errorMachinesCount = machines.filter((m) => m.status === 'error').length;
  
  const lowStockToolsCount = tools.filter((t) => t.status === 'critical' || t.quantity <= t.minRequired).length;
  const recentQCResult = qcLogs.slice(0, 4);
  const activeOrdersCount = orders.filter((o) => o.status === 'in-production').length;

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Visual Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-white uppercase">
            Command Center Dashboard
          </h2>
          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
            CNC Operations Hub • Real-time Telemetry
          </p>
        </div>
        <div className="flex gap-3">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2 border-l-2 border-l-neon-cyan">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping"></span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-300">SYSTEM SECURE STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Grid: Aggregate Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="glass-panel p-4 rounded-xl flex items-center gap-4 border-l-4 border-l-neon-cyan"
        >
          <div className="p-3 rounded-lg bg-neon-cyan/10 text-neon-cyan">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">Active Spindles</h4>
            <p className="text-2xl font-bold font-display mt-0.5">{activeMachinesCount} / {machines.length}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="glass-panel p-4 rounded-xl flex items-center gap-4 border-l-4 border-l-neon-sapphire"
        >
          <div className="p-3 rounded-lg bg-neon-sapphire/10 text-neon-sapphire">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">Active Orders</h4>
            <p className="text-2xl font-bold font-display mt-0.5">{activeOrdersCount} in Queue</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="glass-panel p-4 rounded-xl flex items-center gap-4 border-l-4 border-l-neon-amber"
        >
          <div className="p-3 rounded-lg bg-neon-amber/10 text-neon-amber">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">Stock Alerts</h4>
            <p className="text-2xl font-bold font-display mt-0.5 text-neon-amber">{lowStockToolsCount} Critical</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="glass-panel p-4 rounded-xl flex items-center gap-4 border-l-4 border-l-emerald-500"
        >
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">OEE Rating</h4>
            <p className="text-2xl font-bold font-display mt-0.5 text-emerald-400">92.4%</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Span 2: Machine Status Overview & Live Simulation */}
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-neon-cyan" />
                Live Machine Spindle Telemetry
              </h3>
              <button
                onClick={() => onNavigate('production')}
                className="text-xs font-mono text-neon-cyan hover:underline uppercase cursor-pointer"
              >
                Manage Floor →
              </button>
            </div>

            {/* Grid of Machines with live pulsating effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {machines.map((machine) => (
                <div
                  key={machine.id}
                  className={`p-4 rounded-xl bg-slate-950/40 border border-white/5 relative overflow-hidden transition-all duration-300 ${
                    machine.status === 'running' ? 'hover:border-neon-cyan/40 glow-cyan' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-sm text-white font-display">{machine.name}</h4>
                      <p className="text-[10px] text-gray-500 font-mono">{machine.id} • {machine.type}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider ${
                        machine.status === 'running'
                          ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 animate-pulse'
                          : machine.status === 'idle'
                          ? 'bg-gray-700/30 text-gray-400 border border-gray-600/30'
                          : machine.status === 'maintenance'
                          ? 'bg-neon-amber/20 text-neon-amber border border-neon-amber/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      ● {machine.status}
                    </span>
                  </div>

                  {machine.status === 'running' ? (
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                          <span>Job: {machine.jobName}</span>
                          <span>{machine.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-sapphire rounded-full transition-all duration-1000"
                            style={{ width: `${machine.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Small Quick Diagnostics Telemetry Grid */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2 rounded-lg border border-white/5">
                        <div className="text-center">
                          <span className="block text-[8px] text-gray-500 font-mono uppercase">Spindle</span>
                          <span className="text-[10px] font-mono font-bold text-white">{machine.spindleSpeed} RPM</span>
                        </div>
                        <div className="text-center border-x border-white/5">
                          <span className="block text-[8px] text-gray-500 font-mono uppercase">Load</span>
                          <span className="text-[10px] font-mono font-bold text-white">{machine.load}%</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-[8px] text-gray-500 font-mono uppercase">Temp</span>
                          <span className={`text-[10px] font-mono font-bold ${machine.temp > 75 ? 'text-rose-400 font-extrabold' : 'text-emerald-400'}`}>
                            {machine.temp.toFixed(1)}°C
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 text-center bg-slate-950/30 rounded-lg border border-dashed border-white/5">
                      {machine.status === 'error' ? (
                        <div className="text-rose-400 flex flex-col items-center gap-1">
                          <AlertTriangle className="w-5 h-5 animate-bounce" />
                          <span className="text-xs font-mono uppercase tracking-wider">THERMAL LOCK ALARM OUTLET</span>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wide">
                          {machine.status === 'maintenance' ? 'Spindle Calibration Session Active' : 'Spindle idle • Awaiting job load'}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sizing Section: Interactive SVG Visual Production Trend Graph */}
          <div className="glass-panel p-5 rounded-2xl">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-neon-cyan" />
              Hourly CNC Component Production Throughput
            </h3>
            <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-white/10 relative">
              {/* Vertical grids */}
              <div className="absolute left-0 right-0 top-1/4 border-t border-white/5 pointer-events-none"></div>
              <div className="absolute left-0 right-0 top-2/4 border-t border-white/5 pointer-events-none"></div>
              <div className="absolute left-0 right-0 top-3/4 border-t border-white/5 pointer-events-none"></div>

              {/* Data Columns */}
              {[
                { label: '06:00', parts: 45, load: 35 },
                { label: '08:00', parts: 82, load: 78 },
                { label: '10:00', parts: 125, load: 92 },
                { label: '12:00', parts: 90, load: 60 },
                { label: '14:00', parts: 140, load: 98 },
                { label: '16:00', parts: 110, load: 85 },
                { label: '18:00', parts: 75, load: 50 },
              ].map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group z-10">
                  <div className="w-full flex items-end justify-center gap-1 h-32 relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 bg-slate-950/90 border border-white/15 px-2 py-0.5 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {item.parts} Parts / {item.load}% OEE
                    </div>
                    <div
                      className="w-3 md:w-5 bg-gradient-to-t from-neon-cyan/50 to-neon-cyan rounded-t-sm transition-all duration-700"
                      style={{ height: `${(item.parts / 150) * 100}%` }}
                    />
                    <div
                      className="w-1 md:w-2 bg-gradient-to-t from-neon-sapphire/50 to-neon-sapphire rounded-t-sm transition-all duration-700"
                      style={{ height: `${item.load}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-gray-500 font-mono mt-1">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6 mt-4 text-[10px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-neon-cyan rounded-sm"></span>
                <span className="text-gray-400">Manufactured Components Count</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-neon-sapphire rounded-sm"></span>
                <span className="text-gray-400">Floor Efficiency (%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Span 1: Quality Audit Log Terminal & Priority Alert Deck */}
        <div className="space-y-6">
          {/* Recent QC logs */}
          <div className="glass-panel p-5 rounded-2xl flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Live Metrology Inspections
              </h3>
              <button
                onClick={() => onNavigate('quality')}
                className="text-xs font-mono text-neon-cyan hover:underline uppercase cursor-pointer"
              >
                Log QC →
              </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {recentQCResult.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-white">{log.partNumber}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold uppercase ${
                        log.dimensionsStatus === 'pass'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                      }`}
                    >
                      {log.dimensionsStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 font-mono">
                    <span>Dev: {log.deviationMM > 0 ? `+${log.deviationMM}` : log.deviationMM} mm</span>
                    <span>Finish: <span className={log.surfaceFinish === 'excellent' ? 'text-neon-cyan' : 'text-gray-300'}>{log.surfaceFinish}</span></span>
                  </div>
                  <div className="text-[8px] text-gray-500 font-mono mt-1 text-right">{log.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Block: CNC Safe Operation Standard */}
          <div className="glass-panel p-5 rounded-2xl bg-gradient-to-b from-slate-900/50 to-slate-950/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 ambient-glow-1 opacity-20" />
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neon-cyan mb-2">
              CNC Safety & Speed Guidelines
            </h4>
            <p className="text-gray-300 text-xs leading-relaxed font-sans mb-3">
              Always inspect the cutting coolant lubricity index before launching Carbide feed mills over 8,000 RPM.
            </p>
            <div className="space-y-1.5 text-[9px] font-mono text-gray-500">
              <div className="flex justify-between">
                <span>Metrology standards:</span>
                <span className="text-gray-300">ISO 9001 / AS9100</span>
              </div>
              <div className="flex justify-between">
                <span>Maximum Feed limit:</span>
                <span className="text-gray-300">5,000 mm/min</span>
              </div>
              <div className="flex justify-between">
                <span>Operator Shift Mode:</span>
                <span className="text-gray-300">Continuous 24-Hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
