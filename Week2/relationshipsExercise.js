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

const INSERT_RESEARCH_PAPER_QUERY = `
INSERT INTO papers_Authors VALUES
  (1, 1),
  (2, 5),
  (2, 2),
  (3, 5),
  (4, 6),
  (5, 4),
  (6, 5),
  (7, 8),
  (8, 6),
  (9, 10),
  (10, 9),
  (11, 8),
  (11, 9),
  (12, 10),
  (13, 14),
  (13, 15),
  (14, 7),
  (15, 8),
  (16, 10),
  (17, 12),
  (18, 11),
  (19, 12),
  (20, 6),
  (21, 7),
  (21, 8),
  (22, 9),
  (23, 10),
  (24, 12),
  (25, 11),
  (26, 1),
  (27, 2),
  (28, 5),
  (28, 6),
  (29, 12),
  (30, 14),
  (30, 5)
`;

const seedDatabase = async () => {
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE research_Papers (
        paper_id INT AUTO_INCREMENT, 
        paper_title VARCHAR(50), 
        conference TEXT, 
        publish_date DATE,
        PRIMARY KEY(paper_id)
    )`;

  const CREATE_PAPERS_AUTHORS_TABLE = `
      CREATE TABLE papers_Authors (
        paper_id INT,
        author_no INT,
        FOREIGN KEY (paper_id) REFERENCES research_Papers (paper_id),
        FOREIGN KEY (author_no) REFERENCES authors(author_no),
        PRIMARY KEY (paper_id, author_no)
      )
      `;
  try {
    await execQuery("DROP TABLE IF EXISTS research_Papers");
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_PAPERS_AUTHORS_TABLE);
    authorsData.forEach(async (author) => {
      await execQuery("INSERT INTO authors SET ?", author);
    });
    researchPapersData.forEach(async (paper) => {
      await execQuery("INSERT INTO research_Papers SET ?", paper);
    });
    await execQuery(INSERT_RESEARCH_PAPER_QUERY);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
