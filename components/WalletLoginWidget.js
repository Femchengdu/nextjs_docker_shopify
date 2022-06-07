import React from 'react'

export default function WalletLoginWidget({ userDetails, login }) {


    if (userDetails) {
        return <div className='rounded-lg text-white px-2 py-3 bg-gray-800 my-1'>{userDetails.account.slice(0, 25) + ' ...'}</div>
    }
    return <button
        className='rounded-lg text-white px-2 py-3 bg-gray-800 my-1'
        onClick={login}
    >
        Connect Wallet
    </button>

}
