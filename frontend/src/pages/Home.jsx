
import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryTabs from '../components/CategoryTabs';
import ExperienceCard from '../components/ExperienceCard';
import { EXPERIENCES, VENDORS } from '../data/mockData';

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
        <div className="container animate-enter">
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
    );
};

export default Home;
