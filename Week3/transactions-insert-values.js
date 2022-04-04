import util from "util";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const INSERT_ACCOUNT_TABLE = `
    INSERT IGNORE INTO account VALUES
        (101, 5000.35),
        (102, 6500.40),
        (103, 4300),
        (104, 2200)
    `;

  const INSERT_ACCOUNT_CHANGES_TABLE = `
    INSERT INTO account_changes 
    (account_number, amount, changed_date, remark) 
    VALUES
        (101, 200, NOW(), "New Transaction"),
        (102, 300.15, NOW(), "Second Transaction"),
        (103, 150.25, NOW(), "Third Transaction"),
        (104, 1000, NOW(), "Forth Transaction")
        `;

  try {
    await execQuery(INSERT_ACCOUNT_TABLE);
    await execQuery(INSERT_ACCOUNT_CHANGES_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
