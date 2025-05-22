import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';
import * as S from './HeroRenderer.styles';

type TypeHeroRendererProps = {
    focusCommand: boolean;
    command: string;
}

function Model({command}: {command: string}) {
  const group = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Object3D>(new THREE.Object3D());
  const { scene } = useGLTF('/models/base_basic_pbr.glb');
  //base_basic_pbr or 2_pbr

  useEffect(() => {
    if (!group.current) return;
    group.current.remove(scene);
    pivot.current.add(scene);
    group.current.add(pivot.current);

    // 피벗 오프셋 (디스플레이 기준으로 Z축 이동)
    pivot.current.position.set(0, -1.35, 0);
    
  }, [scene]);

  return (
    <group ref={group}>
        <primitive object={pivot} />
    
        <Html
            // screenMesh 기준 local 좌표(중심부)로 이동
            //1.70, -0.78, 0.4
            position={[0,0.0,0.38]}
            transform
            distanceFactor={1}
            >
                <S.CommandBox>
                    {command}
                </S.CommandBox>
        </Html>
      </group>
    )
}

function SmoothCamera({ cornerPos, frontPos, toggled }: {
  cornerPos: THREE.Vector3;
  frontPos: THREE.Vector3;
  toggled: boolean;
}) {
  const { camera } = useThree<{ camera: PerspectiveCamera }>();
  const targetFov = toggled ? 40 : 100;

  useFrame((_, delta) => {
    // 토글 상태에 따라 목표 위치 선택
    const goal = toggled ? frontPos : cornerPos;
    camera.position.lerp(goal, delta);
    camera.fov += (targetFov - camera.fov) * delta;  // 속도 계수
    camera.updateProjectionMatrix();
    
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroRenderer({
    focusCommand = false,
    command = '',
}: TypeHeroRendererProps) {
  // 코너 뷰(정육면체 모서리 상단)
  const distance = 5;
  const d = distance / Math.sqrt(3);
  const cornerPos = new THREE.Vector3(d, d * 1.3, d);

  // 디스플레이 정면 뷰 (콘솔 확인 값)
  const frontPos  = new THREE.Vector3(0, 0.5, 4.5);

  return (
    <>
      <S.HeroContainer>
        <Canvas
            shadows
            camera={{ position: cornerPos.toArray(), fov: 80, near: 0.01, far: 100 }}
        >
            {/* 조명 세팅 */}
            <ambientLight intensity={.3} />
            <directionalLight
                castShadow
                position={[0, 1, 0]}
                intensity={1}
            />

            <Suspense fallback={<Html center>Loading...</Html>}>
                <Model 
                    command={command}
                />
            </Suspense>

            {/* <OrbitControls enablePan={false} enableZoom={false} /> */}

            {/* 카메라 부드러운 이동 */}
            <SmoothCamera
                cornerPos={cornerPos}
                frontPos={frontPos}
                toggled={focusCommand}
            />
        </Canvas>
      </S.HeroContainer>
    </>
  );
}
