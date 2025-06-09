"use client";

import { useStore } from "@/store/useStore";
import { lightTheme } from "@/styles/theme";
import { Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import * as S from "./HeroRenderer.styles";
import { useMobile } from "@/store/useMobile";

const systemCommonStyle = {
  fontFamily: lightTheme.systemFontFamily,
  fontSize: lightTheme.fontSizes.cmd,
};

interface TerminalModelProps {
  bodyColor?: string;
  headerColor?: string;
}

function TerminalModel({
  bodyColor = "#000",
  headerColor = "#333", // theme.windowHeader.background,
}: TerminalModelProps) {
  // traffic light 버튼 데이터
  const buttons = [
    { color: "#FF5F57", x: -0.88 },
    { color: "#FFBD2E", x: -0.75 },
    { color: "#27C93F", x: -0.62 },
  ];

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

  // 스크롤을 맨 아래로 이동
  useEffect(() => {
    setTimeout(() => {
      if (commandBoxRef.current) {
        commandBoxRef.current.scrollTo({
          top: commandBoxRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  }, [commandHistory.length]);

  return (
    <group>
      {/* 터미널 본체 */}
      <RoundedBox
        args={[2.0, 1.2, 0.08]} // width, height, depth
        radius={0.04} // 모서리 둥글기
        smoothness={1} // 곡면 스무스 레벨
      >
        <meshStandardMaterial color={bodyColor} />
      </RoundedBox>

      {/* 헤더 바 */}
      <RoundedBox
        args={[2, 0.25, 0.081]} // width, height, depth 조금 더 두껍게
        radius={0.04} // 각 모서리 동일하게 둥글게
        smoothness={1}
        position={[0, 0.48, 0]} // 본체 위쪽에 올리기
      >
        <meshStandardMaterial color={headerColor} />
      </RoundedBox>

      {/* 트래픽 라이트 버튼 */}
      {buttons.map((btn, idx) => (
        <mesh
          key={idx}
          position={[btn.x, 0.49, 0.05]} // 헤더 위쪽에 살짝 띄우기
        >
          <circleGeometry args={[0.04, 32]} />
          <meshStandardMaterial color={btn.color} />
        </mesh>
      ))}

      <Html
        // screenMesh 기준 local 좌표(중심)로 이동
        //1.70, -0.78, 0.4
        position={[0, -0.1, 0.05]}
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
                  {command.type === "sys" ? " " : "user>"}
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
  const targetFov = toggled ? 70 : 100;

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
  const isMobile = useMobile();
  const { focusDisplay } = useStore((state) => state);
  const displayOpen = useStore((state) => state.displayOpen);

  // 코너 뷰
  // const distance = 5;
  // const d = distance / Math.sqrt(3);
  // const cornerPos = new THREE.Vector3(d, 0, d);
  const cornerPos = new THREE.Vector3(0, 0, 4);

  // 정면 뷰
  const frontPos = new THREE.Vector3(isMobile ? 0 : -2, 0, 4);

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
          <ThemeProvider theme={lightTheme}>
            {/* 조명 */}
            <ambientLight intensity={1} />
            <directionalLight castShadow position={[0, 0, 1]} intensity={2} />

            <Suspense
              fallback={
                <Html
                  center
                  style={{
                    fontSize: "24px",
                    color: "#fff",
                  }}
                >
                  Loading...
                </Html>
              }
            >
              <TerminalModel />
            </Suspense>

            {/* 카메라 마우스 컨트롤 */}
            <OrbitControls
              enablePan={false}
              enableZoom={!displayOpen}
              // enabled={!displayOpen} // ← displayOpen 에 따라 on/off만
              minDistance={displayOpen ? 4 : 4}
              maxDistance={displayOpen ? 0 : 8}
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
