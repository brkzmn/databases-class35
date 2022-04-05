import util from "util";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

const createInviteeTableQuery = `
  CREATE TABLE Invitee (
    invitee_no INT, 
    invitee_name varchar(50), 
    invited_by varchar(50)
  )`;

const insertInviteeQuery = `
  INSERT INTO Invitee VALUES 
    (1, "John Doe", "Gordon Norman"), 
    (2, "Thomas Toe", "Samuel Serif"), 
    (3, "Pelican Steve", "Gunther Beard"), 
    (4, "Jake Weary", "Russell Sprout"), 
    (5, "Fletch Skinner", "Will Barrow")
  `;

const createRoomTableQuery = `
  CREATE TABLE Room (
    room_no INT, 
    room_name varchar(50), 
    floor_number INT
  )`;

const insertRoomQuery = `
  INSERT INTO Room VALUES 
    (601, "The ABC Room", 6), 
    (602, "The Growth Room", 6), 
    (603, "The Freedom Room", 6), 
    (701, "The Orion Room", 7), 
    (702, "The Focus Room", 7)
  `;

const createMeetingTableQuery = `
  CREATE TABLE Meeting (
    meeting_no INT, 
    meeting_title text, 
    starting_time DATETIME, 
    ending_time DATETIME, 
    room_no INT)
  `;

const insertMeetingQuery = `
  INSERT INTO Meeting VALUES 
    (10, 'Meeting About HTML', '2022-03-23 12:30:00', '2022-03-23 15:30:00', 601), 
    (11, 'Meeting About CSS', '2022-03-24 12:30:00', '2022-03-24 15:30:00', 603), 
    (12, 'Meeting About JavaScript', '2022-03-24 15:30:00', '2022-03-24 17:30:00', 604), 
    (14, 'Meeting About NodeJS', '2022-03-25 11:30:00', '2022-03-25 16:30:00', 701), 
    (15, 'Meeting About React', '2022-03-26 12:30:00', '2022-03-26 14:30:00', 702)
  `;

const seedDatabase = async () => {
  connection.connect();
  try {
    await execQuery("DROP DATABASE IF EXISTS meetup");
    await execQuery("CREATE DATABASE meetup");
    await execQuery("USE meetup");
    await execQuery(createInviteeTableQuery);
    await execQuery(createRoomTableQuery);
    await execQuery(createMeetingTableQuery);
    await execQuery(insertInviteeQuery);
    await execQuery(insertRoomQuery);
    await execQuery(insertMeetingQuery);
  } catch (error) {
    console.error(error);
  }

  connection.end();
};

seedDatabase();
