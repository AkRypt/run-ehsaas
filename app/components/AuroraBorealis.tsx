"use client";

import { useEffect } from 'react';

const AuroraBorealis = () => {
    useEffect(() => {
        const createStars = () => {
            const starsContainer = document.getElementById("stars");
            if (!starsContainer) return;

            const fragment = document.createDocumentFragment();
            const starCount = 200;

            for (let i = 0; i < starCount; i++) {
                const star = document.createElement("div");
                star.classList.add("star");
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.opacity = `${Math.random() * 0.5}`;
                fragment.appendChild(star);
            }

            starsContainer.appendChild(fragment);
        };

        createStars();
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="aurora"></div>
            <div className="aurora"></div>
            <div className="aurora"></div>
            <div className="aurora"></div>
            <div className="stars" id="stars"></div>
        </div>
    );
};

export default AuroraBorealis;