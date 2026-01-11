import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PartyPopper } from 'lucide-react';
import './hero-section.css';

const Hero = ({ onCelebrate }) => {
    const launchConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    const handleCelebrate = () => {
        launchConfetti();
        if (onCelebrate) {
            setTimeout(() => {
                onCelebrate();
            }, 2000);
        }
    };

    useEffect(() => {
        launchConfetti();
    }, []);

    return (
        <section className="hero-section">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="hero-content"
            >
                <span className="hero-icon-wrapper">
                    <PartyPopper size={48} className="hero-icon" />
                </span>
                <h1 className="hero-title">
                    Happy Birthday <br /> Nhan Thanh!
                </h1>
                <p className="hero-desc">
                    Chúc bà có một ngày tràn ngập tiếng cười và những khoảnh khắc khó quên. Mong rằng năm nay sẽ đưa bạn đến gần hơn với ước mơ của mình!
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCelebrate}
                    className="celebrate-btn"
                >
                    Celebrate & Open Gift
                </motion.button>
            </motion.div>

            {/* Background Decorative Blobs */}
            <div className="hero-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
        </section>
    );
};

export default Hero;
