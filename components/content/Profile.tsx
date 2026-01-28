import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useRef, useState } from "react";
import * as S from "./_3d.styles";
import * as P from "./profile.styles";

import { useCommandProcessor } from "@/store/useCommands";

const skills = [
  {
    category: "퍼블리싱 - 프론트엔드",
    description:
      "실무와 사이드 프로젝트에서 반복적으로 사용하여 익숙한 기술 스택입니다.",
    items: [
      "React",
      "Vue",
      "TypeScript",
      "JavaScript",
      "jQuery",
      "HTML",
      "CSS",
      "Zustand",
      "Pinia",
      "Vuex",
      "Next.js",
      "Nuxt.js",
      "Vite",
    ],
  },
  {
    category: "라이브러리",
    description: "일부 프로젝트에서 사용, 커스텀 경험이 있는 라이브러리입니다.",
    items: [
      "i18n",
      "ElementUi",
      "NaiveUi",
      "Vuetify ",
      "Motion",
      "Storybook",
      "Swiper",
    ],
  },
  {
    category: "스타일링",
    description: "대부분 프로젝트에서 아래 기술 중 하나 이상을 사용했습니다.",
    items: ["SCSS", "CSS Modules", "Styled-Components", "Tailwind"],
  },
  {
    category: "백엔드",
    description: "사이드 프로젝트에서 사용한 백엔드 기술 스택입니다.",
    items: ["Node.js", "Express", "Firebase", "GCP", "MySQL"],
  },
  {
    category: "협업",
    description: "원활한 협업을 위해 사용한 도구들입니다.",
    items: ["Git", "Jira", "Slack", "Confluence", "Figma"],
  },
  {
    category: "API & DevOps",
    description: "사이드 프로젝트에서 사용한 API 및 DevOps 기술 스택입니다.",
    items: [
      "Firebase",
      "GCP",
      "Vercel",
      "Docker",
      "OpenAI-api",
      "Anthropic-api",
      "Synology NAS",
    ],
  },
];

export const Profile = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const [introPlusState, setIntroPlusState] = useState<boolean>(false);
  const { handlers } = useCommandProcessor({ watch: false });

  const handleProjectClick = () => {
    handlers.project();
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
        },
      );
    });
  };

  return (
    <S.ContentContainer>
      <P.Wrap>
        <P.Intro>
          {/* <h2>
            안녕하세요.
          </h2> */}
          <h2>
            I build
            <br /> what I imagine.
          </h2>
          <p>
            기능, 효과의 구현과 결과를 한번에 관리하기 위해 만든
            <br /> 포트폴리오이자 플레이그라운드 입니다.
          </p>
          <p>각 명령어는 하나의 컴포넌트를 가상의 윈도우로 열어 보여줍니다.</p>
          <p>
            <CmdShortcut command="profile" text="프로필" />과{" "}
            <CmdShortcut command="project" text="프로젝트" />
            를 제외한 기타 명령어들은
            <br /> 터미널의 <CmdShortcut command="guide" text="명령어 안내" />를
            통해 확인할 수 있습니다.
          </p>
          {/* <p>
            프로젝트의 기술부채 해결에 도전하거나, 동료들에게 기술적 도움을 주는
            것을 즐거워합니다. 오랜 학습 기간과 빠른 실무 경험 덕분에 다양한
            환경에 익숙하기도 하며, 뛰어난 메타인지능력을 갖추고 있습니다.
          </p>
          <p>
            지금 이순간에도 끊임 없이 생겨나는 프론트엔드 기술들을 바로바로
            프로젝트에 접목시키려 노력하며, 이를 위해 다양한 사이드 프로젝트들을
            진행하고있습니다.
          </p> */}
          {/* <P.IntroPlus ref={introRef}>
            <p className="more-intro-chunk">
              3년간 프론트파트에서 일하며 웹 서비스 리뉴얼 및 구축 프로젝트에서
              퍼블리싱과 프론트엔드 개발을 맡았습니다.
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
          </P.Button> */}
        </P.Intro>
        <P.Career>
          <h2>Career.</h2>
          {/* 🖥️  */}
          <ul>
            <li>
              <span className="year">2025.06 ~ 2025.10</span>
              <p className="name">아워홈 몰 관리자 페이지 리뉴얼 프로젝트</p>
              <p className="description">
                JSP로 구축된 아워홈 몰 관리자 페이지를 React로 리뉴얼하는
                프로젝트에 프리랜서로 참여했습니다.
              </p>
            </li>
            <li>
              <span className="year">2021.12 ~ 2025.01</span>
              <p className="name">(주)프리아이브</p>
              <p className="description">
                웹 서비스 구축 및 리뉴얼 SI 프로젝트에 참여했습니다. 공통
                컴포넌트 개발, 웹 접근성 인증, 반응형 UI, 다국어 적용 등을
                경험했습니다. 퍼블리싱과 일부 프로젝트에서 프론트엔드 영역까지
                담당했으며, 다양한 프레임워크 환경에서 작업했습니다.
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
              <p className="name">일산고등학교 멀티미디어디자인과</p>
              <p className="description">
                그래픽 디자인, 영상 편집, 웹 디자인 등의 기초를 배웠습니다.
              </p>
            </li>
            <li>
              <span className="year">2025 ~ </span>
              <p className="name">한국방송통신대학교 컴퓨터과학과</p>
              <p className="description">
                컴퓨터과학 전반에 대한 이론을 학습하고 있습니다.
              </p>
            </li>
          </ul>
        </P.Education>
        <P.Skill>
          <h2>Tech Experience.</h2>
          {/* ⚙️  */}
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
                <span className="category">{skill.category}</span>
                <p className="description">{skill.description}</p>
                <p className="items">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="item">
                      {item}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </P.Skill>
        <P.Contact></P.Contact>
      </P.Wrap>
    </S.ContentContainer>
  );
};

const CmdShortcut = ({ command, text }: { command: string; text: string }) => {
  const handlers = useCommandProcessor({ watch: false }).handlers;
  return (
    <>
      <P.CmdShortcut onClick={() => handlers[command]()}>{text}</P.CmdShortcut>
    </>
  );
};
