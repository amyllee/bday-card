import React, { useState, useRef } from "react";
import "./BirthdayCard.css"
import confetti from "canvas-confetti";
import front from "../assets/front.png"
import left from "../assets/left.png"
import right from "../assets/right.png"
import music from "../assets/sodapop.mp3";

// Launch confetti function
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });

  // burst balloons
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 70,
      angle: 60,
      origin: { x: 0.1, y: 0.8 }
    });
    confetti({
      particleCount: 50,
      spread: 70,
      angle: 120,
      origin: { x: 0.9, y: 0.8 }
    });
  }, 300);
}

export default function BirthdayCard() {
    const [open, setOpen] = useState(false);
    const audioRef = useRef(null);

    const toggleCard = () => {
        setOpen(!open);

        // play music after click
        if (audioRef.current) {
            audioRef.current.play().catch((e) => {
            console.log("Autoplay prevented:", e);
      });

        // launch confetti
        if (!open) {
            launchConfetti();
        }
    }
  };

    return (
        <div className={`card-wrapper ${open ? "open" : ""}`} onClick={toggleCard}>
            <audio ref={audioRef} src={music} loop />
            {!open ? (
                <img src={front} alt="Front of card" className="card-front" />
            ) : (
                <div className="card-opened-wrapper">
                    <div className="card-opened">
                        <img src={left} alt="Left inside page" className="card-inside-left" />
                        <img src={right} alt="Right inside page" className="card-inside-right" />
                    </div>
                </div>
            )}
        </div>
  );
}