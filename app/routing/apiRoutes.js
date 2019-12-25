let appData = require("../data/friends.js");

matchFinder = userScore => {
  let index = 0;
  let lowDiff = 0;
  for (let i = 0; i < appData.length; i++) {
    let totalDiff = 0;
    for (let j = 0; j < userScore.length; j++) {
      let scoreDiff = Math.abs(userScore[j] - appData[i].scores[j]);
      totalDiff += scoreDiff;
    }
    if (i == 0) {
      lowDiff = totalDiff;
    } else if (i != 0 && totalDiff < lowDiff) {
      lowDiff = totalDiff;
      index = i;
    }
  }
  return index;
};

module.exports = app => {
  app.get("/api/friends", (req, res) => {
    res.json(appData);
  });

  app.post("/api/friends", (req, res) => {
    let userData = req.body;
    let index = matchFinder(userData.scores);
    appData.push(req.body);
    res.json(appData[index]);
  });
};
