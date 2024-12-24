import type { Metadata } from 'next'
import { VacancyView } from '@views/vacancy'

export const metadata: Metadata = {
  title: 'Marsa - Vacancy',
  description: 'Vacancy page'
}

export default function Vacancy() {
  return <VacancyView />
}
