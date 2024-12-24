'use client';

import { FC } from 'react';
import classNames from 'classnames';

import styles from './traffic.module.scss';
import { TrafficProps } from './traffic.types';
import { TrafficText, TrafficTitle, TrafficTv } from '@/components';
import { Language, useLanguage } from '@/service/language';

type Translations = Record<Language, { title: string }>;

const translations: Translations = {
  ru: {
    title: 'Точная навигация в мире трафика',
  },
  en: {
    title: 'Precise navigation in the world of traffic',
  },
};

const Traffic: FC<TrafficProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage();

  return (
    <div className={rootClassName}>
      <TrafficTitle text={translations[language].title} />
      <TrafficText />
      <TrafficTv />
    </div>
  );
};

export default Traffic;
