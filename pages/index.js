import { getProductsInCollection } from "../lib/shopify"
import ProductList from "../components/ProductList"
export default function Home({ products }) {
  console.log("products from Shopify ", products)
  return (
    <div>
      <ProductList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProductsInCollection()
  return {
    props: { products }, // will be passed to the page component as props
  }
}
