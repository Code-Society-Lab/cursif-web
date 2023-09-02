"use client"

import type { RootState } from '@stores/store'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '@stores/authentication-slice'
import { useRouter } from 'next/navigation'


export default function Page() {
  const token = useSelector((state: RootState) => state.token)
  const dispatch = useDispatch()
  const router = useRouter()

  if (!token) {
    router.push('/login')
  }

  return (
    <div>
      <span>TOKEN: {token}</span>
    </div>
  )
}