const express = require("express");
const {
  reservationRoomHour,
  reservationRoom,
  checkout,
} = require("../controllers/reservationRoomControllers");
const router = express.Router();
router.post("/reservationroomhour", reservationRoomHour);
router.patch("/reservationroom/:room_id", reservationRoom);
router.patch("/checkoutroom/:room_id", checkout);
module.exports = router;
