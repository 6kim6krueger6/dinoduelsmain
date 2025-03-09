import React, { useState, useEffect } from 'react';
import { RPSaddress, RPSabi } from '../constants/RPSgame';
import { NFTaddress, NFTabi } from '../constants/NFT';
import { BrowserProvider, Contract } from "ethers";
import { BsChevronDown } from "react-icons/bs";

const data = [
  {
    id: "1",
    title: "Start Game",
    tokenId: "0",
    choice: "0",
  },
  {
    id: "2",
    title: "Join Game",
    tokenId: "0",
    choice: "0", 
    gameId: "0"
  }
];

function AccordionItem({ title, tokenId, choice, gameId, isExpanded, onToggle, onEnter }) {
  const [inputTokenId, setInputTokenId] = useState(tokenId);
  const [inputChoice, setInputChoice] = useState(choice);
  const [inputGameId, setInputGameId] = useState(gameId || "");
  const [error, setError] = useState("");

  const handleNumberInput = (value, setValue) => {
    if (/^\d*$/.test(value)) {
      setValue(value);
    }
  };

  const handleEnter = async () => {
    try {
      setError("");
      await onEnter({
        tokenId: inputTokenId,
        choice: inputChoice,
        gameId: inputGameId,
      });
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <div
      className={`bg-gray-300 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? "max-h-[500px]" : "max-h-20"
      } w-64`}
    >
      <div className='flex justify-between items-start p-6 cursor-pointer' onClick={onToggle}>
        <div className="text-2xl font-bold">{title}</div>
        <BsChevronDown className={`text-2xl transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
      </div>

      <div className={`px-5 pb-5 transition-opacity duration-500 ease-in-out ${isExpanded ? "opacity-100" : "opacity-0"}`}>
        <div className="mb-2">
          <label className="block text-sm font-medium">Token ID:</label>
          <input
            type="text"
            value={inputTokenId}
            onChange={(e) => handleNumberInput(e.target.value, setInputTokenId)}
            className="w-full p-2 border rounded"
            inputMode="numeric"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Choice:</label>
          <input
            type="text"
            value={inputChoice}
            onChange={(e) => handleNumberInput(e.target.value, setInputChoice)}
            className="w-full p-2 border rounded"
            inputMode="numeric"
          />
        </div>
        {gameId && (
          <div className="mb-2">
            <label className="block text-sm font-medium">Game ID:</label>
            <input
              type="text"
              value={inputGameId}
              onChange={(e) => handleNumberInput(e.target.value, setInputGameId)}
              className="w-full p-2 border rounded"
              inputMode="numeric"
            />
          </div>
        )}
        <button
          onClick={handleEnter}
          className="mt-4 bg-[#15C748] text-white px-4 py-2 rounded-lg hover:bg-[#12A93D] w-full"
        >
          Enter
        </button>
        {error && (
          <div className="mt-2 text-red-600 text-sm">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}

function RockPaper() {
  const [expandedId, setExpandedId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState(null);

  const fetchGameData = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(RPSaddress, RPSabi, signer);

      try {
        const currentGameId = await contract.s_gameId();
        setGameId(currentGameId.toString());

        const currentGameState = await contract.s_gameState();
        setGameState(currentGameState.toString());
      } catch (error) {
        console.log("Error fetching game data:", error);
      }
    }
  };

  useEffect(() => {
    fetchGameData();

    const interval = setInterval(fetchGameData, 5000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(RPSaddress, RPSabi, provider);

      const handleGameCreated = (gameId, player1, tokenId1) => {
        alert(`Game started! Game ID: ${gameId.toString()}`);
      };

      const handleGameResult = (player, gameID, isWinner) => {
        alert(`Game result: Player ${player} is ${isWinner ? "winner" : "loser"}`);
      };

      contract.on("GameCreated", handleGameCreated);
      contract.on("GameResult", handleGameResult);

      return () => {
        contract.off("GameCreated", handleGameCreated);
        contract.off("GameResult", handleGameResult);
      };
    }
  }, []);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const startGame = async (data) => {
    console.log("Starting game with data:", data);
    if (typeof window.ethereum !== "undefined") {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(RPSaddress, RPSabi, signer);
      try {
        console.log("Processing...");
        const transaction = await contract.startGame(data.tokenId, data.choice);
        await transaction.wait(1);
        console.log("Done!");
        await fetchGameData(); 
      } catch (error) {
        console.log(error);
        throw new Error(error.reason || "Failed to start the game");
      }
    }
  };

  const joinGame = async (data) => {
    console.log("Joining game with data:", data);
    if (typeof window.ethereum !== "undefined") {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(RPSaddress, RPSabi, signer);
      try {
        console.log("Processing...");
        const transaction = await contract.joinGame(data.gameId, data.tokenId, data.choice);
        await transaction.wait(1);
        console.log("Done!");
        await fetchGameData(); 
      } catch (error) {
        console.log(error);
        throw new Error(error.reason || "Failed to join the game");
      }
    }
  };

  const allow = async () => {
    console.log("Allowing contract to transfer your NFTs...");
    if (typeof window.ethereum !== "undefined") {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(NFTaddress, NFTabi, signer);
      try {
        console.log("Processing...");
        const transaction = await contract.setApprovalForAll(RPSaddress, true);
        await transaction.wait(1);
        console.log("Done!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e0e0e0]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col flex-1 items-center justify-start h-full bg-cover bg-center bg-no-repeat bg-fixed pt-8 overflow-y-auto">
          <h1 className="text-6xl font-bold mb-8 text-black text-shadow-lg animate-fade-in">
            Rock Paper Scissors
          </h1>
          <div className="max-w-2xl text-center">
            <ul className="list-decimal list-inside text-left space-y-2 mb-4">
              <li>Click the button below to allow the NFT contract to transfer your tokens.</li>
              <li>If you are starting the game choose the token ID, your choice (0-🪨 rock, 1-🧻 paper, 2-✂️ scissors) and wait until someone enters your game.</li>
              <li>If you are joining a game, enter the game ID, your token ID, and your choice.</li>
            </ul>
            <div className="flex flex-col items-center">
              <button
                onClick={allow}
                className="mt-4 bg-[#15C748] text-white px-4 py-2 rounded-lg hover:bg-[#12A93D]"
              >
                Allow transfers
              </button>
            </div>
          </div>
      
          <div className="mt-4 text-lg font-semibold">
            CURRENT GAME ID: {gameId || "Loading..."} GAME STATE:{" "}
            {gameState === "0" ? "OPEN" : gameState === "1" ? "CALCULATING" : "Loading..."}
          </div>
      
          <div className="flex flex-row gap-4 mt-8 mb-8">
            {data.map((item) => (
              <AccordionItem
                key={item.id}
                {...item}
                isExpanded={expandedId === item.id}
                onToggle={() => toggleExpanded(item.id)}
                onEnter={item.title === "Start Game" ? startGame : joinGame}
              />
            ))}
          </div>
      
          <div className="mt-auto mb-8">
            <a
              href="https://testnet.monadexplorer.com/address/0xE269c03024fAFCF85F00d220602400Ab3DEf16cc?tab=Event"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-purple-600 hover:text-purple-800"
            >
              View on MonadExplorer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RockPaper;