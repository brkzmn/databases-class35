import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect();

const connectionHandler = (error, results) => {
  if (error) throw error;
  console.log(results);
};

connection.query(
  "SELECT Name as 'City - greater than 8 mln' FROM city WHERE Population > 8000000",
  connectionHandler
);

connection.query(
  `SELECT Name as 'country - with land' FROM country WHERE Name LIKE '%land%'`,
  connectionHandler
);

connection.query(
  "SELECT Name as 'city - between 500k - 1 mln' FROM city WHERE Population BETWEEN 500000 AND 1000000",
  connectionHandler
);

connection.query(
  "SELECT NAME as 'country in Europe' FROM country WHERE Continent = 'Europe'",
  connectionHandler
);

connection.query(
  "SELECT * FROM country ORDER BY SurfaceArea DESC",
  connectionHandler
);

connection.query(
  "SELECT Name as 'city in NLD' FROM city WHERE CountryCode = 'NLD'",
  connectionHandler
);

connection.query(
  "SELECT Population as 'Population of Rotterdam' FROM city WHERE Name = 'Rotterdam'",
  connectionHandler
);

connection.query(
  "SELECT Name as 'large country' FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  connectionHandler
);

connection.query(
  "SELECT * FROM city ORDER BY Population DESC LIMIT 10",
  connectionHandler
);

connection.query(
  "SELECT SUM(Population) AS 'World Population' FROM country",
  connectionHandler
);

connection.end();
