import * as S from "./Content.styles";
import * as P from "./profile.styles";

import { useStore } from "@/store/useStore";

export const Profile = () => {
  const { setCurrentCommand, addCommandHistory } = useStore((state) => state);

  const handleProjectClick = () => {
    setCurrentCommand("project");
    addCommandHistory("project");
  };

  return (
    <S.ContentContainer>
      <P.Wrap>
        <P.Intro>
          <h2>
            안녕하세요,
            <br /> 프론트엔드 개발자 강민구입니다.
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
            프로젝트에 접목시키려 노력하며, 이를 위해 다양한 프로젝트들을
            진행하고있습니다.
          </p>
        </P.Intro>
        <P.Career>
          <h2>Career.</h2>
          {/* 🖥️  */}
          <ul>
            <li>
              <span>2021 ~ 2025</span>
              <p>(주) 프리아이브 부설연구소</p>
              <button onClick={handleProjectClick}>프로젝트</button>
            </li>
          </ul>
        </P.Career>
        <P.Education>
          <h2>Education.</h2>
          {/* ✏️  */}
          <ul>
            <li>
              <span>2016 ~ 2019</span>
              <p>일산고등학교 멀티미디어디자인과</p>
            </li>
            <li>
              <span>2025 ~ 재학중</span>
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
