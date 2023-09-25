import { isEmpty } from 'lodash'
import { useUserStore } from '@/stores'

function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) return context.next

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1)

    nextMiddleware({ ...context, next: nextPipeline })
  }
}

async function middlewareHandle(to, from, next) {
  const user = useUserStore()
  const isExistProfiles = !isEmpty(user.data)
  const isExistAccessToken = localStorage.access_token
  const { matched } = to
  const context = { to, from, next }
  const isNextRouter = matched.length && !matched[0].meta.middlewares
  let { middlewares } = matched[0].meta

  if (isExistAccessToken && !isExistProfiles) {
    user.getUser()
  }

  if (isNextRouter) return next()
  if (to.meta.middlewares) middlewares = to.meta.middlewares
  return middlewares[0]({ ...context, next: middlewarePipeline(context, middlewares, 1) })
}

export default middlewareHandle
