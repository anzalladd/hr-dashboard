import { isEmpty } from 'lodash'
import { useUserStore }  from '@/stores'

export default function adminMiddleware({ next }) {
  const user = useUserStore()
  if (!isEmpty(user.data)) return next()
  return next({ name: 'home' })
}
