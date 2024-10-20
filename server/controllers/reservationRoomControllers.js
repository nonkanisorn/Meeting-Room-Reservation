const mysql = require("mysql");
const moment = require("moment");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "MeetingRoomReservationDB",
});

const db = con;

exports.reservationRoom = (req, res) => {
  const user_id = req.body.user_id;
  const room_id = req.params.room_id;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const formattimestart = moment(start_time).format("YYYY-MM-DD HH:mm:ss");
  const formattimeend = moment(end_time).format("YYYY-MM-DD HH:mm:ss");
  const status_id = 2;
  console.log(room_id);
  try {
    db.query(
      `UPDATE rooms SET room_status = ? , user_id = ?  WHERE room_id = ? `,
      [status_id, user_id, room_id],
      (error, result) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          return res.send(result);
        }
      },
    );
    db.query(
      `UPDATE booking SET start_time = ?, end_time = ?  where room_id = ?`,
      [formattimestart, formattimeend, room_id],
      (error, result) => {
        if (error) {
          return console.log(error);
        } else {
          return console.log(result);
        }
      },
    );
  } catch (error) {
    return res.send(error);
  }
};

exports.reservationRoomHour = (req, res) => {};
exports.checkout = (req, res) => {
  const room_id = req.params.room_id;
  const status_id = 3;
  const checkout_time = new Date();
  const currentTime = new Date();
  try {
    db.query(
      "SELECT start_time,end_time FROM booking WHERE room_id = ? ",
      [room_id],
      (error, result) => {
        if (error) {
          res.send(error);
        }
        // res.send(result[0].end_time);
        {
          if (currentTime > result[0].end_time) {
            return res.send("มีค่าปรับ");
          } else {
            db.query(
              `UPDATE booking SET checkout_time = ? WHERE room_id = ? `,
              [checkout_time, room_id],
              (error, result) => {
                if (error) {
                  return res.send(error);
                } else {
                  return res.send(result);
                }
              },
            );
            db.query(
              `UPDATE rooms SET room_status = ? WHERE room_id = ? `,
              [status_id, room_id],
              (error, result) => {
                if (error) {
                  return res.send(error);
                } else {
                  return res.send(result);
                }
              },
            );
          }
        }
      },
    );
  } catch (error) {
    res.send(error);
  }
};
