import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';
import * as S from './HeroRenderer.styles';

function Model() {
  const group = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Object3D>(new THREE.Object3D());
  const { scene } = useGLTF('/models/2_pbr.glb');

  useEffect(() => {
    if (!group.current) return;
    group.current.remove(scene);
    pivot.current.add(scene);
    group.current.add(pivot.current);

    // 피벗 오프셋 (디스플레이 기준으로 Z축 이동)
    pivot.current.position.set(0, 0, 0);
    scene.position.set(0, -1.3, 0);
  }, [scene]);

  return <group ref={group} />;
}

function SmoothCamera({ cornerPos, frontPos, toggled }: {
  cornerPos: THREE.Vector3;
  frontPos: THREE.Vector3;
  toggled: boolean;
}) {
  const { camera } = useThree<{ camera: PerspectiveCamera }>();
  const rotateSpeed = 0.5; // 회전 속도 (rad/sec)
  const targetFov = toggled ? 30 : 100;

  useFrame((_, delta) => {
    // 토글 상태에 따라 목표 위치 선택
    const goal = toggled ? frontPos : cornerPos;
    camera.position.lerp(goal, delta * 1.5);
    camera.fov += (targetFov - camera.fov) * delta * 2;  // delta*2는 속도 계수
    camera.updateProjectionMatrix();
    if (toggled) {
      camera.position.applyAxisAngle(
        new THREE.Vector3(0, -2.9, 0),
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
          <ambientLight intensity={.3} />
          <directionalLight
            castShadow
            position={[1, 2, -1]}
            intensity={0.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          <Suspense fallback={<Html center>Loading...</Html>}>
            <group castShadow receiveShadow>
              <Model />
            </group>
          </Suspense>

          <OrbitControls enablePan={false} enableZoom={false} />

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
