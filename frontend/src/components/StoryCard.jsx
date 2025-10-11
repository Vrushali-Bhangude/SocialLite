import React from "react";
import dp from "../assets/dp.png";

const StoryCard = ({ ProfileImage, userName }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      {/* Profile Circle */}
      <div className="w-[55px] h-[55px] bg-gradient-to-b from-blue-500 to-blue-950 rounded-full flex items-center justify-center">
        <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={ProfileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Username Below */}
      <div className="text-[13px] text-center truncate w-[60px] text-white">
        {userName}
      </div>
    </div>
  );
};

export default StoryCard;
