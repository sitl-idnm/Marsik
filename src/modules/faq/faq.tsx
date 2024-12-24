/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import styles from './faq.module.scss'
import { FaqProps } from './faq.types'
import { Point, TitleGradient } from '@/ui'
import { PointMob, PointTab } from '@/components'
import { useLanguage, Language } from '@/service/language' // Хук для смены языка

const Faq: FC<FaqProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage();
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [activePointIndex, setActivePointIndex] = useState(0);

  // Отслеживание взаимодействия пользователя
  useEffect(() => {
    const handleInteraction = () => {
      setIsUserInteracted(true);
      setActivePointIndex(-1); // Отключаем активную точку при взаимодействии
    };

    window.addEventListener('onhover', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('onhover', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Эффект для циклической анимации точек
  useEffect(() => {
    if (!isUserInteracted) {
      const points = translations[language];
      const interval = setInterval(() => {
        setActivePointIndex((prevIndex) => {
          // Переходим к следующей точке или возвращаемся к первой
          return prevIndex >= points.length - 1 ? 0 : prevIndex + 1;
        });
      }, 4000); // Интервал между сменой точек (4 секунды)

      return () => clearInterval(interval);
    }
  }, [isUserInteracted, language]);

  // Объект переводов
  const translations: Record<Language, { title: string; text: string; leftP: string; topP: string }[]> = {
    ru: [
      { title: 'С какими источниками вы работаете?', text: 'Плотно работаем с FB, Google Ads (PPC, UAC, KMC), ASO', leftP: '50%', topP: '50%' },
      { title: 'Есть ли у вас дизайнеры, как быстро выдаются крео?', text: 'Есть команда штатных моушен-дизайнеров (4 человека), готовые крео выдаются от пары часов до 2-х дней', leftP: '15%', topP: '0%' },
      { title: 'Кто ищет офферы?', text: 'В штате компании есть опытный Bizdev, который помогает найти любой оффер и увеличить ставку по нему', leftP: '70%', topP: '10%' },
      { title: 'Кто занимается техническим сопровождением?', text: 'Опытный IT-интегратор сопровождает технический процесс запуска РК на всех этапах', leftP: '30%', topP: '35%' },
      { title: 'Кто руководит баингом?', text: 'Каждый источн��к имеет Head и Team Lead, координирующих команды и процессы', leftP: '60%', topP: '0%' },
      { title: 'Что необходимо, чтобы попасть к вам в команду?', text: 'Напиши нашему HR Варваре @var_marsa для собеседования и тестового задания', leftP: '25%', topP: '5%' },
    ],
    en: [
      { title: 'What traffic sources do you work with?', text: 'We work closely with FB, Google Ads (PPC, UAC, KMC), and ASO.', leftP: '50%', topP: '50%' },
      { title: 'Do you have designers, and how quickly are creatives delivered?', text: 'We have a team of in-house motion designers (4 people). Creatives are ready in a few hours to two days depending on complexity.', leftP: '15%', topP: '0%' },
      { title: 'Who finds the offers?', text: 'Our experienced Bizdev will help find the right offer for your needs and secure unlimited cap or raise the rates.', leftP: '70%', topP: '10%' },
      { title: 'Who handles technical support?', text: 'Our IT integrator oversees the technical process of ad campaign launches.', leftP: '30%', topP: '35%' },
      { title: 'Who manages media buying?', text: 'Each source has its Head and Team Lead who coordinate teams and optimize processes.', leftP: '60%', topP: '0%' },
      { title: 'What does it take to join your team?', text: 'Message our HR Varvara @var_marsa for an interview and test task.', leftP: '25%', topP: '5%' },
    ],
  };

  const points = translations[language]; // Получаем переведенный контент

  if (typeof window !== 'undefined' && window.innerWidth >= 1440) {
    return (
      <div className={rootClassName}>
        {points.map((point, index) => (
          <Point
            key={index}
            title={point.title}
            text={point.text}
            leftP={point.leftP}
            topP={point.topP}
            isAutoAnimating={!isUserInteracted && index === activePointIndex}
          />
        ))}
        <h2>
          <TitleGradient text="FAQ" />
        </h2>
      </div>
    )
  } else if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div className={rootClassName}>
        <PointMob />
        <h2>
          <TitleGradient text="FAQ" />
        </h2>
      </div>
    )
  } else if (typeof window !== 'undefined' && window.innerWidth < 1440) {
    return (
      <div className={rootClassName}>
        <PointTab />
        <h2>
          <TitleGradient text="FAQ" />
        </h2>
      </div>
    )
  }

  return null;
}

export default Faq;
