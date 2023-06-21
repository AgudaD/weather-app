import { useState } from "react";
import search from "./assets/Search.gif";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e9ac057fd0556c43d790d633a36161fb`;

  const searchLocation = (event) => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
  };

  return (
    <div className="bg-[#e0dede] min-h-screen px-10 py-6">
      <div className="relative w-[12rem] mb-12">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="bg-gray-300 rounded-full p-3 outline-none focus:p-3"
        />
        <img
          src={search}
          alt=""
          className="absolute top-[14px] right-0 w-5 z-50 cursor-pointer"
          onClick={searchLocation}
        />
      </div>

      <div className="flex flex-col justify-between h-[40rem]">
        <div className="relative">
          <p className="text-xl font-medium">{data.name}</p>
          {data.main ? (
            <p className="text-5xl font-semibold">{data.main.temp}°F</p>
          ) : null}

          {data.weather ? (
            <p className="absolute top-5 right-0 -rotate-90 font-medium text-lg">
              {data.weather[0].main}
            </p>
          ) : null}
        </div>

        {data.name != undefined && (
          <div className="flex justify-center items-center">
            <div className="bg-gray-300 flex items-start gap-12 px-4 py-3 text-center rounded-full md:gap-24 md:px-8">
              <div className="font-medium text-xs md:text-lg">
                {data.main ? (
                  <p className="absolute top-5 right-0 -rotate-90 font-medium text-lg">
                    {data.main.feels_like}°F
                  </p>
                ) : null}
                <p>feels like</p>
              </div>
              <div className="font-medium text-xs md:text-lg">
                {data.main ? (
                  <p className="absolute top-5 right-0 -rotate-90 font-medium text-lg">
                    {data.main.humidity}%
                  </p>
                ) : null}
                <p>humidity</p>
              </div>
              <div className="font-medium text-xs md:text-lg">
                {data.wind ? (
                  <p className="absolute top-5 right-0 -rotate-90 font-medium text-lg">
                    {data.wind.speed}MPH
                  </p>
                ) : null}
                <p>wind speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
