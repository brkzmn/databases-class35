import util from "util";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  connection.connect();
  try {
    await execQuery(
      `SELECT Name as 'City - greater than 8 mln' FROM city WHERE Population > 8000000`
    );
    await execQuery(
      `SELECT Name as 'country - with land' FROM country WHERE Name LIKE '%land%'`
    );
    await execQuery(
      `SELECT Name as 'city - between 500k - 1 mln' FROM city WHERE Population BETWEEN 500000 AND 1000000`
    );
    await execQuery(
      `SELECT NAME as 'country in Europe' FROM country WHERE Continent = 'Europe'`
    );
    await execQuery(`SELECT * FROM country ORDER BY SurfaceArea DESC`);
    await execQuery(
      `SELECT Name as 'city in NLD' FROM city WHERE CountryCode = 'NLD'`
    );
    await execQuery(
      `SELECT Population as 'Population of Rotterdam' FROM city WHERE Name = 'Rotterdam'`
    );
    await execQuery(
      `SELECT Name as 'large country' FROM country ORDER BY SurfaceArea DESC LIMIT 10`
    );
    await execQuery(`SELECT * FROM city ORDER BY Population DESC LIMIT 10`);
    await execQuery(
      `SELECT SUM(Population) AS 'World Population' FROM country`
    );
  } catch (error) {
    console.error(error);
  }

  connection.end();
};

seedDatabase();
