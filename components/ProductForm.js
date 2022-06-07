import { useState, useEffect } from 'react'
import { formatter } from '../utils/helper'
import ProductOptions from './ProductOptions'
import MoralisCampaignWidget from './MoralisCampaignWidget'
import useSWR from 'swr'
import axios from 'axios'


const fetcher = async (url, id) => {
    const res = await axios.get(url, {
        params: {
            id: id
        }
    })
    return res.data
}

export default function ProductForm({ product }) {

    const { data: productInnventory } = useSWR(
        ['/api/isgatedmerch', product.handle],
        (url, id) => fetcher(url, id),
        { errorRetryCount: 3 }
    )


    const allVariantOptions = product.variants.edges?.map(variant => {

        const allOptions = {}

        variant.node.selectedOptions.map(item => {
            allOptions[item.name] = item.value
        })

        return {
            id: variant.node.id,
            title: product.title,
            handle: product.handle,
            image: variant.node.image?.url,
            options: allOptions,
            variantTitle: variant.node.title,
            variantPrice: variant.node.priceV2.amount,
            variantQuantity: 1,
            productType: product.productType
        }
    })

    const defaultValues = {}
    product.options.map(item => {
        defaultValues[item.name] = item.values[0]
    })

    const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
    const [selectedOptions, setSelectedOptions] = useState(defaultValues)
    const [merchantGateProduct, setMerchantGateProduct] = useState(false)

    function setOptions(name, value) {
        setSelectedOptions(prevState => {
            return { ...prevState, [name]: value }
        })

        const selection = {
            ...selectedOptions,
            [name]: value
        }

        allVariantOptions.map(item => {
            if (JSON.stringify(item.options) === JSON.stringify(selection)) {
                setSelectedVariant(item)
            }
        })
    }

    useEffect(() => {
        if (productInnventory?.productType === 'Manifold') {
            // compare vriants to see if the variant macthes the selection
            const checkAvailable = productInnventory.variants.edges.filter(item => item.node.id === selectedVariant.id)
            // there are somd scenatios I hab not yet handled. Namely 
            // Not manifold, not available for sale
            // Manifol and available for sale
            if (checkAvailable.length && checkAvailable[0].node.availableForSale === true) {
                setMerchantGateProduct(true)
            } else {
                setMerchantGateProduct(false)
            }

        }
    }, [productInnventory, selectedVariant])
    return (
        <div className='rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3'>
            <h2 className="text-2xl font-bold">
                {product.title}
            </h2>
            <span className="pb-6">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</span>

            {
                product.options.map(({ name, values }) =>
                    <ProductOptions
                        key={`key-${name}`}
                        name={name}
                        values={values}
                        selectedOptions={selectedOptions}
                        setOptions={setOptions}
                    />
                )
            }

            {merchantGateProduct ? <MoralisCampaignWidget /> : <button
                onClick={() => {
                    // Add to cart should not be triggered here
                    // console.log('selected variant ', selectedVariant)
                    // addToCart(selectedVariant)
                }}
                className="rounded-lg text-white px-2 py-3 bg-gray-800 cursor-not-allowed">Sold out!</button>}
        </div>
    )
}
