'use client'

import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './trafficTv.module.scss';
import { TrafficTvProps } from './trafficTv.types';
import { TrafficRows } from '../trafficRows';
import { TrafficSound } from '../trafficSound';
import { TrafficGraphic } from '../trafficGraphic';
import { TrafficRgb } from '../trafficRgb';
import { TrafficCircle } from '../trafficCircle';
import Image from 'next/image';
import BackgroundStart from '@public/images/traffic__background__start.webp';
import BackgroundEnd from '@public/images/traffic__background__end.webp';

const TrafficTv: FC<TrafficTvProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile(); // Проверка при загрузке
    window.addEventListener('resize', updateIsMobile); // Проверка при изменении размеров окна

    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  return (
    <div className={rootClassName}>
      {isMobile && (
        <Image
          src={BackgroundStart}
          width={360}
          height={47}
          alt="Фон"
          quality={100}
          className={`${styles.image} ${styles.image__start}`}
        />
      )}
      <div className={styles.itemmergedvertical}>
        <TrafficRgb />
      </div>
      <div className={`${styles.item} ${styles.item__nonemobile}`}>
        <TrafficRows />
        <TrafficSound />
      </div>
      <div className={`${styles.item} ${styles.item__lastmobile}`}>
        <TrafficCircle />
      </div>
      <div className={styles.itemmergedhorizontal}>
        <TrafficGraphic />
      </div>
      {isMobile && (
        <Image
          src={BackgroundEnd}
          width={360}
          height={79}
          alt="Фон"
          quality={100}
          className={`${styles.image} ${styles.image__end}`}
        />
      )}
    </div>
  );
};

export default TrafficTv;
