import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './languageLinks.module.scss';
import { LanguageLinksProps } from './languageLinks.types';
import { Language, useLanguage } from '@/service/language';

const LanguageLinks: FC<LanguageLinksProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  const { setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className={rootClassName}>
      <button
        onClick={() => handleLanguageChange('ru')}
        className={`${styles.link} ${styles.ru}`}
      >
        ru
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`${styles.link} ${styles.en}`}
      >
        en
      </button>
    </div>
  );
};

export default LanguageLinks;
