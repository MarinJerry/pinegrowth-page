import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleNetwork({ count = 100 }) {
    const mesh = useRef();

    // Generate random particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            temp.push({ x, y, z, vx: (Math.random() - 0.5) * 0.01, vy: (Math.random() - 0.5) * 0.01, vz: (Math.random() - 0.5) * 0.01 });
        }
        return temp;
    }, [count]);

    const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);
    const pointsGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    useFrame((state) => {
        // Update particle positions
        particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.z += particle.vz;

            // Bounce off "walls" (keep them loosely contained)
            if (Math.abs(particle.x) > 5) particle.vx *= -1;
            if (Math.abs(particle.y) > 5) particle.vy *= -1;
            if (Math.abs(particle.z) > 5) particle.vz *= -1;
        });

        // Update Points
        const positions = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;
        });
        pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Calculate Connections
        const linePositions = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dz = particles[i].z - particles[j].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < 1.5) { // Connection threshold
                    linePositions.push(particles[i].x, particles[i].y, particles[i].z);
                    linePositions.push(particles[j].x, particles[j].y, particles[j].z);
                }
            }
        }
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return (
        <group ref={mesh}>
            <points geometry={pointsGeometry}>
                <pointsMaterial size={0.08} color="#14b8a6" transparent opacity={0.8} sizeAttenuation />
            </points>
            <lineSegments geometry={linesGeometry}>
                <lineBasicMaterial color="#14b8a6" transparent opacity={0.25} linewidth={2} />
            </lineSegments>
        </group>
    );
}

function Loader() {
    return (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="text-teal-500">Cargando...</div>
        </div>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-white">
            <Suspense fallback={<Loader />}>
                <Canvas 
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    gl={{ antialias: true, alpha: false }}
                    dpr={[1, 2]}
                    onCreated={({ gl }) => {
                        gl.setClearColor('#ffffff');
                    }}
                >
                    <fog attach="fog" args={['#ffffff', 5, 20]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <ParticleNetwork count={80} />
                </Canvas>
            </Suspense>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"></div>
        </div>
    );
}
