import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

const execQuery = util.promisify(connection.query.bind(connection));

const showAggregateQueryResults = async () => {
  try {
    const papersAuthorNumber =
      await execQuery(`SELECT R.paper_title, COUNT(R.paper_title ) AS "Number of Authors" FROM authors A 
    INNER JOIN papers_Authors PA ON A.author_no = PA.author_no
    INNER JOIN research_Papers R ON PA.paper_id = R.paper_id GROUP BY R.paper_title`);
    console.log(papersAuthorNumber);
    const sumPapersFemaleData = await execQuery(
      `SELECT COUNT(paper_title) AS "Papers Number By Females" FROM authors A 
      INNER JOIN papers_Authors PA ON A.author_no = PA.author_no
      INNER JOIN research_Papers R ON PA.paper_id = R.paper_id GROUP BY gender HAVING gender = "f"`
    );
    console.log(sumPapersFemaleData);
    const hIndexAvg = await execQuery(
      `SELECT AVG(h_index), university FROM authors GROUP BY university`
    );
    console.log(hIndexAvg);
    const sumPaperUniversityData = await execQuery(
      `SELECT COUNT(R.paper_id) AS "Research Paper Amount", university FROM authors A 
      INNER JOIN papers_Authors PA ON A.author_no = PA.author_no
      INNER JOIN research_Papers R ON PA.paper_id = R.paper_id GROUP BY university;`
    );
    console.log(sumPaperUniversityData);
    const hIndexMinMax = await execQuery(
      `SELECT MIN(A.h_index), MAX(A.h_index), A.university FROM authors A 
      LEFT JOIN papers_Authors PA ON A.author_no = PA.author_no
      LEFT JOIN research_Papers R ON PA.paper_id = R.paper_id GROUP BY A.university;`
    );
    console.log(hIndexMinMax);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

showAggregateQueryResults();
