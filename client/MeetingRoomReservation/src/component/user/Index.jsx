import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Index() {
  const baseUrl = import.meta.env.VITE_baseUrl;
  const [room, setRoom] = useState([]);
  const nav = useNavigate();
  const getRoomData = async () => {
    const res = await axios.get(`http://localhost:5056/room`);
    setRoom(res.data);
  };
  const rentroom = (room_id) => {
    axios
      .patch(`http://localhost:5056/reservationroom/${room_id}`)

      .then((err, result) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("room", room);
  useEffect(() => {
    getRoomData();
  }, []);
  return (
    <>
      {room.length > 0 ? (
        room.map((item) => (
          <>
            <button
              key={item.id}
              className="rounded-none bg-green-400 text-white w-80 ml-4 h-60"
              onClick={(e) => nav(`/detailrent/${item.room_id}`)}
            >
              <div className="text-red-500  ">{item.room_name}</div>
              จองห้องประชุม
            </button>
          </>
        ))
      ) : (
        <p>loading</p>
      )}
    </>
  );
}

export default Index;
