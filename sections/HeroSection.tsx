"use client";

import { bangers, bonheurRoyale, cinzel, dancingScript, darumadropOne, domine, eduAUVicWaNtHand, indieFlower, marcellus, montserratAlternates, silkscreen } from "@/app/fonts";
import Image from "next/image"
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [smokeCircles, setSmokeCircles] = useState<number[]>([]);

    useEffect(() => {
        setSmokeCircles(Array.from({ length: 50 }, (_, i) => i + 1));
    }, []);

    useEffect(() => {
        const canvas: any = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Particle configuration
        const particles: Particle[] = [];
        const particleCount = 30; // Reduced number of particles

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = `rgba(250, ${Math.random() * 100}, ${50 + Math.random() * 50}, 0.8)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgb(0, 0, 0)');
            gradient.addColorStop(0.5, 'rgb(50, 0, 0)');
            gradient.addColorStop(1, 'rgb(67, 5, 67)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);


    return (
        <section className="relative w-full h-screen">


            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />


            <div className="hidden md:block">
                {smokeCircles.map((index) => (
                    <div
                        key={index}
                        className="smoke-circle"
                        style={{
                            width: `${index * 6}px`,
                            height: `${index * 2}px`,
                            right: `${index * 30}px`,
                            bottom: `${index * 14}px`,
                            filter: `blur(${index / 3 + 8}px)`,
                            transformOrigin: `${index * 6}px ${index * 2}px`,
                            animation: `spin 4s ${index / 14}s linear infinite`,
                            background: `rgba(${250}, ${0 + (index * 2)}, ${50 + (index * 1)}, ${1 - (index / 40)})`,
                        }}
                    />
                ))}
            </div>


            {/* <div className="absolute w-full h-screen bg-[#332B33]"> */}
            {/* Hero Image with Overlay */}
            {/* <Image
                    src="/images/ehsaas-hero.jpg"
                    alt="Dance Team Hero"
                    fill
                    priority
                    className="object-cover"
                /> */}
            {/* Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-red-900/60" /></div > */}

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4" >
                {/* Text Content */}
                < h2 className={`text-2xl font-bold md:text-4xl text-white mb-4 text-center
                [text-shadow:_3px_3px_0_rgb(220_38_38),_6px_6px_0_rgba(0,0,0,0.2)]
                `}>RU-N</h2>

                <h1 className={`${marcellus.className} text-5xl md:text-9xl font-bold text-white mb-4 text-center
                [text-shadow:_3px_3px_0_rgb(220_38_38),_6px_6px_0_rgba(0,0,0,0.2)]
                `}>
                    ehsaas
                </h1>

                <p className={`${montserratAlternates.className} text-md md:text-2xl text-gray-200 max-w-2xl text-center mb-8 animate-slide-up-delayed`}>
                    Dance to Live, Live to Dance
                </p>
            </div>
        </section>
    )
}

export default HeroSection;