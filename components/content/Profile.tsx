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
          <h2>안녕하세요, 강민구입니다.</h2>
          <p>dd</p>
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
