import { useEffect, useRef } from "react";
import * as S from "./Content.styles";
import * as G from "./git.styles";

type TypeGitData = {
  avatarUrl: string;
  bio: string;
  login: string;
  name: string;
  url: string;
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          date: string;
          contributionCount: number;
          color: string;
        }[];
      }[];
    };
  };
};

export const Git = () => {
  const gitData = useRef<TypeGitData | null>(null);

  useEffect(() => {
    fetch("/api/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "catdevdog" }),
    })
      .then((res) => res.json())
      .then((data) => {
        gitData.current = data.data;
        console.log("GitHub Data:", gitData.current);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <S.ContentContainer>
      <G.Wrap></G.Wrap>
    </S.ContentContainer>
  );
};
