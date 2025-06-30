"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Decal,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

function Model({
  color,
  decalTexture,
  decalPosition,
  decalScale,
  position = [0, 0, 0],
}) {
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const meshRef = useRef();

  const material = useMemo(() => {
    const clonedMaterial = materials.lambert1.clone();
    clonedMaterial.color = new THREE.Color(color);
    return clonedMaterial;
  }, [materials.lambert1, color]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        Math.sin(state.clock.elapsedTime * 0.2) * 0.15,
        0.05
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow={false} // Disable shadow casting
      receiveShadow={false} // Disable shadow receiving
      geometry={nodes.T_Shirt_male.geometry}
      material={material}
      material-roughness={1}
      dispose={null}
      position={position}
    >
      {decalTexture && (
        <Decal
          position={decalPosition}
          rotation={[0, 0, 0]}
          scale={decalScale}
          map={decalTexture}
          {...{ mapAnisotropy: 16, depthTest: false, depthWrite: true }}
        />
      )}
    </mesh>
  );
}

useGLTF.preload("/shirt_baked.glb");

export function TShirtCanvas({
  apparelColor,
  decalTexture,
  decalPosition,
  decalScale,
}) {
  return (
    <div className="xl:col-span-3 lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 relative overflow-hidden min-h-[300px] md:min-h-[150px] flex items-center">
      <Canvas
        shadows={false} // Disable shadows globally
        camera={{ position: [0, 0, 3], fov: 15 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <hemisphereLight
            skyColor="#ffffff"
            groundColor="#ffffff"
            intensity={1.5}
          />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <directionalLight position={[0, 10, -5]} intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-5, 5, 5]} intensity={0.5} />
          <pointLight position={[0, 5, -5]} intensity={0.8} />

          <Model
            color={apparelColor}
            decalTexture={decalTexture}
            decalPosition={decalPosition}
            decalScale={decalScale}
            position={[0, 0.15, 0]}
          />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={2}
            maxDistance={6}
            target={[0, 0.1, 0]}
            autoRotate={false}
            minAzimuthAngle={-Math.PI / 4} // -45 degrees
            maxAzimuthAngle={Math.PI / 4} // +45 degrees
          />

          <Environment preset="sunset" />

          {/* Ground plane without shadows */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.5, 0]}
            receiveShadow={false}
          >
            <planeGeometry args={[15, 15]} />
            <meshStandardMaterial color="#ffffff" opacity={0.1} transparent />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
