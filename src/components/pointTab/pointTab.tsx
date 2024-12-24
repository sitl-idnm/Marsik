'use client';

import { FC, useState } from 'react';
import styles from './pointTab.module.scss';
import Image from 'next/image';
import Left from '@public/images/left__angle.webp'
import Right from '@public/images/right__angle.webp'

const CirclePoints: FC = () => {
  const points = [
    { id: 1, title: 'С какими источниками вы работаете?', text: 'Плотно работаем с FB, Google Ads (PPC, UAC, KMC), ASO' },
    { id: 2, title: 'Есть ли у вас дизайнеры, как быстро выдаются крео?', text: 'Есть команда штатных моушен-дизайнеров (4 человека), в зависимости от сложности готовые крео выдаются от пары часов до 2-х дней' },
    { id: 3, title: 'Кто ищет офферы?', text: 'В штате компании есть опытный Bizdev, который поможет найти любой оффер под ваши требования и даст свои рекомендации, на что стоит обратить внимание, а также сделает все возможное, чтоб достать unlimited капу и увеличить ставку по офферу' },
    { id: 4, title: 'Кто занимается техническим сопровождением?', text: 'У нас в штате есть опытный IT-интегратор, который сопровождает технический процесс запуска РК на всех этапах' },
    { id: 5, title: 'Кто руководит баингом?', text: 'В каждом источнике трафика, есть свой Head – опытный специалист, который координирует свои команды. В каждой команде есть свой Team lead, который помогает сориентироваться в поиске связок, в выборе продукта и технических особенностях' },
    { id: 6, title: 'Что необходимо, чтобы попасть к вам в команду?', text: 'Для начала напиши нашему HR Варваре @var_marsa. Тебя пригласят на собеседование, по итогам которого у тебя будет шанс прийти к нам на тестовый пролив. После теста мы принимаем решение о дальнейшем трудоустройстве' },
  ];

  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [activeText, setActiveText] = useState<string | null>(null);

  const handleMouseEnter = (text: string, title: string) => {
    setActiveText(text);
    setActiveTitle(title);
  };

  const handleMouseLeave = () => {
    setActiveText(null);
    setActiveTitle(null);
  };

  return (
    <div className={styles.circleContainer}>
      {/* Карточка в центре круга */}
      <div className={styles.centerCard}>
        {activeText && activeTitle && (
          <div className={styles.card}>
            <div className={styles.text__cont}>
              <div className={styles.root1}>
                <Image
                  src={Left}
                  width={43}
                  height={46}
                  alt=''
                  className={styles.left}
                />
                <Image
                  src={Right}
                  width={43}
                  height={46}
                  alt=''
                  className={styles.right}
                />
              </div>
              <div className={styles.cardText}>
                <h3>{activeTitle}</h3>
                <p>{activeText}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Точки по кругу */}
      <div className={styles.pointsContainer}>
        {points.map((point, index) => {
          const angle = (index / points.length) * 360;
          const radius = 300; // Увеличен радиус круга
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={point.id}
              className={styles.point}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              onMouseEnter={() => handleMouseEnter(point.text, point.title)}
              onMouseLeave={handleMouseLeave}
            >
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2.21775 6.98619L13.5 0.472377L24.7823 6.98619V20.0138L13.5 26.5276L2.21775 20.0138V6.98619Z" stroke="#F0F3F7" stroke-width="0.818182" />
                <path d="M13.5 4.90918L20.9399 9.20463V17.7955L13.5 22.091L6.06002 17.7955V9.20463L13.5 4.90918Z" fill="#F0F3F7" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CirclePoints;
