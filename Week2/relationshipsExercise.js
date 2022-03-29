import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

const execQuery = util.promisify(connection.query.bind(connection));

export const INSERT_AUTHORS_QUERY = `
INSERT INTO authors VALUES
  (1, "Hugh Millie-Yate", "University of Amsterdam", "1964-08-20", 5, "m", NULL),
  (2, "Enise Unique", "Utrecht University", "1995-07-31", 6, "f", 1),
  (3, "Sue Shei", "Leiden University", "1995-12-14", 2, "f", 1),
  (4, "Alan Fresco", "Maastricht University", "1984-05-05", 15, "m", 1),
  (5, "Fleece Marigold", "Maastricht University", "1963-04-12", 30, "f", NULL),
  (6, "Desmond Eagle", "Erasmus University Rotterdam", "1995-08-29", 3, "m", 5),
  (7, "Parsley Montana", "Tilburg University", "1983-08-16", 22, "m", 5),
  (8, "Hilary Ouse", "Utrecht University", "1964-03-20", 42, "f", 5),
  (9, "Justin Case", "University of Twente", "1971-04-26", 38, "m", 8),
  (10, "Spruce Springclean", "University of Twente", "1986-02-16", 34, "m", 7),
  (11, "Avi Cabrera", "University of Twente", "1995-07-30", 6, "f", 10),
  (12, "Honey Singh", "Erasmus University Rotterdam", "1967-12-24", 45, "f", 3),
  (13, "Angela Shyla", "Radboud University Nijmegen", "1972-06-14", 29, "f", 12),
  (14, "Elyas Erickson", "Erasmus University Rotterdam", "1979-01-02", 36, "m", 12),
  (15, "Anne-Marie Grimes", "Radboud University Nijmegen", "1980-08-20", 33, "f", 13)
`;

export const INSERT_RESEARCH_PAPERS_QUERY = `
INSERT INTO research_Papers VALUES
  (1, "Research About A", "1. International Conference", "2018-09-12"),
  (2, "Research About B", "2. International Conference", "2015-03-12"),
  (3, "Research About C", "3. International Conference", "2021-05-10"),
  (4, "Research About D", "4. International Conference", "2018-05-24"),
  (5, "Research About E", "5. International Conference", "2019-06-07"),
  (6, "Research About F", "6. International Conference", "2017-01-12"),
  (7, "Research About G", "7. International Conference", "2017-07-16"),
  (8, "Research About H", "8. International Conference", "2017-08-16"),
  (9, "Research About I", "9. International Conference", "2018-04-07"),
  (10, "Research About J", "10. International Conference", "2016-06-01"),
  (11, "Research About K", "11. International Conference", "2017-01-27"),
  (12, "Research About L", "12. International Conference", "2015-02-12"),
  (13, "Research About M", "13. International Conference", "2016-01-02"),
  (14, "Research About N", "14. International Conference", "2015-07-13"),
  (15, "Research About O", "15. International Conference", "2020-07-12"),
  (16, "Research About P", "16. International Conference", "2021-11-28"),
  (17, "Research About Q", "17. International Conference", "2018-03-31"),
  (18, "Research About R", "18. International Conference", "2015-05-20"),
  (19, "Research About S", "19. International Conference", "2016-03-12"),
  (20, "Research About T", "20. International Conference", "2021-04-05"),
  (21, "Research About U", "21. International Conference", "2015-04-29"),
  (22, "Research About V", "22. International Conference", "2015-08-13"),
  (23, "Research About Y", "23. International Conference", "2018-11-08"),
  (24, "Research About Z", "24. International Conference", "2021-03-06"),
  (25, "Research About ABC", "25. International Conference", "2015-10-09"),
  (26, "Research About BCD", "26. International Conference", "2019-06-15"),
  (27, "Research About DEF", "27. International Conference", "2020-05-03"),
  (28, "Research About FGH", "28. International Conference", "2018-08-02"),
  (29, "Research About HIJ", "29. International Conference", "2018-09-17"),
  (30, "Research About IJK", "30. International Conference", "2021-11-11")
`;

const INSERT_PAPERS_AUTHORS_QUERY = `
INSERT INTO papers_Authors VALUES
  (1, 1),
  (2, 5),
  (2, 2),
  (3, 5),
  (4, 6),
  (5, 4),
  (6, 5),
  (7, 8),
  (8, 6),
  (9, 10),
  (10, 9),
  (11, 8),
  (11, 9),
  (12, 10),
  (13, 14),
  (13, 15),
  (14, 7),
  (15, 8),
  (16, 10),
  (17, 12),
  (18, 11),
  (19, 12),
  (20, 6),
  (21, 7),
  (21, 8),
  (22, 9),
  (23, 10),
  (24, 12),
  (25, 11),
  (26, 1),
  (27, 2),
  (28, 5),
  (28, 6),
  (29, 12),
  (30, 14),
  (30, 5)
`;

const seedDatabase = async () => {
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE research_Papers (
        paper_id INT, 
        paper_title VARCHAR(50), 
        conference TEXT, 
        publish_date DATE,
        PRIMARY KEY(paper_id)
    )`;

  const CREATE_PAPERS_AUTHORS_TABLE = `
      CREATE TABLE papers_Authors (
        paper_id INT,
        author_no INT,
        FOREIGN KEY (paper_id) REFERENCES research_Papers (paper_id),
        FOREIGN KEY (author_no) REFERENCES authors(author_no),
        PRIMARY KEY (paper_id, author_no)
      )
      `;
  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_PAPERS_AUTHORS_TABLE);
    await execQuery(INSERT_AUTHORS_QUERY);
    await execQuery(INSERT_RESEARCH_PAPERS_QUERY);
    await execQuery(INSERT_PAPERS_AUTHORS_QUERY);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
