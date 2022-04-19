import mysql from "mysql";
import util from "util";
import prompt from "prompt";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: false,
});
// declare multipleStatements as false to prevent multiple queries

const input = util.promisify(prompt.get.bind(this));

const queryDatabase = async () => {
  const table_name = "country";
  let country_name;
  let country_code;

  prompt.start();
  try {
    const inputResults = await input(["country_name", "country_code"]);
    country_name = inputResults.country_name;
    country_code = inputResults.country_code;
    // getPopulation(table_name, country_name, country_code, showResults);
    sanitizedGetPopulation(table_name, country_name, country_code, showResults);
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

// SQL injection without sanitizing
// country_name: x 'OR' 1=1     and   country_code: y 'OR' 1=1;
// By entering these values, the population of all countries can be obtained.
function getPopulation(table_name, country_name, country_code, showResults) {
  connection.query(
    `SELECT Population FROM ${table_name} WHERE Name = '${country_name}' and code = '${country_code}'`,
    function (err, result) {
      if (err) {
        showResults(err)
      };

      if (result.length == 0) {
        showResults(new Error("Not found"))
      };

      showResults(null, result);
    }
  );
}

// sanitize query by using  a question mark syntax
const sanitizedGetPopulation = (table_name, country_name, country_code, showResults) => {
  const sanitizedQuery =
    `SELECT Population FROM ${table_name} WHERE Name =` +
    connection.escape(country_name) +
    "AND Code =" +
    connection.escape(country_code);
    
  connection.query(sanitizedQuery, function (err, result) {
    if (err) {
      showResults(err)
    };

    if (result.length == 0) {
      showResults(new Error("Not found"))
    };

    showResults(null, result);
  });
};

const showResults = (error, results) => {
  if (error) {
    throw error
  };

  console.log(results);
};

queryDatabase();
