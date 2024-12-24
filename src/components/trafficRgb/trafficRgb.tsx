'use client';

import { FC } from 'react';
import classNames from 'classnames';

import styles from './trafficRgb.module.scss';
import { TrafficRgbProps } from './trafficRgb.types';

import SvgGreen from '@icons/green.svg';
import SvgYellow from '@icons/yellow.svg';
import SvgRed from '@icons/red.svg';
import SvgLine from '@icons/line.svg';

import { useLanguage, Language } from '@/service/language';

// Объект переводов
const translations: Record<Language, { whiteText: string; regularText: string }> = {
  ru: {
    whiteText: 'Снижаем риски',
    regularText: 'с помощью подробного расчета экономики заливов',
  },
  en: {
    whiteText: 'Risk reduction:',
    regularText: 'Detailed funnel economics calculations help minimize risks.',
  },
};

const TrafficRgb: FC<TrafficRgbProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage();

  // Получаем текущий перевод
  const { whiteText, regularText } = translations[language];

  return (
    <div className={rootClassName}>
      {/* Первый SVG */}
      <SvgGreen className={styles.svg} alt="Green Graphic" width={'100%'} height={100} />

      {/* Второй SVG */}
      <SvgYellow className={styles.svg} alt="Yellow Graphic" width={'100%'} height={100} />

      {/* Третий SVG */}
      <SvgRed className={styles.svg} alt="Red Graphic" width={'100%'} height={100} />

      {/* Линия */}
      <SvgLine alt="Line" className={styles.line} width={88} height={172} />

      {/* Текст */}
      <p className={styles.text}>
        <span className={styles.textwhite}>{whiteText}</span> {regularText}
      </p>
    </div>
  );
};

export default TrafficRgb;
