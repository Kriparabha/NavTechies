
import React from 'react';
import { MapPin, Clock, BadgeCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExperienceCard = ({ experience, vendor }) => {
    // Get crowd level color
    const getCrowdColor = (level) => {
        switch (level) {
            case 'low': return '#10b981'; // Green
            case 'moderate': return '#f59e0b'; // Amber
            case 'high': return '#ef4444'; // Red
            default: return '#6b7280';
        }
    };

    const getCrowdLabel = (level) => {
        switch (level) {
            case 'low': return 'Best time to visit';
            case 'moderate': return 'Moderate crowd';
            case 'high': return 'High crowd';
            default: return '';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ opacity: 0.7, scale: 0.98 }}
            className="glass-panel"
            style={{ overflow: 'hidden', position: 'relative', marginBottom: '1.5rem', cursor: 'pointer' }}
        >
            <Link to={`/experience/${experience.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', height: '200px' }}>
                    <img
                        src={experience.image}
                        alt={experience.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '500', color: '#fff' }}>₹{experience.price}</span>
                    </div>
                    {vendor.verified && (
                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.9)', color: '#000', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                            <BadgeCheck size={14} color="#0d9488" /> Verified Host
                        </div>
                    )}
                </div>

                <div style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.3' }}>{experience.title}</h3>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', color: 'hsl(var(--color-text-muted))', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={16} />
                            <span>{experience.duration}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={16} />
                            <span>{vendor.location}</span>
                        </div>
                    </div>

                    {/* Footfall Indicator */}
                    {experience.crowdLevel && (
                        <div style={{
                            marginTop: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-md)',
                            background: `${getCrowdColor(experience.crowdLevel)}15`,
                            width: 'fit-content'
                        }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: getCrowdColor(experience.crowdLevel)
                            }}></div>
                            <span style={{
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                color: getCrowdColor(experience.crowdLevel)
                            }}>
                                {getCrowdLabel(experience.crowdLevel)}
                            </span>
                            <span style={{
                                fontSize: '0.75rem',
                                color: 'hsl(var(--color-text-muted))',
                                marginLeft: '4px'
                            }}>
                                • {experience.bestTimeToVisit}
                            </span>
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

export default ExperienceCard;
