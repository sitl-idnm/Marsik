'use client';

import { FC } from 'react';
import classNames from 'classnames';

import styles from './gumbit.module.scss';
import { GumbitProps } from './gumbit.types';
import { GumbitCards, TrafficTitle } from '@/components';
import { GradientBlur, TitleGradient } from '@/ui';
import { Language, useLanguage } from '@/service/language';

type Translations = Record<Language, { title: string; subtitle: string }>;

const translations: Translations = {
  ru: {
    title: 'КОМАНДА',
    subtitle: '13 отделов · 1 миссия · общий успех!',
  },
  en: {
    title: 'TEAM',
    subtitle: '13 Departments · 1 Mission · Shared success!',
  },
};

const Gumbit: FC<GumbitProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage();

  return (
    <div className={rootClassName}>
      <div className={styles.wrapper}>
        <GradientBlur className={styles.gradient} />
        <TrafficTitle text={translations[language].title} />
        <h2 className={styles.title}>
          <TitleGradient text={translations[language].subtitle} />
        </h2>
        <GumbitCards />
      </div>
    </div>
  );
};

export default Gumbit;
