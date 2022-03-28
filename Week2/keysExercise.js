import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_AUTHORS_TABLE = `CREATE TABLE authors (
    author_no INT,
    author_name VARCHAR(50),
    university VARCHAR(50),
    date_of_birth DATE,
    h_index VARCHAR(20),
    gender ENUM('m', 'f'),
    PRIMARY KEY(author_no),
    INDEX (h_index))`;

  const ADD_MENTOR_FK = `ALTER TABLE authors 
  ADD COLUMN mentor INT,
  ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_no)`;

  try {
    // call the function that returns promise
    await execQuery("DROP DATABASE IF EXISTS week2");
    await execQuery("CREATE DATABASE week2");
    await execQuery("USE week2");
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_MENTOR_FK);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
