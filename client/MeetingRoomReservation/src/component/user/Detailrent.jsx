import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function Detailrent() {
  const baseUrl = import.meta.env.VITE_baseUrl;
  const { room_id } = useParams();
  const [dataRoom, setDataRoom] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const user_id = 1;
  const reservationRoom = async () => {
    const result = await axios.patch(`${baseUrl}reservationroom/${room_id}`, {
      user_id,
      start_time: startDate,
      end_time: endTime,
    });
    console.log("result", result);
  };
  console.log("start", startDate);
  console.log("end", endTime);
  const getRoomById = async (room_id) => {
    try {
      const result = await axios.get(`${baseUrl}room/${room_id}`);
      setDataRoom(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (room_id) {
      getRoomById(room_id);
    }
  }, [room_id]);
  return (
    <div>
      {dataRoom !== undefined ? (
        dataRoom.map((item) => (
          <>
            <div>รายละเอียด</div>
            <div>{item.room_price}</div>
            <div>รูปภาพ</div>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
            />
            <button
              className="block mt-16 w-80 h-16 rounded-full bg-blue-500"
              onClick={reservationRoom}
            >
              ยืนยัน
            </button>
          </>
        ))
      ) : (
        <div>loading</div>
      )}
    </div>

    // <div>test</div>
  );
}

export default Detailrent;
