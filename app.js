const cover = document.querySelector("#cover");
const buttons = document.querySelectorAll(".league-btn");
const matches = document.querySelector("#matches");
const backBtn = document.querySelector("#back-btn");

function getMatches() {
  return new Promise((resolve, reject) => {
    fetch("https://www.scorebat.com/video-api/v1/")
      .then((res) => res.json())
      .then((data_fetched) => {
        let data = data_fetched;
        resolve(data);
      });
  });
}

buttons.forEach((button) => {
  let league;
  let bg;

  switch (button.id) {
    case "premier":
      league = "ENGLAND: Premier League";
      bg = "bg-dark";
      break;
    case "serie-a":
      league = "ITALY: Serie A";
      bg = "bg-success";
      break;
    case "laliga":
      league = "SPAIN: La Liga";
      bg = "bg-warning";
      break;
    case "bundesliga":
      league = "GERMANY: Bundesliga";
      bg = "bg-danger";
      break;
    case "ligue1":
      league = "FRANCE: Ligue 1";
      bg = "bg-primary";
      break;
  }

  button.addEventListener("click", () => {
    getMatches().then((data) => {
      let matches = "";
      matches = data;
      matches.forEach((match) => {
        if (match.competition.name === `${league}`) {
          let div = document.createElement("div");
          div.classList.add("match", "w-25", "mr-5");
          div.innerHTML = match.embed;
          document.querySelector("#matches").appendChild(div);
        }
      });
    });

    matches.classList.add(`${bg}`);
    cover.style.visibility = "hidden";
  });
});

backBtn.addEventListener("click", () => {
  const matchesArray = Array.from(matches.children);
  const matchesBg = matches.classList[matches.classList.length - 1];
  console.log(matchesBg);
  matchesArray.forEach((match) => {
    if (match.id !== "back-btn") {
      match.remove();
    }
  });
  matches.classList.remove(`${matchesBg}`);
  cover.style.visibility = "visible";
});
