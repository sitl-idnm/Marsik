'use client';

import { FC } from 'react';
import classNames from 'classnames';

import styles from './vacancy.module.scss';
import { VacancyProps } from './vacancy.types';
import { Folder } from '@/modules/folder';
import { Buildim } from '@/modules/buildim';
import { Friend } from '@/modules/friend';
import { useLanguage, Language } from '@/service/language';

// Объект переводов
const translations: Record<
  Language,
  {
    title: string;
    text: string[];
    ps: string[];
    bonus: string;
  }
> = {
  ru: {
    title: 'Привет от команды MARSA!',
    text: [
      'Тут у нас всё просто и честно устроено: даёшь результат — растёшь и двигаешься вперёд. Никаких бюрократий и жёстких правил ради правил — важен только результат, а не время на часах. Команда — свои ребята, активные и независимые, с которыми приятно не только работать, но и двигаться к общим целям.',
      'Если ты, как и я, хочешь быть не просто дизайнером, медиабайером или тимлидом, а частью чего-то значимого и настоящего, тогда тебе точно сюда. Здесь можно воплощать идеи, которые увидят тысячи людей, и делать что-то действительно стоящее, а не просто «заниматься чем-то».',
      'Давай созвонимся и обсудим всё без лишних формальностей? Я уверен, ты сможешь добиться многого, и это место станет для тебя настоящей возможностью. Жду твоего ответа!',
    ],
    ps: ['С теплом,', 'Твой будущий коллега'],
    bonus: 'И получи бонусы',
  },
  en: {
    title: 'Greetings from the MARSA Team!',
    text: [
      'Here, things are simple and straightforward: deliver results, and you’ll grow and move forward. There’s no bureaucracy or rigid rules just for the sake of it—only results matter, not clock hours. The team is made up of like-minded people—active and independent—who are great to work with and share common goals.',
      'If, like me, you want to be more than just a designer, media buyer, or team lead, but part of something meaningful and genuine, then this is the place for you. Here, you can bring ideas to life that thousands will see, doing something truly worthwhile instead of just “keeping busy.”',
      'Shall we have a quick call and discuss everything without unnecessary formalities? I’m sure you can achieve a lot, and this place could be a real opportunity for you. Looking forward to hearing from you!',
    ],
    ps: ['Warmly,', 'Your future colleague'],
    bonus: 'and earn bonuses!',
  },
};

const Vacancy: FC<VacancyProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage(); // Получаем текущий язык
  const { title, text, ps, bonus } = translations[language]; // Получаем переведённые строки

  return (
    <main className={rootClassName}>
      <Buildim />
      <Folder title={title} text={text} ps={ps} />
      <Friend textBonus={bonus} />
    </main>
  );
};

export default Vacancy;
