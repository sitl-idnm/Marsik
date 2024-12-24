'use client';

import { FC, useState, useEffect, useRef } from 'react';
import styles from './pointMob.module.scss';
import { useLanguage, Language } from '@/service/language'; // Хук для языка

const Point: FC = () => {
  const [activePoint, setActivePoint] = useState<number | null>(null); // Активная точка
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null); // Таймер для отслеживания бездействия
  const autoIndex = useRef<number>(0); // Индекс текущей точки для автоактивации
  const isUserActive = useRef<boolean>(false); // Флаг активности пользователя

  const { language } = useLanguage(); // Получаем текущий язык

  // Объект переводов
  const translations: Record<Language, { title: string; text: string }[]> = {
    ru: [
      { title: 'С какими источниками вы работаете?', text: 'Плотно работаем с FB, Google Ads (PPC, UAC, KMC), ASO' },
      { title: 'Есть ли у вас дизайнеры, как быстро выдаются крео?', text: 'Есть команда штатных моушен-дизайнеров (4 человека), готовые крео выдаются от пары часов до 2-х дней' },
      { title: 'Кто ищет офферы?', text: 'В компании есть опытный Bizdev, который помогает найти офферы и увеличить ставку' },
      { title: 'Кто занимается техническим сопровождением?', text: 'Опытный IT-интегратор сопровождает технический процесс запуска РК' },
      { title: 'Кто руководит баингом?', text: 'В каждом источнике есть Head и Team Lead, координирующие команды' },
      { title: 'Что необходимо, чтобы попасть к вам в команду?', text: 'Напиши нашему HR Варваре @var_marsa для собеседования и теста' },
    ],
    en: [
      { title: 'What traffic sources do you work with?', text: 'We work closely with FB, Google Ads (PPC, UAC, KMC), and ASO.' },
      { title: 'Do you have designers, and how quickly are creatives delivered?', text: 'We have an in-house team of motion designers (4 people). Depending on complexity, creatives are ready within a few hours to two days.' },
      { title: 'Who finds the offers?', text: 'We have an experienced Bizdev on staff who can find any offer to meet your needs, provide recommendations on what to focus on, and make every effort to secure unlimited cap and raise the offer rate.' },
      { title: 'Who handles technical support?', text: 'We have an experienced IT integrator on staff who oversees the technical process of launching ad campaigns at every stage.' },
      { title: 'Who manages media buying?', text: 'Each traffic source has its own Head—a seasoned specialist who coordinates their teams. Each team has its own Team Lead who assists in finding combinations, choosing products, and handling technical specifics.' },
      { title: 'What does it take to join your team?', text: 'Start by messaging our HR Varvara at @var_marsa. You’ll be invited for an interview, after which you’ll have the chance to participate in a test campaign. Based on the test, we decide on further employment.' },
    ],
  };

  const points = translations[language]; // Выбор перевода по текущему языку

  // Обновление активной точки по клику
  const handlePointClick = (id: number) => {
    setActivePoint(id);
    isUserActive.current = true;
    resetInactivityTimer();
  };

  // Функция для авто-активации точек по кругу
  const activateNextPoint = () => {
    if (!isUserActive.current) {
      autoIndex.current = (autoIndex.current + 1) % points.length;
      setActivePoint(autoIndex.current);
    }
    resetInactivityTimer();
  };

  // Сброс таймера при активности пользователя
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(activateNextPoint, 3000);
  };

  // Эффект для таймера
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // Эффект для анимации при изменении activePoint
  useEffect(() => {
    if (activePoint !== null) {
      const card = document.querySelector(`.${styles.cardContent}`);
      if (card) {
        card.classList.remove(styles.fadeIn);
        void (card as HTMLElement).offsetWidth; // Trigger reflow
        card.classList.add(styles.fadeIn);
      }
    }
  }, [activePoint]);

  // Эффект для авто-активации точек
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isUserActive.current) {
        activateNextPoint();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.root}>
      {/* Линия с точками */}
      <div className={styles.pointsRow}>
        {points.map((_, index) => (
          <div
            key={index}
            className={`${styles.point} ${activePoint === index ? styles.active : ''} ${activePoint === index ? styles.hover : ''}`}
            onClick={() => handlePointClick(index)}
          >
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.21775 6.98619L13.5 0.472377L24.7823 6.98619V20.0138L13.5 26.5276L2.21775 20.0138V6.98619Z"
                stroke="#F0F3F7"
                strokeWidth="0.818182"
              />
              <path d="M13.5 4.90918L20.9399 9.20463V17.7955L13.5 22.091L6.06002 17.7955V9.20463L13.5 4.90918Z" fill="#F0F3F7" />
            </svg>
          </div>
        ))}
      </div>

      {/* Карточка */}
      <div className={styles.card}>
        {activePoint !== null && (
          <div className={styles.cardContent}>
            <h3>{points[activePoint]?.title}</h3>
            <p>{points[activePoint]?.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Point;
