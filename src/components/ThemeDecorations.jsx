import React, { useEffect, useState } from 'react';

import ElsaImg from '../assets/Elsa.png';

const ThemeDecorations = () => {
    const [snowflakes, setSnowflakes] = useState([]);
    const [balloons, setBalloons] = useState([]);

    useEffect(() => {
        // 1. Heavy Snow (Elsa's side + Global light drift)
        const flakes = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // All across
            animationDuration: Math.random() * 5 + 3,
            delay: Math.random() * 5,
            opacity: Math.random() * 0.8 + 0.2,
            size: Math.random() * 8 + 4,
            isHeavy: Math.random() < 0.5 // 50% chance to be "Elsa's heavy snow" style
        }));
        setSnowflakes(flakes);

        // 2. Rising Balloons
        const balloonList = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 90 + 5,
            animationDuration: Math.random() * 10 + 10,
            delay: Math.random() * 10,
            color: ['#ffc0cb', '#818cf8', '#fca5a5', '#fcd34d'][Math.floor(Math.random() * 4)],
            scale: Math.random() * 0.5 + 0.5
        }));
        setBalloons(balloonList);
    }, []);

    return (
        <div className="theme-decorations-container">
            {/* Top Bunting Flags */}
            <div className="bunting-container">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="bunting-flag" style={{
                        backgroundColor: i % 2 === 0 ? '#ec4899' : '#8b5cf6',
                        animationDelay: `${i * 0.1}s`
                    }}></div>
                ))}
            </div>

            {/* Falling Snow (Global) */}
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className={`snowflake ${flake.isHeavy ? 'heavy' : 'light'}`}
                    style={{
                        left: `${flake.left}vw`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.delay}s`,
                        opacity: flake.opacity,
                        fontSize: `${flake.size}px`
                    }}
                >
                    ❄
                </div>
            ))}

            {/* Rising Balloons */}
            {balloons.map((b) => (
                <div
                    key={b.id}
                    className="balloon"
                    style={{
                        left: `${b.left}%`,
                        backgroundColor: b.color,
                        animationDuration: `${b.animationDuration}s`,
                        animationDelay: `${b.delay}s`,
                        transform: `scale(${b.scale})`
                    }}
                >
                    <div className="balloon-string"></div>
                </div>
            ))}

            {/* --- ELSA on the RIGHT --- */}
            <div className="character-container snow-white-container">
                <img
                    src={ElsaImg}
                    alt="Elsa"
                    className="character-img elsa-img"
                />
                <div className="magic-glow blue"></div>
            </div>

            {/* --- CENTERPIECE: BIRTHDAY CAKE --- */}
            <div className="cake-container">
                <div className="cake-body">
                    {/* Candles sit on top */}
                    <div className="candles">
                        <div className="candle"><div className="flame"></div></div>
                        <div className="candle center"><div className="flame"></div></div>
                        <div className="candle"><div className="flame"></div></div>
                    </div>

                    {/* Layers from Top to Bottom */}
                    <div className="cake-layer top">
                        <div className="layer-icing"></div>
                        <div className="layer-drips">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    <div className="cake-layer middle">
                        <div className="layer-icing"></div>
                    </div>
                    <div className="cake-layer bottom">
                        <div className="layer-icing"></div>
                    </div>

                    <div className="cake-topper">Happy Birthday</div>
                </div>
            </div>

            {/* Floating Gift Boxes */}
            <div className="gift-box left">🎁</div>
            <div className="gift-box right">🎁</div>
        </div>
    );
};

export default ThemeDecorations;
