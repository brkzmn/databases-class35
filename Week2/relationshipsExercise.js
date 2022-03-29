import mysql from "mysql";
import util from "util";
import { authorsData } from "./authors.js";
import { researchPapersData } from "./researchPapers.js";

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
        paper_id INT AUTO_INCREMENT, 
        paper_title VARCHAR(50), 
        conference TEXT, 
        publish_date DATE,
        PRIMARY KEY(paper_id)
    )`;
  const ADD_AUTHOR_COLUMN = `
    ALTER TABLE research_Papers
        ADD COLUMN author INT,
        ADD CONSTRAINT fk_author FOREIGN KEY (author) REFERENCES authors(author_no)
    `;
  const ADD_PAPERS_COLUMN = `
    ALTER TABLE authors
        ADD COLUMN papers INT,
        ADD CONSTRAINT fk_papers FOREIGN KEY (papers) REFERENCES research_Papers(paper_id)`;

  try {
    await execQuery("DROP TABLE IF EXISTS research_Papers");
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(ADD_AUTHOR_COLUMN);
    authorsData.forEach(async (author) => {
      await execQuery("INSERT INTO authors SET ?", author);
    });
    researchPapersData.forEach(async (paper) => {
      await execQuery("INSERT INTO research_Papers SET ?", paper);
    });
    await execQuery(ADD_PAPERS_COLUMN);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
