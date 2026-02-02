
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { EXPERIENCES, VENDORS } from '../data/mockData';
import { ArrowLeft, MapPin, Clock, Star, Languages, ShieldCheck, Phone, Mail, ExternalLink } from 'lucide-react';
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

                    {/* Book Now Button in Vendor Card */}
                    <button
                        onClick={() => {
                            setShowBooking(true);
                            // Scroll to booking section
                            setTimeout(() => {
                                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                            }, 100);
                        }}
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginTop: '1rem',
                            background: 'hsl(var(--color-primary))',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        Book Now
                    </button>
                </div>

                {/* Language/Phrases Button - Separate Card */}
                <div className="glass-panel" style={{ padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setShowLanguageHelper(true)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: 'transparent',
                            color: 'hsl(var(--color-text-main))',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'hsl(var(--color-bg-main))'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <Languages size={20} />
                        Common Phrases
                    </button>
                </div>

                {/* Footfall Indicator */}
                {experience.crowdLevel && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-md)',
                            background: `${experience.crowdLevel === 'low' ? '#10b981' :
                                experience.crowdLevel === 'moderate' ? '#f59e0b' :
                                    '#ef4444'
                                }15`,
                            width: 'fit-content'
                        }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: experience.crowdLevel === 'low' ? '#10b981' :
                                    experience.crowdLevel === 'moderate' ? '#f59e0b' :
                                        '#ef4444'
                            }}></div>
                            <span style={{
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: experience.crowdLevel === 'low' ? '#10b981' :
                                    experience.crowdLevel === 'moderate' ? '#f59e0b' :
                                        '#ef4444'
                            }}>
                                {experience.crowdLevel === 'low' ? 'Best time to visit' :
                                    experience.crowdLevel === 'moderate' ? 'Moderate crowd' :
                                        'High crowd'}
                            </span>
                            <span style={{
                                fontSize: '0.85rem',
                                color: 'hsl(var(--color-text-muted))',
                                marginLeft: '4px'
                            }}>
                                • {experience.bestTimeToVisit}
                            </span>
                        </div>
                    </div>
                )}

                {/* Learn More Button */}
                {experience.infoUrl && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <a
                            href={experience.infoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 16px',
                                borderRadius: 'var(--radius-md)',
                                background: 'hsl(var(--color-primary))',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.2s ease',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            <ExternalLink size={18} />
                            Learn More
                        </a>
                    </div>
                )}

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
