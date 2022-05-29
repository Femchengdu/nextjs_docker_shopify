module.exports = {
  experimental: {
    outputStandalone: true,
  },
  env: {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  },
  images: {
    domains: ['cdn.shopify.com']
  }
}
