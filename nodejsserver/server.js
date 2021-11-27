const express = require("express");
const { connect } = require("./database");
const { connection: redisClient } = require("./redis");

const app = express();
const port = 8000;

app.get("/", async (req, res) => {
  const redisConnection = await redisClient();

  let users = await redisConnection.get("users");

  console.log({ usersStoredInRedis: users });

  if (!users) {
    const database = await connect();
    const result = await database.query("SELECT * FROM users");
    await redisConnection.set("users", JSON.stringify(result.rows));

    users = result.rows;

    return res.status(200).send({
      data: users,
    });
  }

  return res.status(200).send({
    data: JSON.parse(users),
  });
});

app.listen(port);
console.log("Aplicação executando na porta ", port);
