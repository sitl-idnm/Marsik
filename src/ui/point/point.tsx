'use client';

import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './point.module.scss';
import { PointProps } from './point.types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Image from 'next/image'
import Left from '@public/images/left__angle.webp'
import Right from '@public/images/right__angle.webp'

gsap.registerPlugin(useGSAP)

const Point: FC<PointProps> = ({
  className,
  title,
  text,
  topP,
  leftP,
  isAutoAnimating
}) => {
  const rootClassName = classNames(styles.root, className);

  const pointRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGSVGElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null)
  const container1 = useRef(null)
  const right = useRef(null)
  const left = useRef(null)
  const container = useRef(null)

  const [linePath, setLinePath] = useState('M1 78V31.1961L21 1'); // Стандартное значение пути

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < 768) {
      setLinePath('M29 60.5L1 29V0'); // Изменение пути для больших экранов
    }
  };

  useEffect(() => {
    // Устанавливаем слушатель изменения размера окна
    handleResize(); // Вызываем сразу, чтобы применить настройки
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    if (pointRef.current) {
      gsap.to(pointRef.current, {
        scale: 0.5,
        duration: 0.5,
      });

      gsap.to(lineRef.current, {
        opacity: 1,
        duration: 0.5,
      })

      gsap.to(left.current, {
        top: 0,
        left: 0,
        duration: 2,
      })

      gsap.to(right.current, {
        bottom: 0,
        right: 0,
        duration: 2,
      })

      gsap.fromTo(container.current, {
        width: 43,
        height: 46
      }, {
        width: '100%',
        height: '100%',
        opacity: 1,
        duration: 1,
      })

      gsap.to(textBlockRef.current, {
        opacity: 1,
        duration: 0.5
      })
    }
  };

  const handleMouseLeave = () => {
    if (pointRef.current) {
      gsap.to(pointRef.current, {
        scale: 1,
        duration: 0.5,
      });

      gsap.to(lineRef.current, {
        opacity: 0,
        duration: 0.5,
      })

      gsap.to(container.current, {
        opacity: 0,
        width: 43,
        height: 46,
        duration: 1,
      })

      gsap.to(textBlockRef.current, {
        opacity: 0,
        duration: 0.5
      })
    }
  };

  useEffect(() => {
    if (isAutoAnimating) {
      // Запускаем анимацию появления
      handleMouseEnter();

      // Очистка при деактивации точки
      return () => {
        handleMouseLeave();
      };
    }
  }, [isAutoAnimating]);

  return (
    <div className={rootClassName} style={{ top: topP, left: leftP }}>
      <div className={styles.text}>
        <div className={styles.text__cont} ref={container1}>
          <div className={styles.root1} ref={container}>
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
          <div className={styles.cardText} ref={textBlockRef}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.point}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* SVG с обработчиками событий */}
          <svg ref={pointRef}
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2.21775 6.98619L13.5 0.472377L24.7823 6.98619V20.0138L13.5 26.5276L2.21775 20.0138V6.98619Z" stroke="#F0F3F7" stroke-width="0.818182" />
            <path d="M13.5 4.90918L20.9399 9.20463V17.7955L13.5 22.091L6.06002 17.7955V9.20463L13.5 4.90918Z" fill="#F0F3F7" />
          </svg>
        </div>
        <div className={styles.line}>
          <svg ref={lineRef}
            width="22"
            height="78"
            viewBox="0 0 22 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d={linePath} stroke="#F0F3F7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Point;
