import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import styles from './preloader.module.scss'
import { PreloaderProps } from './preloader.types'

const Preloader: FC<PreloaderProps> = ({
  className
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Анимация исчезновения
      gsap.to(`.${styles.root}`, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsVisible(false)
        }
      })
    }, 6500)

    return () => clearTimeout(timer)
  }, [])

  // Убираем компонент из DOM только после завершения анимации
  if (!isVisible) return null

  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Preloader
