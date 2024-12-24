/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { FC, useRef } from 'react';
import classNames from 'classnames';

import styles from './principleCards.module.scss';
import { PrincipleCardsProps } from './principleCards.types';
import PrincipleCard from '../principleCard/principleCard';

const PrincipleCards: FC<PrincipleCardsProps> = ({ className, cards }) => {
  const rootClassName = classNames(styles.root, className);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.root}>
      <div className={styles.sliderWrapper} ref={containerRef}>
        {cards.map((card, index) => (
          <div className={styles.slide} key={index}>
            <PrincipleCard
              number={card.number}
              title={card.title}
              description={card.description}
              className={styles.card}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrincipleCards;
