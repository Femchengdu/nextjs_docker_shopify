import { useEffect } from 'react'
import Script from 'next/script';

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
