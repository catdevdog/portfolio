import Link from "next/link";
import * as S from "./Content.styles";
import * as P from "./project.styles";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

type ProjectData = {
  [key: string]: string;
};

export const Project = () => {
  const [projectData, setProjectData] = useState<ProjectData[]>([]);

  useEffect(() => {
    fetch("/api/notion")
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          const projects = data.results.map((project: any) => {
            const result: ProjectData = {};

            // 모든 properties를 순회하면서 값 추출
            for (const [key, prop] of Object.entries(
              project.properties as any
            )) {
              const property = prop as any;

              // 타입별로 값 추출
              result[key] =
                property.title?.[0]?.plain_text ||
                property.rich_text?.[0]?.plain_text ||
                property.multi_select
                  ?.map((item: any) => item.name)
                  .join(", ") ||
                property.date?.start ||
                property.status?.name ||
                property.number?.toString() ||
                property.url ||
                "";
            }

            return result;
          });

          setProjectData(projects);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <S.ContentContainer>
      <P.Wrap>
        <P.Intro>참여한 주요 프로젝트들입니다.</P.Intro>

        {projectData.length === 0 && (
          <Loading message="데이터를 불러오는 중..." />
        )}
        <P.ProjectGrid>
          {projectData.map((project, idx) => {
            /**
             * 프로젝트 데이터 구조
             * 프로젝트: string
             * 상태: string
             * 시작일: string
             * 종료일: string
             * 설명: string;
             * 참여 영역: string;
             * 투입 유형: string;
             * 영역 기여도: string;
             * URL: string;
             * 비고: string;
             * AI 요약: string;
             * 프로젝트 요약: string;
             * 환경 : string;
             */
            return (
              <P.ProjectCard key={idx}>
                <h3>{project["프로젝트"] || "프로젝트명 없음"}</h3>
                <p className="status">
                  <span className="tag">
                    {project["상태"] || "상태 정보 없음"}
                  </span>
                  <span className="date">
                    {project["시작일"] || "시작일 정보 없음"} ~{" "}
                    {project["종료일"] || "종료일 정보 없음"}
                  </span>
                </p>
                <div className="info">
                  <div className="info-item">
                    <strong>참여 영역</strong>
                    <p>{project["참여 영역"] || "참여 영역 정보 없음"}</p>
                  </div>
                  <div className="info-item">
                    <strong>투입 유형</strong>
                    <p>{project["투입 유형"] || "투입 유형 정보 없음"}</p>
                  </div>
                  <div className="info-item">
                    <strong>영역 기여도</strong>
                    <p>{project["영역 기여"] || "영역 기여도 정보 없음"}%</p>
                  </div>
                </div>
                <div className="description">
                  <ul>
                    {project["업무 요약"]
                      .split("-")
                      .splice(1)
                      .map((item) => {
                        return (
                          <li key={item} className="item">
                            {item}
                          </li>
                        );
                      }) || "업무 요약 정보 없음"}
                  </ul>
                </div>
                {project["URL"] && (
                  <div className="links">
                    <P.Button
                      href={project["URL"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="프로젝트 링크 열기"
                    >
                      Link →
                    </P.Button>
                  </div>
                )}
                {false && (
                  <div className="ai-summary">
                    <h4>✨ AI 요약</h4>
                    <p>{project["AI 요약"] || "AI 요약 정보가 없습니다."}</p>
                  </div>
                )}
              </P.ProjectCard>
            );
          })}
        </P.ProjectGrid>
        <P.Footer>
          Data from{" "}
          <Link
            href="https://www.notion.so/20e40554512480069de0dadaf0848a60?v=20e4055451248007ba4c000cd1e4d156"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Notion DB 링크 열기"
          >
            Notion DB
          </Link>{" "}
          via Notion API
        </P.Footer>
      </P.Wrap>
    </S.ContentContainer>
  );
};
