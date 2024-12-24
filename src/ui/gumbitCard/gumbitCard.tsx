import { FC } from 'react'
import classNames from 'classnames'

import styles from './gumbitCard.module.scss'
import { GumbitCardProps } from './gumbitCard.types'

import Card from '@icons/gumbit-card.svg'

const GumbitCard: FC<GumbitCardProps> = ({
  className,
  text
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <Card alt="Green Graphic" width={'100%'} height={100} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default GumbitCard
