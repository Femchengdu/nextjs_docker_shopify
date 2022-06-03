import { useEffect } from 'react'
import Script from 'next/script';
import _JSXStyle from 'styled-jsx/style'
import Head from 'next/head'
import UserNFTTokens from './UserNFTTokens'

export default function ManifoldCheckoutWidget() {

    const [tokens, setTokens] = useState([])
    useEffect(() => {
        window.addEventListener("ethereum-address-changed", function () {
            //console.log('if you need to do something when they log in, now is the time')
        });

        window.addEventListener('m-authenticated', async (event) => {
            // do something
            const client = event.detail.client;

            const tokens = await client.getNFTsOfOwner({
                filters: [
                    {
                        contractAddress: "0x9619dabdc2eb3679943b51afbc134dec31b74fe8",
                    },
                ],
            });
            setTokens(tokens)
        })


    }, [])


    return (
        <>
            <div>
                <Head>
                    <link rel="stylesheet" href="https://campaign.manifoldxyz.dev/campaign.css"></link>
                    <link rel="stylesheet" href="https://connect.manifoldxyz.dev/connect.css"></link>
                </Head>
            </div>

            <Script
                src="https://campaign.manifoldxyz.dev/campaign.umd.js"
                strategy="lazyOnload"
                onLoad={() =>
                    console.log(`script loaded correctly, manifold campaign checkout`)
                }
            />
            <Script
                src="https://connect.manifoldxyz.dev/connect.umd.js"
                strategy="lazyOnload"
                onLoad={() =>
                    console.log(`script loaded correctly, manifold connect checkout`)
                }
            />
            <style jsx>
                {`
                    .m-add-to-cart {
                    display: block !important;
                    }
                    
                    #m-connection {
                    display: block !important;
                    }
                    
                    /* Make m-connection buttons look like Shopify Dawn buttons */  
                    #m-connection button {
                    position: relative;
                    width: 99%;
                    margin: 1.5rem 0 0 0;
                    min-width: calc(12rem + var(--buttons-border-width) * 2);
                    min-height: calc(4.5rem + var(--buttons-border-width) * 2);
                    border-radius: var(--buttons-radius-outset);
                    position: relative;
                    max-width: 44rem;
                    background-color: white;
                    color: black;
                    font-family: inherit;
                    font-size: 1.5rem;
                    letter-spacing: .1rem;
                    font-weight: 500;
                    border-radius: 0px;
                    border: 1px solid black;
                    box-sizing: border-box;
                    transition: all 0.1s ease;
                    }
                    
                    /* Show disabled state visually while Logging In.... */  
                    #m-connection button[disabled] {
                    cursor: not-allowed !important;
                    opacity: 0.3;
                    }
                    
                    /* Uppercase ENS and ETH Addresses */
                    #m-connection.connected .m-connection-wallet {
                    text-transform: uppercase;
                    }
                    
                    /* Push disconnect button next to connect button */
                    .m-connection-disconnect-wallet {
                    margin-top: 0 !important;
                    border-top: none !important;
                    }
                    
                    /* Match hover button styles from Dawn */
                    #m-connection button:hover {
                    border: 2.5px solid black;
                    }
                    
                    /* Remove conflicting outline Dawn uses by default*/
                    #m-connection button:focus {
                    outline: none;
                    box-shadow: none;
                    }
                    
                    /* Fix clipping text */
                    #m-connection button > span {
                    line-height: 2em;
                    }
                    
                    /* Make m-add-to-cart button look like Shopify Dawn buttons */  
                    .m-checkout-button,
                    .m-discount-available,
                    .manifold.loading-screen {
                    min-width: calc(12rem + var(--buttons-border-width) * 2);
                    min-height: calc(4.5rem + var(--buttons-border-width) * 2);
                    border-radius: var(--buttons-radius-outset);
                    position: relative;
                    max-width: 44rem;
                    background-color: rgba(var(--color-button),var(--alpha-button-background));
                    color: rgb(var(--color-button-text));
                    font-family: inherit;
                    font-size: 1.5rem;
                    letter-spacing: .1rem;
                    font-weight: 500;
                    border-radius: 0px;
                    border: 1px solid black;
                    box-sizing: content-box;
                    transition: all 0.1s ease;
                    }
                    
                    .m-checkout-button span {
                    color: white;
                    text-align: center;
                    font-size: 1.5rem;
                    text-overflow: ellipsis;
                    }
                    
                    .m-checkout-button:hover {
                    background: black;
                    border: 1px solid #ccc;
                    }
                    
                    .m-checkout-button span:only-child {
                    margin: 0 auto;
                    }
                    
                    .m-checkout-button[disabled] {
                    background: #e5e5e5;
                    box-shadow: none;
                    pointer-events: none;
                    cursor: not-allowed;
                    border: none;
                    }
                    
                    .m-checkout-button span.success {
                    background-image: linear-gradient(45deg, rgba(50, 200, 50, 0.8), rgba(55, 180, 55, 0.8));
                    background-color: rgba(50, 50, 200, 0.5);
                    border-bottom: 1px solid #4c4;
                    }
                    
                    .m-checkout-button span.error {
                    background-image: linear-gradient(45deg, rgba(200, 50, 50, 0.8), rgba(180, 55, 55, 0.8));
                    background-color: rgba(50, 50, 200, 0.5);
                    border-bottom: 1px solid #c44;
                    }
                    
                    .m-url-production-selection button div {
                    display: inherit;
                    }
                    
                    .m-checkout-popup-container {
                    z-index: 1000000 !important;
                    position: fixed !important;
                    }
                    
                    .m-checkout-popup-header > h1 {
                    line-height: 1.2em !important;
                    }
                    
                    .m-redeemable-tokens-none > h1 {
                    line-height: 1.2em !important;
                    text-align: center;
                    margin: 30px;
                    font-size: 30px;
                    }
                    
                    .m-url-product-selection button div {
                    display: block !important;
                    }
                `}
            </style>
            <div
                data-widget="m-oauth-connect"
                data-client-id="0c6b5064e59c73f66d61740265faef1185e093a4941a9c62591e3a07a0740726"
                data-app-name="NFTGatedMerch"
                data-show-balance="true"
                data-redirect-uri="https://oyster-app-8x2gc.ondigitalocean.app/products/futurecyborg"
                data-network="1"
            ></div>
            {tokens.length > 0 && <UserNFTTokens tokens={tokens} />}
            <div data-widget="m-checkout"></div>
        </>
    );
}
