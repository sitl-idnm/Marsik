'use client';

import { FC } from 'react';
import classNames from 'classnames';

import styles from './buildimAstronaut.module.scss';
import { BuildimAstronautProps } from './buildimAstronaut.types';
import Image from 'next/image';

const BuildimAstronaut: FC<BuildimAstronautProps> = ({ className, activeImage }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <div className={rootClassName}>
      {/* Первое изображение */}
      <Image
        src="/images/first.webp"
        width={1200}
        height={700}
        quality={100}
        alt="First Astronaut"
        className={classNames(styles.image, {
          [styles.visible]: activeImage === 'first', // Видимое, если activeImage === 'first'
        })}
      />

      {/* Второе изображение */}
      <Image
        src="/images/second.webp"
        width={1200}
        height={700}
        quality={100}
        alt="Second Astronaut"
        className={classNames(styles.image, {
          [styles.visible]: activeImage === 'second', // Видимое, если activeImage === 'second'
        })}
      />

      {/* Третье изображение */}
      <Image
        src="/images/third.webp"
        width={1200}
        height={700}
        quality={100}
        alt="Third Astronaut"
        className={classNames(styles.image, {
          [styles.visible]: activeImage === 'third', // Видимое, если activeImage === 'third'
        })}
      />
    </div>
  );
};

export default BuildimAstronaut;
