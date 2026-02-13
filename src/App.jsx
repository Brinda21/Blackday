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

  // Logic to share the link
  const handleShare = async () => {
    const shareData = {
      title: 'Black Day Tribute',
      text: 'I created this special tribute. Take a look.',
      url: window.location.href, 
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard! Share it with your friends.');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

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
              <div className="image-section">
                <img src="/images/martyr1.jpg" alt="martyr" />
                <img src="/images/martyr2.jpg" alt="martyr" />
              </div>

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
                
                {/* --- NEW SHARE BUTTON --- */}
                <button 
                  onClick={handleShare}
                  className="share-btn"
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#fff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📤 Share this tribute
                </button>
                {/* ------------------------ */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;