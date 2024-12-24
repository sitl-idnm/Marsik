import { FC } from 'react';
import classNames from 'classnames';

import styles from './buildimCard.module.scss';
import { BuildimCardProps } from './buildimCard.types';

import CardFirst from '@icons/vacancy-card-first.svg';
import CardSecond from '@icons/vacancy-card-second.svg';
import CardThird from '@icons/vacancy-card-third.svg';

import CardFirstActive from '@icons/vacancy-card-first-active.svg';
import CardSecondActive from '@icons/vacancy-card-second-active.svg';
import CardThirdActive from '@icons/vacancy-card-third-active.svg';

// Обновленный объект для маппинга SVG
const SVG_MAP = {
  first: CardFirst,
  second: CardSecond,
  third: CardThird,
  'first-active': CardFirstActive,
  'second-active': CardSecondActive,
  'third-active': CardThirdActive,
};

const BuildimCard: FC<BuildimCardProps> = ({ className, iconName }) => {
  const rootClassName = classNames(styles.root, className);

  // Выбираем нужную SVG на основе iconName
  const SelectedIcon = SVG_MAP[iconName];

  // Проверяем наличие иконки
  if (!SelectedIcon) {
    console.error(`Icon with name "${iconName}" not found in SVG_MAP.`);
    return null;
  }

  return (
    <div className={rootClassName}>
      {/* Рендерим выбранную SVG */}
      <SelectedIcon alt="Graphic Icon" width={238} height={150} />
    </div>
  );
};

export default BuildimCard;
