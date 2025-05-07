// pages/index.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // You can make this smarter to detect browser language
    router.replace('/en')
  }, [])
  
  return <></>
}