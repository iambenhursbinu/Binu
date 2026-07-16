import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckSquare, Plus, Search, ShieldAlert, CheckCircle, Activity, Award } from 'lucide-react';
import { QCLog } from '../types';

interface QualityViewProps {
  qcLogs: QCLog[];
  onOpenModal: (type: 'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown') => void;
}

export default function QualityView({ qcLogs, onOpenModal }: QualityViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter QC logs
  const filteredLogs = qcLogs.filter((log) => {
    return (
      log.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.inspector.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const passCount = qcLogs.filter((l) => l.dimensionsStatus === 'pass').length;
  const failureRate = ((qcLogs.filter((l) => l.dimensionsStatus === 'fail').length / qcLogs.length) * 100 || 0);

  // Maximum drift calculation
  const maxDrift = Math.max(...qcLogs.map((l) => Math.abs(l.deviationMM)), 0);

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-white uppercase">
            Quality Assurance & Metrology
          </h2>
          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
            Part tolerance audits • Caliper micrometer verification logs
          </p>
        </div>
        <button
          onClick={() => onOpenModal('log-inspection')}
          className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-sapphire hover:from-neon-cyan/90 hover:to-neon-sapphire/90 rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" /> Log Calibration Check
        </button>
      </div>

      {/* Aggregate QA stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-400 flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Quality Certification Pass Ratio</span>
            <p className="text-xl font-bold font-mono mt-1 text-emerald-400">
              {((passCount / qcLogs.length) * 100 || 0).toFixed(2)}% Passed
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-emerald-400 opacity-45" />
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-rose-500 flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Current Scrap/Defect Ratio</span>
            <p className="text-xl font-bold font-mono mt-1 text-rose-400">{failureRate.toFixed(1)}% Scrap</p>
          </div>
          <ShieldAlert className="w-5 h-5 text-rose-500 opacity-45" />
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-neon-cyan flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Maximum Tolerance Deviation</span>
            <p className="text-xl font-bold font-mono mt-1 text-neon-cyan">± {maxDrift.toFixed(3)} mm</p>
          </div>
          <Activity className="w-5 h-5 text-neon-cyan opacity-45" />
        </div>
      </div>

      {/* Filters & Search bars */}
      <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search parts check, order, inspector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/40 border border-white/5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/30"
          />
        </div>

        <div className="text-xs font-mono text-gray-400">
          Inspection Standard: <span className="text-white font-bold uppercase tracking-wider">AS9100 Precision Aviation</span>
        </div>
      </div>

      {/* Roster Spreadsheet / Grid Layout */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/45 font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Inspection ID</th>
                <th className="p-4">Part Serial Number</th>
                <th className="p-4">Order Code</th>
                <th className="p-4">QA Auditor / Inspector</th>
                <th className="p-4 text-center">Tolerances Deviation (mm)</th>
                <th className="p-4 text-center">Deviation Rating Drift</th>
                <th className="p-4">Surface Polish Finish</th>
                <th className="p-4 pr-6 text-right">Caliper Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const absoluteDrift = Math.abs(log.deviationMM);
                  return (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4 pl-6 font-mono text-xs text-neon-cyan font-bold">{log.id}</td>
                      <td className="p-4 font-semibold text-white font-mono text-xs">{log.partNumber}</td>
                      <td className="p-4 font-mono text-xs text-gray-400">{log.orderId}</td>
                      <td className="p-4 font-medium text-white">{log.inspector}</td>
                      <td className="p-4 text-center font-mono font-semibold text-gray-300">
                        {log.deviationMM > 0 ? `+${log.deviationMM.toFixed(3)}` : log.deviationMM.toFixed(3)} mm
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden relative">
                            {/* Deviation indicator from center line */}
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                absoluteDrift < 0.01
                                  ? 'bg-emerald-400'
                                  : absoluteDrift < 0.05
                                  ? 'bg-neon-amber'
                                  : 'bg-rose-500 animate-pulse'
                              }`}
                              style={{
                                width: `${Math.min((absoluteDrift / 0.1) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {absoluteDrift < 0.01 ? 'Safe' : absoluteDrift < 0.05 ? 'Warning' : 'Critical'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 uppercase text-xs font-mono font-medium text-gray-300">{log.surfaceFinish}</td>
                      <td className="p-4 pr-6 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider ${
                            log.dimensionsStatus === 'pass'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                          }`}
                        >
                          {log.dimensionsStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-500 font-mono">
                    No matching quality records inside database files.
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
