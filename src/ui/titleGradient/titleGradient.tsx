'use client'

import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import styles from './titleGradient.module.scss';
import { TitleGradientProps } from './titleGradient.types';

const TitleGradient: FC<TitleGradientProps> = ({
  className,
  text,
  children
}) => {
  const rootClassName = classNames(
    styles.root, // Основной класс из CSS-модуля
    className?.split(' ').map((cls) => styles[cls]) // Преобразование переданных классов в модульные
  );
  const textRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Запускаем анимацию, когда элемент видим
            animationRef.current = gsap.to(textRef.current, {
              backgroundPosition: '200% 0',
              duration: 4,
              repeat: -1,
              ease: 'linear',
            });
          } else {
            // Останавливаем анимацию, когда элемент не видим
            animationRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 } // Элемент считается видимым, когда хотя бы 10% его площади в зоне видимости
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      observer.disconnect();
      animationRef.current?.kill(); // Очищаем анимацию при размонтировании
    };
  }, []);

  return (
    <span className={rootClassName} ref={textRef}>
      {text}
      {children}
    </span>
  );
};

export default TitleGradient;
