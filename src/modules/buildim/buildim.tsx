'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './buildim.module.scss';
import { BuildimProps } from './buildim.types';
import { BuildimAstronaut, BuildimCards } from '@/components';
import { TitleGradient } from '@/ui';
import { useLanguage, Language } from '@/service/language';

// Объект переводов
const translations: Record<Language, { title: string }> = {
  ru: {
    title: 'Собрали лучших\nи продолжаем\nискать',
  },
  en: {
    title: 'We’ve gathered\nthe\u00A0best and are\ncontinuing the search',
  },
};

const Buildim: FC<BuildimProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  const { language } = useLanguage(); // Получаем текущий язык
  const { title } = translations[language]; // Получаем перевод

  // Состояние для текущей активной картинки
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className={rootClassName}>
      {/* Передаем функцию управления состоянием в BuildimCards */}
      <h1 className={styles.title}>
        <TitleGradient className="title__large title__vacancy" text={title} />
      </h1>
      <BuildimCards onHoverCard={setActiveImage} />

      {/* Передаем активную картинку в BuildimAstronaut */}
      <BuildimAstronaut activeImage={activeImage} />
    </div>
  );
};

export default Buildim;
