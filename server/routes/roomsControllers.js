const express = require("express");
const {
  getdata,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
} = require("../controllers/roomsControllers");
const {
  reservationRoom,
} = require("../controllers/reservationRoomControllers");
const router = express.Router();
router.get("/room", getdata);
router.get("/room/:room_id", getRoomById);
router.post("/room", createRoom);
router.patch("/room/:room_id", updateRoom);
router.delete("/room/:room_id", deleteRoom);
module.exports = router;
