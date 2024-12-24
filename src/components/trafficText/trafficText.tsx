import { FC } from 'react';
import classNames from 'classnames';

import styles from './trafficText.module.scss';
import { TrafficTextProps } from './trafficText.types';
import { useLanguage, Language } from '@/service/language'; // Хук для языка

const translations: Record<Language, string> = {
  ru: 'Используем расчеты ROI, прогноз показателей и полную экономику заливов, чтобы сосредоточиться на действиях, которые принесут максимальный результат.',
  en: 'We use ROI calculations, performance forecasting, and comprehensive funnel economics to focus on actions that deliver maximum results.',
};

const TrafficText: FC<TrafficTextProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage(); // Получаем текущий язык

  return (
    <div className={rootClassName}>
      {translations[language]}
    </div>
  );
};

export default TrafficText;
