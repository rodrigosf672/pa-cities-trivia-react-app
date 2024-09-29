import React, { useState, useEffect } from 'react';

type City = {
  name: string;
  image: string;
  fact: string;
};

const citiesData: City[] = [
  { name: "Philadelphia", image: "/images/philadelphia.jpg", fact: "The Liberty Bell is here!" },
  { name: "Pittsburgh", image: "/images/pittsburgh.jpg", fact: "Known for its many bridges." },
  { name: "Harrisburg", image: "/images/harrisburg.jpg", fact: "The capital of Pennsylvania." },
  { name: "Allentown", image: "/images/allentown.jpg", fact: "Known for Billy Joel's famous song." },
  { name: "Erie", image: "/images/erie.jpg", fact: "Located on the shore of a lake." },
  { name: "Scranton", image: "/images/scranton.jpg", fact: "Famous for 'The Office' TV show." },
  { name: "Lancaster", image: "/images/lancaster.jpg", fact: "Famous for its Amish community." },
  { name: "Bethlehem", image: "/images/bethlehem.jpg", fact: "Known for its Christmas traditions." },
  { name: "Reading", image: "/images/reading.jpg", fact: "Known more for its railroads than for its name's literary association." },
  { name: "York", image: "/images/york.jpg", fact: "Not the Big Apple, but it's known for its rich colonial history." },
  { name: "Wilkes-Barre", image: "/images/wilkesbarre.jpg", fact: "Located near the Pocono Mountains. Has a dash in the name." },
  { name: "Altoona", image: "/images/altoona.jpg", fact: "Home of the Horseshoe Curve." },
  { name: "Johnstown", image: "/images/johnstown.jpg", fact: "Known for the Great Flood of 1889." },
  { name: "Chester", image: "/images/chester.jpg", fact: "The oldest city of PA, right along the Delaware River." },
  { name: "Easton", image: "/images/easton.jpg", fact: "Home to the Crayola Experience. Not Northon, not Weston, it's rather..." },
  { name: "State College", image: "/images/statecollege.jpg", fact: "Home to Penn State University." },
];

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const GameGrid = () => {
  const [cities, setCities] = useState<City[]>(citiesData);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const [correctCities, setCorrectCities] = useState<number[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setCities(shuffleArray([...citiesData]));
  }, []);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  useEffect(() => {
    if (correctCities.length === cities.length) {
      setGameFinished(true);
      playCelebration();
    }
  }, [correctCities.length, cities.length]);

  const handleSelectCity = (index: number) => {
    setSelectedCity(index);
    setGuess("");
    setFeedback("");
    setShowHint(false);
  };

  const handleGridKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter") {
      handleSelectCity(index);
    }
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitGuess();
    }
  };

  const handleSubmitGuess = () => {
    if (selectedCity === null) {
      // No square selected, show yellow warning
      setFeedback("⚠️ Select a square!");
    } else if (correctCities.includes(selectedCity)) {
      // Square already guessed correctly, show yellow warning
      setFeedback("⚠️ Select a new square!");
    } else if (guess.toLowerCase() === cities[selectedCity].name.toLowerCase()) {
      setCorrectCities((prevCorrectCities) => {
        if (!prevCorrectCities.includes(selectedCity)) {
          return [...prevCorrectCities, selectedCity];
        }
        return prevCorrectCities;
      });
      setFeedback("🎉 Congrats! You got it! 🎉");
    } else {
      setFeedback("❌ You failed! Try again.");
    }
  };
  

  const toggleHint = () => {
    if (selectedCity !== null) {
      setHint(cities[selectedCity].fact);
      setShowHint(!showHint);
    }
  };

  const handleResetGame = () => {
    setSelectedCity(null);
    setGuess("");
    setFeedback("");
    setHint(null);
    setCorrectCities([]);
    setGameFinished(false);
    setCities(shuffleArray([...citiesData]));
  };

  const playCelebration = () => {
    const audio = new Audio('/sounds/clapping.wav');
    audio.oncanplaythrough = () => audio.play();
    const fireworks = document.createElement('div');
    fireworks.style.position = 'fixed';
    fireworks.style.top = '0';
    fireworks.style.left = '0';
    fireworks.style.width = '100%';
    fireworks.style.height = '100%';
    fireworks.style.backgroundImage = 'url(/images/fireworks.gif)';
    fireworks.style.backgroundSize = 'cover';
    fireworks.style.opacity = '0.5';
    fireworks.style.pointerEvents = 'none';
    fireworks.style.zIndex = '1000';
    document.body.appendChild(fireworks);
    setTimeout(() => {
      fireworks.remove();
    }, 8000);
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative', fontFamily: 'Arial, sans-serif' }}>
      {!gameFinished && (
        <div style={{ marginBottom: '20px' }}>
          <p>Select a square and guess the city name:</p>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={handleInputKeyPress}
            aria-label="Select a square and guess the city name:"
            style={{
              padding: '12px',
              fontSize: '18px',
              borderRadius: '5px',
              border: '1px solid #bdc3c7',
              width: '300px',
            }}
          />
          <button
            onClick={handleSubmitGuess}
            style={{
              marginLeft: '8px',
              padding: '12px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            aria-label="Submit your guess"
          >
            Submit
          </button>
          <button
            onClick={toggleHint}
            style={{
              marginLeft: '8px',
              padding: '12px 20px',
              backgroundColor: '#e67e22',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '120px',
            }}
            aria-label={showHint ? "Hide hint" : "Show hint"}
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          <div style={{ height: '20px', marginTop: '10px', fontStyle: 'italic', color: 'yellow', fontSize: '18px' }}>
            {showHint && hint}
          </div>
        </div>
      )}
      {gameFinished && (
        <div>
          <button
            onClick={handleResetGame}
            style={{
              padding: '12px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Restart Challenge
          </button>
        </div>
      )}
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px',
          justifyContent: 'center',
          padding: '10px',
        }}
      >
        {cities.map((city, index) => (
          <div
            key={index}
            tabIndex={0}
            className="grid-item"
            onClick={() => handleSelectCity(index)}
            onKeyDown={(event) => handleGridKeyPress(event, index)}
            style={{
              width: '200px',
              height: '200px',
              border: '2px solid #7f8c8d',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: selectedCity === index || correctCities.includes(index) ? '#ecf0f1' : '#bdc3c7',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {correctCities.includes(index) ? (
              <>
                <img
                  src={city.image}
                  alt={city.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    fontSize: '16px',
                  }}
                >
                  {city.name} <span style={{ color: 'green', fontSize: '20px' }}>✔</span>
                </div>
              </>
            ) : selectedCity === index ? (
              <img
                src={city.image}
                alt={city.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <span style={{ fontSize: '50px', fontWeight: 'bold', color: '#7f8c8d' }}>?</span>
            )}
          </div>
        ))}
      </div>
      {feedback && (
        <div
        aria-live="assertive"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '30px',
          backgroundColor: feedback.includes('Congrats')
            ? 'green'
            : feedback.includes('failed')
            ? 'rgba(255, 0, 0, 0.7)'
            : '#FFC107',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'white',
        }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default GameGrid;