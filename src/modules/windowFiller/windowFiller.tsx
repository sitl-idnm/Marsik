import { FC } from 'react'
import classNames from 'classnames'

import styles from './windowFiller.module.scss'
import { WindowFillerProps } from './windowFiller.types'

const WindowFiller: FC<WindowFillerProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default WindowFiller
