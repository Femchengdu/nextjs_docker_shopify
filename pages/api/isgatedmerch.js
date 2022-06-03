
export default async function isgatedmerch(req, res) {
  const { query: { id } } = req
  const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN


  const ShopifyData = async (query) => {

    const URL = `https://${domain}/api/2022-04/graphql.json`

    const options = {
      endpoint: URL,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    }
    try {
      const response = await fetch(URL, options)
      return await response.json()
    } catch (error) {
      throw new Error(`Products not fetched ${query}`, error)
    }
  }

  async function getProduct(handle) {
    const query = `{
          product(handle: "${handle}") {
            id
            productType
            variants(first: 25) {
              edges {
                node {
                  id,
                  availableForSale
                }
              }
            }
          }
      }`

    const response = await ShopifyData(query)
    const product = response.data.product ? response.data.product : {}

    return product
  }

  const products = await getProduct(id)
  res.status(200).json(products)
}
