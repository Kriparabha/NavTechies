import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { EXPERIENCES } from '../data/mockData';
import { QrCode, CheckCircle, Home, Calendar, Clock, CreditCard, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const experience = EXPERIENCES.find(e => e.id === id);
    const selectedSlot = location.state?.selectedSlot || '10:00 AM'; // Fallback for direct access

    const [step, setStep] = useState(1); // 1: Details, 2: Success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});

    if (!experience) return <div className="container" style={{ paddingTop: '5rem' }}>Loading...</div>;

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePay = () => {
        if (validate()) {
            // Simulate API call
            setTimeout(() => {
                setStep(2);
            }, 1000);
        }
    };

    return (
        <div className="container animate-enter" style={{ minHeight: '100vh', paddingTop: '1rem', paddingBottom: '2rem' }}>

            {/* Header / Back */}
            {step === 1 && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--color-text-main))', display: 'flex', alignItems: 'center' }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginLeft: '1rem' }}>Confirm Booking</h1>
                </div>
            )}

            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        {/* Order Summary Card */}
                        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                            <img
                                src={experience.image}
                                alt={experience.title}
                                style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                            />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{experience.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--color-text-muted))', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                    <Calendar size={14} />
                                    <span>Tomorrow, {new Date().toLocaleDateString()}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--color-text-muted))', fontSize: '0.9rem' }}>
                                    <Clock size={14} />
                                    <span>{selectedSlot} • {experience.duration}</span>
                                </div>
                            </div>
                        </div>

                        {/* User Details Form */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Guest Details</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--color-text-muted))' }}>Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="glass-panel"
                                        style={{ width: '100%', padding: '0.75rem', color: 'hsl(var(--color-text-main))', outline: 'none', border: errors.name ? '1px solid #ef4444' : '1px solid hsl(var(--color-border))' }}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.name}</span>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--color-text-muted))' }}>Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="glass-panel"
                                        style={{ width: '100%', padding: '0.75rem', color: 'hsl(var(--color-text-main))', outline: 'none', border: errors.email ? '1px solid #ef4444' : '1px solid hsl(var(--color-border))' }}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.email}</span>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--color-text-muted))' }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="glass-panel"
                                        style={{ width: '100%', padding: '0.75rem', color: 'hsl(var(--color-text-main))', outline: 'none', border: errors.phone ? '1px solid #ef4444' : '1px solid hsl(var(--color-border))' }}
                                        placeholder="+91 98765 43210"
                                    />
                                    {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.phone}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Payment Section (Mock) */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Payment</h3>
                            <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'orange' }}></div>
                                    </div>
                                    <span>UPI / GPay</span>
                                </div>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '5px solid hsl(var(--color-primary))' }}></div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'hsl(var(--color-bg-main))', borderTop: '1px solid hsl(var(--color-border))', display: 'flex', justifyContent: 'center' }}>
                            <button
                                onClick={handlePay}
                                className="btn-primary"
                                style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <span>Pay ₹{experience.price}</span>
                                <span style={{ opacity: 0.8 }}>Proceed <CreditCard size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} /></span>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2" // Success Step
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring' }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '2rem' }}
                    >
                        <div style={{ width: '80px', height: '80px', background: 'hsl(var(--color-primary))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                            <CheckCircle size={40} color="white" />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Booking Confirmed!</h1>
                        <p style={{ color: 'hsl(var(--color-text-muted))', marginBottom: '2rem' }}>You're going to {experience.title}</p>

                        <div className="glass-panel" style={{ padding: '2rem', background: 'white', borderRadius: '24px', marginBottom: '2rem' }}>
                            <QrCode size={180} color="black" />
                            <p style={{ color: 'black', marginTop: '1rem', fontFamily: 'monospace', fontWeight: '600' }}>TOKEN: AS-{Math.floor(Math.random() * 1000)}-XJ9</p>
                        </div>

                        <p style={{ color: 'hsl(var(--color-text-muted))', marginBottom: '2rem', maxWidth: '300px' }}>
                            Show this QR code to the host {formData.name} upon arrival. Have a wonderful experience!
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
                            <button
                                onClick={() => navigate(`/feedback/${id}`)}
                                className="btn-primary"
                            >
                                Finish Experience & Review
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                style={{ background: 'transparent', border: '1px solid hsl(var(--color-border))', color: 'hsl(var(--color-text-main))', padding: '0.75rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <Home size={18} /> Return Home
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Checkout;
