import { isEmpty } from 'lodash'
import { useUserStore }  from '@/stores'

export default function guestMiddleware({ next }) {
  const user = useUserStore()
  if (isEmpty(user.data)) return next()
  return next({ name: 'dashboard_home' })
}
