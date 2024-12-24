'use client';

import { FC } from 'react';
import classNames from 'classnames';

import styles from './trafficCircle.module.scss';
import { TrafficCircleProps } from './trafficCircle.types';

import SvgCircle from '@icons/circle.svg';
import { useLanguage, Language } from '@/service/language';

// Объект переводов
const translations: Record<Language, { whiteText: string; regularText: string }> = {
  ru: {
    whiteText: 'Анализируем эффективность',
    regularText: 'и меняем направление, если видим отклонения от заданного курса',
  },
  en: {
    whiteText: 'Analyzing efficiency',
    regularText: 'and changing direction if we see deviations from the set course',
  },
};

const TrafficCircle: FC<TrafficCircleProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage();

  // Получаем текущий перевод
  const { whiteText, regularText } = translations[language];

  return (
    <div className={rootClassName}>
      <SvgCircle className={styles.image} alt="Circle" width={'100%'} height={'auto'} />
      <p className={styles.text}>
        <span className={styles.textwhite}>{whiteText}</span>
        <br />
        {regularText}
      </p>
    </div>
  );
};

export default TrafficCircle;
