'use client'

import { FC, useRef } from 'react'
import classNames from 'classnames'

import styles from './disclose.module.scss'
import { DiscloseProps } from './disclose.types'
import Image from 'next/image'
import Left from '@public/images/left__angle.webp'
import Right from '@public/images/right__angle.webp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Disclose: FC<DiscloseProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const right = useRef(null)
  const left = useRef(null)
  const container = useRef(null)

  useGSAP(() => {
    const l = left.current
    const r = right.current
    const cont = container.current

    gsap.to(l, {
      top: 0,
      left: 0,
      duration: 2,
      scrollTrigger: {
        trigger: cont,
        start: 'top center',
      }
    })

    gsap.to(r, {
      bottom: 0,
      right: 0,
      duration: 2,
      scrollTrigger: {
        trigger: cont,
        start: 'top center',
      }
    })

  })

  return (
    <div className={rootClassName} ref={container}>
      <Image
        src={Left}
        width={43}
        height={46}
        alt=''
        className={styles.left}
        ref={left}
      />
      <Image
        src={Right}
        width={43}
        height={46}
        alt=''
        className={styles.right}
        ref={right}
      />
    </div>
  )
}

export default Disclose
