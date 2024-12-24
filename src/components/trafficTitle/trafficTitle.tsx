import { FC } from 'react';
import classNames from 'classnames';

import styles from './trafficTitle.module.scss';
import { TrafficTitleProps } from './trafficTitle.types';
import Square from '../../shared/assets/icons/square.svg';

const TrafficTitle: FC<TrafficTitleProps> = ({ className, text }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <div className={rootClassName}>
      <div className={styles.icon}><Square /></div>
      <div className={styles.border}>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
};

export default TrafficTitle;
