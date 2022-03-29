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
    const data = await execQuery(
      "SELECT A.author_name AS AUTHOR, M.author_name AS MENTOR FROM authors AS A left join authors AS M on A.mentor = M.author_no"
    );
    console.log(data);
    const authorPaperData =
      await execQuery(`SELECT A.*, P.paper_title FROM authors A 
      LEFT JOIN papers_Authors PA ON A.author_no = PA.author_no
      LEFT JOIN research_Papers P ON PA.paper_id = P.paper_id`);
    console.log(authorPaperData);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

showQueryResults();
