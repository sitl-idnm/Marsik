'use client';

import { FC, useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import styles from './trafficGraphic.module.scss';
import { useLanguage, Language } from '@/service/language';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const NUM_VISIBLE_POINTS = 15; // Количество видимых точек на графике
const UPDATE_INTERVAL = 1000; // Интервал обновления (мс)

// Объект переводов
const translations: Record<Language, { whiteText: string; regularText: string }> = {
  ru: {
    whiteText: 'Курс на успех:',
    regularText: 'ориентируемся на ROI, чтобы обеспечить заказчикам качественные лиды',
  },
  en: {
    whiteText: 'Course to success:',
    regularText: 'We prioritize ROI to provide clients with high-quality leads',
  },
};

const TrafficGraphic: FC = () => {
  const [data, setData] = useState<number[]>([150]); // Начальное значение Y = 150
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage(); // Получение текущего языка
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (graphRef.current) {
      observer.observe(graphRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const lastValue = prevData[prevData.length - 1] || 150; // Начальное значение 150
        const delta = (Math.random() - 0.5) * 120; // Изменение (-20 до +20)
        const newValue = Math.max(150, Math.min(290, lastValue + delta)); // Ограничение по [150, 290]
        return [...prevData, newValue]; // Добавляем новое значение в конец
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isVisible]);

  const visibleData = data.slice(-NUM_VISIBLE_POINTS);

  const chartData = {
    labels: Array.from({ length: visibleData.length }, (_, i) => i), // Метки для оси X
    datasets: [
      {
        label: 'Real-time Data',
        data: visibleData,
        borderColor: '#add7ee', // Цвет линии
        backgroundColor: '#add7ee', // Цвет области под графиком
        borderWidth: 2,
        tension: 0.4, // Плавность линий
        pointRadius: 5, // Размеры всех точек
        pointBackgroundColor: '#add7ee', // Цвет всех точек
        pointHoverBackgroundColor: '#0a0c18', // Цвет точки при наведении
        pointHoverRadius: 7, // Увеличение точки при наведении
        fill: true, // Заполнение области под графиком
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: UPDATE_INTERVAL - 100, // Плавное обновление графика
    },
    scales: {
      x: {
        display: false, // Скрыть ось X
      },
      y: {
        beginAtZero: false, // Не начинать с нуля
        min: 0, // Минимальное значение на оси Y
        max: 300, // Максимальное значение на оси Y
        grid: {
          drawBorder: false,
          display: false, // Убираем линии сетки
        },
        ticks: {
          display: false, // Убираем значения шкалы Y
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Убираем легенду
      },
      tooltip: {
        enabled: false, // Отключение всплывающего значения
      },
    },
  };

  // Получаем текущий перевод
  const { whiteText, regularText } = translations[language];

  return (
    <div className={styles.root} ref={graphRef}>
      <Line data={chartData} options={options} />
      <div className={styles.textcontainer}>
        <p className={styles.text}>
          <span className={styles.textwhite}>{whiteText}</span> {regularText}
        </p>
      </div>
    </div>
  );
};

export default TrafficGraphic;
