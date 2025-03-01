import React, { useState } from 'react';
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

function AccordionItem({ title, tokenId, choice, gameId, isExpanded, onToggle }) {
  const [inputTokenId, setInputTokenId] = useState(tokenId);
  const [inputChoice, setInputChoice] = useState(choice);
  const [inputGameId, setInputGameId] = useState(gameId || "");

  const handleEnter = () => {
    console.log("Enter pressed with values:", {
      tokenId: inputTokenId,
      choice: inputChoice,
      gameId: inputGameId,
    });
  };

  return (
    <div className={`bg-gray-300 rounded-lg overflow-hidden transition-all duration-300 ${isExpanded ? "min-h-64" : "h-20"} w-64`}>
      <div className='flex justify-between items-start p-6 cursor-pointer' onClick={onToggle}>
        <div className="text-2xl font-bold">{title}</div>
        <BsChevronDown className={`text-2xl transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
      </div>

      <div className={`px-5 pb-5 overflow-hidden transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
        <div className="mb-2">
          <label className="block text-sm font-medium">Token ID:</label>
          <input
            type="text"
            value={inputTokenId}
            onChange={(e) => setInputTokenId(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Choice:</label>
          <input
            type="text"
            value={inputChoice}
            onChange={(e) => setInputChoice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {gameId && (
          <div className="mb-2">
            <label className="block text-sm font-medium">Game ID:</label>
            <input
              type="text"
              value={inputGameId}
              onChange={(e) => setInputGameId(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        <button
          onClick={handleEnter}
          className="mt-4 bg-[#15C748] text-white px-4 py-2 rounded-lg hover:bg-[#12A93D] w-full"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

function RockPaper() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
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
    <div className="flex flex-col flex-1 items-center justify-start h-full bg-cover bg-center bg-no-repeat bg-fixed pt-8 overflow-y-auto"> {/* Добавлен overflow-y-auto */}
      <h1 className="text-6xl font-bold mb-8 text-black text-shadow-lg animate-fade-in">
        Rock Paper Scissors
      </h1>
      <div className="max-w-2xl text-center">
        <ul className="list-decimal list-inside text-left space-y-2 mb-4">
          <li>Click the button below to allow the NFT contract to transfer your tokens.</li>
          <li>If you are starting the game choose the token ID, your choice (0-🪨 rock, 1-🧻 paper, 2-✂️ scissors) and wait until someone enters your game.</li> 
          <li>If you are joining a game, enter the game ID, your token ID, and your choice.</li>
        </ul>
        <button
          onClick={allow}
          className="mt-4 bg-[#15C748] text-white px-4 py-2 rounded-lg hover:bg-[#12A93D]"
        >
          Allow transfers
        </button>
      </div>
      {/* Контейнер для аккордеонов с горизонтальным расположением */}
      <div className="flex flex-row gap-4 mt-8 mb-8"> {/* Добавлен mb-8 для отступа снизу */}
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            {...item}
            isExpanded={expandedId === item.id}
            onToggle={() => toggleExpanded(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default RockPaper;