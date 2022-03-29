import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

const showQueryResults = (queryStr) => {
  connection.query(queryStr, (error, results) => {
    if (error) throw error;
    console.log(results);
  });
};

const PAPERS_AUTHORS_QUERY = `
SELECT A.author_name AS AUTHOR, M.author_name AS MENTOR FROM authors AS A left join authors AS M on A.mentor = M.author_no
`;

const AUTHORS_PAPERS_QUERY = `
SELECT A.*, P.paper_title FROM authors A 
  LEFT JOIN papers_Authors PA ON A.author_no = PA.author_no
  LEFT JOIN research_Papers P ON PA.paper_id = P.paper_id
`;

showQueryResults(PAPERS_AUTHORS_QUERY);
showQueryResults(AUTHORS_PAPERS_QUERY);
connection.end();
