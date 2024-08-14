import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { playerActions } from "../../store/player";

const PodcastCard = ({ items }) => {
  const dispatch = useDispatch();

  const HandlePlay = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      dispatch(playerActions.setDiv());
      dispatch(
        playerActions.changeImage(`${items.frontImage}`)
      );
      dispatch(
        playerActions.changeSong(`${items.audioFile}`)
      );
      dispatch(playerActions.changeTittle(items.title));
      dispatch(playerActions.changeDesc(items.description));
    }
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="rounded-2xl w-full max-w-xl mx-auto border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link
        to={`/description/${items._id}`}
        className="rounded-2xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
      >
        <div className="overflow-hidden">
          <img
            src={`${items.frontImage}`}
            alt="Podcast"
            className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col h-64 justify-between">
          <div>
            <div className="text-xl font-semibold text-gray-900 truncate">
              {items.title}
            </div>
            <div className="mt-2 text-gray-700 text-sm overflow-hidden overflow-ellipsis line-clamp-3 h-16">
              {items.description}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
              {items.category.categoryName}
            </span>
            <Link
              to={isLoggedIn ? "#" : "/signup"}
              className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
              onClick={HandlePlay}
            >
              Play Now
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PodcastCard;
