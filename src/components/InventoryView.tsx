import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Plus, Search, AlertTriangle, HelpCircle, Archive, Clipboard } from 'lucide-react';
import { ToolInventoryItem } from '../types';

interface InventoryViewProps {
  tools: ToolInventoryItem[];
  onOpenModal: (type: 'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown') => void;
}

export default function InventoryView({ tools, onOpenModal }: InventoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'endmill' | 'drill' | 'insert' | 'coolant' | 'accessory'>('all');

  // Filter tools
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockTools = tools.filter((t) => t.quantity <= t.minRequired);

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-white uppercase">
            Tooling & Material Inventory
          </h2>
          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
            Machine inserts, cutters, lubricants, calibration BALL-BAR shelf stock
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onOpenModal('update-stock')}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Quick Restock
          </button>
          <button
            onClick={() => onOpenModal('add-tool')}
            className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-sapphire hover:from-neon-cyan/90 hover:to-neon-sapphire/90 rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> Catalog New Tool
          </button>
        </div>
      </div>

      {/* Critical stock alerts section */}
      {lowStockTools.length > 0 && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/25 rounded-2xl flex items-start gap-3.5 glow-rose">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
          <div className="flex-1">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-rose-200">
              Low Stock Warnings detected ({lowStockTools.length} alert thresholds crossed)
            </h4>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockTools.map((tool) => (
                <div key={tool.id} className="p-2 bg-slate-950/40 border border-rose-500/15 rounded-lg text-xs flex justify-between items-center font-mono">
                  <div>
                    <span className="text-white font-semibold truncate block max-w-[160px]">{tool.name}</span>
                    <span className="text-gray-500 text-[10px]">{tool.id} • Min: {tool.minRequired} units</span>
                  </div>
                  <span className="font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 animate-pulse">
                    Stock: {tool.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search bars */}
      <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search catalog catalog items, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/40 border border-white/5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/30"
          />
        </div>

        <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto pr-1">
          {(['all', 'endmill', 'drill', 'insert', 'coolant', 'accessory'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors ${
                categoryFilter === cat
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Inventory' : `${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Tooling Inventory grid layout */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/45 font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Catalog ID</th>
                <th className="p-4">Item Name / Tool Type</th>
                <th className="p-4">Tool Classification</th>
                <th className="p-4 text-center">In Stock Level</th>
                <th className="p-4 text-center">Safety Minimum</th>
                <th className="p-4">Cabinet Location</th>
                <th className="p-4">Calibration Cycle</th>
                <th className="p-4 pr-6 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => {
                  const isLow = tool.quantity <= tool.minRequired;
                  return (
                    <tr key={tool.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4 pl-6 font-mono text-xs text-neon-cyan font-bold">{tool.id}</td>
                      <td className="p-4 font-semibold text-white">{tool.name}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-slate-950/60 rounded text-[9px] font-mono text-gray-400 border border-white/5 uppercase">
                          {tool.category}
                        </span>
                      </td>
                      <td className={`p-4 text-center font-mono font-bold ${isLow ? 'text-rose-400' : 'text-gray-200'}`}>
                        {tool.quantity}
                      </td>
                      <td className="p-4 text-center font-mono text-gray-400">{tool.minRequired}</td>
                      <td className="p-4 font-mono text-xs text-gray-300">{tool.location}</td>
                      <td className="p-4 font-mono text-xs text-gray-400">{tool.lastCalibrated}</td>
                      <td className="p-4 pr-6 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider ${
                            tool.status === 'good'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : tool.status === 'worn'
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                          }`}
                        >
                          {tool.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-500 font-mono">
                    No active tooling files matched standard category queries.
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
