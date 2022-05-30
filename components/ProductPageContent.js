import Image from 'next/image'
import ProductForm from './ProductForm'

export default function ProductPageContent({ product }) {
    console.log("pord", product)
    return (
        <div className='flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto'>
            <div className="w-full max-w-md border bg-white rounded">
                <div className="relative h-96 w-full">
                    <Image
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText}
                        layout="fill"
                        objectFit='cover'
                    />
                </div>
            </div>
            <ProductForm product={product} />
        </div>
    )
}
