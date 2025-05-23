import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import * as S from "./HeroRenderer.styles";
import { useStore } from "@/store/useStore";

type TypeHeroRendererProps = {
  command: string;
};

function Model({ command }: { command: string }) {
  const group = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Object3D>(new THREE.Object3D());
  const { scene } = useGLTF("/models/base_basic_pbr.glb");
  const commandHistory = useStore((state) => state.commandHistory);
  //base_basic_pbr or 2_pbr

  const focusToInput = () => {
    const input = document.querySelector("#commandInput") as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

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
        // screenMesh 기준 local 좌표(중심)로 이동
        //1.70, -0.78, 0.4
        position={[0, 0, 0.422]}
        transform
        center={false}
        occlude
        distanceFactor={1}
      >
        <S.CommandBox onClick={focusToInput}>
          {/* history */}
          {commandHistory.length > 0 && (
            <S.commandHistory>
              {commandHistory.map((command, index) => (
                <S.commandHistoryItem key={index}>
                  {command.type === "sys" ? "" : "user>"}
                  {command.command}
                </S.commandHistoryItem>
              ))}
            </S.commandHistory>
          )}

          {/* input */}
          <S.currentCommand>
            {"user>"}
            {command}
            <span className="blink">_</span>
          </S.currentCommand>
        </S.CommandBox>
      </Html>
    </group>
  );
}

function SmoothCamera({
  cornerPos,
  frontPos,
  toggled,
}: {
  cornerPos: THREE.Vector3;
  frontPos: THREE.Vector3;
  toggled: boolean;
}) {
  const { camera } = useThree<{ camera: PerspectiveCamera }>();
  const targetFov = toggled ? 39 : 100;

  useFrame((_, delta) => {
    const goal = toggled ? frontPos : cornerPos;
    camera.position.lerp(goal, delta);
    camera.fov += (targetFov - camera.fov) * delta;
    camera.updateProjectionMatrix();

    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroRenderer({ command = "" }: TypeHeroRendererProps) {
  const { focusDisplay } = useStore((state) => state);

  // 코너 뷰
  const distance = 5;
  const d = distance / Math.sqrt(3);
  const cornerPos = new THREE.Vector3(d, d * 1.3, d);

  // 정면 뷰
  const frontPos = new THREE.Vector3(0, 0.5, 4.5);

  return (
    <>
      <S.HeroContainer>
        <Canvas
          shadows
          camera={{
            position: cornerPos.toArray(),
            fov: 100,
            near: 0.01,
            far: 100,
          }}
        >
          {/* 조명 */}
          <ambientLight intensity={1} />
          <directionalLight castShadow position={[0, 0, 1]} intensity={1} />

          <Suspense
            fallback={
              <Html center style={{ fontFamily: "DungGeunMo" }}>
                Loading...
              </Html>
            }
          >
            <Model command={command} />
          </Suspense>

          {/* 카메라 마우스 컨트롤 */}
          {/* <OrbitControls enablePan={false} enableZoom={false} /> */}

          {/* 카메라 이동 */}
          <SmoothCamera
            cornerPos={cornerPos}
            frontPos={frontPos}
            toggled={focusDisplay}
          />
        </Canvas>
      </S.HeroContainer>
    </>
  );
}
