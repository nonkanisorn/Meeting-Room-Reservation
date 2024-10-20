const mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "MeetingRoomReservationDB",
});

const db = con;

exports.getdata = (req, res) => {
  try {
    db.query("SELECT * FROM rooms", (result, error) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    res.send(error);
  }
};
exports.getRoomById = (req, res) => {
  const room_id = req.params.room_id;
  try {
    db.query(
      "SELECT * FROM rooms WHERE room_id = ? ",
      [room_id],
      (result, error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(result);
        }
      },
    );
  } catch (error) {
    res.send(error);
  }
};

exports.createRoom = (req, res) => {
  const { room_name, room_price } = req.body;
  try {
    db.query(
      "INSERT INTO rooms(room_name,room_price) VALUES(?,?) ",
      [room_name, room_price],
      (error, result) => {
        if (error) {
          res.send(error);
        } else {
          res.send("success create room");
        }
      },
    );
  } catch (error) {}
};

exports.updateRoom = (req, res) => {
  const { room_price, room_name, room_status } = req.body;
  const room_id = req.params.room_id;
  const updateField = [];
  var value = [];
  if (room_price) {
    updateField.push("room_price = ?");
    value.push(room_price);
  }
  if (room_name) {
    updateField.push("room_name = ?");
    value.push(room_name);
  }
  if (room_status) {
    updateField.push("room_status = ?");
    value.push(room_status);
  }
  value.push(room_id);
  const sql = `UPDATE rooms SET ${updateField} WHERE room_id = ? `;
  try {
    db.query(sql, value, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  } catch (error) {}
};

exports.deleteRoom = (req, res) => {
  const room_id = req.params.room_id;
  try {
    db.query(
      "DELETE FROM rooms WHERE room_id = ? ",
      [room_id],
      (error, result) => {
        if (error) {
          res.send(error);
        } else {
          res.send(result);
        }
      },
    );
  } catch (error) {}
};
