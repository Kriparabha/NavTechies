
import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryTabs from '../components/CategoryTabs';
import ExperienceCard from '../components/ExperienceCard';
import { EXPERIENCES, VENDORS } from '../data/mockData';
import bihuDanceArt from '../assets/images/bihu_dance_art.png';
import potteryArt from '../assets/images/pottery_art.png';
import weavingPatterns from '../assets/images/weaving_patterns.png';
import traditionalMasks from '../assets/images/traditional_masks.png';
import bambooCrafts from '../assets/images/bamboo_crafts.png';
import sattriyaDance from '../assets/images/sattriya_dance.png';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeTime, setActiveTime] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredExperiences = EXPERIENCES.filter(exp => {
        // Filter by Search
        if (searchQuery && !exp.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        // Filter by Category
        if (activeCategory !== 'all' && exp.category !== activeCategory) {
            return false;
        }
        // Filter by Time (Time logic: show experiences roughly matching or less than selected time, or just exact match?
        // User requested "categorized by time". Let's do exact match for simplicity or "up to".
        // Let's do exact match as they are "30m", "60m".
        if (activeTime !== 'all' && exp.duration !== activeTime) {
            return false;
        }
        return true;
    });

    return (
        <div className="container animate-enter" style={{ position: 'relative' }}>
            {/* Hero Art Showcase - Background Layer */}
            <div style={{
                position: 'absolute',
                top: '-2rem',
                left: '-1rem',
                right: '-1rem',
                height: '550px',
                overflow: 'hidden',
                zIndex: 0,
                pointerEvents: 'none'
            }}>
                {/* Gradient Overlay for Text Readability */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--color-bg-main) / 0.7) 50%, hsl(var(--color-bg-main)) 100%)',
                    zIndex: 2
                }}></div>

                {/* Floating Art Cards */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {/* Bihu Dance - Top Left */}
                    <div className="float-animation" style={{
                        position: 'absolute',
                        top: '20px',
                        left: '15%',
                        width: '140px',
                        height: '140px',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        opacity: 0.85,
                        animation: 'float 6s ease-in-out infinite'
                    }}>
                        <img src={bihuDanceArt} alt="Bihu Dance" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Pottery - Top Right */}
                    <div className="float-animation" style={{
                        position: 'absolute',
                        top: '40px',
                        right: '20%',
                        width: '120px',
                        height: '120px',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        opacity: 0.8,
                        animationDelay: '1s'
                    }}>
                        <img src={potteryArt} alt="Pottery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Weaving - Middle Left */}
                    <div className="float-animation" style={{
                        position: 'absolute',
                        top: '180px',
                        left: '20%',
                        width: '110px',
                        height: '110px',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        opacity: 0.75,
                        animationDelay: '2s'
                    }}>
                        <img src={weavingPatterns} alt="Weaving" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Masks - Middle Center-Right */}
                    <div className="float-animation" style={{
                        position: 'absolute',
                        top: '160px',
                        right: '25%',
                        width: '130px',
                        height: '130px',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        opacity: 0.85,
                        animationDelay: '3s'
                    }}>
                        <img src={traditionalMasks} alt="Traditional Masks" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Bamboo - Bottom Left */}
                    <div className="float-animation" style={{
                        position: 'absolute',
                        bottom: '80px',
                        left: '22%',
                        width: '125px',
                        height: '125px',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        opacity: 0.7,
                        animationDelay: '4s'
                    }}>
                        <img src={bambooCrafts} alt="Bamboo Crafts" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Sattriya Dance - Bottom Right */}
                    <div className="float-animation" style={{
                        position: 'absolute',
                        bottom: '100px',
                        right: '20%',
                        width: '135px',
                        height: '135px',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        opacity: 0.8,
                        animationDelay: '5s'
                    }}>
                        <img src={sattriyaDance} alt="Sattriya Dance" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>

            {/* Main Content - Foreground Layer */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Header
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <CategoryTabs
                    activeTime={activeTime}
                    onTimeChange={setActiveTime}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Experiences</h2>
                    <span style={{ fontSize: '0.8rem', color: 'hsl(var(--color-primary))' }}>{filteredExperiences.length} found</span>
                </div>

                <div className="experiences-grid">
                    {filteredExperiences.length > 0 ? (
                        filteredExperiences.map(exp => {
                            const vendor = VENDORS.find(v => v.id === exp.vendorId);
                            return <ExperienceCard key={exp.id} experience={exp} vendor={vendor} />;
                        })
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'hsl(var(--color-text-muted))', gridColumn: '1 / -1' }}>
                            <p>No experiences found for this time slot.</p>
                            <button
                                onClick={() => setActiveTime('240m')} // Suggestion
                                style={{ marginTop: '1rem', color: 'hsl(var(--color-primary))', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Try 240m?
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
