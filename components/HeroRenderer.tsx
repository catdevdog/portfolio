import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';
import * as S from './HeroRenderer.styles';

function Model() {
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
    pivot.current.position.set(0, 0, 0);
    scene.position.set(0, -1.3, 0);
    
  }, [scene]);

  return (
    <group ref={group}>
        <primitive object={pivot} />
        
        {true && (
            <Html
                // screenMesh 기준 local 좌표(중심부)로 이동
                //1.70, -0.78, 0.4
                position={[0.05,0,0.43]}
                occlude
                transform
                distanceFactor={1}
                center
                >
                <div style={{
                    background: 'rgba(0,0,0,0)',
                    color: 'white',
                    fontSize: '14px',
                    width: '380px',
                    height: '300px',
                }}>
                    땡구르르
                </div>
            </Html>
        )}
      </group>
    )
}

function SmoothCamera({ cornerPos, frontPos, toggled }: {
  cornerPos: THREE.Vector3;
  frontPos: THREE.Vector3;
  toggled: boolean;
}) {
  const { camera } = useThree<{ camera: PerspectiveCamera }>();
  const rotateSpeed = 0.5; // 회전 속도 (rad/sec)
  const targetFov = toggled ? 40 : 120;

  useFrame((_, delta) => {
    // 토글 상태에 따라 목표 위치 선택
    const goal = toggled ? frontPos : cornerPos;
    camera.position.lerp(goal, delta);
    camera.fov += (targetFov - camera.fov) * delta;  // 속도 계수
    camera.updateProjectionMatrix();
    
    if (toggled) {
      camera.position.applyAxisAngle(
        new THREE.Vector3(0, -2, 0),
        rotateSpeed * delta
      );
    } else {
      camera.position.applyAxisAngle(
        new THREE.Vector3(0, 0, 0),
        -rotateSpeed * delta 
      );
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroRenderer() {
  // 1) 코너 뷰(정육면체 모서리 상단)
  const distance = 5;
  const d = distance / Math.sqrt(3);
  const cornerPos = new THREE.Vector3(d, d * 1.5, d);

  // 2) 디스플레이 정면 뷰 (콘솔 확인 값)
  const frontPos  = new THREE.Vector3(3.8, 0.3, 3.8);

  const [toggled, setToggled] = useState(false);

  return (
    <>
      <button onClick={() => setToggled(v => !v)}>
        {toggled ? '코너뷰로' : '정면뷰로'} 이동
      </button>

      <S.HeroContainer>
        <Canvas
            shadows
            camera={{ position: cornerPos.toArray(), fov: 100, near: 0.01, far: 100 }}
        >
            {/* 조명 세팅 */}
            <ambientLight intensity={1} />
            <directionalLight
            castShadow
            position={[0, 1, 0]}
            intensity={0.8}
            />

            <Suspense fallback={<Html center>Loading...</Html>}>
                <Model />
            </Suspense>

            {/* <OrbitControls enablePan={false} enableZoom={false} /> */}

            {/* 카메라 부드러운 이동 */}
            <SmoothCamera
            cornerPos={cornerPos}
            frontPos={frontPos}
            toggled={toggled}
            />
        </Canvas>
      </S.HeroContainer>
    </>
  );
}
