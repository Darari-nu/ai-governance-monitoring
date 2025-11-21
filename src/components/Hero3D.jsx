import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

function DataParticles() {
    const groupRef = useRef();
    const scrollRef = useRef(0);

    // Track scroll position
    React.useEffect(() => {
        const handleScroll = () => {
            // Normalize scroll 0 to 1
            scrollRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            const scroll = scrollRef.current;

            // Fly-through effect: Move particles towards camera (Z-axis)
            // Base movement + scroll acceleration
            // Reset position to create infinite loop feel if needed, but for now simple forward movement
            groupRef.current.position.z = scroll * 5; // Move forward 5 units over full scroll

            // Rotation accelerates with scroll
            groupRef.current.rotation.y += delta * (0.05 + scroll * 0.2);

            // Gentle wave motion
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Primary Particles - V15.1 Optimized */}
            <Sparkles
                count={150} // Reduced from 300
                scale={[20, 20, 10]}
                size={6}
                speed={0.4}
                opacity={0.8}
                color="#bae6fd"
                noise={0.2}
            />
            {/* Secondary Particles - V15.1 Optimized */}
            <Sparkles
                count={100} // Reduced from 200
                scale={[25, 25, 15]}
                size={4} // Slightly larger to compensate for lower count
                speed={0.2}
                opacity={0.5}
                color="#ffffff"
                noise={0.3}
            />
        </group>
    );
}

function Hero3D() {
    return (
        <>
            {/* Fixed 3D Background Layer */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                background: '#F8FAFC' // Base background color
            }}>
                {/* Background Image - Fixed */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/hero.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 1.0,
                    zIndex: 0,
                }} />

                {/* 3D Canvas - Fixed Full Screen & Optimized */}
                <Canvas
                    dpr={[1, 2]} // Cap pixel ratio for performance
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                >
                    <ambientLight intensity={0.5} />
                    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                        <DataParticles />
                    </Float>
                </Canvas>
            </div>

            {/* Hero Content - Scrollable (Part of normal flow, but visually positioned over fixed bg) */}
            <div style={{
                height: '80vh',
                width: '100%',
                position: 'relative',
                zIndex: 10, // Above fixed background
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none' // Let clicks pass through to potential interactive elements if any
            }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '5rem',
                    fontWeight: 800,
                    textAlign: 'center',
                    color: '#0F172A',
                    marginBottom: '1rem',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    textShadow: '0 0 40px rgba(255,255,255,1.0), 0 0 20px rgba(255,255,255,0.8)'
                }}>
                    AI Governance<br />Monitor
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#334155',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.75rem 2rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    Global Regulatory Insights<br />
                    <span style={{ fontSize: '1rem', color: 'var(--color-primary)', fontWeight: 600 }}>世界のAI法規制動向</span>
                </p>
            </div>
        </>
    );
}

export default Hero3D;
