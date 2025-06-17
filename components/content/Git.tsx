import { useEffect } from "react";
import * as S from "./Content.styles";
import * as G from "./git.styles";

export const Git = () => {
  useEffect(() => {
    fetch("/api/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "catdevdog" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "GitHub data:",
          data.data.user.contributionsCollection.contributionCalendar
        );
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <S.ContentContainer>
      <G.Wrap>dddddddddddddddddddddddddddddddddddddd</G.Wrap>
    </S.ContentContainer>
  );
};
