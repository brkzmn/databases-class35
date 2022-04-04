import util from "util";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE account (
      account_number INT NOT NULL,
      balance DECIMAL(19, 2),
      PRIMARY KEY(account_number)
      )`;

  const CREATE_ACCOUNT_CHANGES_TABLE = `
      CREATE TABLE account_changes (
        change_number INT NOT NULL AUTO_INCREMENT,
        account_number INT,
        amount DECIMAL(19 , 2),
        changed_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(100),
        PRIMARY KEY(change_number),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
        )`;

  try {
    await execQuery("DROP DATABASE IF EXISTS week3");
    await execQuery("CREATE DATABASE week3");
    await execQuery("USE week3");
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
    await execQuery("ALTER TABLE account_changes AUTO_INCREMENT=10001");
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
