import React from 'react'

export default function WalletLogoutWidget({ userDetails, logOut, isAuthenticating }) {

    if (userDetails) {
        return <button className='rounded-lg text-white px-2 py-3 bg-gray-800 my-1' onClick={logOut} disabled={isAuthenticating}>Logout</button>
    }
    return <div></div>

}
