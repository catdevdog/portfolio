"use client";

import { useStore } from "@/store/useStore";
import { Html, useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import * as S from "./HeroRenderer.styles";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";

type TypeHeroRendererProps = {
  command: string;
};

const systemCommonStyle = {
  fontFamily: theme.systemFontFamily,
  fontSize: theme.fontSizes.cmd,
};

function Model() {
  const group = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Object3D>(new THREE.Object3D());
  const { scene } = useGLTF("/models/terminal.glb");
  const commandHistory = useStore((state) => state.commandHistory);
  const commandBoxRef = useRef<HTMLDivElement>(null);
  const command = useStore((state) => state.currentCommand);
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

  // 스크롤을 맨 아래로 이동
  useEffect(() => {
    requestAnimationFrame(() => {
      if (commandBoxRef.current) {
        // commandBoxRef.current.scrollTop = commandBoxRef.current.scrollHeight;
        commandBoxRef.current.scrollTo({
          top: commandBoxRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  }, [commandHistory.length]);

  return (
    <group ref={group}>
      <primitive object={pivot} />

      <Html
        // screenMesh 기준 local 좌표(중심)로 이동
        //1.70, -0.78, 0.4
        position={[0, -0.82, 0.05]}
        transform
        center={false}
        occlude
        distanceFactor={1.5}
      >
        <S.CommandBox
          onClick={focusToInput}
          ref={commandBoxRef}
          style={systemCommonStyle}
        >
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
  const targetFov = toggled ? 60 : 100;

  useFrame((_, delta) => {
    const goal = toggled ? frontPos : cornerPos;
    camera.position.lerp(goal, delta);
    camera.fov += (targetFov - camera.fov) * delta;
    camera.updateProjectionMatrix();

    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroRenderer() {
  const { focusDisplay } = useStore((state) => state);
  const displayOpen = useStore((state) => state.displayOpen);

  // 코너 뷰
  const distance = 5;
  const d = distance / Math.sqrt(3);
  const cornerPos = new THREE.Vector3(d, 0, d);

  // 정면 뷰
  const frontPos = new THREE.Vector3(0, 0, 4);

  return (
    <>
      <S.HeroContainer>
        <Canvas
          shadows
          camera={{
            position: cornerPos.toArray(),
            near: 0.01,
            far: 100,
          }}
        >
          <ThemeProvider theme={theme}>
            {/* 조명 */}
            <ambientLight intensity={1} />
            <directionalLight castShadow position={[0, 1, 0]} intensity={1} />

            <Suspense
              fallback={
                <Html center style={{ fontFamily: "DungGeunMo" }}>
                  Loading...
                </Html>
              }
            >
              <Model />
            </Suspense>

            {/* 카메라 마우스 컨트롤 */}
            <OrbitControls
              enablePan={false}
              enableZoom={!displayOpen}
              // enabled={!displayOpen} // ← displayOpen 에 따라 on/off만
              minDistance={displayOpen ? 4 : 4}
              maxDistance={displayOpen ? 5 : 8}
              minAzimuthAngle={!displayOpen ? -Math.PI / 4 : -Math.PI / 4}
              maxAzimuthAngle={!displayOpen ? Math.PI / 4 : Math.PI / 4}
            />

            {/* 카메라 이동 */}
            <SmoothCamera
              cornerPos={cornerPos}
              frontPos={frontPos}
              toggled={focusDisplay}
            />
          </ThemeProvider>
        </Canvas>
      </S.HeroContainer>
    </>
  );
}
