import { FC } from 'react'
import classNames from 'classnames'

import styles from './introduceCircles.module.scss'
import { IntroduceCirclesProps } from './introduceCircles.types'

const IntroduceCircles: FC<IntroduceCirclesProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default IntroduceCircles
