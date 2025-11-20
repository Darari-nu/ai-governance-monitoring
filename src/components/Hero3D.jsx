import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleField(props) {
    const ref = useRef();
    const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#0EA5E9"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

function Hero3D() {
    return (
        <div style={{ height: '60vh', width: '100%', position: 'relative', background: 'white' }}>
            {/* Background Image Layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/hero.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3,
                zIndex: 0
            }} />

            {/* Content Layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.8) 100%)'
            }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    color: '#0F172A',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                }}>
                    AI Governance Monitor
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#475569',
                    textAlign: 'center'
                }}>
                    Global Regulatory Insights<br />
                    <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>世界のAI法規制動向</span>
                </p>
            </div>

            {/* 3D Layer */}
            <Canvas camera={{ position: [0, 0, 1] }} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <ParticleField />
                </Float>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}

export default Hero3D;
