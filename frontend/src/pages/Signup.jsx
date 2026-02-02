import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Building2, Tag } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('visitor'); // 'visitor' | 'merchant'
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (userType === 'merchant') {
                navigate('/onboarding'); // Redirect to detailed onboarding for merchants
            } else {
                navigate('/');
            }
        }, 1500);
    };

    return (
        <div className="container animate-enter" style={{ paddingTop: '3rem', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Create Account</h1>
                <p style={{ color: 'hsl(var(--color-text-muted))' }}>Join the community of explorers & creators.</p>
            </div>

            <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', borderRadius: 'var(--radius-full)', marginBottom: '2rem', background: 'hsl(var(--color-bg-card))' }}>
                <button
                    onClick={() => setUserType('visitor')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-full)',
                        background: userType === 'visitor' ? 'hsl(var(--color-primary))' : 'transparent',
                        color: userType === 'visitor' ? 'hsl(var(--color-bg-main))' : 'hsl(var(--color-text-muted))',
                        fontWeight: userType === 'visitor' ? '600' : '400',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <User size={18} /> Visitor
                </button>
                <button
                    onClick={() => setUserType('merchant')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-full)',
                        background: userType === 'merchant' ? 'hsl(var(--color-primary))' : 'transparent',
                        color: userType === 'merchant' ? 'hsl(var(--color-bg-main))' : 'hsl(var(--color-text-muted))',
                        fontWeight: userType === 'merchant' ? '600' : '400',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Briefcase size={18} /> Merchant
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                            <User size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                            <input required type="text" placeholder="e.g. John Doe" style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-text-main))', width: '100%', outline: 'none' }} />
                        </div>
                    </div>

                    {userType === 'merchant' && (
                        <>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Business Name</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                                    <Building2 size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                                    <input required type="text" placeholder="e.g. Silk Weavers Co." style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-text-main))', width: '100%', outline: 'none' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                                    <Tag size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                                    <select style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-text-main))', width: '100%', outline: 'none' }}>
                                        <option value="craft" style={{ background: '#fff', color: '#000' }}>Crafts</option>
                                        <option value="food" style={{ background: '#fff', color: '#000' }}>Food & Culinary</option>
                                        <option value="tour" style={{ background: '#fff', color: '#000' }}>Tours & Guide</option>
                                        <option value="heritage" style={{ background: '#fff', color: '#000' }}>Heritage</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                            <Mail size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                            <input required type="email" placeholder="you@example.com" style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-text-main))', width: '100%', outline: 'none' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-main))', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                            <Lock size={18} color="hsl(var(--color-text-muted))" style={{ marginRight: '0.5rem' }} />
                            <input required type="password" placeholder="••••••••" style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-text-main))', width: '100%', outline: 'none' }} />
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p style={{ textAlign: 'center', color: 'hsl(var(--color-text-muted))', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'hsl(var(--color-primary))', fontWeight: '600' }}>Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
