'use client'

import { FC, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './trafficSound.module.scss';
import { TrafficSoundProps } from './trafficSound.types';

const NUM_COLUMNS = 7; // Количество столбцов
const NUM_SQUARES = 5; // Количество квадратиков в каждом столбце

const TrafficSound: FC<TrafficSoundProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const [activeLevels, setActiveLevels] = useState<number[]>(
    Array(NUM_COLUMNS).fill(0) // Изначально уровни в каждой колонке равны 0
  );
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Триггер когда хотя бы 10% компонента видно
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Останавливаем анимацию, если компонент не виден

    const interval = setInterval(() => {
      const newLevels = activeLevels.map((currentLevel) => {
        const change = Math.random() > 0.5 ? 1 : -1; // Случайное изменение: вверх или вниз
        const nextLevel = currentLevel + change;
        return Math.max(0, Math.min(nextLevel, NUM_SQUARES)); // Уровень остаётся в пределах [0, NUM_SQUARES]
      });
      setActiveLevels(newLevels);
    }, 500); // Интервал обновления

    return () => clearInterval(interval);
  }, [activeLevels, isVisible]);

  return (
    <div className={rootClassName} ref={containerRef}>
      {activeLevels.map((level, columnIndex) => (
        <div className={styles.column} key={columnIndex}>
          {Array(NUM_SQUARES)
            .fill(0)
            .map((_, squareIndex) => (
              <div
                key={squareIndex}
                className={classNames(styles.square, {
                  [styles.active]: squareIndex < level, // Активные квадраты снизу вверх
                })}
              ></div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default TrafficSound;
