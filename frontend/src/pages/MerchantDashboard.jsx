
import React from 'react';
import { LayoutDashboard, Users, TrendingUp, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const MerchantDashboard = () => {
    return (
        <div className="container animate-enter" style={{ paddingTop: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Hello, Biren 👋</h1>
                    <p style={{ color: 'hsl(var(--color-text-muted))' }}>Merchant Dashboard</p>
                </div>
                <div className="btn-icon">
                    <Bell size={20} />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: 'red', borderRadius: '50%' }}></div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(13, 148, 136, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <Users size={20} color="#0d9488" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>12</h3>
                    <p style={{ fontSize: '0.8rem', color: 'hsl(var(--color-text-muted))' }}>New Requests</p>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <TrendingUp size={20} color="#eab308" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>₹8.5k</h3>
                    <p style={{ fontSize: '0.8rem', color: 'hsl(var(--color-text-muted))' }}>Earnings</p>
                </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Bookings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel"
                        style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333', overflow: 'hidden' }}>
                                <img src={`https://ui-avatars.com/api/?name=Guest+${i}&background=random`} alt="Guest" />
                            </div>
                            <div>
                                <p style={{ fontWeight: '600' }}>Guest #{i}</p>
                                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--color-text-muted))' }}>Today, 2:00 PM</p>
                            </div>
                        </div>
                        <button style={{ padding: '0.5rem 1rem', background: 'hsl(var(--color-primary))', color: 'black', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>
                            Accept
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MerchantDashboard;
