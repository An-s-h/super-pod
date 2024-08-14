import React, { useEffect, useState, useRef } from "react";
import { IoPlayBack, IoPlayForward, IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player";
import NowPlayingPopup from "../NowPlayingPopup/NowPlayingPopup";

const AudioPlayer = () => {
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [Duration, setDuration] = useState(0);
  const [CurrentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const dispatch = useDispatch();
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const img = useSelector((state) => state.player.img);
  const tittle = useSelector((state) => state.player.tittle);
  const desc = useSelector((state) => state.player.desc);
  const audioRef = useRef();

  const formatTime = (time) => {
    const minute = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minute}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const closeAudioPlayerDiv = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(``));
    dispatch(playerActions.changeSong(``));
  };

  const handlePlayPodcast = () => {
    if (!isSongPlaying) {
      audioRef.current.play().then(() => {
        setIsSongPlaying(true);
      }).catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
      setIsSongPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      setDuration(duration);
    }
  };

  const Backward = () => {
    if (audioRef.current) {
      let newTime = Math.max(CurrentTime - 10, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const Forward = () => {
    if (audioRef.current) {
      let newTime = Math.min(CurrentTime + 10, Duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * Duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.addEventListener("timeupdate", handleTimeUpdate);
      currentAudio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener("timeupdate", handleTimeUpdate);
        currentAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [songPath]);

  return (
    <>
      <NowPlayingPopup />
      <div
        className={`${
          PlayerDivState ? "fixed" : "hidden"
        } bottom-0 left-0 w-full text-white p-4 rounded-t-xl shadow-lg backdrop-blur-md flex flex-col md:flex-row items-center justify-between bg-green-900`}
        style={{ backdropFilter: "blur(10px)" }}
      >
        <div className="flex items-center w-full md:w-auto">
          <img
            src={img}
            alt=""
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 md:border-4 border-white"
          />
          <div className="ml-3 md:ml-4">
            <div className="text-sm md:text-lg font-semibold">
              {tittle || "Unknown Title"}
            </div>
            <div className="text-xs md:text-sm opacity-75">
              {desc || "Unknown Artist"}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-1/3 w-full mt-3 md:mt-0">
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xl md:text-2xl">
            <button onClick={Backward} className="hover:scale-110 transition-transform">
              <IoPlayBack />
            </button>
            <button
              onClick={handlePlayPodcast}
              className="bg-white text-purple-600 p-2 md:p-3 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-colors"
            >
              {isSongPlaying ? <FaPause /> : <IoPlay />}
            </button>
            <button onClick={Forward} className="hover:scale-110 transition-transform">
              <IoPlayForward />
            </button>
          </div>

          <div className="w-full flex items-center justify-center mt-3">
            <input
              type="range"
              min="0"
              max="100"
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              value={(CurrentTime / Duration) * 100 || 0}
              onChange={handleSeek}
            />
          </div>
          <div className="w-full flex items-center justify-between text-xs md:text-sm mt-2">
            <span>{formatTime(CurrentTime)}</span>
            <span>{formatTime(Duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-0 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center">
            <span className="mr-2 text-sm md:text-base">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              className="w-16 md:w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              value={volume * 100}
              onChange={handleVolumeChange}
            />
          </div>
          <button
            onClick={closeAudioPlayerDiv}
            className="bg-red-500 p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          >
            <RxCross2 />
          </button>
        </div>

        <audio ref={audioRef} src={songPath} />
      </div>
    </>
  );
};

export default AudioPlayer;
