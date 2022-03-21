import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

const createDatabaseQuery = "CREATE DATABASE meetup";
const checkDatabaseQuery = "DROP DATABASE IF EXISTS meetup";

const createInviteeTableQuery =
  "CREATE TABLE Invitee (invitee_no int AUTO_INCREMENT, invitee_name varchar(50), invited_by varchar(50))";

const insertInviteeQuery =
  'INSERT INTO Invitee VALUES ("John Doe", "Gordon Norman"), ("Thomas Toe", "Samuel Serif"), ("Pelican Steve", "Gunther Beard"), ("Jake Weary", "Russell Sprout"), ("Fletch Skinner", "Will Barrow")';

const createRoomTableQuery =
  "CREATE TABLE Room (room_no int , room_name varchar(50), floor_number int)";

const insertRoomQuery =
  'INSERT INTO Room VALUES (601, "The ABC Room", 6), (602, "The Growth Room", 6), (603, "The Freedom Room", 6), (701, "The Orion Room", 7), (702, "The Focus Room", 7)';

const createMeetingTableQuery =
  "CREATE TABLE Meeting (meeting_no int AUTO_INCREMENT, meeting_title text, starting_time DATETIME, ending_time DATETIME, room_no int)";

const insertMeetingQuery =
  "INSERT INTO Meeting VALUES ('Meeting About HTML', '2022-03-23 12:30:00', '2022-03-23 15:30:00', 601), ('Meeting About CSS' '2022-03-24 12:30:00', '2022-03-24 15:30:00', 603), ('Meeting About JavaScript', '2022-03-24 15:30:00', '2022-03-24 17:30:00', 604), ('Meeting About NodeJS', '2022-03-25 11:30:00', '2022-03-25 16:30:00', 701), ('Meeting About React', '2022-03-26 12:30:00', '2022-03-26 14:30:00', 702)";

connection.query(checkDatabaseQuery, (error, results) => {
  if (error) throw error;
  connection.query(createDatabaseQuery, (error, results));
  console.log("created", results);
});
