'use client';

import { FC, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import styles from './gumbitCards.module.scss';
import { GumbitCardsProps } from './gumbitCards.types';
import { GumbitCard } from '@/ui';
import { useGSAP } from '@gsap/react';
import { useLanguage, Language } from '@/service/language';

// Оригинальные массивы строк
const originalRows = {
  desktop: [
    ['Фарм отдел', 'Production', 'HR-отдел', 'Финансовый отдел', 'Креативный отдел'],
    ['SEO отдел', 'Отдел мобильной разработки', 'IT-отдел', 'Отдел Media buying FB'],
    ['Отдел Media buying Google', 'АSO отдел', 'Юридический отдел'],
    ['Sales отдел'],
  ],
  tablet: [
    ['Фарм отдел', 'Production', 'HR-отдел'],
    ['Финансовый отдел', 'Креативный отдел', 'SEO отдел'],
    ['Отдел мобильной разработки', 'IT-отдел', 'Отдел Media buying FB'],
    ['Отдел Media buying Google', 'АSO отдел', 'Юридический отдел'],
    ['Sales отдел'],
  ],
  mobile: [
    ['Фарм отдел', 'Production'],
    ['HR-отдел', 'Финансовый отдел'],
    ['Креативный отдел', 'SEO отдел'],
    ['Отдел мобильной разработки', 'IT-отдел'],
    ['Отдел Media buying FB', 'Отдел Media buying Google'],
    ['АSO отдел', 'Юридический отдел'],
    ['Sales отдел'],
  ],
};

// Переводы
const translations: Record<Language, Record<string, string>> = {
  ru: {
    'Фарм отдел': 'Фарм отдел',
    'Production': 'Production',
    'HR-отдел': 'HR-отдел',
    'Финансовый отдел': 'Финансовый отдел',
    'Креативный отдел': 'Креативный отдел',
    'SEO отдел': 'SEO отдел',
    'Отдел мобильной разработки': 'Отдел мобильной разработки',
    'IT-отдел': 'IT-отдел',
    'Отдел Media buying FB': 'Отдел Media buying FB',
    'Отдел Media buying Google': 'Отдел Media buying Google',
    'АSO отдел': 'АSO отдел',
    'Юридический отдел': 'Юридический отдел',
    'Sales отдел': 'Sales отдел',
  },
  en: {
    'Фарм отдел': 'Farming Department',
    'Production': 'Production',
    'HR-отдел': 'HR Department',
    'Финансовый отдел': 'Finance Department',
    'Креативный отдел': 'Creative Department',
    'SEO отдел': 'SEO Department',
    'Отдел мобильной разработки': 'Mobile Development Department',
    'IT-отдел': 'IT Department',
    'Отдел Media buying FB': 'Media Buying Department (FB)',
    'Отдел Media buying Google': 'Media Buying Department (Google)',
    'АSO отдел': 'ASO Department',
    'Юридический отдел': 'Legal Department',
    'Sales отдел': 'Sales Department',
  },
};

const GumbitCards: FC<GumbitCardsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[][]>([]);
  const hasAnimatedRef = useRef(false);

  const { language } = useLanguage();
  const [rows, setRows] = useState(originalRows.desktop);

  // Функция для перевода строки
  const translateText = (text: string): string =>
    translations[language][text] || text;

  // Применяем перевод к исходным массивам
  const applyTranslations = (original: string[][]) =>
    original.map((row) => row.map((text) => translateText(text)));

  // Обновляем массив строк в зависимости от разрешения экрана
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setRows(applyTranslations(originalRows.mobile));
      } else if (width < 1200) {
        setRows(applyTranslations(originalRows.tablet));
      } else {
        setRows(applyTranslations(originalRows.desktop));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [language]); // Перевод обновляется при изменении языка

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      const containerBounds = containerRef.current.getBoundingClientRect();

      cardRefs.current.forEach((row) => {
        row.forEach((card) => {
          if (card) {
            const cardBounds = card.getBoundingClientRect();

            const startX = containerBounds.left - cardBounds.left;
            const startY = containerBounds.top - cardBounds.top;

            gsap.set(card, {
              x: startX,
              y: startY,
              opacity: 0,
            });
          }
        });
      });

      if (!hasAnimatedRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top center',
          onEnter: () => {
            if (hasAnimatedRef.current) return;
            hasAnimatedRef.current = true;

            const isMobile = window.innerWidth < 768;

            cardRefs.current.forEach((row, rowIndex) => {
              row.forEach((card, cardIndex) => {
                if (card) {
                  const yOffset = isMobile && card.classList.contains(styles.offsetCard) ? 60 : 0;
                  gsap.to(card, {
                    x: 0,
                    y: yOffset,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    delay: rowIndex * 0.3 + cardIndex * 0.2,
                  });
                }
              });
            });
          },
        });
      }
    }
  });

  return (
    <div ref={containerRef} className={rootClassName}>
      {rows.map((texts, rowIndex) => (
        <div
          key={rowIndex}
          className={classNames(styles.row, {
            [styles.evenRow]: rowIndex % 2 === 1,
          })}
        >
          {texts.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (!cardRefs.current[rowIndex]) cardRefs.current[rowIndex] = [];
                if (el) cardRefs.current[rowIndex][index] = el;
              }}
              className={classNames(styles.card, {
                [styles.evenCard]: index % 2 === 1,
                [styles.offsetCard]: index % 2 === 1,
              })}
            >
              <GumbitCard text={text} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GumbitCards;
