import React from 'react'
import UserToken from './UserToken'

export default function UserNFTTokens({ tokens }) {
    return (
        <div>
            {tokens.length && tokens.map(({ token, i }) =>
                <UserToken
                    key={`key-token-${i}`}
                    token={token}
                />
            )}
        </div>
    )
}
