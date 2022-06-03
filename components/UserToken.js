import React from 'react'
import Image from 'next/image'
export default function UserToken(token) {
    return (
        <div className=" h-72">
            <Image
                src={token.image}
                alt={altText}
                layout="fill"
                objectFit=''
            />
        </div>
    )
}
