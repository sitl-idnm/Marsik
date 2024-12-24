'use client';

import { FC } from 'react';
import { LanguageLinks, TelegramLink, Wrapper } from '@/ui';
import { useLanguage, Language } from '@/service/language';

import styles from './footer.module.scss';

type Translations = Record<Language, { vacancies: string }>;

const translations: Translations = {
  ru: {
    vacancies: 'Вакансии',
  },
  en: {
    vacancies: 'Vacancies',
  },
};

const Footer: FC = () => {
  const { language } = useLanguage();

  return (
    <footer className={styles.root}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.info}>
          <a target="_blank" href="/vacancy">
            {translations[language].vacancies}
          </a>
        </div>
        <div className={styles.links}>
          <TelegramLink />
          <LanguageLinks />
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
