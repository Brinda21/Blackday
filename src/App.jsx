import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [noStyle, setNoStyle] = useState({});
  const [typedText, setTypedText] = useState("");
  const [showMedia, setShowMedia] = useState(false);

  const date = "14 February 2019";

  const message =
    "On this Black Day, we remember the brave souls who sacrificed everything for our nation. Their courage will never fade.";

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);

    setNoStyle({
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  useEffect(() => {
    if (step === 2) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(message.slice(0, i));
        i++;
        if (i > message.length) clearInterval(interval);
      }, 35);

      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="container">

      {/* Snow Effect */}
      <div className="snow">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: Math.random() * 100 + "vw",
              animationDuration: 5 + Math.random() * 5 + "s",
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="center-box">
          <h1>🖤 Do You Remember Them? 🖤</h1>

          <div className="button-wrapper">
            <button onClick={() => setStep(2)}>YES 🖤</button>

            <button
              style={noStyle}
              onMouseEnter={moveNoButton}
            >
              NO
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="center-box">
          <h1>Black Day Tribute</h1>
          <h3 className="date">{date}</h3>

          <p className="typed-text">{typedText}</p>

          {!showMedia && (
            <div className="heart-section">
              <p className="click-text">Click Here 🖤</p>
              <div
                className="big-heart"
                onClick={() => setShowMedia(true)}
              >
                🖤
              </div>
            </div>
          )}

          {showMedia && (
            <div className="media-section">

              {/* Images */}
              <div className="image-section">
                <img src="/images/martyr1.jpg" alt="martyr" />
                <img src="/images/martyr2.jpg" alt="martyr" />
              </div>

              {/* YouTube Video */}
              <div className="video-section">
                <iframe
                  src="https://www.youtube.com/embed/3YwseXHZjTM"
                  title="YouTube video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="final-message">
                <div className="candle">
                  <div className="flame"></div>
                </div>
                <h2>Their sacrifice will never be forgotten.</h2>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
