import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Plus, Search, Calendar, DollarSign, Filter, ChevronRight, Briefcase } from 'lucide-react';
import { SalesOrder } from '../types';

interface OrdersViewProps {
  orders: SalesOrder[];
  onOpenModal: (type: 'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown') => void;
  onChangeOrderStatus: (id: string, status: 'pending' | 'in-production' | 'completed' | 'cancelled') => void;
}

export default function OrdersView({ orders, onOpenModal, onChangeOrderStatus }: OrdersViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-production' | 'completed' | 'cancelled'>('all');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = filteredOrders.reduce((sum, o) => sum + o.cost, 0);

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-white uppercase">
            Sales & Purchase Orders
          </h2>
          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
            Contract backlog ledger • Job assignments
          </p>
        </div>
        <button
          onClick={() => onOpenModal('new-order')}
          className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-sapphire hover:from-neon-cyan/90 hover:to-neon-sapphire/90 rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" /> Create Sales Order
        </button>
      </div>

      {/* Aggregate metrics for orders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-neon-cyan flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Ledger Valuation</span>
            <p className="text-xl font-bold font-mono mt-1 text-neon-cyan">${totalValue.toLocaleString()}</p>
          </div>
          <DollarSign className="w-5 h-5 text-neon-cyan opacity-40" />
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-neon-sapphire flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Orders In Queue</span>
            <p className="text-xl font-bold font-mono mt-1 text-neon-sapphire">{filteredOrders.length} Contracts</p>
          </div>
          <ShoppingCart className="w-5 h-5 text-neon-sapphire opacity-40" />
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-400 flex justify-between items-center">
          <div>
            <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wide">Fulfillment Ratio</span>
            <p className="text-xl font-bold font-mono mt-1 text-emerald-400">
              {((orders.filter(o => o.status === 'completed').length / orders.length) * 100 || 0).toFixed(1)}%
            </p>
          </div>
          <Briefcase className="w-5 h-5 text-emerald-400 opacity-40" />
        </div>
      </div>

      {/* Filters & Search bars */}
      <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by customer, part number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/40 border border-white/5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/30"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pr-1">
          <Filter className="w-4 h-4 text-gray-500 shrink-0 self-center hidden sm:inline" />
          {(['all', 'pending', 'in-production', 'completed', 'cancelled'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors ${
                statusFilter === filter
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Spreadsheet / Grid Layout */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/45 font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Part Specification</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4">Urgency / Priority</th>
                <th className="p-4">Contract Value</th>
                <th className="p-4">Workflow Status</th>
                <th className="p-4 pr-6 text-right">Route Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 pl-6 font-mono text-xs text-neon-cyan font-bold">{order.id}</td>
                    <td className="p-4 font-semibold text-white">{order.customer}</td>
                    <td className="p-4">
                      <div>
                        <span className="text-white font-medium">{order.partName}</span>
                        <div className="flex gap-2 text-[9px] text-gray-500 font-mono mt-0.5">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> In: {order.orderDate}</span>
                          <span className="flex items-center gap-1">Due: {order.dueDate}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center font-mono text-gray-300 font-semibold">{order.quantity}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold tracking-wider ${
                          order.priority === 'high'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : order.priority === 'medium'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {order.priority}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-gray-200">${order.cost.toLocaleString()}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider ${
                          order.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : order.status === 'in-production'
                            ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 animate-pulse'
                            : order.status === 'pending'
                            ? 'bg-neon-sapphire/10 text-neon-sapphire border border-neon-sapphire/20'
                            : 'bg-gray-700/20 text-gray-400 border border-gray-600/20'
                        }`}
                      >
                        ● {order.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <select
                          value={order.status}
                          onChange={(e) => onChangeOrderStatus(order.id, e.target.value as any)}
                          className="px-2 py-1 bg-slate-900 border border-white/10 rounded text-[10px] font-mono text-gray-300 focus:outline-none focus:border-neon-cyan"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-production">In Prod</option>
                          <option value="completed">Complete</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-500 font-mono">
                    No active purchase contracts matched the query parameter filters.
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
