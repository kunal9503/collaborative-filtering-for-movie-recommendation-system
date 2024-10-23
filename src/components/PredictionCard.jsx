import React from "react";

export default function PredictionCard({
  movie_title,
  movie_prediction,
  movie_genres,
}) {
  return (
    <div className="bg-[rgb(2,0,36)] bg-gradient-to-tr from-[rgba(2,0,36,1)] from-0% via-[rgba(0,0,0,1)] via-60% to-[#420707] to-100% p-10 h-64 border-2 border-[#262626] rounded-2xl w-[500px] shrink-0">
      <div className="flex justify-between">
        <p className="text-white font-bold text-xl manrope">{movie_title}</p>
        <p className="text-[#B1B1B1] text-lg">Prediction: {movie_prediction}</p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-3 mt-6">
        {movie_genres.map((genre, id) => (
          <div
            className="bg-[#141414] h-fit rounded-full px-2 border-2 border-[#262626]"
            key={id}
          >
            <p className="text-md text-white text-nowrap manrope">
              {genre}
              {/* {genre.length > 6 ? `${genre.substring(0, 4)}...` : genre} */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
