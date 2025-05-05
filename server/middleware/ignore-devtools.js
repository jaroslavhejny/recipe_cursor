export default defineEventHandler((event) => {
    if (event.node.req.url?.startsWith('/.well-known/appspecific/')) {
      return ''
    }
  })