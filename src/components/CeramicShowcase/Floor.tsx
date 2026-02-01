import { useMemo, useLayoutEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { CeramicVariant } from './types';

interface FloorProps {
  design: CeramicVariant;
}

function TexturedFloor({ design }: { design: CeramicVariant }) {
  const props = useTexture({
    map: design.textureUrl || '',
  });

  // Ensure texture repeats effectively per tile (UV 0..1 per instance)
  // We don't need RepeatWrapping if we map 1:1 on the geometry, but good to reset if it was changed elsewhere.
  props.map.wrapS = props.map.wrapT = THREE.ClampToEdgeWrapping;
  props.map.repeat.set(1, 1);

  // Configuration for the floor
  const floorSize = 10;
  // User requested 10x10 floor
  const tilesPerRow = 10; 
  const gap = 0.05; // Grout line width
  const tileSize = floorSize / tilesPerRow;
  const count = tilesPerRow * tilesPerRow;
  
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    const tempObject = new THREE.Object3D();
    let i = 0;

    // Offset to center the grid
    const offset = (tilesPerRow * tileSize) / 2;

    for (let x = 0; x < tilesPerRow; x++) {
      for (let z = 0; z < tilesPerRow; z++) {
        const xPos = (x * tileSize) - offset + (tileSize / 2);
        const zPos = (z * tileSize) - offset + (tileSize / 2);

        tempObject.position.set(xPos, 0, zPos);
        tempObject.rotation.x = -Math.PI / 2;
        tempObject.updateMatrix();
        
        meshRef.current.setMatrixAt(i++, tempObject.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [tilesPerRow, tileSize]);

  return (
    <group position={[0, -0.01, 0]}>
       {/* Grout background */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[floorSize, floorSize]} />
        <meshStandardMaterial color="#cccccc" roughness={1} />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        {/* Reduce size slightly for gap */}
        <planeGeometry args={[tileSize - gap, tileSize - gap]} />
        <meshStandardMaterial 
          {...props}
          roughness={design.roughness}
          metalness={design.metalness}
        />
      </instancedMesh>
    </group>
  );
}

function ProceduralFloor({ design }: { design: CeramicVariant }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const pattern = design.pattern || 'grid';

      ctx.save();
      ctx.fillStyle = design.color || '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.restore();

      ctx.strokeStyle = '#cccccc'; // Grout color
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';

      if (pattern === 'grid') {
        const tileSize = size / 2;
        for (let x = 0; x <= size; x += tileSize) {
           ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke();
        }
        for (let y = 0; y <= size; y += tileSize) {
           ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke();
        }
      } 
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(design.tileRepeat || 4, design.tileRepeat || 4);
    return tex;
  }, [design.color, design.pattern, design.tileRepeat]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial 
        map={texture}
        roughness={design.roughness}
        metalness={design.metalness}
      />
    </mesh>
  );
}

export function Floor({ design }: FloorProps) {
  if (design.type === 'texture' && design.textureUrl) {
      return <TexturedFloor design={design} />;
  }
  return <ProceduralFloor design={design} />;
}
