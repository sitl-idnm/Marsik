import { FC } from 'react';
import Link from 'next/link';
import LogoIcon from '@icons/logo.svg';
import classNames from 'classnames';
import { LogoProps } from './logo.types';

import styles from './logo.module.scss';

const Logo: FC<LogoProps> = ({ className }) => {
  const logoClassName = classNames(styles.root, className);

  return (
    <Link href="/" className={logoClassName} aria-label="home">
      <LogoIcon />
    </Link>
  );
};

export default Logo;
