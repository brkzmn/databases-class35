import mysql from "mysql";
import util from "util";
import authors from "./authors.js";
import { INSERT_RESEARCH_PAPERS_QUERY } from "./research-papers.js";
import { INSERT_PAPERS_AUTHORS_QUERY } from "./papers-authors.js";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE research_Papers (
        paper_id INT, 
        paper_title VARCHAR(50), 
        conference TEXT, 
        publish_date DATE,
        PRIMARY KEY(paper_id)
    )`;

  const CREATE_PAPERS_AUTHORS_TABLE = `
      CREATE TABLE papers_Authors (
        paper_id INT,
        author_id INT,
        FOREIGN KEY (paper_id) REFERENCES research_Papers (paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        PRIMARY KEY (paper_id, author_id)
      )
      `;
  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_PAPERS_AUTHORS_TABLE);
    authors.forEach(async (author) => {
      await execQuery("INSERT INTO authors SET ?", author);
    });
    await execQuery(INSERT_RESEARCH_PAPERS_QUERY);
    await execQuery(INSERT_PAPERS_AUTHORS_QUERY);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
