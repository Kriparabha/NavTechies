
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { EXPERIENCES, VENDORS } from '../data/mockData';
import { ArrowLeft, MapPin, Clock, Star, MessageCircle, ShieldCheck, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceDetail = () => {
    const { id } = useParams();
    const experience = EXPERIENCES.find(e => e.id === id);
    const vendor = VENDORS.find(v => v.id === experience?.vendorId);
    const [showLanguageHelper, setShowLanguageHelper] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    if (!experience || !vendor) return <div className="container">Loading...</div>;

    const navigate = useNavigate();

    const handleBook = () => {
        // Navigate to checkout
        if (selectedSlot) {
            navigate(`/checkout/${experience.id}`, { state: { selectedSlot } });
        }
    };

    return (
        <div className="container animate-enter" style={{ paddingBottom: '5rem' }}>
            <div style={{ position: 'relative', height: '300px', margin: '-1rem -1rem 1rem -1rem' }}>
                <img src={experience.image} alt={experience.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowLeft size={24} />
                </Link>
            </div>

            <div style={{ padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', lineHeight: '1.2' }}>{experience.title}</h1>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'hsl(var(--color-primary))' }}>₹{experience.price}</span>
                        <p style={{ fontSize: '0.8rem', color: 'hsl(var(--color-text-muted))' }}>per person</p>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={vendor.image} alt={vendor.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid hsl(var(--color-primary))' }} />
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{vendor.name}</h3>
                            {vendor.verified && <ShieldCheck size={16} color="#0d9488" />}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'hsl(var(--color-text-muted))' }}>{vendor.role}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                            <Star size={14} fill="gold" color="gold" />
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{vendor.rating} ({vendor.reviews} reviews)</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>About the Host</h4>
                    <p style={{ lineHeight: '1.6', color: 'hsl(var(--color-text-muted))', marginBottom: '1rem' }}>{vendor.bio}</p>

                    {vendor.contact && (
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href={`tel:${vendor.contact.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'hsl(var(--color-primary))', textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem', background: 'hsl(var(--color-bg-card))', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))' }}>
                                <Phone size={16} /> {vendor.contact.phone}
                            </a>
                            <a href={`mailto:${vendor.contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'hsl(var(--color-primary))', textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem', background: 'hsl(var(--color-bg-card))', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))' }}>
                                <Mail size={16} /> {vendor.contact.email}
                            </a>
                        </div>
                    )}
                </div>

                {experience.highlights && experience.highlights.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>What to Expect</h4>
                        <div style={{ background: 'hsl(var(--color-bg-card))', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {experience.highlights.map((highlight, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px', marginBottom: idx !== experience.highlights.length - 1 ? '0.75rem' : 0 }}>
                                        <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: 'hsl(var(--color-primary))', marginTop: '6px' }}></div>
                                        <span style={{ lineHeight: '1.4', color: 'hsl(var(--color-text-main))' }}>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Meeting Point</h4>
                    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '250px', background: 'hsl(var(--color-bg-card))', position: 'relative' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            src={`https://maps.google.com/maps?q=${experience.location.lat},${experience.location.lng}&z=15&output=embed`}
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="Experience Location"
                        ></iframe>
                    </div>
                </div>

                {/* Language Helper FAB */}
                {/* Language Helper FAB - Always visible now */}
                <div style={{ position: 'fixed', bottom: '90px', right: '20px', zIndex: 10 }}>
                    <button
                        onClick={() => setShowLanguageHelper(true)}
                        className="btn-primary"
                        style={{ borderRadius: '50%', width: '56px', height: '56px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                    >
                        <MessageCircle size={24} />
                    </button>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="glass-panel" style={{
                position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                width: 'calc(100% - 2rem)', maxWidth: '580px', padding: '1rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                backdropFilter: 'blur(16px)', background: 'hsl(var(--color-bg-glass))', zIndex: 5
            }}>
                <div>
                    <p style={{ fontSize: '0.8rem', color: 'hsl(var(--color-text-muted))' }}>Total Price</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹{experience.price}</p>
                </div>
                <button onClick={() => setShowBooking(true)} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                    Instant Book
                </button>
            </div>

            {/* Language Helper Modal */}
            <AnimatePresence>
                {showLanguageHelper && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowLanguageHelper(false)}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="glass-panel"
                            style={{ width: '100%', maxWidth: '400px', padding: '1.5rem', background: 'hsl(var(--color-bg-card))' }}
                        >
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'hsl(var(--color-primary))' }}>Quick Assamese</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {(experience.phrases && experience.phrases.length > 0 ? experience.phrases : [
                                    { original: 'Namaskar', translated: 'Hello', pronunciation: 'nam-as-kar' },
                                    { original: 'Dhonyobaad', translated: 'Thank you', pronunciation: 'dhon-yo-baad' },
                                    { original: 'Ki khobor?', translated: 'How are you?', pronunciation: 'ki kho-bor' }
                                ]).map((phrase, idx) => (
                                    <div key={idx} style={{ padding: '0.75rem', background: 'hsl(var(--color-bg-main))', borderRadius: 'var(--radius-sm)' }}>
                                        <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{phrase.translated}</p>
                                        <p style={{ color: 'hsl(var(--color-primary))', fontSize: '0.9rem' }}>"{phrase.original}"</p>
                                        <p style={{ color: 'hsl(var(--color-text-muted))', fontSize: '0.8rem', fontStyle: 'italic' }}>Pronunciation: {phrase.pronunciation}</p>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setShowLanguageHelper(false)} style={{ marginTop: '1.5rem', width: '100%', padding: '0.75rem', border: '1px solid hsl(var(--color-border))', background: 'transparent', color: 'hsl(var(--color-text-main))', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Booking Modal */}
            <AnimatePresence>
                {showBooking && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowBooking(false)}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'end', justifyContent: 'center' }}
                    >
                        <motion.div
                            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={e => e.stopPropagation()}
                            style={{ width: '100%', maxWidth: '600px', background: 'hsl(var(--color-bg-card))', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '1.5rem 1.5rem 2rem 1.5rem' }}
                        >
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Select a Slot</h3>
                            <p style={{ color: 'hsl(var(--color-text-muted))', marginBottom: '1.5rem' }}>Tomorrow, {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                                {['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'].map(slot => (
                                    <button
                                        key={slot}
                                        onClick={() => setSelectedSlot(slot)}
                                        style={{
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid hsl(var(--color-border))',
                                            background: selectedSlot === slot ? 'hsl(var(--color-primary))' : 'transparent',
                                            color: selectedSlot === slot ? 'hsl(var(--color-bg-main))' : 'hsl(var(--color-text-main))',
                                            fontWeight: selectedSlot === slot ? '600' : '400',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleBook}
                                className="btn-primary"
                                style={{ width: '100%', opacity: selectedSlot ? 1 : 0.5, pointerEvents: selectedSlot ? 'all' : 'none' }}
                            >
                                Confirm Booking
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExperienceDetail;
