import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="relative flex flex-col justify-center items-center rounded-3xl m-4 py-4 px-6 h-72 min-w-[175px] max-w-[175px] shadow-neumorphicCard hover:shadow-neumorphicCardOver transition transform duration-500 ease-in-out">
      <div className="animate-pulse flex flex-col">
        <div className="rounded-full bg-slate-700 h-24 w-24 mb-2"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4 self-center mb-4"></div>
        <div className="h-3 bg-slate-700 rounded w-full self-center mb-4"></div>
        <div className="flex items-center justify-between mt-4 w-full text-center">
          <div className="h-3 bg-slate-700 rounded w-1/3"></div>
          <div className="h-3 bg-slate-700 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
