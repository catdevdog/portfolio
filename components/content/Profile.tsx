import { useRef, useState } from "react";
import * as S from "./Content.styles";
import * as P from "./profile.styles";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";

import { useStore } from "@/store/useStore";

export const Profile = () => {
  const { setCurrentCommand, addCommandHistory } = useStore((state) => state);
  const introRef = useRef<HTMLDivElement>(null);
  const [introPlusState, setIntroPlusState] = useState<boolean>(false);

  const handleProjectClick = () => {
    setCurrentCommand("project");
    addCommandHistory("project");
  };

  const handleIntroToggle = () => {
    setIntroPlusState((prev) => !prev);

    document.fonts.ready.then(() => {
      if (!introRef.current) return;
      const wrapper = introRef.current;
      wrapper.style.visibility = "visible";

      const chunks = Array.from(wrapper.querySelectorAll(".more-intro-chunk"));

      chunks.forEach((chunk) => {
        const { words } = splitText(chunk as HTMLElement);

        // 애니메이션 옵션
        const option = {
          opacity: introPlusState ? [1, 0] : [0, 1],
          y: introPlusState ? [0, 10] : [10, 0],
        };

        animate(words, option, {
          type: "spring",
          duration: 1,
          bounce: 0,
          delay: stagger(0.02),
        });
      });
      animate(
        introRef.current,
        {
          height: introPlusState ? ["auto", "0px"] : ["0px", "auto"],
          opacity: introPlusState ? [1, 0] : [0, 1],
        },
        {
          type: "spring",
          duration: 0.5,
          bounce: 0,
          delay: introPlusState ? chunks.length * 0.3 : 0,
        }
      );
    });
  };

  return (
    <S.ContentContainer>
      <P.Wrap>
        <P.Intro>
          <h2>
            안녕하세요.
            <br /> 강민구입니다.
          </h2>
          <p>
            어떤 분야에서든지, 의문이 생기면 해결될 때까지 파고드는 것을
            좋아합니다.
          </p>
          <p>
            프로젝트의 기술부채 해결에 도전하거나, 동료들에게 기술적 도움을 주는
            것을 즐거워합니다. 오랜 학습 기간과 빠른 실무 경험 덕분에 다양한
            환경에 익숙하기도 하며, 뛰어난 메타인지능력을 갖추고 있습니다.
          </p>
          <p>
            지금 이순간에도 끊임 없이 생겨나는 프론트엔드 기술들을 바로바로
            프로젝트에 접목시키려 노력하며, 이를 위해 다양한 사이드 프로젝트들을
            진행하고있습니다.
          </p>
          <P.IntroPlus ref={introRef}>
            <p className="more-intro-chunk">
              3년간 퍼블리셔로 일하며 웹 서비스 리뉴얼 및 구축 프로젝트를 경험,
              그중 일부 프로젝트에서 프론트 개발도 함께 맡았습니다.
            </p>
            <p className="more-intro-chunk">
              참여한 프로젝트 대부분이 react, vue 기반으로 TypeScript, Nuxt,
              Next 등 프레임워크 기반 개발에 능숙하고, Vuex, Pinia, Zustand 등
              이에 맞는 상태 관리 경험도 보유하고 있습니다.
            </p>
            <p className="more-intro-chunk">
              3년 이상의 SI 프로젝트 경험을 통해 협업 도구(Jira, Slack,
              Confluence, Git) 환경에 익숙하며, 웹 접근성 인증을 위한 UI
              컴포넌트 커스터마이징, 반응형 UI, 다국어 적용 등 실무 중심의
              역량을 갖추고 있습니다.
            </p>
            <p className="more-intro-chunk">
              GCP, Firebase, NAS, AI 등 활용 가능한 서비스와 자산들을 적극
              사용하여 다양한 사이드 프로젝트를 진행하며 이를 통해 서비스의
              흐름을 익히고 간단한 백엔드까지 아우르는 등, 개발 역량을
              지속적으로 넓혀가고 있습니다.
            </p>
          </P.IntroPlus>
          <P.Button onClick={handleIntroToggle}>
            {introPlusState ? "접기" : "자세히 보기"}
          </P.Button>
        </P.Intro>
        <P.Career>
          <h2>Career.</h2>
          {/* 🖥️  */}
          <ul>
            <li>
              <span className="year">2021.12 ~ 2025.01</span>-
              <p className="name">(주)프리아이브</p>
              <p className="description">
                웹 서비스 구축 및 리뉴얼 SI 프로젝트에 참여했습니다. 공통
                컴포넌트 개발, 웹 접근성 인증, 반응형 UI, 다국어 적용 등을
                경험했습니다. 퍼블리셔로 시작하여 일부 프로젝트에서 프론트엔드
                영역까지 담당했으며, JSP, Gulp 부터 React, Vue 까지 폭넓은
                환경에서 작업했습니다.
              </p>
              <P.Button onClick={handleProjectClick}>참여 프로젝트</P.Button>
            </li>
          </ul>
        </P.Career>
        <P.Education>
          <h2>Education.</h2>
          {/* ✏️  */}
          <ul>
            <li>
              <span className="year">2016 ~ 2019</span>
              <p>일산고등학교 멀티미디어디자인과</p>
            </li>
            <li>
              <span className="year">2025 ~ 재학중</span>
              <p>한국방송통신대학교 컴퓨터과학과</p>
            </li>
          </ul>
        </P.Education>
        <P.Skill>
          <h2>Skill.</h2>
          {/* ⚙️  */}
          <ul>
            <li>JavaScript, TypeScript</li>
            <li>React, Next.js</li>
            <li>CSS, Sass, Styled Components</li>
            <li>Git, GitHub</li>
          </ul>
        </P.Skill>
        <P.Contact></P.Contact>
      </P.Wrap>
    </S.ContentContainer>
  );
};
