import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confetti } from "@tsparticles/confetti";

function DarkModeButton({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 text-2xl rounded transition-all duration-300 transform hover:scale-110 active:scale-95 absolute top-8 right-15"
      style={{
        backgroundColor: darkMode ? "#f3f4f6" : "#1f2937",
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

  const [moves, setMoves] = useState(0);
  const [maxMoves, setMaxMoves] = useState(0);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const isWon = solved.length === cards.length && cards.length > 0;
  const isLost = maxMoves > 0 && moves >= maxMoves && !isWon;



  const initializeGame = useCallback(() => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);

    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setFlipped([]);
    setSolved([]);

    // ⭐ limited moves
    setMaxMoves(pairCount * 2);
    setMoves(0);

    setDisabled(false);
  }, [gridSize]);


  useEffect(() => {
    // eslint-disable-next-line
    initializeGame();

  }, [initializeGame]);



  // useEffect(() => {
  //   const totalCards = gridSize * gridSize;
  //   const pairCount = Math.floor(totalCards / 2);
  //   const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
  //   const shuffledCards = [...numbers, ...numbers]
  //     .sort(() => Math.random() - 0.5)
  //     .slice(0, totalCards)
  //     .map((number, index) => ({ id: index, number }));

  //   setCards(shuffledCards);
  //   setFlipped([]);
  //   setSolved([]);
  //   setWon(false);
  // }, [gridSize]);

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
    if (disabled || isWon || isLost) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      setMoves((prev) => prev + 1);
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
    if (!isWon || isLost) return;

    shoot();
    const t1 = setTimeout(() => shoot({ spread: 180 }), 100);
    const t2 = setTimeout(() => shoot({ spread: 360 }), 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isWon, isLost]);


  return (
    <div
      className="flex flex-col items-center min-h-screen relative py-20 md:py-40 "
      style={{ backgroundColor: darkMode ? "white" : "#0E100F" }}
    >
      {/* <button className=" absolute top-8 right-8" >Dark Mode</button> */}
      <DarkModeButton
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        className=" absolute top-8 right-8"
      />
      <Link
        to="/"
        className="text-2xl absolute top-8 left-8 px-4 py-2 rounded hover:scale-105 transition-transform duration-300 mr-1"
        style={{
          color: darkMode ? "black" : "white",
          backgroundColor: darkMode ? "#f3f4f6" : "#1f2937",
          border: darkMode ? "1px solid #d1d5db" : "none",
        }}
      >
        {" "}
        ⬅ Back to Home
      </Link>
      <h1
        className=" font-bold text-center mb-6 text-white mt-6"
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          color: darkMode ? "black" : "white"
        }}
      >
        Memory Game
      </h1>
      {/* Input */}
      {/* <div className="mb-4">
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
      </div> */}
      <div className="mb-4 flex items-center gap-2 ">
        <label
          className="text-base"
          style={{ color: darkMode ? "black" : "gray" }}
        >
          Grid Size:
        </label>

        <select
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className="px-3 py-2 rounded border"
          style={{
            backgroundColor: darkMode ? "white" : "#1f2937",
            color: darkMode ? "black" : "white",
            borderColor: darkMode ? "#d1d5db" : "#374151"
          }}
        >
          {[2, 3, 4, 5, 6, 7, 8].map((size) => (
            <option key={size} value={size}>
              {size} × {size}
            </option>
          ))}
        </select>
      </div>

      {/* game board */}
      <div
        className={`grid gap-2 mb-4 box-border px-3`}
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
                : darkMode
                  ? "bg-gray-200 border border-gray-400 text-gray-400 shadow-md"
                  : "bg-gray-300 text-gray-400"
                }`}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-lg" style={{ color: darkMode ? "black" : "white" }}>
        Moves Left: {Math.max(0, maxMoves - moves)}
      </div>


      {/* result */}
      {isWon && (
        <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce">
          You Won!
        </div>
      )}
      {isLost && (
        <div className="mt-4 text-4xl font-bold text-red-600 animate-bounce">
          You Lose!
        </div>
      )}

      {/* reset/play Again */}
      {/* <button
        onClick={() => {
    setWon(false);
    initializeGame();
  }
          
        }
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {won ? "Play Again" : "Reset"}
      </button> */}

      <button
        onClick={initializeGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {isWon || isLost ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGames;
