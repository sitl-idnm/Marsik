import { FC } from 'react'
import classNames from 'classnames'

import styles from './telegramLink.module.scss'
import { TelegramLinkProps } from './telegramLink.types'

import SvgTelegram from '@icons/tg.svg';

const TelegramLink: FC<TelegramLinkProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <a href="https://t.me/marsateam" className={styles.link}>
        <SvgTelegram className={styles.link__item} width={40} />
      </a>
    </div>
  )
}

export default TelegramLink
