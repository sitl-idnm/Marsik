'use client';

import { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './trafficRows.module.scss';
import { TrafficRowsProps } from './trafficRows.types';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TrafficRows: FC<TrafficRowsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  const containerRef = useRef<HTMLDivElement>(null);
  const slidersRefs = useRef<HTMLInputElement[]>([]);
  const [values, setValues] = useState<number[]>(Array(5).fill(500)); // Значение по умолчанию

  const maxRange = 1000; // Новое значение max

  const updateBackground = (index: number, value: number) => {
    const percentage = (value / maxRange) * 100; // Переводим значение в проценты

    slidersRefs.current[index].style.background = `linear-gradient(
      to right,
      #7ab7d7, #003d5c ${percentage}%,
      #09202c ${percentage}%
    )`;
  };

  useGSAP(() => {
    const sliders = slidersRefs.current;

    const animations = sliders.map((slider, index) => {
      const duration = 2 + Math.random();
      const delay = Math.random() * 0.5;
      const maxValue = 500 + Math.random() * 500;
      const minValue = Math.random() * 500;

      return gsap.to(slider, {
        value: Math.random() > 0.5 ? maxValue : minValue,
        duration,
        ease: ['power1.inOut', 'power2.inOut', 'elastic.out'][Math.floor(Math.random() * 3)],
        repeat: -1,
        yoyo: true,
        delay,
        onUpdate: () => {
          const currentValue = parseFloat(slider.value);
          updateBackground(index, currentValue);
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play pause resume reset',
          markers: false,
        },
        paused: true,
      });
    });

    return () => animations.forEach(anim => anim.kill());
  }, []);

  return (
    <div className={rootClassName} ref={containerRef}>
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          type="range"
          min="0"
          max={maxRange} // Используем новое max
          value={values[index]}
          readOnly
          ref={(el) => {
            if (el) slidersRefs.current[index] = el;
          }}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setValues((prev) => {
              const newValues = [...prev];
              newValues[index] = newValue;
              return newValues;
            });
            updateBackground(index, newValue);
          }}
          className={styles.slider}
        />
      ))}
    </div>
  );
};

export default TrafficRows;
