export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "${body.username}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
