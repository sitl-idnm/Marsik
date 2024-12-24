'use client'

import { FC, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './buttonBlue.module.scss';
import { ButtonBlueProps } from './buttonBlue.types';

gsap.registerPlugin(ScrollTrigger);

const ButtonBlue: FC<ButtonBlueProps> = ({ className, children }) => {
  const rootClassName = classNames(styles.root, className);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { width: '0px', transformOrigin: 'center' },
        {
          width: '240px', // конечная ширина равна полной ширине элемента
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top bottom', // запускается, когда кнопка попадает в область видимости
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <div ref={buttonRef} className={rootClassName}>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default ButtonBlue;
