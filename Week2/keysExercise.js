import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  try {
    // call the function that returns promise
    await execQuery();
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
