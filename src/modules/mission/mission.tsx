/* eslint-disable no-irregular-whitespace */
'use client';

import { FC, useRef } from 'react';
import classNames from 'classnames';
import styles from './mission.module.scss';
import { MissionProps } from './mission.types';
import { TitleGradient } from '@/ui';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Language, useLanguage } from '@/service/language';

type Translations = Record<
  Language,
  {
    title: string;
    paragraphs: string[];
  }
>;

const translations: Translations = {
  ru: {
    title: 'миссия',
    paragraphs: [
      'Наша миссия — быть командой номер 1 в медиабаинге в вертикали iGaming. Мы добиваемся этого, создавая исключительные условия для роста и развития сильных профессионалов, которые ценят ответственность за результат.',
      'Мы вознаграждаем тех, кто вносит реальный вклад, и обеспечиваем нашим партнерам и рекламодателям максимальный профит благодаря качеству нашей работы.',
      'Если ты стремишься к космическим высотам и готов быть лучшим — тебе с нами по пути.',
    ],
  },
  en: {
    title: 'mission',
    paragraphs: [
      'Our mission is to be the #1 media buying team in the iGaming vertical. We achieve this by creating exceptional conditions for the growth and development of skilled professionals who value accountability for results.',
      'We reward those who make a real impact and provide our partners and advertisers with maximum profit through the quality of our work.',
      'If you’are aiming for stellar heights and ready to be the best, then you’re on the right path with us.',
    ],
  },
};

const Mission: FC<MissionProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  const text = useRef(null);
  const container__text = useRef(null);

  const { language } = useLanguage();

  useGSAP(() => {
    const container = container__text.current;
    const tx = text.current;

    gsap.fromTo(
      tx,
      {
        y: 400,
      },
      {
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: container,
          start: 'top 40%',
        },
      }
    );
  });

  return (
    <div className={rootClassName}>
      <h2 className={styles.title}>
        <TitleGradient text={translations[language].title} />
      </h2>
      <div className={styles.container} ref={container__text}>
        <div className={styles.container__wrapper}>
          <p className={styles.wrapper__text} ref={text}>
            {translations[language].paragraphs.map((paragraph, index) => (
              <span key={index}>{paragraph}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
