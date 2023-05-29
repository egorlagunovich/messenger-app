import React from "react";

export default function Home() {
  return (
    <section className="py-24 flex items-center justify-center bg-white">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <h1 className="text-mainBlue mt-3 sm:text-[3.5rem] text-lg font-bold leading-[4rem] tracking-tight">
            General chat for communication!
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400">
            Use the app to chat and send messages free from anywhere in the
            world!
            <br />
            You need to login to use chat!
          </p>
        </div>
      </div>
    </section>
  );
}
