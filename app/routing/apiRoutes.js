// LOAD DATA
// linking our routes to a series of "data" sources.
// These data sources hold arrays(friends) of information on all possible friends

let friends = require("../data/friends");

// ThE variable totalDiff will calculate the difference between the user"s scores and the scores of
// each user in the database

matchFinder = userScore => {
  let index = 0;
  let lowDiff = 0;
  for (let i = 0; i < friends.length; i++) {
    let totalDiff = 0;
    for (let j = 0; j < userScore.length; j++) {
      let scoreDiff = Math.abs(userScore[j] - friends[i].scores[j]);
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

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = app => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link?
  // they are shown a JSON of the data in the table

  app.get("/api/friends", (req, res) => {
    res.json(friends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each  cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/friends", (req, res) => {
    let userData = req.body;
    let index = matchFinder(userData.scores);
    friends.push(req.body);
    res.json(friends[index]);
  });
};
