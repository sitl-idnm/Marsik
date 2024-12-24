/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
'use client';

import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './buildimCards.module.scss';
import { BuildimCardsProps } from './buildimCards.types';
import BuildimCard from '../buildimCard/buildimCard';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ButtonTwo, Modal, TitleGradient } from '@/ui';
import { useLanguage, Language } from '@/service/language';

const translations: Record<Language, any> = {
  ru: {
    subTitleFirst: 'Что вы будете делать:',
    subTitleSecond: 'Что мы ждем от вас:',
    descriptions: {
      first: `Ищем проактивного медиабайера, готового принять вызов и стать частью лидирующей команды в медиабаинге в вертикале iGaming.

Если ты ищешь среду, где трудности превращаются в возможности для роста, готов брать на себя ответственность и находить уникальные решения сложных задач – ты наш человек.

Мы не обучаем с нуля, но если ты покажешь, что способен мыслить нестандартно, брать ответственность и добиваться реальных результатов, мы дадим тебе все ресурсы для дальнейшего развития.`,
      second: `Ищем тимлида, который не боится сложных вызовов и готов возглавить команду, постоянно стремится к высоким результатам.

У нас тебя ждут амбициозные задачи, требующие нестандартного подхода и сильного лидерства.`,
      third: `Мы в поисках креативного дизайнера, который готов работать в динамичной среде и создавать визуальные решения, привлекать внимание на международных рынках.

Если ты обладаешь чувством стиля и умеешь делать креативы, которые цепляют с первого взгляда – нам нужен именно ты!`,
    },
    tasks: {
      first: [
        'Управление рекламными кампаниями в выбранном направлении: FB, Google, In-App, Push, ASO, SEO, TikTok, УБТ, TG ads, SMS и др.',
        'Оптимизация бюджета и достижение максимального ROI',
        'Анализ и тестирование креативов, создание новых решений',
        'Поиск и использование новых источников трафика и возможностей для роста',
      ],
      second: [
        'Управление командой в выбранном направлении: FB, Google, In-App, Push, ASO, SEO, TikTok, УБТ, TG ads, SMS и др.',
        'Постановка задач, контроль их выполнения и обеспечение достижения целей',
        'Создание стратегий, которые помогут команде достигать новых высот',
        'Поиск уникальных решений и развитие талантов внутри команды',
      ],
      third: [
        'Разработка графики и креативов для рекламных кампаний',
        'Взаимодействие с медиабайерами и другими отделами для создания визуальных решений',
        'Улучшение дизайна текущих проектов и создание новых концепций',
      ],
    },
    expectations: {
      first: [
        'Опыт работы в одном из направлений: FB, Google, In-App, Push и др.',
        'Способность принимать вызовы, преодолевать трудности и предлагать решения',
        'Проактивность, инициативность и готовность брать ответственность за результаты',
      ],
      second: [
        'Опыт управления командой в одном из направлений',
        'Способность принимать сложные вызовы и вести команду к успеху',
        'Умение мыслить креативно и разрабатывать новые стратегии',
      ],
      third: [
        'Опыт работы в сфере дизайна, желательно в digital и рекламе',
        'Умение создавать визуальные концепты, которые соответствуют целевой аудитории',
        'Творческое мышление и готовность к работе в команде',
      ],
    },
    hrMessages: {
      first: 'Если ты готов к сложным задачам, которые выводят тебя на новый уровень, и хочешь стать частью команды, обратись к нашему HR через Telegram.',
      second: 'Если ты готов принять вызов и повести команду вперед, обращайся к нашему HR через Telegram.',
      third: 'Если ты готов создавать смелые креативы, обращайся к нашему HR через Telegram.',
    },
    button: 'Написать HR',
  },
  en: {
    subTitleFirst: 'What you will do:',
    subTitleSecond: 'What we expect from you:',
    descriptions: {
      first: `We’re looking for a proactive media buyer ready to take on challenges and join the leading media buying team in the iGaming vertical.
      If you're seeking an environment where challenges turn into growth opportunities, ready to take responsibility, and able to find unique solutions to complex tasks – you’re the person we need.
      We don’t train from scratch, but if you show that you can think creatively, take responsibility, and achieve real results, we’ll provide all the resources you need for further development.`,
      second: `We’re looking for a team lead unafraid of challenges and ready to lead a high-performing team.

We offer ambitious tasks that require an unconventional approach and strong leadership. We support those who are ready to overcome obstacles, find new paths, and take responsibility for results.

This isn’t just a job – it’s a challenge for those who strive to be the best.`,
      third: `We are searching for a creative Designer ready to work in a dynamic environment and create visuals that attract international attention.

If you have a sense of style and can create eye-catching creatives – we need you!`,
    },
    tasks: {
      first: [
        'Manage ad campaigns in your chosen area: FB, Google, In-App, Push, ASO, SEO, TikTok, UBT, TG ads, SMS, and more',
        'Optimize budgets to achieve maximum ROI',
        'Analyze and test creatives, and develop new solutions',
        'Discover and utilize new traffic sources and growth opportunities',
      ],
      second: [
        'Lead a team in your chosen area: FB, Google, In-App, Push, ASO, SEO, TikTok, UBT, TG ads, SMS, and more',
        'Set tasks, monitor their progress, and ensure goals are met',
        'Develop strategies to help the team reach new heights',
        'Find unique solutions and foster talent within the team',
      ],
      third: [
        'Developing graphics and creatives for advertising campaigns',
        'Collaborating with media buyers and other departments',
        'Improving current designs and creating new visual concepts',
      ],
    },
    expectations: {
      first: [
        'Experience in one of the following areas: FB, Google, In-App, Push, etc.',
        'Ability to embrace challenges, overcome obstacles, and propose solutions',
        'Proactivity, initiative, and readiness to take responsibility for results',
      ],
      second: [
        'Experience in managing a team in one of the relevant areas',
        'Ability to take on tough challenges and lead the team to success',
        'Creative thinking and the ability to develop new strategies',
      ],
      third: [
        'Experience in design, preferably in digital or advertising',
        'Ability to create visual concepts tailored to the target audience',
        'Creative mindset and readiness to work in a team',
      ],
    },
    hrMessages: {
      first: 'If you’re ready for complex tasks that push you to a new level and want to join a team that values results, reach out to our HR on Telegram.',
      second: 'If you’re ready to accept the challenge and lead the team forward, contact our HR on Telegram',
      third: 'If you are ready to create bold creatives, contact our HR via Telegram.',
    },
    button: 'Contact HR',
  },
};



const BuildimCards: FC<BuildimCardsProps> = ({ className, onHoverCard }) => {
  const { language } = useLanguage(); // Язык пользователя
  const t = translations[language];
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const rootClassName = classNames(styles.root, className);

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    switch (realIndex) {
      case 0:
        setActiveIcon('first-active');
        onHoverCard('first');
        break;
      case 1:
        setActiveIcon('second-active');
        onHoverCard('second');
        break;
      case 2:
        setActiveIcon('third-active');
        onHoverCard('third');
        break;
      default:
        setActiveIcon(null);
        onHoverCard(null);
    }
  };

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName);
    setIsModalOpen(true);
  };

  return (
    <div className={rootClassName}>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          359: {
            slidesPerView: 1.5,
            spaceBetween: 20,
            navigation: true,
            pagination: { clickable: true },
            scrollbar: { draggable: true },
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
            navigation: true,
            pagination: { clickable: true },
            scrollbar: { draggable: true },
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: false,
            pagination: false,
            scrollbar: false,
            autoplay: false,
          },
        }}
        onSlideChange={handleSlideChange}
        onInit={(swiper) => handleSlideChange(swiper)}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <div
            onMouseEnter={() => handleSlideChange({ realIndex: 0 })}
            onClick={() => handleCardClick('first')}
          >
            <BuildimCard
              className="custom-class"
              iconName={activeIcon === 'first-active' ? 'first-active' : 'third'}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div
            onMouseEnter={() => handleSlideChange({ realIndex: 1 })}
            onClick={() => handleCardClick('second')}
          >
            <BuildimCard
              iconName={activeIcon === 'second-active' ? 'second-active' : 'second'}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div
            onMouseEnter={() => handleSlideChange({ realIndex: 2 })}
            onClick={() => handleCardClick('third')}
          >
            <BuildimCard
              iconName={activeIcon === 'third-active' ? 'third-active' : 'first'}
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* Заголовок */}
        <div className={styles.modalHeader}>
          {/* Заголовок h2 */}
          <h2 className={styles.modalTitle}>
            {selectedCard === 'first' && (<TitleGradient text='Media buyer' />)}
            {selectedCard === 'second' && (<TitleGradient text='Team lead' />)}
            {selectedCard === 'third' && (<TitleGradient text='Designer' />)}
          </h2>

          {/* Блок с SVG отображается только для первой и третьей карточки */}
          {(selectedCard === 'first' || selectedCard === 'third') && (
            <div className={styles.modalIcons}>
              <svg width="84" height="39" viewBox="0 0 84 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="83.7059" height="38.2941" rx="4" fill="#031A2A" fill-opacity="0.7" />
                <rect x="0.5" y="0.5" width="82.7059" height="37.2941" rx="3.5" stroke="#6DCEFF" stroke-opacity="0.3" />
                <path d="M26.1709 24.147V14.2548L21.1729 21.674H20.118L15.12 14.2548V24.147H13.8748V11.8163H14.9643L20.6368 20.3077L26.3266 11.8163H27.3815V24.147H26.1709ZM30.789 14.3932V24.147H29.5611V14.3932H30.789ZM29.5611 12.5254V10.6922L30.789 10.623V12.5254H29.5611ZM41.2616 10.6922L42.5068 10.623V24.0087C42.0572 24.0663 41.6018 24.1182 41.1406 24.1643C40.6794 24.2104 40.2355 24.2508 39.8089 24.2854C39.3824 24.32 38.9788 24.343 38.5984 24.3546C38.2294 24.3776 37.9124 24.3892 37.6472 24.3892C36.9324 24.3892 36.2752 24.3142 35.6756 24.1643C35.0761 24.026 34.5573 23.7723 34.1192 23.4034C33.6811 23.0229 33.3352 22.5156 33.0815 21.8815C32.8394 21.2359 32.7183 20.4173 32.7183 19.4257C32.7183 18.4457 32.8394 17.6214 33.0815 16.9527C33.3352 16.2724 33.6753 15.7248 34.1019 15.3097C34.54 14.8947 35.0531 14.5949 35.6411 14.4104C36.2291 14.226 36.8689 14.1337 37.5607 14.1337C38.0103 14.1337 38.5638 14.1741 39.2209 14.2548C39.8781 14.324 40.5584 14.422 41.2616 14.5488V10.6922ZM37.6472 15.327C37.1053 15.327 36.6095 15.3962 36.1599 15.5346C35.7102 15.6614 35.324 15.8862 35.0012 16.209C34.6783 16.5203 34.4247 16.9412 34.2402 17.4715C34.0558 17.9903 33.9635 18.6417 33.9635 19.4257C33.9635 20.2097 34.0558 20.8496 34.2402 21.3454C34.4247 21.8412 34.6783 22.2274 35.0012 22.5041C35.3355 22.7808 35.7333 22.971 36.1945 23.0748C36.6672 23.167 37.1802 23.2132 37.7336 23.2132C38.0911 23.2132 38.5868 23.2016 39.2209 23.1786C39.8551 23.144 40.5353 23.0806 41.2616 22.9883V15.7248C40.9042 15.6556 40.5468 15.598 40.1894 15.5519C39.832 15.4942 39.4919 15.4539 39.1691 15.4308C38.8578 15.3962 38.5695 15.3732 38.3043 15.3616C38.0392 15.3386 37.8201 15.327 37.6472 15.327ZM52.9831 10.6922L54.2283 10.623V24.0087C53.7787 24.0663 53.3233 24.1182 52.8621 24.1643C52.4009 24.2104 51.957 24.2508 51.5304 24.2854C51.1038 24.32 50.7003 24.343 50.3198 24.3546C49.9509 24.3776 49.6338 24.3892 49.3687 24.3892C48.6538 24.3892 47.9967 24.3142 47.3971 24.1643C46.7976 24.026 46.2788 23.7723 45.8407 23.4034C45.4025 23.0229 45.0567 22.5156 44.803 21.8815C44.5609 21.2359 44.4398 20.4173 44.4398 19.4257C44.4398 18.4457 44.5609 17.6214 44.803 16.9527C45.0567 16.2724 45.3968 15.7248 45.8234 15.3097C46.2615 14.8947 46.7745 14.5949 47.3625 14.4104C47.9505 14.226 48.5904 14.1337 49.2822 14.1337C49.7318 14.1337 50.2853 14.1741 50.9424 14.2548C51.5996 14.324 52.2798 14.422 52.9831 14.5488V10.6922ZM49.3687 15.327C48.8268 15.327 48.331 15.3962 47.8814 15.5346C47.4317 15.6614 47.0455 15.8862 46.7227 16.209C46.3998 16.5203 46.1462 16.9412 45.9617 17.4715C45.7773 17.9903 45.685 18.6417 45.685 19.4257C45.685 20.2097 45.7773 20.8496 45.9617 21.3454C46.1462 21.8412 46.3998 22.2274 46.7227 22.5041C47.057 22.7808 47.4548 22.971 47.916 23.0748C48.3887 23.167 48.9017 23.2132 49.4551 23.2132C49.8125 23.2132 50.3083 23.2016 50.9424 23.1786C51.5765 23.144 52.2568 23.0806 52.9831 22.9883V15.7248C52.6257 15.6556 52.2683 15.598 51.9109 15.5519C51.5535 15.4942 51.2134 15.4539 50.8905 15.4308C50.5793 15.3962 50.291 15.3732 50.0258 15.3616C49.7607 15.3386 49.5416 15.327 49.3687 15.327ZM56.2305 24.147V10.6922L57.4584 10.623V24.147H56.2305ZM64.7662 24.3892C63.9707 24.3892 63.2386 24.2969 62.5699 24.1124C61.9127 23.928 61.3478 23.6282 60.8751 23.2132C60.4024 22.7981 60.0334 22.262 59.7682 21.6048C59.5146 20.9361 59.3878 20.129 59.3878 19.1836C59.3878 18.169 59.5319 17.3389 59.8201 16.6933C60.1084 16.0361 60.4946 15.5173 60.9788 15.1368C61.4631 14.7563 62.0222 14.4969 62.6564 14.3586C63.302 14.2087 63.9822 14.1337 64.6971 14.1337C65.458 14.1337 66.144 14.2144 66.7551 14.3759C67.3661 14.5373 67.8849 14.8197 68.3115 15.2233C68.7381 15.6153 69.0609 16.1399 69.28 16.797C69.5106 17.4542 69.6259 18.2728 69.6259 19.2528V19.8408H60.6502C60.7655 21.0399 61.1806 21.9046 61.8954 22.4349C62.6218 22.9537 63.6133 23.2132 64.87 23.2132C65.0545 23.2132 65.3081 23.2074 65.6309 23.1959C65.9653 23.1843 66.3285 23.167 66.7205 23.144C67.124 23.1094 67.5391 23.069 67.9657 23.0229C68.4038 22.9653 68.8188 22.8961 69.2108 22.8154L69.2973 24.0087C68.8938 24.0663 68.4729 24.1182 68.0348 24.1643C67.6082 24.2104 67.1932 24.2508 66.7897 24.2854C66.3977 24.32 66.0229 24.343 65.6655 24.3546C65.3197 24.3776 65.0199 24.3892 64.7662 24.3892ZM64.6625 15.3789C64.1667 15.3789 63.6882 15.4193 63.2271 15.5C62.7659 15.5807 62.3508 15.7421 61.9819 15.9842C61.6129 16.2263 61.3074 16.5664 61.0653 17.0046C60.8347 17.4312 60.6964 17.9903 60.6502 18.6821H68.3807C68.3461 18.0364 68.2366 17.5003 68.0521 17.0737C67.8677 16.6472 67.6198 16.3128 67.3085 16.0707C66.9972 15.817 66.6167 15.6383 66.1671 15.5346C65.7289 15.4308 65.2274 15.3789 64.6625 15.3789Z" fill="#6DCEFF" fill-opacity="0.7" />
              </svg>

              <svg width="85" height="39" viewBox="0 0 85 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.705933" width="83.7059" height="38.2941" rx="4" fill="#031A2A" fill-opacity="0.7" />
                <rect x="1.20593" y="0.5" width="82.7059" height="37.2941" rx="3.5" stroke="#6DCEFF" stroke-opacity="0.3" />
                <path d="M19.6479 23.2132C20.1091 23.2132 20.5933 23.1959 21.1006 23.1613C21.6194 23.1152 22.0921 23.0172 22.5187 22.8673C22.9453 22.7059 23.297 22.481 23.5737 22.1928C23.8504 21.893 23.9887 21.4837 23.9887 20.9649C23.9887 20.5268 23.8792 20.1752 23.6601 19.91C23.4526 19.6448 23.1586 19.4315 22.7781 19.2701C22.3977 19.0972 21.9538 18.9646 21.4465 18.8723C20.9392 18.7801 20.3915 18.6879 19.8035 18.5956C19.0772 18.4688 18.397 18.342 17.7628 18.2152C17.1402 18.0768 16.5926 17.8808 16.1199 17.6272C15.6587 17.3735 15.2898 17.0449 15.0131 16.6414C14.7479 16.2263 14.6153 15.6787 14.6153 14.9984C14.6153 14.2836 14.7594 13.7072 15.0477 13.269C15.3474 12.8194 15.7394 12.4677 16.2237 12.2141C16.7194 11.9604 17.2844 11.7933 17.9185 11.7126C18.5526 11.6203 19.204 11.5742 19.8727 11.5742C20.5645 11.5742 21.3312 11.6088 22.1728 11.678C23.0145 11.7472 23.8504 11.8394 24.6805 11.9547L24.594 13.148C23.7639 12.9981 22.9338 12.9001 22.1037 12.854C21.2851 12.7963 20.5587 12.7675 19.9246 12.7675C19.4404 12.7675 18.9561 12.7906 18.4719 12.8367C17.9877 12.8713 17.5495 12.9693 17.1575 13.1307C16.7771 13.2806 16.4658 13.5054 16.2237 13.8052C15.9815 14.1049 15.8605 14.5142 15.8605 15.033C15.8605 15.4596 15.947 15.8055 16.1199 16.0707C16.2928 16.3243 16.5407 16.5319 16.8635 16.6933C17.1979 16.8547 17.6072 16.9873 18.0914 17.091C18.5872 17.1833 19.1579 17.2813 19.8035 17.385C20.576 17.5119 21.2908 17.6502 21.948 17.8001C22.6052 17.95 23.1759 18.1517 23.6601 18.4054C24.1444 18.6475 24.5248 18.9761 24.8015 19.3912C25.0782 19.7947 25.2166 20.3193 25.2166 20.9649C25.2166 21.7028 25.0494 22.2966 24.7151 22.7462C24.3807 23.1959 23.9484 23.5417 23.418 23.7839C22.8992 24.026 22.317 24.1874 21.6713 24.2681C21.0372 24.3488 20.4146 24.3892 19.8035 24.3892C19.008 24.3892 18.1491 24.3546 17.2267 24.2854C16.3044 24.2277 15.382 24.1355 14.4597 24.0087L14.5288 22.8154C15.4627 22.9768 16.3793 23.0863 17.2786 23.144C18.1894 23.1901 18.9792 23.2132 19.6479 23.2132ZM32.587 24.3892C31.7915 24.3892 31.0594 24.2969 30.3907 24.1124C29.7335 23.928 29.1685 23.6282 28.6958 23.2132C28.2231 22.7981 27.8542 22.262 27.589 21.6048C27.3354 20.9361 27.2085 20.129 27.2085 19.1836C27.2085 18.169 27.3527 17.3389 27.6409 16.6933C27.9291 16.0361 28.3154 15.5173 28.7996 15.1368C29.2838 14.7563 29.843 14.4969 30.4771 14.3586C31.1228 14.2087 31.803 14.1337 32.5178 14.1337C33.2788 14.1337 33.9648 14.2144 34.5758 14.3759C35.1869 14.5373 35.7057 14.8197 36.1323 15.2233C36.5589 15.6153 36.8817 16.1399 37.1008 16.797C37.3314 17.4542 37.4467 18.2728 37.4467 19.2528V19.8408H28.471C28.5863 21.0399 29.0014 21.9046 29.7162 22.4349C30.4425 22.9537 31.4341 23.2132 32.6908 23.2132C32.8752 23.2132 33.1289 23.2074 33.4517 23.1959C33.7861 23.1843 34.1492 23.167 34.5412 23.144C34.9448 23.1094 35.3598 23.069 35.7864 23.0229C36.2245 22.9653 36.6396 22.8961 37.0316 22.8154L37.1181 24.0087C36.7145 24.0663 36.2937 24.1182 35.8556 24.1643C35.429 24.2104 35.0139 24.2508 34.6104 24.2854C34.2184 24.32 33.8437 24.343 33.4863 24.3546C33.1404 24.3776 32.8407 24.3892 32.587 24.3892ZM32.4832 15.3789C31.9875 15.3789 31.509 15.4193 31.0478 15.5C30.5867 15.5807 30.1716 15.7421 29.8027 15.9842C29.4337 16.2263 29.1282 16.5664 28.8861 17.0046C28.6555 17.4312 28.5171 17.9903 28.471 18.6821H36.2015C36.1669 18.0364 36.0574 17.5003 35.8729 17.0737C35.6884 16.6472 35.4405 16.3128 35.1292 16.0707C34.8179 15.817 34.4375 15.6383 33.9878 15.5346C33.5497 15.4308 33.0482 15.3789 32.4832 15.3789ZM39.3708 14.5142C39.8204 14.4566 40.2758 14.4047 40.737 14.3586C41.1982 14.3124 41.642 14.2721 42.0686 14.2375C42.5068 14.2029 42.9103 14.1799 43.2792 14.1683C43.6482 14.1453 43.971 14.1337 44.2477 14.1337C44.951 14.1337 45.6024 14.2087 46.2019 14.3586C46.813 14.5084 47.3376 14.7736 47.7757 15.1541C48.2138 15.523 48.5539 16.0303 48.796 16.676C49.0497 17.3101 49.1765 18.1229 49.1765 19.1144V24.147H47.9486V19.1144C47.9486 18.3304 47.8564 17.6906 47.6719 17.1948C47.4875 16.699 47.2223 16.3128 46.8764 16.0361C46.542 15.7594 46.1385 15.5749 45.6658 15.4827C45.2046 15.3789 44.6973 15.327 44.1439 15.327C43.7865 15.327 43.285 15.3443 42.6393 15.3789C42.0052 15.4135 41.325 15.4769 40.5986 15.5692V24.147H39.3708V14.5142ZM52.4046 14.3932V24.147H51.1767V14.3932H52.4046ZM51.1767 12.5254V10.6922L52.4046 10.623V12.5254H51.1767ZM59.4703 24.4064C58.7785 24.4064 58.1214 24.3257 57.4988 24.1643C56.8762 24.0029 56.3285 23.7262 55.8558 23.3342C55.3947 22.9422 55.0257 22.4176 54.749 21.7604C54.4723 21.0917 54.3339 20.2559 54.3339 19.2528C54.3339 18.2728 54.4608 17.46 54.7144 16.8143C54.9796 16.1572 55.3428 15.6326 55.8039 15.2406C56.2651 14.837 56.807 14.5546 57.4296 14.3932C58.0522 14.2202 58.7209 14.1337 59.4357 14.1337C60.1275 14.1337 60.7847 14.2144 61.4072 14.3759C62.0414 14.5373 62.589 14.814 63.0502 15.206C63.5229 15.598 63.8976 16.1283 64.1743 16.797C64.451 17.4542 64.5894 18.2843 64.5894 19.2874C64.5894 20.2674 64.4568 21.086 64.1916 21.7432C63.9264 22.3888 63.5632 22.9134 63.1021 23.3169C62.6524 23.7089 62.1163 23.9856 61.4937 24.147C60.8711 24.32 60.1967 24.4064 59.4703 24.4064ZM59.4703 23.1959C60.0122 23.1959 60.5195 23.1324 60.9922 23.0056C61.4649 22.8788 61.8742 22.6655 62.2201 22.3657C62.5659 22.066 62.8369 21.6682 63.0329 21.1724C63.2404 20.6652 63.3442 20.0368 63.3442 19.2874C63.3442 18.5149 63.2404 17.875 63.0329 17.3677C62.8254 16.8604 62.5429 16.4569 62.1855 16.1572C61.8281 15.8574 61.413 15.6499 60.9403 15.5346C60.4676 15.4077 59.9661 15.3443 59.4357 15.3443C58.8938 15.3443 58.3865 15.4077 57.9138 15.5346C57.4527 15.6614 57.0491 15.8747 56.7032 16.1744C56.3574 16.4742 56.0807 16.8777 55.8731 17.385C55.6771 17.8808 55.5791 18.5034 55.5791 19.2528C55.5791 20.0253 55.6829 20.6652 55.8904 21.1724C56.0979 21.6797 56.3804 22.0833 56.7378 22.383C57.0952 22.6828 57.5103 22.8961 57.983 23.0229C58.4557 23.1382 58.9515 23.1959 59.4703 23.1959ZM66.5299 24.147V14.7909C66.9565 14.7102 67.3947 14.641 67.8443 14.5834C68.3055 14.5142 68.7494 14.4566 69.1759 14.4104C69.6025 14.3643 70.0061 14.3297 70.3865 14.3067C70.767 14.2836 71.1071 14.2721 71.4069 14.2721V15.4308C71.2224 15.4308 70.9918 15.4366 70.7151 15.4481C70.4499 15.4596 70.1559 15.4827 69.8331 15.5173C69.5218 15.5403 69.1875 15.5749 68.8301 15.621C68.4727 15.6672 68.1152 15.719 67.7578 15.7767V24.147H66.5299Z" fill="#6DCEFF" fill-opacity="0.7" />
              </svg>
            </div>
          )}
        </div>

        {/* Основной текст */}
        <div className={styles.modalText}>
          {selectedCard && (
            <p className={styles.modalText__inside}>{t.descriptions[selectedCard]}</p>
          )}
        </div>

        <div className={styles.modalSection}>
          <h3 className={styles.modalSubtitle}>{t.subTitleFirst}</h3>
          {selectedCard && (
            <ul className={styles.modalList}>
              {t.tasks[selectedCard]?.map((task: string, i: number) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.modalSection}>
          <h3 className={styles.modalSubtitle}>{t.subTitleSecond}</h3>
          {selectedCard && (
            <ul className={styles.modalList}>
              {t.expectations[selectedCard]?.map((exp: string, i: number) => (
                <li key={i}>{exp}</li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.modalText}>
          {selectedCard && (
            <p className={styles.modalText__inside}>{t.hrMessages[selectedCard]}</p>
          )}
        </div>
        <a href="https://t.me/Var_marsa">
          <ButtonTwo className={styles.modalButton} text={t.button} big={false} modal={true} />
        </a>
      </Modal>

    </div>
  );
};

export default BuildimCards;
