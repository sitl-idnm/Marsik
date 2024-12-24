/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { FC, useRef } from 'react'
import classNames from 'classnames'

import styles from './buttonTwo.module.scss'
import { ButtonTwoProps } from './buttonTwo.types'
import Image from 'next/image'
import LeftAngle from '@public/images/button_left_angle.png'
import RightAngle from '@public/images/button_right_angle.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Button: FC<ButtonTwoProps> = ({
  className,
  text,
  big,
  modal
}) => {
  const rootClassName = classNames(styles.root, className)
  const btnRef = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    if (!btnRef.current) return;

    const tl = gsap.timeline({ paused: true })
      .fromTo(btnRef.current, {
        width: 49,
        height: 48
      }, {
        width: '100%',
        height: '100%',
        duration: 1,
      })
      .to(textRef.current, {
        opacity: 1,
        duration: 0.3
      });

    // Создаем IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tl.play();
          observer.disconnect(); // Отключаем после первого срабатывания
        }
      });
    }, { threshold: 0.1 }); // Триггер при 10% видимости элемента

    observer.observe(btnRef.current);

    return () => observer.disconnect(); // Очистка при размонтировании
  }, []);

  if (big) {
    return (
      <div className={styles.bigCont}>
        <div className={styles.big} ref={btnRef}>
          <Image
            src={LeftAngle}
            alt={'angle'}
            className={styles.left}
          />
          <Image
            src={RightAngle}
            alt={'angle'}
            className={styles.right}
          />
          <a className={styles.text} ref={textRef}>
            {text}
          </a>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.smallCont}>
        <div className={rootClassName} ref={btnRef}>
          <Image
            src={LeftAngle}
            alt={'angle'}
            className={styles.left}
          />
          <Image
            src={RightAngle}
            alt={'angle'}
            className={styles.right}
          />
          <a className={styles.text} ref={textRef}>
            {text}
          </a>
        </div>
      </div>
    )
  }
}

export default Button
