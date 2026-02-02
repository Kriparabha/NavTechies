
import React, { useState } from 'react';
import { Upload, MapPin, DollarSign, User, Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate('/merchant-dashboard');
        }, 1500);
    };

    return (
        <div className="container animate-enter" style={{ paddingTop: '2rem' }}>
            <div className="onboarding-layout">
                <div className="onboarding-intro">
                    <h1 className="text-gradient" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1.1 }}>Join as Artisan</h1>
                    <p style={{ color: 'hsl(var(--color-text-muted))', marginBottom: '2rem' }}>Share your craft with the world and connect with mindful travelers.</p>
                </div>

                <div className="onboarding-form-section">
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                        <div className="glass-panel onboarding-card" style={{ padding: '1.5rem' }}>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                                    <User size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                                    <input required type="text" placeholder="e.g. Biren Kalita" style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Craft / Service</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                                    <Hammer size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                                    <select style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}>
                                        <option value="weaving">Weaving</option>
                                        <option value="pottery">Pottery</option>
                                        <option value="guide">Tour Guide</option>
                                        <option value="food">Culinary</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price per Slot</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                                    <DollarSign size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                                    <input required type="number" placeholder="350" style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                                    <MapPin size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                                    <input required type="text" placeholder="e.g. Sualkuchi" style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Identity Verification</label>
                                <div style={{ border: '2px dashed hsl(var(--color-border))', borderRadius: 'var(--radius-md)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'hsl(var(--color-bg-main))' }}>
                                    <Upload size={24} color="hsl(var(--color-primary))" style={{ marginBottom: '0.5rem' }} />
                                    <span style={{ fontSize: '0.9rem', color: 'hsl(var(--color-text-muted))' }}>Click to upload ID proof</span>
                                </div>
                            </div>

                        </div>

                        <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            {loading ? 'Submitting...' : 'Join Platform'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
