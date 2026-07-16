import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wrench, Plus, AlertTriangle, CheckCircle, Calendar, DollarSign, RefreshCw, Clipboard } from 'lucide-react';
import { MaintenanceLog, CNCMachine } from '../types';

interface MaintenanceViewProps {
  maintenanceLogs: MaintenanceLog[];
  machines: CNCMachine[];
  onOpenModal: (type: 'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown') => void;
  onResolveMaintenance: (id: string, machineId: string) => void;
}

export default function MaintenanceView({
  maintenanceLogs,
  machines,
  onOpenModal,
  onResolveMaintenance
}: MaintenanceViewProps) {
  const [typeFilter, setTypeFilter] = useState<'all' | 'scheduled' | 'breakdown' | 'calibration'>('all');

  // Filter logs
  const filteredLogs = maintenanceLogs.filter((log) => {
    return typeFilter === 'all' || log.type === typeFilter;
  });

  const activeBreakdownsCount = maintenanceLogs.filter((l) => l.status === 'pending' || l.status === 'in-progress').length;
  const totalRepairCosts = maintenanceLogs.reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-white uppercase">
            Maintenance & Calibration
          </h2>
          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
            Machine cooling loops, spindle lubricity journals, thermal calibration schedules
          </p>
        </div>
        <button
          onClick={() => onOpenModal('log-breakdown')}
          className="px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.15)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all cursor-pointer uppercase tracking-wider text-rose-300"
        >
          <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" /> Report Breakdown / Alarm
        </button>
      </div>

      {/* Aggregate stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-rose-500 flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Active Breakdowns / Faults</span>
            <p className="text-xl font-bold font-mono mt-1 text-rose-400">{activeBreakdownsCount} Spindles Faulty</p>
          </div>
          <AlertTriangle className="w-5 h-5 text-rose-500 opacity-45" />
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-neon-cyan flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Combined Maintenance Costs</span>
            <p className="text-xl font-bold font-mono mt-1 text-neon-cyan">${totalRepairCosts.toLocaleString()}</p>
          </div>
          <DollarSign className="w-5 h-5 text-neon-cyan opacity-45" />
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-400 flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Completed Diagnostics</span>
            <p className="text-xl font-bold font-mono mt-1 text-emerald-400">
              {maintenanceLogs.filter((l) => l.status === 'resolved').length} Orders Resolved
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-emerald-400 opacity-45" />
        </div>
      </div>

      {/* Filter tab buttons */}
      <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
        <div className="flex gap-1.5 overflow-x-auto pr-1">
          {(['all', 'scheduled', 'breakdown', 'calibration'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors ${
                typeFilter === type
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All Operations' : `${type} operations`}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-gray-400 hidden md:block">
          Spindle Alignment Periodicity: <span className="text-white font-bold uppercase">500 Hours CNC limit</span>
        </div>
      </div>

      {/* Roster Spreadsheet / Grid Layout */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/45 font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Ticket ID</th>
                <th className="p-4">CNC Machine Target</th>
                <th className="p-4">Reported Mechanical Issue / Fault</th>
                <th className="p-4">Roster Category</th>
                <th className="p-4">Reported By</th>
                <th className="p-4">Cost ($)</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Diagnostic Status</th>
                <th className="p-4 pr-6 text-right">Route Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 pl-6 font-mono text-xs text-neon-cyan font-bold">{log.id}</td>
                    <td className="p-4 font-semibold text-white font-mono text-xs">{log.machineName}</td>
                    <td className="p-4 font-medium text-gray-200">{log.issue}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider ${
                          log.type === 'breakdown'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : log.type === 'scheduled'
                            ? 'bg-neon-sapphire/10 text-neon-sapphire border border-neon-sapphire/20'
                            : 'bg-neon-amber/10 text-neon-amber border border-neon-amber/20'
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-400">{log.reportedBy}</td>
                    <td className="p-4 font-mono text-xs font-bold text-gray-300">${log.cost}</td>
                    <td className="p-4 font-mono text-[11px] text-gray-400">{log.timestamp}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider ${
                          log.status === 'resolved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : log.status === 'in-progress'
                            ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 animate-pulse'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                        }`}
                      >
                        ● {log.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {log.status !== 'resolved' ? (
                        <button
                          onClick={() => onResolveMaintenance(log.id, log.machineId)}
                          className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 rounded text-[10px] font-mono font-bold uppercase cursor-pointer tracking-wider transition-colors"
                        >
                          Resolve Fault
                        </button>
                      ) : (
                        <span className="text-gray-500 text-xs font-mono font-semibold uppercase">Closed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-gray-500 font-mono">
                    No active maintenance tickets matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
