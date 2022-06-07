import { useEffect, useState } from 'react'
import Script from 'next/script';
import Head from 'next/head'
import UserNFTTokens from './UserNFTTokens'

export default function ManifoldCampaignWidget() {
    const [tokens, setTokens] = useState([])
    useEffect(() => {
        window.addEventListener("ethereum-address-changed", function () {
            //console.log('if you need to do something when they log in, now is the time')

        });

        window.addEventListener('m-authenticated', async (event) => {
            console.log("I have been triggered in auth listener")
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


            <div
                data-widget="m-oauth-connect"
                data-client-id="0c6b5064e59c73f66d61740265faef1185e093a4941a9c62591e3a07a0740726"
                data-app-name="NFTGatedMerch"
                data-show-balance="true"
                data-redirect-uri="https://oyster-app-8x2gc.ondigitalocean.app/products/futurecyborg"
                data-network="1"
            >
                lol connect
            </div>

            <div data-widget="m-add-to-cart">add to cart</div>
            <div
                data-widget="m-campaign"
                data-campaign-id="951531387"
                data-client-id="0c6b5064e59c73f66d61740265faef1185e093a4941a9c62591e3a07a0740726"
                data-app-name="NFTGatedMerch"
                data-network="1">
                campaign
            </div>


            <Script
                src="https://campaign.manifoldxyz.dev/campaign.umd.js"
                strategy="afterInteractive"
                onLoad={() =>
                    console.log(`script loaded correctly, manifold campaign`)
                }
            />
            <Script
                src="https://connect.manifoldxyz.dev/connect.umd.js"
                strategy="afterInteractive"
                onLoad={() =>
                    console.log(`script loaded correctly, manifold connect`, window.manifold)
                }
            />
            {tokens.length > 0 && <UserNFTTokens tokens={tokens} />}
        </>
    );
}
