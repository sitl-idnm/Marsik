import { FC } from 'react'
import classNames from 'classnames'

import styles from './gradientBlur.module.scss'
import { GradientBlurProps } from './gradientBlur.types'

const GradientBlur: FC<GradientBlurProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <svg width="700" height="695" viewBox="0 0 700 695" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2" filter="url(#filter0_f_1120_38)">
        <circle cx="350" cy="347" r="210" fill="#6DCEFF" fill-opacity="0.3"/>
        </g>
        <defs>
        <filter id="filter0_f_1120_38" x="0" y="-3" width="700" height="700" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="70" result="effect1_foregroundBlur_1120_38"/>
        </filter>
        </defs>
      </svg>
    </div>
  )
}

export default GradientBlur
