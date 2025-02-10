"use client";

import {
  breakLengthDec,
  breakLengthInc,
  reset,
  runningToggle,
  sessionLengthDec,
  sessionLengthInc,
  timeDec,
} from "@/state/features/counter_slice";
import { RootState } from "@/state/store";
import { ArrowBigDown, ArrowBigUp, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const breakLength = useSelector(
    (state: RootState) => state.counter.breakLength
  );
  const sessionLength = useSelector(
    (state: RootState) => state.counter.sessionLength
  );
  const time = useSelector((state: RootState) => state.counter.time);
  const isRunning = useSelector((state: RootState) => state.counter.isRunning);

  const dispatch = useDispatch();

  const min = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        dispatch(timeDec());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [time, dispatch, isRunning]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 via-black to-gray-800 p-6">
      {/* Card Container */}
      <div className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 rounded-3xl p-8 text-white w-full max-w-lg text-center">
        <h1 className="text-5xl font-extrabold tracking-wide mb-6 neon-text">
          25 + 5 CLOCK
        </h1>

        <div className="flex justify-center items-center gap-12">
          {/* Break Length */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-semibold uppercase tracking-wide">
              Break Length
            </h2>
            <div className="flex items-center gap-4">
              <button
                className="p-3 bg-white/20 hover:bg-white/40 transition-all duration-300 rounded-xl shadow-md active:scale-95"
                onClick={() => dispatch(breakLengthDec())}
              >
                <ArrowBigDown size={36} />
              </button>
              <span className="text-4xl font-bold">{breakLength}</span>
              <button
                className="p-3 bg-white/20 hover:bg-white/40 transition-all duration-300 rounded-xl shadow-md active:scale-95"
                onClick={() => dispatch(breakLengthInc())}
              >
                <ArrowBigUp size={36} />
              </button>
            </div>
          </div>

          {/* Session Length */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-semibold uppercase tracking-wide">
              Session Length
            </h2>
            <div className="flex items-center gap-4">
              <button
                className="p-3 bg-white/20 hover:bg-white/40 transition-all duration-300 rounded-xl shadow-md active:scale-95"
                onClick={() => dispatch(sessionLengthDec())}
              >
                <ArrowBigDown size={36} />
              </button>
              <span className="text-4xl font-bold">{sessionLength}</span>
              <button
                className="p-3 bg-white/20 hover:bg-white/40 transition-all duration-300 rounded-xl shadow-md active:scale-95"
                onClick={() => dispatch(sessionLengthInc())}
              >
                <ArrowBigUp size={36} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Section */}
      <div
        className={`mt-8 bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center  ${
          time < 60 ? "text-red-500" : "text-white"
        } w-72`}
      >
        <h2 className="text-3xl font-bold uppercase mb-2 tracking-wide">
          Session
        </h2>
        <div
          className={`text-6xl font-extrabold tracking-widest neon-text ${
            time < 60 ? "text-red-500" : "text-white"
          }`}
        >
          {min}:{secs}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-6">
        <button
          className="p-4 bg-green-600/80 hover:bg-green-600 transition-all duration-300 rounded-full shadow-lg active:scale-90"
          onClick={() => dispatch(runningToggle())}
        >
          {isRunning ? (
            <Pause size={36} className="text-white" />
          ) : (
            <Play size={36} className="text-white" />
          )}
        </button>

        <button
          className="p-4 bg-red-600/80 hover:bg-red-600 transition-all duration-300 rounded-full shadow-lg active:scale-90"
          onClick={() => dispatch(reset())}
        >
          <RotateCcw size={36} className="text-white" />
        </button>
      </div>
    </div>
  );
}
