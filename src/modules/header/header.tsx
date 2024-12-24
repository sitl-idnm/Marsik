'use client';

import { FC, useState, useEffect } from 'react';
import { LanguageLinks, TelegramLink, Wrapper } from '@/ui';
import classNames from 'classnames';

import styles from './header.module.scss';
import { HeaderProps } from './header.types';
import Logo from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage, Language } from '@/service/language';

// Объект переводов
const translations: Record<Language, { about: string }> = {
  ru: {
    about: 'О нас',
  },
  en: {
    about: 'About us',
  },
};

const Header: FC<HeaderProps> = ({ className }) => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth >= 480
  );
  const name = usePathname();
  const { language } = useLanguage(); // Получаем текущий язык
  const { about } = translations[language]; // Извлекаем перевод

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 480);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headerClassName = classNames(styles.root, className);

  return (
    <header className={headerClassName}>
      <Wrapper className={styles.wrapper}>
        {/* Отображение TelegramLink для больших экранов */}
        <div className={styles.tg__about}>
          {isLargeScreen && <TelegramLink className={styles.telegram} />}
          {name === '/vacancy' && window.innerWidth > 1199 && (
            <Link href={'/'}>
              <p>{about}</p> {/* Используем переведенный текст */}
            </Link>
          )}
        </div>

        <Logo className={styles.logo} />

        <div className={styles.language}>
          {/* Отображение TelegramLink для маленьких экранов */}
          {!isLargeScreen && <TelegramLink className={styles.telegramSmall} />}
          <LanguageLinks className={styles.language__links} />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
