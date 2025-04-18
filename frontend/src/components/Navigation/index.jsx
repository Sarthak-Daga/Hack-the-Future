"use client";
import { BtnList } from "./data";
import React, { useEffect, useState } from "react";

const Navigation = () => {
  const filteredBtnList = BtnList.slice(0, 8);
  const angleIncrement = 360 / filteredBtnList.length;

  const [radiusX, setRadiusX] = useState(window.innerWidth * 0.45);
  const [radiusY, setRadiusY] = useState(window.innerHeight * 0.5);
  const [angles, setAngles] = useState(filteredBtnList.map((_, i) => i * angleIncrement));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setRadiusX(window.innerWidth * 0.45);
      setRadiusY(window.innerHeight * 0.5);
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngles((prevAngles) => prevAngles.map(angle => (angle + 0.4) % 360));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full fixed h-screen flex items-center justify-center z-[9999] pointer-events-none">
      <div className="relative w-max h-max" style={{ position: "relative", left: "-2%" }}>
        {filteredBtnList.map((btn, index) => {
          const angleRad = (angles[index] * Math.PI) / 180;
          const x = radiusX * Math.cos(angleRad);
          const y = radiusY * Math.sin(angleRad);

          return (
            <div
              key={index}
              className="absolute flex items-center justify-center bg-white p-2 rounded-full shadow-lg pointer-events-auto transition-transform duration-[600ms] ease-out hover:scale-110"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                width: isMobile ? "50px" : "80px",
                height: isMobile ? "50px" : "80px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (btn.newTab) {
                  window.open(btn.link, "_blank");
                } else {
                  window.location.href = btn.link;
                }
              }}
            >
              <img
                src={btn.image}
                alt={btn.label}
                className={`rounded-full object-cover ${isMobile ? "w-[40px] h-[40px]" : "w-[70px] h-[50px]"}`}
              />
              {!isMobile && <span className="mt-2 text-sm font-medium text-gray-800">{btn.label}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;