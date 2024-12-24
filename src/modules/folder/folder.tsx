/* eslint-disable react/jsx-key */
import { FC } from 'react'
import classNames from 'classnames'

import styles from './folder.module.scss'
import { FolderProps } from './folder.types'
import { TitleGradient } from '@/ui'

const Folder: FC<FolderProps> = ({
  className,
  title,
  text,
  ps
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName}>

      <h2 className={styles.title}>
        <TitleGradient
          text={` ${title} `}
        />
      </h2>
      {text?.map((paragraph) => (
        <p className={styles.text}>
          <span>
            {paragraph}<br/>
          </span>
        </p>
      ))}
      <p className={styles.ps}>
        {ps?.map((post) => (
            <span>
              {post}<br/>
            </span>
        ))}
      </p>
    </section>
  )
}

export default Folder
