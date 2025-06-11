import * as S from "./Content.styles";
import { useState, useEffect } from "react";

export const Project = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetch("/api/notion")
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setProjectData(data.results);
          console.log("Project data fetched successfully:", data.results);
        } else {
          console.error("No results found in the response");
        }
      });
  }, []);
  return (
    <S.ContentContainer>
      <h1>Project</h1>
      <p>참여한 프로젝트 내용이 여기에 표시됩니다.</p>
      {projectData.map((project, idx) => {
        return (
          <div key={idx}>
            {/* <h2>{project.id}</h2>
            {Object.keys(project.properties).map((key) => {
              return key;
            })} */}
          </div>
        );
      })}
    </S.ContentContainer>
  );
};
