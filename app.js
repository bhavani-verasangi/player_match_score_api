// const express = require("express");
// const { open } = require("sqlite");
// const sqlite3 = require("sqlite3");
// const path = require("path");

// const databasePath = path.join(__dirname, "covid19India.db");

// const app = express();

// app.use(express.json());

// let database = null;

// const initializeDbAndServer = async () => {
//   try {
//     database = await open({
//       filename: databasePath,
//       driver: sqlite3.Database,
//     });

//     app.listen(3000, () =>
//       console.log("Server Running at http://localhost:3000/")
//     );
//   } catch (error) {
//     console.log(`DB Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// initializeDbAndServer();

// const convertPlayerDbObjectToResponseDbObject = (dbObject) => {
//   return {
//     playerId: dbObject.player_id,
//     playerName: dbObject.player_name,
//   };
// };

// const convertMatchDbObjectToResponseDbObject = (dbObject) => {
//   return {
//     matchId: dbObject.match_id,
//     match: dbObject.match,
//     year: dbObject.year,
//   };
// };

// // API1

// app.get("/players/", async (request, response) => {
//   const getPlayersQuery = `SELECT * FROM player_details;`;
//   const playerArray = await database.all(getPlayersQuery);
//   response.send(
//     playerArray.map((eachPlayer) =>
//       convertPlayerDbObjectToResponseObject(eachPlayer)
//     )
//   );
// });

// // API2

// app.get("/players/:playerId/", async (request, response) => {
//   const { playerId } = request.params;
//   const getPlayerQuery = `
//     SELECT
//       *
//     FROM
//       player_details
//     WHERE
//       player_id = ${playerId};`;
//   const player = await database.get(getPlayerQuery);
//   response.send(convertPlayerDbObjectToResponseDbObject(player));
// });

// // API3
// app.put("/players/:playerId/", async (request, response) => {
//   const { playerId } = request.params;
//   const { playerName } = request.body;
//   const updatePlayersQuery = `
//   UPDATE
//     player_details
//   SET
//     player_name = '${playerName}',

//   WHERE
//     player_id = ${playerId};
//   `;

//   await database.run(updateDistrictQuery);
//   response.send("Player Details Updated");
// });

// // API 4

// app.get("/matches/:matchId/", async (request, response) => {
//   const { matchId } = request.params;
//   const getMatchQuery = `
//     SELECT
//       *
//     FROM
//         match_details
//     WHERE
//       match_id = ${matchId};`;
//   const match = await database.get(getMatchQuery);
//   response.send(convertMatchDbObjectToResponseDbObject(match));
// });

// // API 5

// app.get("/players/:playerId/matches", async (request, response) => {
//   const { playerId } = request.params;
//   const getMatchesQuery = `SELECT * FROM player_match_score
//       NATURAL JOIN match_details
//     WHERE
//       player_id = ${playerId};`;
//   const getMatchesResult = await database.all(getMatchesQuery);
//   response.send(
//     getMatchesResult.map((eachMatch) =>
//       convertMatchDbObjectToResponseDbObject(eachMatch)
//     )
//   );
// });

// // API 6
// app.get("/matches/:matchId/players", async (request, response) => {
//   const { matchId } = request.params;
//   const getQuery = `SELECT * FROM
//     player_details NATURAL JOIN player_match_score
//     WHERE match_ID = ${matchId};`;
//   const getResult = await database.all(getQuery);
//   response.send(
//     getResult.map((eachPlayer) =>
//       convertPlayerDbObjectToResponseObject(eachPlayer)
//     )
//   );
// });

// //API7
// app.get("/players/:playerId/playerScores/", async (request, response) => {
//   const { playerId } = request.params;
//   const getMatchPlayersQuery = `
//     SELECT
//       player_id AS playerId,
//       player_name AS playerName,
//       SUM(score) AS totalScore,
//       SUM(fours) AS totalFours,
//       SUM(sixes) AS totalSixes
//     FROM player_match_score
//       NATURAL JOIN player_details
//     WHERE
//       player_id = ${playerId};`;
//   const playersMatchDetails = await database.get(getMatchPlayersQuery);
//   response.send(playersMatchDetails);
// });

// module.exports = app;

const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "cricketMatchDetails.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();
const convertPlayerDbObjectToResponseObject = (object) => {
  return {
    playerId: object.player_id,
    playerName: object.player_name,
  };
};
const convertMatchDbObjectToResponseObject = (object) => {
  return {
    matchId: object.match_id,
    match: object.match,
    year: object.year,
  };
};
//API1
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `SELECT * FROM player_details;`;
  const playerArray = await database.all(getPlayersQuery);
  response.send(
    playerArray.map((eachPlayer) =>
      convertPlayerDbObjectToResponseObject(eachPlayer)
    )
  );
});
//API2
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `SELECT * FROM player_details WHERE
    player_id = ${playerId};`;
  const getPlayerResult = await database.get(getPlayerQuery);
  response.send(convertPlayerDbObjectToResponseObject(getPlayerResult));
});
//API3
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName } = request.body;
  const updatePlayerQuery = `UPDATE player_details SET 
    player_name = '${playerName}' WHERE player_id = ${playerId}`;
  await database.run(updatePlayerQuery);
  response.send("Player Details Updated");
});
//API4
app.get("/matches/:matchId/", async (request, response) => {
  const { matchId } = request.params;
  const getMatchQuery = `SELECT * FROM match_details
   WHERE match_id = ${matchId};`;
  const getMatchResult = await database.get(getMatchQuery);
  response.send(convertMatchDbObjectToResponseObject(getMatchResult));
});
//API5
app.get("/players/:playerId/matches", async (request, response) => {
  const { playerId } = request.params;
  const getMatchesQuery = `SELECT * FROM player_match_score 
      NATURAL JOIN match_details
    WHERE
      player_id = ${playerId};`;
  const getMatchesResult = await database.all(getMatchesQuery);
  response.send(
    getMatchesResult.map((eachMatch) =>
      convertMatchDbObjectToResponseObject(eachMatch)
    )
  );
});
//API6
app.get("/matches/:matchId/players", async (request, response) => {
  const { matchId } = request.params;
  const getQuery = `SELECT * FROM 
    player_details NATURAL JOIN player_match_score
    WHERE match_ID = ${matchId};`;
  const getResult = await database.all(getQuery);
  response.send(
    getResult.map((eachPlayer) =>
      convertPlayerDbObjectToResponseObject(eachPlayer)
    )
  );
});
//API7
app.get("/players/:playerId/playerScores/", async (request, response) => {
  const { playerId } = request.params;
  const getmatchPlayersQuery = `
    SELECT
      player_id AS playerId,
      player_name AS playerName,
      SUM(score) AS totalScore,
      SUM(fours) AS totalFours,
      SUM(sixes) AS totalSixes
    FROM player_match_score
      NATURAL JOIN player_details
    WHERE
      player_id = ${playerId};`;
  const playersMatchDetails = await database.get(getmatchPlayersQuery);
  response.send(playersMatchDetails);
});

module.exports = app;
