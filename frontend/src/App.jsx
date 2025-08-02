

import happyGift from "./assets/happyGift.json";
import cretificate from "./assets/cretificate.json";
import invitation from "./assets/invitation.json";
import connection from "./assets/connection.json";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const FlipCard = ({ animation, title, description }) => {
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    let interval;
    if (isMobile) {
      interval = setInterval(() => {
        setFlipped((prev) => !prev);
      }, 3000);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (interval) clearInterval(interval);
    };
  }, [isMobile]); 

  const handleClick = () => {
    if (isMobile) {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className="w-60 h-60 relative group"
      style={{ perspective: "1000px", marginTop: "1rem" }}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        } ${!isMobile ? "group-hover:[transform:rotateY(180deg)]" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-4"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Lottie animationData={animation} className="w-30 h-30" loop={true} />
          <h2 className="text-xl font-semibold text-gray-800 text-center font-['Poppins']">
            {title}
          </h2>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-white rounded-xl shadow-xl flex items-center justify-center p-6 rotate-y-180"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <p className="text-xl font-semibold text-gray-800 text-center font-['Poppins']">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 ">
      {/* Gradient Text with Underline on Hover */}
      <h1
        className="text-4xl font-extrabold text-transparent bg-clip-text relative mb-10 cursor-pointer"
        style={{
          backgroundImage: "linear-gradient(to right, #06b6d4, #3b82f6)", // cyan-400 to blue-500
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.setProperty(
            "--underline-width",
            "100%"
          );
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.setProperty(
            "--underline-width",
            "0%"
          );
        }}
      >
        Incentives
        <span
          style={{
            content: "''",
            position: "absolute",
            left: 0,
            bottom: -4,
            height: "3px",
            width: "var(--underline-width, 0%)",
            backgroundImage: "linear-gradient(to right, #06b6d4, #3b82f6)",
            transition: "width 0.4s ease-in-out",
            display: "block",
          }}
        ></span>
      </h1>

      {/* Flip Cards */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
        <FlipCard
          animation={happyGift}
          title="Premium Hampers"
          description="Premium gifts assortments and curated hampers presented upon the fest conclusion"
        />
        <FlipCard
          animation={cretificate}
          title="Certificate of Merit"
          description="Exclusive certificate awarded in recognition of outstanding performance"
        />
        <FlipCard
          animation={invitation}
          title="Formal Access Privilege"
          description="Entitled to attend all formal events and official programs conducted by Shaurya, IIT Kharagpur."
        />
        <FlipCard
          animation={connection}
          title="Pan-College Networking Opportunity"
          description="Engage with students from IIT Kharagpur and diverse colleges across the country."
        />
      </div>
    </div>
  );
};

export default App;