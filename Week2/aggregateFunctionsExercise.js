import mysql from "mysql";

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

const PAPERS_AUTHOR_NUMBER_QUERY = `
  SELECT R.paper_title, COUNT(R.paper_title ) AS "Number of Authors" 
    FROM authors A 
    INNER JOIN papers_Authors PA ON A.author_id = PA.author_id
    INNER JOIN research_Papers R ON PA.paper_id = R.paper_id 
    GROUP BY R.paper_title
  `;

const SUM_PAPERS_FEMALE_QUERY = `
  SELECT COUNT(paper_title) AS "Papers Number By Females" 
    FROM authors A 
    INNER JOIN papers_Authors PA ON A.author_id = PA.author_id
    INNER JOIN research_Papers R ON PA.paper_id = R.paper_id 
    GROUP BY gender 
    HAVING gender = "f"
  `;

const H_INDEX_AVG_QUERY = `
  SELECT AVG(h_index), university 
    FROM authors 
    GROUP BY university
  `;

const SUM_PAPERS_UNIVERSITY_QUERY = `
  SELECT COUNT(R.paper_id) AS "Research Paper Amount", university 
    FROM authors A 
    INNER JOIN papers_Authors PA ON A.author_id = PA.author_id
    INNER JOIN research_Papers R ON PA.paper_id = R.paper_id 
    GROUP BY university
  `;

const H_INDEX_MIN_MAX_QUERY = `
  SELECT MIN(A.h_index), MAX(A.h_index), A.university 
    FROM authors A 
    LEFT JOIN papers_Authors PA ON A.author_id = PA.author_id
    LEFT JOIN research_Papers R ON PA.paper_id = R.paper_id 
    GROUP BY A.university
  `;

showQueryResults(PAPERS_AUTHOR_NUMBER_QUERY);
showQueryResults(SUM_PAPERS_FEMALE_QUERY);
showQueryResults(H_INDEX_AVG_QUERY);
showQueryResults(SUM_PAPERS_UNIVERSITY_QUERY);
showQueryResults(H_INDEX_MIN_MAX_QUERY);
connection.end();
