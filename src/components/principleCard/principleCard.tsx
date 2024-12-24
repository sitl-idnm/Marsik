'use client';
import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import styles from './principleCard.module.scss';
import { PrincipleCardProps } from './principleCard.types';

gsap.registerPlugin(ScrollTrigger);

const PrincipleCard: FC<PrincipleCardProps> = ({
  className,
  title,
  description,
  number,
  isFirst,
}) => {
  const rootClassName = classNames(styles.root, className);
  const svgRef = useRef<SVGSVGElement>(null);
  const mobileSvgRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirst) return;

    const isMobile = window.innerWidth < 768;
    const currentSvgRef = isMobile ? mobileSvgRef.current : svgRef.current;

    if (currentSvgRef && contentRef.current) {
      const paths = currentSvgRef.querySelectorAll('path');
      const ellipses = currentSvgRef.querySelectorAll('ellipse');
      const rects = currentSvgRef.querySelectorAll('rect');
      const lines = currentSvgRef.querySelectorAll('path[fill-opacity="0.3"]');
      const triangle = currentSvgRef.querySelector(
        'path[d="M730.544 261.443L713.523 278.454H730.544V261.443Z"]'
      );

      const titleElement = contentRef.current.querySelector(`.${styles.title}`);
      const numberElement = contentRef.current.querySelector(
        `.${styles.number}`
      );
      const descriptionElement = contentRef.current.querySelector(
        `.${styles.description}`
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
          end: 'bottom center',
          toggleActions: 'play none none none', // Анимация выполняется один раз
          once: true, // Запускаем только один раз
        },
      });

      // Анимация полосок (lines)
      timeline.fromTo(
        lines,
        { fillOpacity: 0 },
        { fillOpacity: 0.3, duration: 0.025, stagger: 0.01 }
      );

      // Анимация paths
      paths.forEach((path) => {
        const pathLength = (path as SVGPathElement).getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        timeline.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 0.2,
            ease: 'power1.out',
          },
          '<+=0.03'
        );
      });

      // Анимация ellipses
      timeline.fromTo(
        ellipses,
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, duration: 0.025, stagger: 0.025 },
        '+=0.025'
      );

      // Анимация rects
      timeline.fromTo(
        rects,
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, duration: 0.025, stagger: 0.025 },
        '+=0.025'
      );

      // Анимация треугольника
      if (triangle) {
        timeline.fromTo(
          triangle,
          { scale: 0, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 1, duration: 0.1 },
          '+=0.025'
        );
      }

      // Анимация текста
      if (titleElement && numberElement && descriptionElement) {
        timeline.fromTo(
          [titleElement, numberElement, descriptionElement],
          { opacity: 0 },
          { opacity: 1, duration: 0.05, stagger: 0.1 },
          '+=0.05'
        );
      }
    }
  }, [isFirst]);

  return (
    <div className={rootClassName}>
      <div ref={contentRef} className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.number}>{`{${number.toString().padStart(2, '0')}}`}</div>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Desktop SVG */}
      <svg
        ref={svgRef}
        className={styles.desktopSvg}
        width="738"
        height="378"
        viewBox="0 0 738 378"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* <!-- Верхние палочки начало --> */}

        <path d="M298.569 1H288.592H288.005L317.351 30.3292H327.916L298.569 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M319.112 1H309.134H308.547L337.893 30.3292H348.458L319.112 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M339.654 1H329.676H329.089L358.436 30.3292H369L339.654 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M360.196 1H350.219H349.632L378.978 30.3292H389.542L360.196 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M380.738 1H370.761H370.174L399.52 30.3292H410.085L380.738 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M401.281 1H391.303H390.716L420.062 30.3292H430.627L401.281 1Z" fill="#6DCEFF" fill-opacity="0.3" />

        {/* <!-- Верхние палочки конец --> */}

        <g style={{ filter: 'blur(0px)' }}>

          {/* <!-- Фон начало--> */}

          <path
            d="M63.8006 84.8814H1V242.672L24.4769 266.136V337.699L63.8006 377H209.944L265.702 322.448H474.646H700.611L737 285.493V66.6973L700.611 30.3292H308.547L279.201 1H117.211L63.8006 84.8814Z"
            fill="#031A2A"
            fill-opacity="0.3"
          />

          {/* <!-- Фон конец--> */}

          {/* <!-- Контур начало --> */}

          <path d="M63.8006 84.8814H1V242.672L24.4769 266.136V337.699L63.8006 377H209.944L265.702 322.448H474.646H700.611L737 285.493V66.6973L700.611 30.3292H308.547L279.201 1H117.211L63.8006 84.8814Z" stroke="#6DCEFF" stroke-opacity="0.7" stroke-width="1.1745" />

          {/* <!-- Контур конец --> */}

        </g>

        {/* <!-- Левая полоска начало --> */}

        <path d="M25.6506 98.9594V225.661L52.0621 252.058V328.9" stroke="#6DCEFF" stroke-opacity="0.3" stroke-width="1.1745" />

        {/* <!-- Левая полоска конец --> */}

        <g style={{ filter: 'drop-shadow(0px 0px 3.58223px rgba(240, 243, 247, 1))' }}>

          {/* <!-- Правый треугольник начало --> */}

          <path d="M730.544 261.443L713.523 278.454H730.544V261.443Z" fill="#F0F3F7" />

          {/* <!-- Правый треугольник конец --> */}

          {/* <!-- Верхняя полоса начало --> */}

        </g>
        <path d="M252.79 22.7036L286.244 56.1388H702.372" stroke="#6DCEFF" stroke-opacity="0.3" stroke-width="1.1745" />

        {/* <!-- Верхняя полоса конец --> */}

        <g style={{ filter: 'drop-shadow(0px 0px 3.58223px rgba(240, 243, 247, 1))' }}>

          {/* <!-- Кружки начало --> */}

          <ellipse cx="104.885" cy="359.989" rx="6.45614" ry="6.45242" fill="#F0F3F7" />
        </g>
        <g style={{ filter: 'drop-shadow(0px 0px 3.58223px rgba(240, 243, 247, 1))' }}>
          <ellipse cx="127.188" cy="359.989" rx="6.45614" ry="6.45242" fill="#F0F3F7" />
        </g>
        <g style={{ filter: 'drop-shadow(0px 0px 3.58223px rgba(240, 243, 247, 1))' }}>
          <ellipse cx="149.491" cy="359.989" rx="6.45614" ry="6.45242" fill="#F0F3F7" />

          {/* <!-- Кружки конец --> */}

        </g>

        {/* <!-- Квадраты начало --> */}

        <rect x="5.10874" y="90.1613" width="8.21625" height="8.21083" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="1.1745" />
        <rect x="5.10874" y="119.491" width="8.21625" height="8.21083" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="1.1745" />
        <rect x="5.10874" y="148.82" width="8.21625" height="8.21083" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="1.1745" />
        <rect x="5.10874" y="133.569" width="8.21625" height="8.21083" stroke="#F0F3F7" stroke-width="1.1745" />
        <rect x="5.10874" y="104.239" width="8.21625" height="8.21083" stroke="#F0F3F7" stroke-width="1.1745" />
        <rect x="5.10874" y="164.071" width="8.21625" height="8.21083" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="1.1745" />

        {/* <!-- Квадраты конец --> */}

        <defs>
          <filter id="filter0_b_862_97" x="-11.5873" y="-11.5873" width="761.175" height="401.174" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_862_97" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_862_97" result="shape" />
          </filter>
          <filter id="filter1_d_862_97" x="706.359" y="254.279" width="31.3497" height="31.3398" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="3.58223" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_862_97" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_862_97" result="shape" />
          </filter>
          <filter id="filter2_d_862_97" x="91.2645" y="346.372" width="27.2412" height="27.2338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="3.58223" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_862_97" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_862_97" result="shape" />
          </filter>
          <filter id="filter3_d_862_97" x="113.568" y="346.372" width="27.2412" height="27.2338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="3.58223" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_862_97" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_862_97" result="shape" />
          </filter>
          <filter id="filter4_d_862_97" x="135.871" y="346.372" width="27.2412" height="27.2338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="3.58223" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_862_97" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_862_97" result="shape" />
          </filter>
        </defs>
      </svg>

      {/* Mobile SVG */}
      <svg
        ref={mobileSvgRef}
        className={styles.mobileSvg} width="338" height="287" viewBox="0 0 338 287" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M135.634 1H131.12H130.854L144.132 14.2699H148.911L135.634 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M144.928 1H140.414H140.148L153.426 14.2699H158.206L144.928 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M154.223 1H149.708H149.443L162.72 14.2699H167.5L154.223 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M163.517 1H159.002H158.737L172.014 14.2699H176.794L163.517 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M172.811 1H168.297H168.031L181.309 14.2699H186.088L172.811 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <path d="M182.105 1H177.591H177.325L190.603 14.2699H195.383L182.105 1Z" fill="#6DCEFF" fill-opacity="0.3" />
        <g style={{ filter: 'blur(0px)' }}>
          <path d="M29.4139 38.9518H1V225.224L11.622 235.84V268.218L29.4139 286H95.5359L120.763 261.318H215.299H320.5L336.964 244.598V30.7245L320.5 14.2699H140.148L126.871 1H53.5789L29.4139 38.9518Z" fill="#031A2A" fill-opacity="0.3" />
          <path d="M29.4139 38.9518H1V225.224L11.622 235.84V268.218L29.4139 286H95.5359L120.763 261.318H215.299H320.5L336.964 244.598V30.7245L320.5 14.2699H140.148L126.871 1H53.5789L29.4139 38.9518Z" stroke="#6DCEFF" stroke-opacity="0.7" stroke-width="0.531398" />
        </g>
        <path d="M12.1531 45.3213V102.647L16 114.59V226.5" stroke="#6DCEFF" stroke-opacity="0.3" stroke-width="0.531398" />
        <path d="M114.921 10.8197L130.058 25.9473H318.333" stroke="#6DCEFF" stroke-opacity="0.3" stroke-width="0.531398" />
        <rect x="2.85896" y="41.3407" width="3.7179" height="3.71545" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="0.531398" />
        <rect x="2.85896" y="54.6105" width="3.7179" height="3.71545" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="0.531398" />
        <rect x="2.85896" y="67.8803" width="3.7179" height="3.71545" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="0.531398" />
        <rect x="2.85896" y="60.9801" width="3.7179" height="3.71545" stroke="#F0F3F7" stroke-width="0.531398" />
        <rect x="2.85896" y="47.7102" width="3.7179" height="3.71545" stroke="#F0F3F7" stroke-width="0.531398" />
        <rect x="2.85896" y="74.7807" width="3.7179" height="3.71545" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="0.531398" />
        <g style={{ filter: 'drop-shadow(0px 0px 1.62076px rgba(240, 243, 247, 1))' }}>
          <path d="M331.08 231L323.378 238.697H331.08V231Z" fill="#F0F3F7" />
        </g>
        <g style={{ filter: 'drop-shadow(0px 0px 1.62076px rgba(240, 243, 247, 1))' }}>
          <ellipse cx="48.0027" cy="271.92" rx="2.92139" ry="2.91971" fill="#F0F3F7" />
        </g>
        <g style={{ filter: 'drop-shadow(0px 0px 1.62076px rgba(240, 243, 247, 1))' }}>
          <ellipse cx="58.0938" cy="271.92" rx="2.92139" ry="2.91971" fill="#F0F3F7" />
        </g>
        <g style={{ filter: 'drop-shadow(0px 0px 1.62076px rgba(240, 243, 247, 1))' }}>
          <ellipse cx="68.1846" cy="271.92" rx="2.92139" ry="2.91971" fill="#F0F3F7" />
        </g>
        <defs>
          <filter id="filter0_b_941_1873" x="-4.69497" y="-4.6951" width="347.354" height="296.39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.71467" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_941_1873" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_941_1873" result="shape" />
          </filter>
          <filter id="filter1_d_941_1873" x="320.137" y="227.758" width="14.185" height="14.1804" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="1.62076" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_941_1873" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_941_1873" result="shape" />
          </filter>
          <filter id="filter2_d_941_1873" x="41.8398" y="265.758" width="12.3258" height="12.3225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="1.62076" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_941_1873" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_941_1873" result="shape" />
          </filter>
          <filter id="filter3_d_941_1873" x="51.9308" y="265.758" width="12.3258" height="12.3225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="1.62076" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_941_1873" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_941_1873" result="shape" />
          </filter>
          <filter id="filter4_d_941_1873" x="62.0217" y="265.758" width="12.3258" height="12.3225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="1.62076" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_941_1873" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_941_1873" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default PrincipleCard;
