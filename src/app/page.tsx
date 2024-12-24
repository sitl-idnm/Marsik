import type { Metadata } from 'next'
import { HomeView } from '@views/home'

export const metadata: Metadata = {
  title: 'MARSA',
  description: 'About us'
}

export default function Home() {
  return <HomeView />
}
