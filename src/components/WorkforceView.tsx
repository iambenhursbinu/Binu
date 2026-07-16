import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Plus, Search, Mail, Briefcase, TrendingUp, ShieldAlert, Award } from 'lucide-react';
import { WorkforceEmployee } from '../types';

interface WorkforceViewProps {
  employees: WorkforceEmployee[];
  onOpenModal: (type: 'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown') => void;
  onChangeEmployeeStatus: (id: string, status: 'active' | 'on-leave' | 'off-duty') => void;
}

export default function WorkforceView({ employees, onOpenModal, onChangeEmployeeStatus }: WorkforceViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState<'all' | 'day' | 'night' | 'swing'>('all');

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShift = shiftFilter === 'all' || emp.shift === shiftFilter;
    return matchesSearch && matchesShift;
  });

  const activeOnShiftCount = employees.filter((e) => e.status === 'active').length;
  const avgEfficiency = employees.reduce((acc, curr) => acc + curr.efficiency, 0) / employees.length;

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-white uppercase">
            Workforce & Shift Roster
          </h2>
          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
            Active personnel assignments • Efficiency tracking
          </p>
        </div>
        <button
          onClick={() => onOpenModal('add-employee')}
          className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-sapphire hover:from-neon-cyan/90 hover:to-neon-sapphire/90 rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" /> Add Personnel
        </button>
      </div>

      {/* Aggregate metrics for workforce */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-neon-cyan flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Active Spindle Operators</span>
            <p className="text-xl font-bold font-mono mt-1">{activeOnShiftCount} Active Duty</p>
          </div>
          <Users className="w-5 h-5 text-neon-cyan opacity-45" />
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-neon-sapphire flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Average Floor Efficiency</span>
            <p className="text-xl font-bold font-mono mt-1 text-neon-sapphire">{avgEfficiency.toFixed(1)}%</p>
          </div>
          <TrendingUp className="w-5 h-5 text-neon-sapphire opacity-45" />
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-400 flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Total Roster Registry</span>
            <p className="text-xl font-bold font-mono mt-1 text-emerald-400">{employees.length} Personnel</p>
          </div>
          <Award className="w-5 h-5 text-emerald-400 opacity-45" />
        </div>
      </div>

      {/* Filters & Search bars */}
      <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search roster by name, role, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/40 border border-white/5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/30"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pr-1">
          {(['all', 'day', 'swing', 'night'] as const).map((shift) => (
            <button
              key={shift}
              onClick={() => setShiftFilter(shift)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors ${
                shiftFilter === shift
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {shift === 'all' ? 'All Shifts' : `${shift} Shift`}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between hover:border-neon-cyan/30 transition-all duration-300 group"
          >
            {/* Top segment */}
            <div>
              <div className="flex gap-4 items-start mb-4">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                />
                <div>
                  <h3 className="font-bold font-display text-white">{emp.name}</h3>
                  <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{emp.id} • {emp.role}</span>
                </div>
              </div>

              {/* Stats / Shift indicators */}
              <div className="space-y-3 bg-slate-950/40 p-3 rounded-xl border border-white/5 mb-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">Scheduled Shift:</span>
                  <span className="text-neon-cyan uppercase tracking-wide">{emp.shift} shift</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">Contact Secure:</span>
                  <span className="text-gray-300 text-[11px] font-normal truncate max-w-[150px]">{emp.contact}</span>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
                    <span>Performance Efficiency</span>
                    <span className="font-bold text-white">{emp.efficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        emp.efficiency > 90
                          ? 'bg-emerald-400'
                          : emp.efficiency > 80
                          ? 'bg-neon-cyan'
                          : 'bg-neon-amber'
                      }`}
                      style={{ width: `${emp.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <span
                className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5 ${
                  emp.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : emp.status === 'off-duty'
                    ? 'bg-gray-700/20 text-gray-400 border border-gray-600/20'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                }`}
              >
                <span className={`w-1 h-1 rounded-full ${emp.status === 'active' ? 'bg-emerald-400 animate-ping' : emp.status === 'off-duty' ? 'bg-gray-500' : 'bg-amber-400'}`}></span>
                {emp.status}
              </span>

              <div className="flex gap-1.5">
                <select
                  value={emp.status}
                  onChange={(e) => onChangeEmployeeStatus(emp.id, e.target.value as any)}
                  className="px-2 py-1 bg-slate-900 border border-white/10 rounded text-[10px] font-mono text-gray-300 focus:outline-none focus:border-neon-cyan"
                >
                  <option value="active">Set Active</option>
                  <option value="off-duty">Set Off Duty</option>
                  <option value="on-leave">Set Leave</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
