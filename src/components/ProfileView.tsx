import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Briefcase, Award, ShieldAlert, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function ProfileView({ profile, onUpdateProfile }: ProfileViewProps) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [department, setDepartment] = useState(profile.department);
  const [role, setRole] = useState(profile.role);
  const [avatar, setAvatar] = useState(profile.avatar);

  const [criticalAlerts, setCriticalAlerts] = useState(profile.notificationSettings.criticalAlerts);
  const [productionUpdates, setProductionUpdates] = useState(profile.notificationSettings.productionUpdates);
  const [maintenanceReminders, setMaintenanceReminders] = useState(profile.notificationSettings.maintenanceReminders);

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email,
      phone,
      department,
      role,
      avatar,
      badgeNo: profile.badgeNo,
      notificationSettings: {
        criticalAlerts,
        productionUpdates,
        maintenanceReminders
      }
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header controls */}
      <div>
        <h2 className="text-2xl font-extrabold font-display tracking-tight text-white uppercase">
          Operator Profile & System Settings
        </h2>
        <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-1">
          Identity credentials • Critical notification nodes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Quick Identity card */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-between text-center relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 ambient-glow-1 opacity-20 pointer-events-none" />
          
          <div className="space-y-4">
            <img
              src={avatar}
              alt={name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-neon-cyan/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] mt-4"
            />
            <div>
              <h3 className="font-bold font-display text-lg text-white">{name}</h3>
              <p className="text-xs text-neon-cyan font-mono mt-0.5">{profile.badgeNo}</p>
            </div>
            
            <div className="inline-block px-3 py-1 bg-slate-950/60 border border-white/5 rounded-full text-[10px] font-mono text-gray-400 uppercase tracking-wider">
              {role}
            </div>
          </div>

          <div className="border-t border-white/5 w-full mt-6 pt-5 space-y-2 text-left text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">Department:</span>
              <span className="text-white truncate max-w-[150px]">{department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="text-white truncate max-w-[150px]">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Contact Secure:</span>
              <span className="text-white">{phone}</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl space-y-6">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2">
              <User className="w-4 h-4 text-neon-cyan" />
              Administrative Identity parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Director Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Primary Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Direct Contact Phone</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Division / Department</label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Designation Role</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Avatar URL Image</label>
                <input
                  type="text"
                  required
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>
            </div>

            {/* Notifications segment */}
            <div className="space-y-4 border-t border-white/5 pt-5">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-neon-cyan" />
                Live Notification Parameters
              </h3>

              <div className="space-y-2.5">
                <label className="flex items-center gap-3 p-3 bg-slate-950/30 hover:bg-slate-950/45 rounded-xl border border-white/5 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={criticalAlerts}
                    onChange={(e) => setCriticalAlerts(e.target.checked)}
                    className="w-4 h-4 rounded text-neon-cyan focus:ring-neon-cyan bg-slate-950 border-white/10"
                  />
                  <div>
                    <span className="block text-xs font-mono uppercase font-bold text-white tracking-wide">Critical thermal alarms & spindle emergency stops</span>
                    <span className="text-[10px] text-gray-500 font-sans block">Notify Director immediately upon thermal locking over 85°C.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-950/30 hover:bg-slate-950/45 rounded-xl border border-white/5 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productionUpdates}
                    onChange={(e) => setProductionUpdates(e.target.checked)}
                    className="w-4 h-4 rounded text-neon-cyan focus:ring-neon-cyan bg-slate-950 border-white/10"
                  />
                  <div>
                    <span className="block text-xs font-mono uppercase font-bold text-white tracking-wide">Contract batches & sales order completions</span>
                    <span className="text-[10px] text-gray-500 font-sans block">Notify when part counts are completed by Metrology.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-950/30 hover:bg-slate-950/45 rounded-xl border border-white/5 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintenanceReminders}
                    onChange={(e) => setMaintenanceReminders(e.target.checked)}
                    className="w-4 h-4 rounded text-neon-cyan focus:ring-neon-cyan bg-slate-950 border-white/10"
                  />
                  <div>
                    <span className="block text-xs font-mono uppercase font-bold text-white tracking-wide">Planned lubrication & ballscrew alignment reminders</span>
                    <span className="text-[10px] text-gray-500 font-sans block">Trigger reminders when machine runtimes hit 500 hour thresholds.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center border-t border-white/5 pt-5">
              {isSaved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <CheckCircle className="w-4 h-4" /> Profile updated successfully!
                </div>
              )}
              <div className="flex-1 text-right">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-neon-cyan to-neon-sapphire hover:from-neon-cyan/90 hover:to-neon-sapphire/90 text-white rounded-lg text-xs font-mono font-bold uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer tracking-wider"
                >
                  Save settings
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
