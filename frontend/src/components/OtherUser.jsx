import React from "react";
import dp from "../assets/dp.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OtherUser = ({ user }) => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[60px] flex items-center justify-center border-b border-gray-800">
      <div className="flex items-center p-4 w-full justify-between">
        {/* Profile Image */}
        <div className="w-[50px] h-[50px] border-2 border-gray-700 rounded-full overflow-hidden" onClick={()=>navigate(`/profile/${user?.userName}`)}>
          <img
            src={user?.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col ml-3 flex-grow">
          <div className="text-[14px] font-semibold text-white">
            {user?.name || "Unknown User"}
          </div>
          <div className="text-[12px] text-gray-400">
            @{user?.userName || "username"}
          </div>
        </div>
      </div>
      <button className="px-[5px] w-[100px] py-[3px] h-[40px] bg-white rounded-xl">Follow</button>
    </div>
  );
};

export default OtherUser;
