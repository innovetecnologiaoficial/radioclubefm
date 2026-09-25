import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeRadioVisualsProps {
  isPlaying: boolean;
}

export default function ThreeRadioVisuals({ isPlaying }: ThreeRadioVisualsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff3b56, 2.5);
    dirLight.position.set(10, 15, 20);
    scene.add(dirLight);

    const pointLightBlue = new THREE.PointLight(0x00c2ff, 3, 50);
    pointLightBlue.position.set(-15, -8, 10);
    scene.add(pointLightBlue);

    const pointLightAmber = new THREE.PointLight(0xffb800, 2.5, 45);
    pointLightAmber.position.set(15, -10, 8);
    scene.add(pointLightAmber);

    // 3. Central 3D Heart Shape ("A Rádio do Coração")
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 2.5, y + 2.5);
    heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2.0, y, x, y);
    heartShape.bezierCurveTo(x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5);
    heartShape.bezierCurveTo(x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5);
    heartShape.bezierCurveTo(x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5);
    heartShape.bezierCurveTo(x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y);
    heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.6,
      bevelThickness: 0.6,
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center();

    const heartMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff1e38,
      emissive: 0x550011,
      roughness: 0.25,
      metalness: 0.35,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.92,
    });

    const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    heartMesh.scale.set(0.65, 0.65, 0.65);
    heartMesh.rotation.z = Math.PI; // Flip heart right side up
    heartMesh.position.set(6, 1, -2);
    scene.add(heartMesh);

    // 4. Concentric Sound / Radio Waves Rings
    const waveRings: THREE.Mesh[] = [];
    const ringColors = [0xff2a48, 0x00c2ff, 0xffb800, 0xff1e38, 0x3b82f6];

    for (let i = 0; i < 5; i++) {
      const radius = 6 + i * 2.2;
      const ringGeo = new THREE.TorusGeometry(radius, 0.08, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        transparent: true,
        opacity: 0.35 - i * 0.05,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(heartMesh.position);
      ring.rotation.x = Math.PI * 0.25;
      scene.add(ring);
      waveRings.push(ring);
    }

    // 5. Studio Microphone ("NO AR")
    const micGroup = new THREE.Group();
    
    // Mic Capsule (Cylinder + Hemispheres)
    const capsuleGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.8, 24);
    const capsuleMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.2,
    });
    const capsule = new THREE.Mesh(capsuleGeo, capsuleMat);
    micGroup.add(capsule);

    const domeGeo = new THREE.SphereGeometry(0.7, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.25,
      wireframe: false,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.9;
    micGroup.add(dome);

    // Red "NO AR" Ring on mic
    const micRingGeo = new THREE.TorusGeometry(0.72, 0.08, 16, 32);
    const micRingMat = new THREE.MeshBasicMaterial({
      color: 0xff002b,
    });
    const micRing = new THREE.Mesh(micRingGeo, micRingMat);
    micRing.rotation.x = Math.PI / 2;
    micRing.position.y = 0.4;
    micGroup.add(micRing);

    // Mic Body
    const bodyGeo = new THREE.CylinderGeometry(0.65, 0.55, 1.4, 24);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.6,
      roughness: 0.4,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = -1.2;
    micGroup.add(body);

    micGroup.position.set(-8, -1, 3);
    micGroup.rotation.z = -0.2;
    micGroup.rotation.y = 0.4;
    scene.add(micGroup);

    // 6. Sound Dust Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xff4d6d,
      size: 0.18,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse and Resize Tracking
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (e.clientX - windowHalfX) * 0.0015;
      targetY = (e.clientY - windowHalfY) * 0.0015;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax smooth lerp
      camera.position.x += (targetX * 8 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Heartbeat pulse calculation
      const pulseSpeed = isPlaying ? 5.5 : 2.5;
      const heartbeat = 1 + Math.sin(elapsedTime * pulseSpeed) * 0.06;
      heartMesh.scale.set(0.65 * heartbeat, 0.65 * heartbeat, 0.65 * heartbeat);
      heartMesh.rotation.y = Math.sin(elapsedTime * 0.7) * 0.25;

      // Concentric wave rings expansion & rotation
      waveRings.forEach((ring, idx) => {
        ring.rotation.z += 0.004 * (idx + 1);
        ring.rotation.y = Math.sin(elapsedTime * 0.5 + idx) * 0.15;
        const ringPulse = 1 + Math.sin(elapsedTime * (pulseSpeed * 0.8) + idx * 0.6) * 0.04;
        ring.scale.set(ringPulse, ringPulse, ringPulse);
      });

      // Mic gentle float
      micGroup.position.y = -1 + Math.sin(elapsedTime * 1.5) * 0.3;
      micGroup.rotation.y = 0.4 + Math.sin(elapsedTime * 0.8) * 0.15;

      // Particle subtle drifting
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      heartGeometry.dispose();
      heartMaterial.dispose();
      waveRings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-1 pointer-events-none w-full h-full opacity-70 lg:opacity-85 mix-blend-screen"
    />
  );
}
