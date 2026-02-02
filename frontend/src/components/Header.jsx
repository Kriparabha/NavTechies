
import React from 'react';
import { Search, Filter, Sun, Moon } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const Header = ({ activeCategory, onCategoryChange, searchQuery, onSearchChange }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingTop: '1rem' }}>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '1.75rem', fontWeight: '800' }}>Discover</h1>
                    <p style={{ color: 'hsl(var(--color-text-muted))', fontSize: '0.9rem' }}>Micro-experiences nearby</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                        onClick={toggleTheme}
                        className="btn-icon"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    {/* Auth Buttons */}
                    <a href="/login" style={{ textDecoration: 'none', color: 'hsl(var(--color-text-main))', fontWeight: '500', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Sign In</a>
                    <a href="/signup" style={{ textDecoration: 'none', color: 'hsl(var(--color-primary))', fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Sign Up</a>
                </div>
            </header>

            <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <Search size={20} color="hsl(var(--color-text-muted))" style={{ marginLeft: '0.5rem' }} />
                <input
                    type="text"
                    placeholder="Search places..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'hsl(var(--color-text-main))',
                        width: '100%',
                        padding: '0.5rem',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />

            </div>

            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                <button
                    onClick={() => onCategoryChange('all')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid hsl(var(--color-border))',
                        background: activeCategory === 'all' ? 'hsl(var(--color-primary))' : 'hsl(var(--color-bg-card))',
                        color: activeCategory === 'all' ? 'hsl(var(--color-bg-main))' : 'hsl(var(--color-text-muted))',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        fontWeight: activeCategory === 'all' ? '600' : '400',
                        transition: 'all var(--transition-fast)'
                    }}
                >
                    All
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid hsl(var(--color-border))',
                            background: activeCategory === cat.id ? 'hsl(var(--color-primary))' : 'hsl(var(--color-bg-card))',
                            color: activeCategory === cat.id ? 'hsl(var(--color-bg-main))' : 'hsl(var(--color-text-muted))',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            fontWeight: activeCategory === cat.id ? '600' : '400',
                            transition: 'all var(--transition-fast)'
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Header;
