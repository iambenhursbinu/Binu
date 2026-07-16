import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Thermometer, Gauge, Activity, AlertTriangle, Plus, Play, Pause, RefreshCw, Radio } from 'lucide-react';
import { CNCMachine } from '../types';

interface ProductionViewProps {
  machines: CNCMachine[];
  onTriggerEStop: (id: string) => void;
  onCalibrateMachine: (id: string) => void;
  onToggleJobState: (id: string) => void;
  onOpenModal: (type: 'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown') => void;
}

export default function ProductionView({
  machines,
  onTriggerEStop,
  onCalibrateMachine,
  onToggleJobState,
  onOpenModal
}: ProductionViewProps) {
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(machines[0]?.id || null);

  const activeMachine = machines.find((m) => m.id === selectedMachineId) || machines[0];

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-white uppercase">
            Production Floor Manager
          </h2>
          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
            Real-time shop floor supervisor • Machine Tool Cells
          </p>
        </div>
        <button
          onClick={() => onOpenModal('add-machine')}
          className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-sapphire hover:from-neon-cyan/90 hover:to-neon-sapphire/90 rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" /> Add CNC Machine Cell
        </button>
      </div>

      {/* Main Structural Splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Machine Cells */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 px-1">
            Machine Units Catalog ({machines.length})
          </h3>
          <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
            {machines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => setSelectedMachineId(machine.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 block cursor-pointer ${
                  selectedMachineId === machine.id
                    ? 'glass-panel border-neon-cyan/40 shadow-[0_0_15px_rgba(6,182,212,0.12)]'
                    : 'bg-slate-950/20 hover:bg-slate-950/40 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm text-white font-display">{machine.name}</h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{machine.id} • {machine.type}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider ${
                      machine.status === 'running'
                        ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'
                        : machine.status === 'idle'
                        ? 'bg-gray-700/10 text-gray-400 border border-gray-600/10'
                        : machine.status === 'maintenance'
                        ? 'bg-neon-amber/10 text-neon-amber border border-neon-amber/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                    }`}
                  >
                    ● {machine.status}
                  </span>
                </div>

                {machine.status === 'running' && (
                  <div className="mt-3">
                    <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-cyan" style={{ width: `${machine.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-gray-500 mt-1">
                      <span>Job: {machine.jobName}</span>
                      <span>{machine.progress}%</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Selected Machine Inspection Panel */}
        <div className="lg:col-span-2">
          {activeMachine ? (
            <motion.div
              key={activeMachine.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6 rounded-2xl space-y-6"
            >
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-display text-white">{activeMachine.name}</h3>
                    <span className="text-xs text-gray-400 font-mono">[{activeMachine.id}]</span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{activeMachine.type}</p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  {activeMachine.status === 'error' ? (
                    <span className="px-3 py-1 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-mono font-bold animate-pulse flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> ALARM STATE ACTIVE
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">Ready for Command</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid: Live Telemetry Values */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl text-center">
                  <div className="flex justify-center text-neon-cyan mb-1.5">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider">Spindle Speed</span>
                  <span className="text-lg font-bold font-mono mt-1 block">{activeMachine.spindleSpeed} RPM</span>
                </div>

                <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl text-center">
                  <div className="flex justify-center text-neon-sapphire mb-1.5">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider">Load Rating</span>
                  <span className="text-lg font-bold font-mono mt-1 block">{activeMachine.load}%</span>
                </div>

                <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl text-center">
                  <div className="flex justify-center text-neon-amber mb-1.5">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider">Spindle Temp</span>
                  <span className={`text-lg font-bold font-mono mt-1 block ${activeMachine.temp > 75 ? 'text-rose-400 font-extrabold' : 'text-emerald-400'}`}>
                    {activeMachine.temp.toFixed(1)}°C
                  </span>
                </div>

                <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl text-center">
                  <div className="flex justify-center text-gray-400 mb-1.5">
                    <Radio className="w-5 h-5" />
                  </div>
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider">Total Run Time</span>
                  <span className="text-lg font-bold font-mono mt-1 block">{activeMachine.runTimeHours.toFixed(1)} Hrs</span>
                </div>
              </div>

              {/* Active Cycle details */}
              <div className="bg-slate-950/55 border border-white/10 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-wider border-b border-white/5 pb-2">
                  Active Manufacturing Cycle Log
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Job Code:</span>
                      <span className="text-white font-semibold">{activeMachine.jobName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Assigned Machinist:</span>
                      <span className="text-white font-semibold">{activeMachine.operator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Program Feed-Rate:</span>
                      <span className="text-white font-semibold">{activeMachine.feedRate} mm/min</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-gray-400 mb-1.5">
                      <span>Machining Progress</span>
                      <span>{activeMachine.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-sapphire transition-all duration-500"
                        style={{ width: `${activeMachine.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Command Action Center */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                  Tactical Cell Commands (Live Feed)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => onToggleJobState(activeMachine.id)}
                    disabled={activeMachine.status === 'error' || activeMachine.status === 'maintenance'}
                    className={`py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      activeMachine.status === 'running'
                        ? 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300'
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 disabled:opacity-50'
                    }`}
                  >
                    {activeMachine.status === 'running' ? (
                      <>
                        <Pause className="w-4 h-4" /> Pause CNC Job
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Start CNC Job
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onCalibrateMachine(activeMachine.id)}
                    disabled={activeMachine.status === 'running'}
                    className="py-3 px-4 bg-neon-sapphire/20 hover:bg-neon-sapphire/30 border border-neon-sapphire/40 text-neon-sapphire rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Calibrate Spindle
                  </button>

                  <button
                    onClick={() => onTriggerEStop(activeMachine.id)}
                    className="py-3 px-4 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" /> Emergency Stop
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-8 text-center rounded-2xl flex flex-col items-center justify-center py-20">
              <Cpu className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-400 text-sm font-mono">No machine unit selected. Choose a cell from the catalog roster.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
