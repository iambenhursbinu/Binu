import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, ShoppingCart, Users, Wrench, Package, ShieldAlert, CheckSquare } from 'lucide-react';
import { CNCMachine, ToolInventoryItem } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: 'add-machine' | 'new-order' | 'add-employee' | 'update-stock' | 'add-tool' | 'log-inspection' | 'log-breakdown' | null;
  machines: CNCMachine[];
  tools: ToolInventoryItem[];
  onSubmit: (type: string, payload: any) => void;
}

export default function Modal({ isOpen, onClose, modalType, machines, tools, onSubmit }: ModalProps) {
  if (!isOpen || !modalType) return null;

  const [formData, setFormData] = useState<any>({});

  const getTitleAndIcon = () => {
    switch (modalType) {
      case 'add-machine':
        return { title: 'Add CNC Machine Unit', icon: <Cpu className="w-5 h-5 text-neon-cyan" /> };
      case 'new-order':
        return { title: 'Create Production Sales Order', icon: <ShoppingCart className="w-5 h-5 text-neon-cyan" /> };
      case 'add-employee':
        return { title: 'Roster New Shift Personnel', icon: <Users className="w-5 h-5 text-neon-cyan" /> };
      case 'update-stock':
        return { title: 'Restock Current Tooling', icon: <Package className="w-5 h-5 text-neon-cyan" /> };
      case 'add-tool':
        return { title: 'Catalog New Tooling Item', icon: <Package className="w-5 h-5 text-neon-cyan" /> };
      case 'log-inspection':
        return { title: 'Log Metrology Inspection Log', icon: <CheckSquare className="w-5 h-5 text-neon-cyan" /> };
      case 'log-breakdown':
        return { title: 'Log Critical Machine Breakdown', icon: <Wrench className="w-5 h-5 text-neon-cyan" /> };
      default:
        return { title: 'Manufacturing Command', icon: <Cpu className="w-5 h-5 text-neon-cyan" /> };
    }
  };

  const handleFormChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmitAction = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(modalType, formData);
    setFormData({});
    onClose();
  };

  const { title, icon } = getTitleAndIcon();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Dark blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-obsidian/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-lg glass-panel-heavy p-6 rounded-2xl shadow-2xl glow-cyan text-white z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                {icon}
              </div>
              <h3 className="font-display font-bold text-lg tracking-tight uppercase">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitAction} className="space-y-5">
            {modalType === 'add-machine' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Machine Identifier</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MCH-106"
                      onChange={(e) => handleFormChange('id', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Machine Unit Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CNC Mill Zeta"
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Machine Category/Type</label>
                  <select
                    required
                    onChange={(e) => handleFormChange('type', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                  >
                    <option value="">-- Select Type --</option>
                    <option value="5-Axis Mill">5-Axis Machining Center</option>
                    <option value="Sub-Spindle Turning Center">Sub-Spindle Turning Center</option>
                    <option value="Heavy Router Center">Heavy Router Center</option>
                    <option value="Precision Fiber Laser">Precision Fiber Laser</option>
                    <option value="3-Axis Wood/Poly Center">3-Axis Wood/Poly Center</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Assigned Operator</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      onChange={(e) => handleFormChange('operator', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Initial Job Code</label>
                    <input
                      type="text"
                      placeholder="e.g. Bracket-Set-C"
                      onChange={(e) => handleFormChange('jobName', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
              </>
            )}

            {modalType === 'new-order' && (
              <>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Customer Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SpaceX Propulsion"
                    onChange={(e) => handleFormChange('customer', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Part Identifier/Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Turbine Rotor"
                      onChange={(e) => handleFormChange('partName', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Batch Quantity</label>
                    <input
                      type="number"
                      required
                      placeholder="100"
                      onChange={(e) => handleFormChange('quantity', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Order Value ($)</label>
                    <input
                      type="number"
                      required
                      placeholder="15000"
                      onChange={(e) => handleFormChange('cost', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Roster Priority</label>
                    <select
                      required
                      onChange={(e) => handleFormChange('priority', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    >
                      <option value="low">Low</option>
                      <option value="medium" selected>Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Due Date</label>
                    <input
                      type="date"
                      required
                      onChange={(e) => handleFormChange('dueDate', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
              </>
            )}

            {modalType === 'add-employee' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Technician Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Carter"
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Job Title / Role</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Milling Technician"
                      onChange={(e) => handleFormChange('role', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Shift</label>
                    <select
                      required
                      onChange={(e) => handleFormChange('shift', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    >
                      <option value="day">Day Shift</option>
                      <option value="swing">Swing Shift</option>
                      <option value="night">Night Shift</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Efficiency Rating (%)</label>
                    <input
                      type="number"
                      required
                      placeholder="90"
                      min="1"
                      max="100"
                      onChange={(e) => handleFormChange('efficiency', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Status</label>
                    <select
                      required
                      onChange={(e) => handleFormChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    >
                      <option value="active">Active Duty</option>
                      <option value="off-duty">Off Duty</option>
                      <option value="on-leave">On Leave</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Secure Direct Dial/Email</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. a.carter@cnc-ops.com"
                    onChange={(e) => handleFormChange('contact', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </>
            )}

            {modalType === 'update-stock' && (
              <>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Select Tooling Unit</label>
                  <select
                    required
                    onChange={(e) => handleFormChange('id', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                  >
                    <option value="">-- Choose Catalog Tool --</option>
                    {tools.map((tool) => (
                      <option key={tool.id} value={tool.id}>
                        [{tool.id}] {tool.name} (Current: {tool.quantity})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Additional Restock Quantity</label>
                  <input
                    type="number"
                    required
                    placeholder="10"
                    min="1"
                    onChange={(e) => handleFormChange('addQty', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </>
            )}

            {modalType === 'add-tool' && (
              <>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Tooling Catalog Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diamond Face Mill 2.5 Inch"
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Tool Category</label>
                    <select
                      required
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    >
                      <option value="endmill">Endmill Cutter</option>
                      <option value="drill">Drill Bit</option>
                      <option value="insert">Indexable Insert</option>
                      <option value="coolant">Spindle Coolant</option>
                      <option value="accessory">Calibration/Accessory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Initial Stock Level</label>
                    <input
                      type="number"
                      required
                      placeholder="15"
                      min="0"
                      onChange={(e) => handleFormChange('quantity', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Minimum stock threshold</label>
                    <input
                      type="number"
                      required
                      placeholder="5"
                      min="1"
                      onChange={(e) => handleFormChange('minRequired', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Cabinet / Shelf Location</label>
                    <input
                      type="text"
                      required
                      placeholder="Cabinet B - Shelf 3"
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
              </>
            )}

            {modalType === 'log-inspection' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Checked Part Serial / ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TS-HP4-015"
                      onChange={(e) => handleFormChange('partNumber', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Production Order ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ORD-9081"
                      onChange={(e) => handleFormChange('orderId', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Inspector Name</label>
                    <input
                      type="text"
                      required
                      placeholder="A. Volkov"
                      onChange={(e) => handleFormChange('inspector', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Caliper Tolerance</label>
                    <select
                      required
                      onChange={(e) => handleFormChange('dimensionsStatus', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    >
                      <option value="pass">PASS (Within Spec)</option>
                      <option value="fail">FAIL (Out of Limit)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Surface Polish</label>
                    <select
                      required
                      onChange={(e) => handleFormChange('surfaceFinish', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fail">Fail (Rough Cuts)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Tolerance Deviation (mm)</label>
                  <input
                    type="number"
                    step="0.001"
                    required
                    placeholder="e.g. 0.003"
                    onChange={(e) => handleFormChange('deviationMM', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </>
            )}

            {modalType === 'log-breakdown' && (
              <>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Defective Machine Unit</label>
                  <select
                    required
                    onChange={(e) => {
                      const selectedMachine = machines.find(m => m.id === e.target.value);
                      handleFormChange('machineId', e.target.value);
                      if (selectedMachine) {
                        handleFormChange('machineName', selectedMachine.name);
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                  >
                    <option value="">-- Choose Impacted Unit --</option>
                    {machines.map((machine) => (
                      <option key={machine.id} value={machine.id}>
                        {machine.name} ({machine.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Specific Fault Code / Issue Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. X-Axis ballscrew servo thermal lock. Overloaded spindle encoder."
                    onChange={(e) => handleFormChange('issue', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Reported By</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Operator Marcus"
                      onChange={(e) => handleFormChange('reportedBy', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Estimated Part Repair Cost ($)</label>
                    <input
                      type="number"
                      required
                      placeholder="450"
                      onChange={(e) => handleFormChange('cost', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm font-mono focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg text-xs font-mono transition-colors uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-neon-cyan to-neon-sapphire hover:from-neon-cyan/90 hover:to-neon-sapphire/90 text-white rounded-lg text-xs font-mono font-bold transition-all uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                Execute Instruction
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
