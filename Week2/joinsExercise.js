import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

const execQuery = util.promisify(connection.query.bind(connection));

const showQueryResults = async () => {
  try {
    await execQuery("DROP TABLE IF EXISTS research_Papers");
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

showQueryResults();
