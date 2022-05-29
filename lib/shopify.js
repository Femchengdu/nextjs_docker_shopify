const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

const ShopifyData = async (query) => {
  const URL = `https://${domain}/api/2022-04/graphql.json`
  console.log("What is in the ENV?", process.env)
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
    throw new Error(`Products not fetched ${domain} and ${URL}`, error)
  }
}

export const getProductsInCollection = async () => {
  const query = `
    {collection(handle: "frontpage"){
        title
        products(first: 25){
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images (first: 5) {
                edges {
                  node {
                    altText
                    url
                    
                  }
                }
              }
            }
          }
        }
      }
    }`

  const response = await ShopifyData(query)
  const allProducts = response.data.collection.products.edges ? response.data.collection.products.edges : []

  return allProducts
}

export async function getAllProducts() {
  const query = `{
        products(first: 25){
          edges {
            node {
              handle
              id
            }
          }
        }
    }`

  const response = await ShopifyData(query)

  const slugs = response.data.products.edges ? response.data.products.edges : []

  return slugs
}


export async function getProduct(handle) {
  const query = `{
        product(handle: "${handle}") {
          id
          title
          handle
          description
          images(first: 5){
            edges {
              node {
                altText
                url
              }
            }
          }
          options {
            id
            name
            values
          }
          variants(first: 25) {
            edges {
              node {
                selectedOptions {
                  name
                  value
                }
                image {
                  altText
                  url
                }
                title,
                id,
                priceV2 {
                  amount
                }
              }
            }
          }
        }
    }`

  const response = await ShopifyData(query)
  const product = response.data.product ? response.data.product : {}

  return product
}