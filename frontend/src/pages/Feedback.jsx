
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EXPERIENCES } from '../data/mockData';
import { Star, Send } from 'lucide-react';

const Feedback = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const experience = EXPERIENCES.find(e => e.id === id);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleSubmit = () => {
        // Submit logic
        navigate('/');
    };

    if (!experience) return <div>Loading...</div>;

    return (
        <div className="container animate-enter" style={{ paddingTop: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>How was it?</h2>
            <p style={{ color: 'hsl(var(--color-text-muted))', marginBottom: '2rem' }}>Rate your experience at {experience.title}</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(rating)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', transform: hover >= star ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.1s' }}
                    >
                        <Star
                            size={40}
                            fill={star <= (hover || rating) ? "gold" : "transparent"}
                            color={star <= (hover || rating) ? "gold" : "hsl(var(--color-border))"}
                        />
                    </button>
                ))}
            </div>

            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem' }}>
                <textarea
                    placeholder="Tell us what you liked..."
                    style={{ width: '100%', minHeight: '100px', background: 'transparent', border: 'none', color: 'hsl(var(--color-text-main))', outline: 'none', resize: 'none', fontSize: '1rem' }}
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: rating === 0 ? 0.5 : 1 }}
            >
                Submit Review <Send size={18} />
            </button>
        </div>
    );
};

export default Feedback;
