import { useEffect, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import UserNFTTokens from './UserNFTTokens'
import WalletLoginWidget from './WalletLoginWidget'
import WalletLogoutWidget from './WalletLogoutWidget';


export default function ManifoldCampaignWidget() {
    const Web3Api = useMoralisWeb3Api();
    const [tokens, setTokens] = useState([])
    const [userDetails, setUserDetails] = useState(null)


    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    useEffect(() => {
        if (user && account) {
            // get NFTs for current user on Mainnet
            (async () => {
                const userEthNFTs = await Web3Api.account.getNFTs();
                console.log("The user nfts are :", userEthNFTs);
            })()
            setUserDetails({ user, account })
            // get the tokens
        } else {
            setUserDetails(null)
        }

    }, [isAuthenticated])

    const login = async () => {
        if (!isAuthenticated) {

            await authenticate({ signingMessage: "Log in using your wallet" })
                .then(function (user) {
                    console.log("logged in user:", user);
                    console.log(user.get("ethAddress"));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const logOut = async () => {
        await logout();
        console.log("logged out");
    }




    return (
        <>
            <WalletLoginWidget userDetails={userDetails} login={login} />
            <WalletLogoutWidget userDetails={userDetails} logOut={logOut} isAuthenticating={isAuthenticating} />
            <div
                className='rounded-lg text-gray-800 px-2 py-3 bg-white'
            >
                NFT Discount Eligible
            </div>


            {tokens.length > 0 && <UserNFTTokens tokens={tokens} />}
        </>
    );
}
