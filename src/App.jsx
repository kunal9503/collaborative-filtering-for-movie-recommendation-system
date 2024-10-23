import { useRef, useState } from "react";
import Slider from "./assets/images";
import Marquee from "react-fast-marquee";
import { FaMagnifyingGlass, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import PredictionCard from "./components/PredictionCard";
import Loader from "./components/Loader"

function App() {
  const elementRef = useRef(null);
  const scrollRef = useRef(null);
  const [arrowLeftDisable, setArrowLeftDisable] = useState(true);
  const [arrowRightDisable, setArrowRightDisable] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [responseMovies, setResponseMovies] = useState([{
    movieId: 1,
    userId: 7,
    title: "The Boys",
    genres: ["Adventure", "Horror", "Comedy", "Action"],
    prediction: 4.2
  }])

  const handleSubmit = (key) => {
    if (key.key == "Enter") {
      if (userId.length > 0) {
        setUserId("");
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleOnChange = (key) => {
    if (!isNaN(Number(key.target.value))) {
      setUserId(key.target.value);
    }
  };

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowLeftDisable(true);
      } else {
        setArrowLeftDisable(false);
      }
      if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
        setArrowRightDisable(true, "right");
      } else {
        setArrowRightDisable(false);
      }
    }, speed);
  };

  return (
    <div className={`bg-[#1E1E1E]`}>
      {isLoading && <Loader />}
      <div className="gap-5 flex overflow-hidden flex-col w-full h-fit">
        <div className="bg-[rgb(20,20,20,0.5)] z-20 h-[100dvh] w-full flex flex-col items-center justify-center absolute">
          <p
            className="text-5xl text-white font-bold"
            style={{ fontFamily: "Manrope" }}
          >
            Recommend Movies
          </p>
          <div className="w-[60%] h-14 bg-[rgb(217,217,217,0.5)] mt-5 rounded-full flex items-center py-2 px-5 justify-start">
            <FaMagnifyingGlass color="white" className="h-7 w-7" />
            <input
              className="bg-transparent text-white ml-4 h-full w-[90%] placeholder:text-white p-2 focus:outline-none focus:border-b-2"
              placeholder="Enter the User ID"
              value={userId}
              onChange={(key) => handleOnChange(key)}
              onKeyDown={(key) => handleSubmit(key)}
            />
          </div>
        </div>
        <Marquee autoFill direction="left" speed={25}>
          <div className="flex gap-5">
            {Slider.slider.slide1.map((value, idx) => (
              <img
                src={value}
                alt={idx}
                key={idx}
                className={`h-64 ${idx === 0 && "ml-5"}`}
              />
            ))}
          </div>
        </Marquee>
        <Marquee autoFill direction="right" speed={15}>
          <div className="flex gap-5">
            {Slider.slider.slide2.map((value, idx) => (
              <img
                src={value}
                alt={idx}
                key={idx}
                className={`h-64 ${idx === 0 && "ml-5"}`}
              />
            ))}
          </div>
        </Marquee>
        <Marquee autoFill direction="left" speed={25}>
          <div className="flex gap-5">
            {Slider.slider.slide4.map((value, idx) => (
              <img
                src={value}
                alt={idx}
                key={idx}
                className={`h-64 ${idx === 0 && "ml-5"}`}
              />
            ))}
          </div>
        </Marquee>
      </div>
      <div>
        <div
          className="mt-24 p-10 flex justify-between items-end"
          ref={scrollRef}
        >
          <div className="w-[70%]">
            <p
              className="text-5xl text-white font-bold"
              style={{ fontFamily: "Manrope" }}
            >
              Predictions
            </p>
            <p
              className="text-lg text-[#999999] mt-2"
              style={{ fontFamily: "Manrope" }}
            >
              The predictions of the searched user is given here of what the
              user may like by looking at the ratings given by the user on the
              watched movies and their watch history.
            </p>
          </div>
          <div className="bg-[#0F0F0F] border-[#1F1F1F] h-fit w-fit border-2 p-3 rounded-md flex items-center justify-center">
            <button
              className={`h-12 w-12 rounded-md ${
                arrowLeftDisable
                  ? "bg-[#0F0F0F]"
                  : "bg-[#1A1A1A] hover:bg-[#2c2c2c] border-2 border-[#1F1F1F]"
              } items-center justify-center flex`}
              onMouseDown={() => {
                handleHorizantalScroll(elementRef.current, 25, 100, -10);
              }}
              disabled={arrowLeftDisable}
            >
              <FaArrowLeft
                color={arrowLeftDisable ? "#ABABAB" : "white"}
                className="h-6 w-6"
              />
            </button>
            <button
              className={`h-12 w-12 rounded-md ${
                arrowRightDisable
                  ? "bg-[#0F0F0F] border-0"
                  : "bg-[#1A1A1A] hover:bg-[#2c2c2c] border-2 border-[#1F1F1F]"
              } items-center justify-center flex ml-4`}
              onMouseDown={() => {
                handleHorizantalScroll(elementRef.current, 25, 100, 10);
              }}
              disabled={arrowRightDisable}
            >
              <FaArrowRight
                color={arrowRightDisable ? "#ABABAB" : "white"}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
        
          {responseMovies.length === 0 ? (
            <p className="text-xl text-white mt-6">
            No user found
          </p>
          ) : (
            <div
          className="flex gap-5 overflow-hidden mx-10 pb-20"
          ref={elementRef}
        >
          {responseMovies.map((value, idx) => (
            <PredictionCard
            key={idx}
            movie_title={value.title}
            movie_prediction={value.prediction}
            movie_genres={value.genres}
          />
          ))}
              {/* <PredictionCard
            movie_title={"Movie Name"}
            movie_prediction={4.32}
            movie_genres={[
              "Adventure",
              "Animation",
              "Children",
              "Comedy",
              "Fantasy",
              "Action",
              "Drama",
              "Romance",
              "Murder",
              "Science",
            ]}
          />
           */}
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
