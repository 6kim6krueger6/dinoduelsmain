import { usePrivy } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

function Connect() {
    const { ready, authenticated, user, login, logout } = usePrivy();
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        const fetchAddress = async () => {
            if (authenticated && window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum); // Используем BrowserProvider
                    const signer = await provider.getSigner(); // getSigner теперь асинхронный
                    const address = await signer.getAddress();
                    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
                    setWalletAddress(shortAddress);
                } catch (error) {
                    console.error("Failed to fetch wallet address:", error);
                }
            } else {
                setWalletAddress("");
            }
        };

        fetchAddress();
    }, [authenticated]);

    if (!ready) {
        return null;
    }

    return (
        <div className="relative">
    <header>
        {ready && authenticated ? (
            <div>
                <button
                    className="fixed top-4 right-4 w-[150px] h-[40px] bg-gray-300 text-black rounded-lg shadow-lg hover:bg-gray-400 transition-colors duration-200"
                    onClick={logout}
                >
                    {walletAddress || "Connected"}
                </button>
            </div>
        ) : (
            <button
                className="fixed top-4 right-4 w-[150px] h-[40px] bg-[#15C748] text-white rounded-lg shadow-lg hover:bg-[#12A93D] transition-colors duration-200"
                onClick={login}
            >
                Connect
            </button>
        )}
    </header>
</div>

    );
}

export default Connect;