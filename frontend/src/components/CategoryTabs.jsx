
import React from 'react';
import { TIME_SLOTS } from '../data/mockData';

const CategoryTabs = ({ activeTime, onTimeChange }) => {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', background: 'hsl(var(--color-bg-card))', padding: '4px', borderRadius: 'var(--radius-full)' }}>
                <button
                    onClick={() => onTimeChange('all')}
                    style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        background: activeTime === 'all' ? 'hsl(var(--color-bg-glass))' : 'transparent',
                        color: activeTime === 'all' ? 'hsl(var(--color-primary))' : 'hsl(var(--color-text-muted))',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: activeTime === 'all' ? '600' : '400',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        lineHeight: '1.2'
                    }}
                >
                    <span>All</span>
                </button>
                {TIME_SLOTS.map(slot => (
                    <button
                        key={slot.id}
                        onClick={() => onTimeChange(slot.id)}
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: activeTime === slot.id ? 'hsl(var(--color-bg-glass))' : 'transparent',
                            color: activeTime === slot.id ? 'hsl(var(--color-primary))' : 'hsl(var(--color-text-muted))',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: activeTime === slot.id ? '600' : '400',
                            transition: 'all var(--transition-fast)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            lineHeight: '1.2'
                        }}
                    >
                        <span>{slot.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryTabs;
