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
  connection.connect();

  try {
    await execQuery("START TRANSACTION");

    await execQuery(
      "UPDATE account SET balance = balance - 1000 WHERE account_number = 101"
    );
    await execQuery(
      "UPDATE account SET balance = balance + 1000 WHERE account_number = 102"
    );
    await execQuery(
      `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
        (101, 1000, NOW(), "Transaction to 102")`
    );

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
};

seedDatabase();
