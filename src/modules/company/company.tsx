'use client';

import { FC, useRef } from 'react';
import classNames from 'classnames';

import styles from './company.module.scss';
import { CompanyProps } from './company.types';
import { Disclose, GradientBlur } from '@/ui';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Language, useLanguage } from '@/service/language';

type Translations = Record<
  Language,
  {
    fullText: string;
    text1: string;
    text2: string;
    text3: string;
  }
>;

const translations: Translations = {
  ru: {
    fullText: 'Управляем сложными процессами медиабаинга с помощью прогнозирования, анализа и оптимизации кампаний',
    text1: '500+ клиентов <span>с 2020 года</span>',
    text2: 'Ориентируемся на <span>ROI вместо объемов</span>',
    text3: 'Рассчитываем всю <span>экономику заливов</span>',
  },
  en: {
    fullText: 'We manage complex media buying processes through forecasting, analysis, and campaign optimization.',
    text1: '500+ clients <span>since 2020</span>',
    text2: 'Focused on <span>ROI, not volume</span>',
    text3: 'Comprehensive funnel <span>economics analysis</span>',
  },
};

const Company: FC<CompanyProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const container = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLHeadingElement>(null);

  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);

  const { language } = useLanguage();
  const { fullText, text1: localizedText1, text2: localizedText2, text3: localizedText3 } = translations[language];

  useGSAP(() => {
    const cont = container.current;
    const txt = text.current;

    const t1 = text1.current;
    const t2 = text2.current;
    const t3 = text3.current;

    if (!cont || !txt) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cont,
        start: 'top 70%',
      },
    });

    tl.fromTo(
      cont,
      { width: 43, height: 46 },
      { width: '100%', height: '100%', duration: 0.4, ease: 'power2.out' }
    );

    tl.fromTo(
      txt,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }
    );

    [t1, t2, t3].forEach((element, index) => {
      tl.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        `-=${0.5 - index * 0.1}`
      );
    });
  });

  if (window.innerWidth > 768) {
    return (
      <div className={styles.company}>
        <GradientBlur className={styles.gradient} />
        <div className={rootClassName}>
          <div className={styles.container__title} ref={container}>
            <Disclose />
            <div className={styles.title}>
              <h2 ref={text}>
                {fullText}
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.text1} ref={text1}>
          <p
            className={styles.text1__company}
            dangerouslySetInnerHTML={{ __html: localizedText1 }}
          />
        </div>
        <div className={styles.text2} ref={text2}>
          <p
            className={styles.text2__company}
            dangerouslySetInnerHTML={{ __html: localizedText2 }}
          />
        </div>
        <div className={styles.text3} ref={text3}>
          <p
            className={styles.text3__company}
            dangerouslySetInnerHTML={{ __html: localizedText3 }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.company}>
        <GradientBlur className={styles.gradient} />
        <div className={rootClassName}>
          <div className={styles.container__title} ref={container}>
            <Disclose />
            <div className={styles.title}>
              <h2 ref={text}>
              {fullText}
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.text1} ref={text1}>
          <p
            className={styles.text1__company}
            dangerouslySetInnerHTML={{ __html: localizedText1 }}
          />
        </div>
        <div className={styles.text2} ref={text2}>
          <p
            className={styles.text2__company}
            dangerouslySetInnerHTML={{ __html: localizedText2 }}
          />
        </div>
        <div className={styles.text3} ref={text3}>
          <p
            className={styles.text3__company}
            dangerouslySetInnerHTML={{ __html: localizedText3 }}
          />
        </div>
      </div>
    );
  }
};

export default Company;
