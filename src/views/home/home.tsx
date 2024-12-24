import { FC } from 'react'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
// import { Button } from '@/ui'
import { Traffic } from '@/modules/traffic'
import { Introduce } from '@/modules/introduce'
import { Faq } from '@/modules/faq'
import { Gumbit } from '@/modules/gumbit'
// import Link from 'next/link'
import { Mission } from '@/modules/mission'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Part } from '@/modules/part'
import { Company } from '@/modules/company'
import { WindowFiller } from '@/modules/windowFiller'
import { Principle } from '@/modules/principle'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <WindowFiller />
      <Introduce />
      <div className={styles.imposter}>
        <Company />
        {/* <Link href='/vacancy'>
          <Button size='sm'>ВАКАНСИИ</Button>
        </Link> */}
        <Traffic />
        <Principle cards={[]} />
        <Mission />
        <Gumbit />
        <Part />
        <Faq />
      </div>
    </main>
  )
}

export default Home
