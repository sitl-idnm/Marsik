/* eslint-disable no-irregular-whitespace */
'use client';

import { FC } from 'react';
import classNames from 'classnames';

import Astronaut from '@public/images/astrounaut__vacancy.webp';
import styles from './friend.module.scss';
import { FriendProps } from './friend.types';
import { ButtonTwo, TitleGradient } from '@/ui';
import Image from 'next/image';
import { useLanguage, Language } from '@/service/language';

// Объект переводов
const translations: Record<Language, { title: string; button: string; textBonus: string }> = {
  ru: {
    title: 'Отправь продуктивного друга к нам на MARS',
    button: 'Узнать подробности у HR',
    textBonus: 'И получи бонусы', // Перевод для текста
  },
  en: {
    title: 'Send a productive friend to MARS',
    button: 'Get Info from HR',
    textBonus: 'and earn bonuses!', // Перевод для текста
  },
};

const Friend: FC<FriendProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage(); // Получаем текущий язык
  const { title, button, textBonus } = translations[language]; // Извлекаем переводы

  return (
    <section className={rootClassName}>
      <div className={styles.section}>
        <h2 className={styles.title}>
          <TitleGradient>{title}</TitleGradient>
        </h2>
        <p className={styles.text}>{textBonus}</p> {/* Используем переведенный textBonus */}
      </div>
      <a href='https://t.me/Var_marsa'>
        <ButtonTwo text={button} big={true} />
      </a>
      <Image
        src={Astronaut}
        alt="astronaut"
        className={styles.image}
        quality={100}
      />
    </section>
  );
};

export default Friend;
