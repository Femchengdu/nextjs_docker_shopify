
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
  console.log(" The Sopify Data Fn :", domain, storefrontAccessToken)
  try {
    const response = await fetch(URL, options)
    return await response.json()
  } catch (error) {
    throw new Error(`Products not fetched ${query}`, error)
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
          productType
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

export async function createCheckout(id, quantity) {
  const query = `mutation {
    checkoutCreate(input: {
      lineItems: [{variantId: "${id}", quantity: ${quantity}}]
    }) {
      checkout {
        id
        webUrl
      }
    }
  }`

  const response = await ShopifyData(query)
  const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : []
  return checkout
}


export async function updateCheckout(id, lineItems) {
  console.log(" The Sopify updateCheckout Fn :", domain, storefrontAccessToken)
  const lineItemsObject = lineItems.map(item => {
    return `{
      variantId: "${item.id}",
      quantity: ${item.variantQuantity}
    }`
  })

  const query = `mutation {
    checkoutLineItemsReplace (lineItems: [${lineItemsObject}], checkoutId: "${id}"){
      checkout {
        id
        webUrl
        lineItems(first: 25){
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  console.log(" The response :", response)
  const checkout = response.data.checkoutLineItemsReplace.checkout ? response.data.checkoutLineItemsReplace.checkout : []

  return checkout
}