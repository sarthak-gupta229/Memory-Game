import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confetti } from "@tsparticles/confetti";

function DarkModeButton({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 text-2xl rounded transition-all duration-300 transform hover:scale-110 active:scale-95 absolute top-8 right-15"
      style={{
        backgroundColor: darkMode ? "#e5e7eb" : "#1f2937",
        color: darkMode ? "black" : "white",
        boxShadow: darkMode
          ? "0 4px 14px rgba(0, 0, 0, 0.1)"
          : "0 4px 14px rgba(0, 0, 0, 0.5)",
      }}
    >
      <span
        className="inline-block transition-transform duration-500"
        style={{
          transform: darkMode ? "rotate(0deg)" : "rotate(360deg)",
        }}
      >
        {darkMode ? "🌙" : "☀️"}
      </span>{" "}
      {darkMode ? "Dark" : "Light"}
    </button>
  );
}

const MemoryGames = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize; // 16
    const pairCount = Math.floor(totalCards / 2); // 8
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  
  useEffect(() => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  }, [gridSize]);

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (id) => {
    if (disabled || won) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        // check match logic
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  const shoot = () => {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
  };

  confetti({
    ...defaults,
    particleCount: 80,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 0.75,
    shapes: ["circle"],
  });
};

useEffect(() => {
  if (!won) return;

  shoot();
    const t1= setTimeout(() => shoot({ spread: 180 }), 100);
    const t2= setTimeout(() => shoot({ spread: 360 }), 200);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, [won]);


  return (
    <div
      className="flex flex-col items-center min-h-screen relative py-40 "
      style={{ backgroundColor: darkMode ? "grey" : "#0E100F" }}
    >
      {/* <button className=" absolute top-8 right-8" >Dark Mode</button> */}
      <DarkModeButton
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        className=" absolute top-8 right-8"
      />
      <Link
        to="/"
        className="text-2xl absolute top-8 left-8 px-4 py-2 rounded hover:scale-105 transition-transform duration-300 mr-1`"
        style={{
          color: darkMode ? "black" : "white",
          backgroundColor: darkMode ? "#e5e7eb" : "#1f2937",
        }}
      >
        {" "}
        ⬅ Back to Home
      </Link>
      <h1
        className=" font-bold text-center mb-6 text-white"
        style={{ 
          fontSize: "clamp(2rem, 5vw, 3rem)",
          color: darkMode ? "black" : "white" 
        }}
      >
        Memory Game
      </h1>
      {/* Input */}
      <div className="mb-4">
        <label
          htmlFor="gridsize"
          className="mr-2"
          style={{ color: darkMode ? "black" : "gray" }}
        >
          Grid Size :(max 10)
        </label>
        <input
          type="number"
          id="gridsize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-2 border-gray-300 rounded px-2 py-1"
          style={{ color: darkMode ? "black" : "gray" }}
        />
      </div>

      {/* game board */}
      <div
        className={`grid gap-2 mb-4 box-border `}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300  ${isFlipped(card.id)
                ? isSolved(card.id)
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-400"
                }`}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>

      {/* result */}
      {won && (
        <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce">
          You Won!
        </div>
      )}

      {/* reset/play Again */}
      <button
        onClick={() => {
    setWon(false);
    initializeGame();
  }
          
        }
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGames;
