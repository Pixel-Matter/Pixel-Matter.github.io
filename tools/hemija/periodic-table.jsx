// Use React from global scope (loaded via CDN)
const { useState, useMemo, useEffect } = React;

// Данные элементов (первые 54 - до 5 периода включительно)
const elementsData = [
  { number: 1, symbol: 'H', nameRu: 'Водород', nameSrb: 'Vodonik', mass: 1.008, category: 'nonmetal', group: 1, period: 1, electrons: [1], protons: 1, neutrons: 0, electronegativity: 2.2, state: 'gas' },
  { number: 2, symbol: 'He', nameRu: 'Гелий', nameSrb: 'Helijum', mass: 4.003, category: 'noble', group: 18, period: 1, electrons: [2], protons: 2, neutrons: 2, electronegativity: null, state: 'gas' },
  { number: 3, symbol: 'Li', nameRu: 'Литий', nameSrb: 'Litijum', mass: 6.941, category: 'alkali', group: 1, period: 2, electrons: [2, 1], protons: 3, neutrons: 4, electronegativity: 0.98, state: 'solid' },
  { number: 4, symbol: 'Be', nameRu: 'Бериллий', nameSrb: 'Berilijum', mass: 9.012, category: 'alkaline', group: 2, period: 2, electrons: [2, 2], protons: 4, neutrons: 5, electronegativity: 1.57, state: 'solid' },
  { number: 5, symbol: 'B', nameRu: 'Бор', nameSrb: 'Bor', mass: 10.81, category: 'metalloid', group: 13, period: 2, electrons: [2, 3], protons: 5, neutrons: 6, electronegativity: 2.04, state: 'solid' },
  { number: 6, symbol: 'C', nameRu: 'Углерод', nameSrb: 'Ugljenik', mass: 12.01, category: 'nonmetal', group: 14, period: 2, electrons: [2, 4], protons: 6, neutrons: 6, electronegativity: 2.55, state: 'solid' },
  { number: 7, symbol: 'N', nameRu: 'Азот', nameSrb: 'Azot', mass: 14.01, category: 'nonmetal', group: 15, period: 2, electrons: [2, 5], protons: 7, neutrons: 7, electronegativity: 3.04, state: 'gas' },
  { number: 8, symbol: 'O', nameRu: 'Кислород', nameSrb: 'Kiseonik', mass: 16.00, category: 'nonmetal', group: 16, period: 2, electrons: [2, 6], protons: 8, neutrons: 8, electronegativity: 3.44, state: 'gas' },
  { number: 9, symbol: 'F', nameRu: 'Фтор', nameSrb: 'Fluor', mass: 19.00, category: 'halogen', group: 17, period: 2, electrons: [2, 7], protons: 9, neutrons: 10, electronegativity: 3.98, state: 'gas' },
  { number: 10, symbol: 'Ne', nameRu: 'Неон', nameSrb: 'Neon', mass: 20.18, category: 'noble', group: 18, period: 2, electrons: [2, 8], protons: 10, neutrons: 10, electronegativity: null, state: 'gas' },
  { number: 11, symbol: 'Na', nameRu: 'Натрий', nameSrb: 'Natrijum', mass: 22.99, category: 'alkali', group: 1, period: 3, electrons: [2, 8, 1], protons: 11, neutrons: 12, electronegativity: 0.93, state: 'solid' },
  { number: 12, symbol: 'Mg', nameRu: 'Магний', nameSrb: 'Magnezijum', mass: 24.31, category: 'alkaline', group: 2, period: 3, electrons: [2, 8, 2], protons: 12, neutrons: 12, electronegativity: 1.31, state: 'solid' },
  { number: 13, symbol: 'Al', nameRu: 'Алюминий', nameSrb: 'Aluminijum', mass: 26.98, category: 'metal', group: 13, period: 3, electrons: [2, 8, 3], protons: 13, neutrons: 14, electronegativity: 1.61, state: 'solid' },
  { number: 14, symbol: 'Si', nameRu: 'Кремний', nameSrb: 'Silicijum', mass: 28.09, category: 'metalloid', group: 14, period: 3, electrons: [2, 8, 4], protons: 14, neutrons: 14, electronegativity: 1.90, state: 'solid' },
  { number: 15, symbol: 'P', nameRu: 'Фосфор', nameSrb: 'Fosfor', mass: 30.97, category: 'nonmetal', group: 15, period: 3, electrons: [2, 8, 5], protons: 15, neutrons: 16, electronegativity: 2.19, state: 'solid' },
  { number: 16, symbol: 'S', nameRu: 'Сера', nameSrb: 'Sumpor', mass: 32.07, category: 'nonmetal', group: 16, period: 3, electrons: [2, 8, 6], protons: 16, neutrons: 16, electronegativity: 2.58, state: 'solid' },
  { number: 17, symbol: 'Cl', nameRu: 'Хлор', nameSrb: 'Hlor', mass: 35.45, category: 'halogen', group: 17, period: 3, electrons: [2, 8, 7], protons: 17, neutrons: 18, electronegativity: 3.16, state: 'gas' },
  { number: 18, symbol: 'Ar', nameRu: 'Аргон', nameSrb: 'Argon', mass: 39.95, category: 'noble', group: 18, period: 3, electrons: [2, 8, 8], protons: 18, neutrons: 22, electronegativity: null, state: 'gas' },
  { number: 19, symbol: 'K', nameRu: 'Калий', nameSrb: 'Kalijum', mass: 39.10, category: 'alkali', group: 1, period: 4, electrons: [2, 8, 8, 1], protons: 19, neutrons: 20, electronegativity: 0.82, state: 'solid' },
  { number: 20, symbol: 'Ca', nameRu: 'Кальций', nameSrb: 'Kalcijum', mass: 40.08, category: 'alkaline', group: 2, period: 4, electrons: [2, 8, 8, 2], protons: 20, neutrons: 20, electronegativity: 1.00, state: 'solid' },
  { number: 21, symbol: 'Sc', nameRu: 'Скандий', nameSrb: 'Skandijum', mass: 44.96, category: 'transition', group: 3, period: 4, electrons: [2, 8, 9, 2], protons: 21, neutrons: 24, electronegativity: 1.36, state: 'solid' },
  { number: 22, symbol: 'Ti', nameRu: 'Титан', nameSrb: 'Titanijum', mass: 47.87, category: 'transition', group: 4, period: 4, electrons: [2, 8, 10, 2], protons: 22, neutrons: 26, electronegativity: 1.54, state: 'solid' },
  { number: 23, symbol: 'V', nameRu: 'Ванадий', nameSrb: 'Vanadijum', mass: 50.94, category: 'transition', group: 5, period: 4, electrons: [2, 8, 11, 2], protons: 23, neutrons: 28, electronegativity: 1.63, state: 'solid' },
  { number: 24, symbol: 'Cr', nameRu: 'Хром', nameSrb: 'Hrom', mass: 52.00, category: 'transition', group: 6, period: 4, electrons: [2, 8, 13, 1], protons: 24, neutrons: 28, electronegativity: 1.66, state: 'solid' },
  { number: 25, symbol: 'Mn', nameRu: 'Марганец', nameSrb: 'Mangan', mass: 54.94, category: 'transition', group: 7, period: 4, electrons: [2, 8, 13, 2], protons: 25, neutrons: 30, electronegativity: 1.55, state: 'solid' },
  { number: 26, symbol: 'Fe', nameRu: 'Железо', nameSrb: 'Gvožđe', mass: 55.85, category: 'transition', group: 8, period: 4, electrons: [2, 8, 14, 2], protons: 26, neutrons: 30, electronegativity: 1.83, state: 'solid' },
  { number: 27, symbol: 'Co', nameRu: 'Кобальт', nameSrb: 'Kobalt', mass: 58.93, category: 'transition', group: 9, period: 4, electrons: [2, 8, 15, 2], protons: 27, neutrons: 32, electronegativity: 1.88, state: 'solid' },
  { number: 28, symbol: 'Ni', nameRu: 'Никель', nameSrb: 'Nikl', mass: 58.69, category: 'transition', group: 10, period: 4, electrons: [2, 8, 16, 2], protons: 28, neutrons: 31, electronegativity: 1.91, state: 'solid' },
  { number: 29, symbol: 'Cu', nameRu: 'Медь', nameSrb: 'Bakar', mass: 63.55, category: 'transition', group: 11, period: 4, electrons: [2, 8, 18, 1], protons: 29, neutrons: 35, electronegativity: 1.90, state: 'solid' },
  { number: 30, symbol: 'Zn', nameRu: 'Цинк', nameSrb: 'Cink', mass: 65.38, category: 'transition', group: 12, period: 4, electrons: [2, 8, 18, 2], protons: 30, neutrons: 35, electronegativity: 1.65, state: 'solid' },
  { number: 31, symbol: 'Ga', nameRu: 'Галлий', nameSrb: 'Galijum', mass: 69.72, category: 'metal', group: 13, period: 4, electrons: [2, 8, 18, 3], protons: 31, neutrons: 39, electronegativity: 1.81, state: 'solid' },
  { number: 32, symbol: 'Ge', nameRu: 'Германий', nameSrb: 'Germanijum', mass: 72.63, category: 'metalloid', group: 14, period: 4, electrons: [2, 8, 18, 4], protons: 32, neutrons: 41, electronegativity: 2.01, state: 'solid' },
  { number: 33, symbol: 'As', nameRu: 'Мышьяк', nameSrb: 'Arsen', mass: 74.92, category: 'metalloid', group: 15, period: 4, electrons: [2, 8, 18, 5], protons: 33, neutrons: 42, electronegativity: 2.18, state: 'solid' },
  { number: 34, symbol: 'Se', nameRu: 'Селен', nameSrb: 'Selen', mass: 78.97, category: 'nonmetal', group: 16, period: 4, electrons: [2, 8, 18, 6], protons: 34, neutrons: 45, electronegativity: 2.55, state: 'solid' },
  { number: 35, symbol: 'Br', nameRu: 'Бром', nameSrb: 'Brom', mass: 79.90, category: 'halogen', group: 17, period: 4, electrons: [2, 8, 18, 7], protons: 35, neutrons: 45, electronegativity: 2.96, state: 'liquid' },
  { number: 36, symbol: 'Kr', nameRu: 'Криптон', nameSrb: 'Kripton', mass: 83.80, category: 'noble', group: 18, period: 4, electrons: [2, 8, 18, 8], protons: 36, neutrons: 48, electronegativity: 3.00, state: 'gas' },
  // Period 5
  { number: 37, symbol: 'Rb', nameRu: 'Рубидий', nameSrb: 'Rubidijum', mass: 85.47, category: 'alkali', group: 1, period: 5, electrons: [2, 8, 18, 8, 1], protons: 37, neutrons: 48, electronegativity: 0.82, state: 'solid' },
  { number: 38, symbol: 'Sr', nameRu: 'Стронций', nameSrb: 'Stroncijum', mass: 87.62, category: 'alkaline', group: 2, period: 5, electrons: [2, 8, 18, 8, 2], protons: 38, neutrons: 50, electronegativity: 0.95, state: 'solid' },
  { number: 39, symbol: 'Y', nameRu: 'Иттрий', nameSrb: 'Itrijum', mass: 88.91, category: 'transition', group: 3, period: 5, electrons: [2, 8, 18, 9, 2], protons: 39, neutrons: 50, electronegativity: 1.22, state: 'solid' },
  { number: 40, symbol: 'Zr', nameRu: 'Цирконий', nameSrb: 'Cirkonijum', mass: 91.22, category: 'transition', group: 4, period: 5, electrons: [2, 8, 18, 10, 2], protons: 40, neutrons: 51, electronegativity: 1.33, state: 'solid' },
  { number: 41, symbol: 'Nb', nameRu: 'Ниобий', nameSrb: 'Niobijum', mass: 92.91, category: 'transition', group: 5, period: 5, electrons: [2, 8, 18, 12, 1], protons: 41, neutrons: 52, electronegativity: 1.6, state: 'solid' },
  { number: 42, symbol: 'Mo', nameRu: 'Молибден', nameSrb: 'Molibden', mass: 95.95, category: 'transition', group: 6, period: 5, electrons: [2, 8, 18, 13, 1], protons: 42, neutrons: 54, electronegativity: 2.16, state: 'solid' },
  { number: 43, symbol: 'Tc', nameRu: 'Технеций', nameSrb: 'Tehnecijum', mass: 98.00, category: 'transition', group: 7, period: 5, electrons: [2, 8, 18, 13, 2], protons: 43, neutrons: 55, electronegativity: 1.9, state: 'solid' },
  { number: 44, symbol: 'Ru', nameRu: 'Рутений', nameSrb: 'Rutenijum', mass: 101.07, category: 'transition', group: 8, period: 5, electrons: [2, 8, 18, 15, 1], protons: 44, neutrons: 57, electronegativity: 2.2, state: 'solid' },
  { number: 45, symbol: 'Rh', nameRu: 'Родий', nameSrb: 'Rodijum', mass: 102.91, category: 'transition', group: 9, period: 5, electrons: [2, 8, 18, 16, 1], protons: 45, neutrons: 58, electronegativity: 2.28, state: 'solid' },
  { number: 46, symbol: 'Pd', nameRu: 'Палладий', nameSrb: 'Paladijum', mass: 106.42, category: 'transition', group: 10, period: 5, electrons: [2, 8, 18, 18, 0], protons: 46, neutrons: 60, electronegativity: 2.20, state: 'solid' },
  { number: 47, symbol: 'Ag', nameRu: 'Серебро', nameSrb: 'Srebro', mass: 107.87, category: 'transition', group: 11, period: 5, electrons: [2, 8, 18, 18, 1], protons: 47, neutrons: 61, electronegativity: 1.93, state: 'solid' },
  { number: 48, symbol: 'Cd', nameRu: 'Кадмий', nameSrb: 'Kadmijum', mass: 112.41, category: 'transition', group: 12, period: 5, electrons: [2, 8, 18, 18, 2], protons: 48, neutrons: 64, electronegativity: 1.69, state: 'solid' },
  { number: 49, symbol: 'In', nameRu: 'Индий', nameSrb: 'Indijum', mass: 114.82, category: 'metal', group: 13, period: 5, electrons: [2, 8, 18, 18, 3], protons: 49, neutrons: 66, electronegativity: 1.78, state: 'solid' },
  { number: 50, symbol: 'Sn', nameRu: 'Олово', nameSrb: 'Kalaj', mass: 118.71, category: 'metal', group: 14, period: 5, electrons: [2, 8, 18, 18, 4], protons: 50, neutrons: 69, electronegativity: 1.96, state: 'solid' },
  { number: 51, symbol: 'Sb', nameRu: 'Сурьма', nameSrb: 'Antimon', mass: 121.76, category: 'metalloid', group: 15, period: 5, electrons: [2, 8, 18, 18, 5], protons: 51, neutrons: 71, electronegativity: 2.05, state: 'solid' },
  { number: 52, symbol: 'Te', nameRu: 'Теллур', nameSrb: 'Telur', mass: 127.60, category: 'metalloid', group: 16, period: 5, electrons: [2, 8, 18, 18, 6], protons: 52, neutrons: 76, electronegativity: 2.1, state: 'solid' },
  { number: 53, symbol: 'I', nameRu: 'Йод', nameSrb: 'Jod', mass: 126.90, category: 'halogen', group: 17, period: 5, electrons: [2, 8, 18, 18, 7], protons: 53, neutrons: 74, electronegativity: 2.66, state: 'solid' },
  { number: 54, symbol: 'Xe', nameRu: 'Ксенон', nameSrb: 'Ksenon', mass: 131.29, category: 'noble', group: 18, period: 5, electrons: [2, 8, 18, 18, 8], protons: 54, neutrons: 77, electronegativity: 2.6, state: 'gas' },
];

// Цвета категорий
const categoryColors = {
  alkali: { bg: '#ff6b6b', nameRu: 'Щелочные металлы', nameSrb: 'Alkalni metali' },
  alkaline: { bg: '#ffa94d', nameRu: 'Щелочноземельные', nameSrb: 'Zemnoalkalni metali' },
  transition: { bg: '#ffd43b', nameRu: 'Переходные металлы', nameSrb: 'Prelazni metali' },
  metal: { bg: '#69db7c', nameRu: 'Металлы', nameSrb: 'Metali' },
  metalloid: { bg: '#38d9a9', nameRu: 'Полуметаллы', nameSrb: 'Polumetali' },
  nonmetal: { bg: '#4dabf7', nameRu: 'Неметаллы', nameSrb: 'Nemetali' },
  halogen: { bg: '#9775fa', nameRu: 'Галогены', nameSrb: 'Halogeni elementi' },
  noble: { bg: '#f783ac', nameRu: 'Благородные газы', nameSrb: 'Plemeniti gasovi' },
};

// Тексты интерфейса
const texts = {
  ru: {
    title: 'Периодическая система элементов',
    subtitle: 'Интерактивная таблица для изучения химии — 7 класс',
    table: 'Таблица',
    quiz: 'Тест',
    all: 'Все',
    atomModel: 'Модель атома',
    clickHint: '👆 Нажмите на элемент, чтобы увидеть детали и модель атома',
    atomicNumber: 'Атомный номер',
    atomicMass: 'Атомная масса',
    protons: 'Протоны (p⁺)',
    neutrons: 'Нейтроны (n⁰)',
    electrons: 'Электроны (e⁻)',
    state: 'Агрегатное состояние',
    electronConfig: 'Электронная конфигурация',
    electronegativity: 'Электроотрицательность (по Полингу)',
    solid: 'Твёрдое',
    liquid: 'Жидкое',
    gas: 'Газ',
    score: 'Счёт',
    correct: 'Правильно!',
    incorrect: 'Неправильно. Правильный ответ:',
    next: 'Следующий вопрос →',
    elements: 'элементов',
    quizSymbol: 'Какой символ у элемента',
    quizProtons: 'Сколько протонов у',
    quizElectrons: 'Сколько электронов на внешней оболочке у',
    quizCategory: 'К какой группе относится',
    proton: 'Протон',
    neutron: 'Нейтрон',
    electron: 'Электрон',
  },
  srb: {
    title: 'Периодни систем елемената',
    subtitle: 'Интерактивна табла за учење хемије — 7. разред',
    table: 'Табела',
    quiz: 'Квиз',
    all: 'Сви',
    atomModel: 'Модел атома',
    clickHint: '👆 Кликни на елемент да видиш детаље и модел атома',
    atomicNumber: 'Атомски број',
    atomicMass: 'Атомска маса',
    protons: 'Протони (p⁺)',
    neutrons: 'Неутрони (n⁰)',
    electrons: 'Електрони (e⁻)',
    state: 'Агрегатно стање',
    electronConfig: 'Електронска конфигурација',
    electronegativity: 'Електронегативност (по Полингу)',
    solid: 'Тврдо',
    liquid: 'Течно',
    gas: 'Гасовито',
    score: 'Резултат',
    correct: 'Тачно!',
    incorrect: 'Нетачно. Тачан одговор:',
    next: 'Следеће питање →',
    elements: 'елемената',
    quizSymbol: 'Који је симбол елемента',
    quizProtons: 'Колико протона има',
    quizElectrons: 'Колико електрона има на последњој љусци атома',
    quizCategory: 'Којој групи припада',
    proton: 'Протон',
    neutron: 'Неутрон',
    electron: 'Електрон',
  }
};

// Компонент ячейки элемента
const ElementCell = ({ element, onClick, isSelected, highlightCategory }) => {
  if (!element) return <div className="w-10 h-12 md:w-12 md:h-14" />;

  const isHighlighted = !highlightCategory || element.category === highlightCategory;
  const bgColor = categoryColors[element.category]?.bg || '#ccc';

  // Тёмный текст для светлых фонов (жёлтый, зелёный, оранжевый)
  const needsDarkText = ['transition', 'alkaline', 'metal', 'metalloid'].includes(element.category);
  const textColor = needsDarkText ? 'text-gray-900' : 'text-white';

  return (
    <div
      onClick={() => onClick(element)}
      className={`w-10 h-12 md:w-12 md:h-14 rounded cursor-pointer transition-all duration-200 flex flex-col items-center justify-center font-bold shadow-md hover:scale-110 hover:z-10 ${textColor} ${
        isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110 z-10' : ''
      } ${!isHighlighted ? 'opacity-30' : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      <span className="text-[10px] opacity-80 leading-tight">{element.number}</span>
      <span className="text-base md:text-lg leading-none my-0.5">{element.symbol}</span>
      <span className="text-[10px] opacity-80 leading-tight">{element.mass.toFixed(1)}</span>
    </div>
  );
};

// Компонент визуализации атома с облаками орбиталей и анимированными электронами
const AtomVisualization = ({ element, lang, isPlaying }) => {
  const t = texts[lang];
  const [rotation, setRotation] = useState(0);
  const shellRadii = [35, 60, 85, 110, 135];
  const shellColors = ['#a8d5ff', '#8ec5fc', '#74b3f7', '#5a9ff2', '#3b82f6'];
  const maxElectrons = [2, 8, 18, 32, 32]; // максимум электронов на каждой оболочке (упрощённо для визуализации используем 8 для внешних)
  const displayMax = [2, 8, 8, 8, 8]; // для отображения пустых мест (упрощённая модель для школы)

  // Анимация электронов (только когда isPlaying = true)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRotation(r => r + 0.03);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Генерация позиций частиц в ядре (перемешанные, статичные)
  const nucleusParticles = useMemo(() => {
    const particles = [];
    const totalNucleons = element.protons + element.neutrons;

    // Размер частиц уменьшается с ростом атомного числа
    const particleRadius = totalNucleons <= 4 ? 6 : totalNucleons <= 10 ? 5 : totalNucleons <= 20 ? 4 : 3;
    const nucleusRadius = totalNucleons <= 2 ? 8 : totalNucleons <= 4 ? 12 : Math.min(22, 8 + totalNucleons * 0.25);

    const allTypes = [
      ...Array(element.protons).fill('proton'),
      ...Array(element.neutrons).fill('neutron')
    ];

    // Перемешиваем детерминированно
    const seed = element.number * 137;
    for (let i = allTypes.length - 1; i > 0; i--) {
      const j = Math.abs(Math.floor(Math.sin(seed + i * 7) * 10000)) % (i + 1);
      [allTypes[i], allTypes[j]] = [allTypes[j], allTypes[i]];
    }

    // Специальная раскладка для очень маленьких ядер
    if (totalNucleons === 1) {
      // Водород - один протон в центре
      particles.push({ x: 0, y: 0, type: 'proton' });
    } else if (totalNucleons === 2) {
      // Гелий без нейтронов или дейтерий
      particles.push({ x: -4, y: 0, type: allTypes[0] });
      particles.push({ x: 4, y: 0, type: allTypes[1] });
    } else if (totalNucleons === 3) {
      // Треугольник
      particles.push({ x: 0, y: -5, type: allTypes[0] });
      particles.push({ x: -4, y: 4, type: allTypes[1] });
      particles.push({ x: 4, y: 4, type: allTypes[2] });
    } else if (totalNucleons === 4) {
      // Квадрат/ромб
      particles.push({ x: 0, y: -5, type: allTypes[0] });
      particles.push({ x: -5, y: 0, type: allTypes[1] });
      particles.push({ x: 5, y: 0, type: allTypes[2] });
      particles.push({ x: 0, y: 5, type: allTypes[3] });
    } else {
      // Располагаем по спирали Ферма для больших ядер
      for (let i = 0; i < totalNucleons; i++) {
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const angle = i * goldenAngle;
        const r = nucleusRadius * Math.sqrt(i / totalNucleons) * 0.85;
        particles.push({
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
          type: allTypes[i]
        });
      }
    }

    return { particles, radius: nucleusRadius, particleRadius };
  }, [element.number, element.protons, element.neutrons]);

  // Все позиции на орбиталях (заполненные и пустые)
  const orbitalData = useMemo(() => {
    const data = [];
    const seed = element.number * 31;
    element.electrons.forEach((count, shellIndex) => {
      const radius = shellRadii[shellIndex];
      const maxForShell = displayMax[shellIndex];
      for (let i = 0; i < maxForShell; i++) {
        const baseAngle = (i / maxForShell) * Math.PI * 2;
        const angleOffset = Math.sin(seed + i * 7 + shellIndex * 13) * 0.1;
        data.push({
          baseAngle: baseAngle + angleOffset,
          radius: radius,
          speed: 1 / (shellIndex + 1),
          shell: shellIndex,
          filled: i < count
        });
      }
    });
    return data;
  }, [element.electrons, element.number]);

  const shellNames = ['K', 'L', 'M', 'N', 'O'];

  return (
    <div className="relative flex flex-col items-center">
      <svg width="280" height="280" viewBox="-150 -150 300 300">
        <defs>
          {shellRadii.map((radius, i) => (
            <radialGradient key={i} id={`shellGradient${i}-${element.number}`}>
              <stop offset="60%" stopColor={shellColors[i]} stopOpacity="0.25" />
              <stop offset="80%" stopColor={shellColors[i]} stopOpacity="0.12" />
              <stop offset="100%" stopColor={shellColors[i]} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id={`nucleusGradient-${element.number}`}>
            <stop offset="0%" stopColor="#5a6270" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3d4350" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Электронные облака (от внешнего к внутреннему) */}
        {[...element.electrons].reverse().map((count, reversedIndex) => {
          const shellIndex = element.electrons.length - 1 - reversedIndex;
          return (
            <g key={shellIndex}>
              <circle
                cx="0"
                cy="0"
                r={shellRadii[shellIndex] + 18}
                fill={`url(#shellGradient${shellIndex}-${element.number})`}
              />
              <circle
                cx="0"
                cy="0"
                r={shellRadii[shellIndex]}
                fill="none"
                stroke={shellColors[shellIndex]}
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.3"
              />
              <text
                x={shellRadii[shellIndex] + 10}
                y={4}
                fontSize="11"
                fill={shellColors[shellIndex]}
                fontWeight="bold"
                opacity="0.7"
              >
                {shellNames[shellIndex]}
              </text>
            </g>
          );
        })}

        {/* Анимированные электроны и пустые места */}
        {orbitalData.map((e, i) => {
          const angle = e.baseAngle + rotation * e.speed;
          const x = Math.cos(angle) * e.radius;
          const y = Math.sin(angle) * e.radius;
          return e.filled ? (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill="#1e40af"
              stroke="#60a5fa"
              strokeWidth="1"
            />
          ) : (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1"
              strokeDasharray="2,2"
              opacity="0.4"
            />
          );
        })}

        {/* Ядро */}
        <circle
          cx="0"
          cy="0"
          r={nucleusParticles.radius + 5}
          fill={`url(#nucleusGradient-${element.number})`}
        />
        {nucleusParticles.particles.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={nucleusParticles.particleRadius}
            fill={p.type === 'proton' ? '#dc2626' : '#9ca3af'}
            stroke={p.type === 'proton' ? '#fca5a5' : '#d1d5db'}
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Легенда */}
      <div className="flex flex-wrap gap-3 text-xs mt-2 bg-gray-800 bg-opacity-90 px-3 py-2 rounded justify-center">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-600 border border-red-300"></span>
          <span>{t.proton} (p⁺)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-400 border border-gray-300"></span>
          <span>{t.neutron} (n⁰)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-800 border border-blue-400"></span>
          <span>{t.electron} (e⁻)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full border border-blue-400 border-dashed opacity-50"></span>
          <span>{lang === 'ru' ? 'Пустое место' : 'Prazno mesto'}</span>
        </div>
      </div>
    </div>
  );
};

// Информация об элементе
const ElementInfo = ({ element, lang }) => {
  const t = texts[lang];
  const shellNames = ['K', 'L', 'M', 'N', 'O'];
  const stateEmoji = { solid: '🧊', liquid: '💧', gas: '💨' };
  const categoryName = lang === 'ru' ? categoryColors[element.category]?.nameRu : categoryColors[element.category]?.nameSrb;
  const stateName = t[element.state];

  // Тёмный текст для светлых фонов
  const needsDarkText = ['transition', 'alkaline', 'metal', 'metalloid'].includes(element.category);
  const cardTextColor = needsDarkText ? 'text-gray-900' : 'text-white';

  return (
    <div className="bg-gray-800 rounded-lg p-3 text-white">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-bold ${cardTextColor}`}
          style={{ backgroundColor: categoryColors[element.category]?.bg }}
        >
          <span className="text-xs opacity-80">{element.number}</span>
          <span className="text-2xl leading-none my-0.5">{element.symbol}</span>
          <span className="text-xs opacity-80">{element.mass.toFixed(1)}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">{element.nameSrb}</h2>
          <p className="text-gray-400 text-sm">{element.nameRu}</p>
          <p className="text-xs" style={{ color: categoryColors[element.category]?.bg }}>
            {categoryName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-gray-700 p-2 rounded">
          <span className="text-gray-400 block">{t.atomicNumber}</span>
          <p className="text-lg font-bold">{element.number}</p>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <span className="text-gray-400 block">{t.atomicMass}</span>
          <p className="text-lg font-bold">{element.mass.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <span className="text-gray-400 block">{t.state}</span>
          <p className="text-base font-bold">{stateEmoji[element.state]} {stateName}</p>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <span className="text-gray-400 block">{t.protons}</span>
          <p className="text-lg font-bold text-red-400">{element.protons}</p>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <span className="text-gray-400 block">{t.neutrons}</span>
          <p className="text-lg font-bold text-gray-400">{element.neutrons}</p>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <span className="text-gray-400 block">{t.electrons}</span>
          <p className="text-lg font-bold text-blue-400">{element.electrons.reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="bg-gray-700 p-2 rounded col-span-3">
          <span className="text-gray-400 block mb-1">{t.electronConfig}</span>
          <span className="font-mono text-blue-300 whitespace-nowrap">
            {element.electrons.map((count, i) => (
              <span key={i}>
                {shellNames[i]}:{count}{i < element.electrons.length - 1 ? ' → ' : ''}
              </span>
            ))}
          </span>
        </div>
        {element.electronegativity && (
          <div className="bg-gray-700 p-2 rounded col-span-3">
            <span className="text-gray-400">{t.electronegativity}: </span>
            <span className="font-bold">{element.electronegativity}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Компонент Quiz
const QuizMode = ({ elements, lang }) => {
  const t = texts[lang];
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showResult, setShowResult] = useState(false);

  const generateQuestion = () => {
    const types = ['symbol', 'number', 'electrons', 'category'];
    const type = types[Math.floor(Math.random() * types.length)];
    const element = elements[Math.floor(Math.random() * elements.length)];
    const elementName = lang === 'ru' ? element.nameRu : element.nameSrb;

    let questionText, correctAnswer, options;

    switch(type) {
      case 'symbol':
        questionText = `${t.quizSymbol} ${elementName}?`;
        correctAnswer = element.symbol;
        options = [element.symbol, ...elements.filter(e => e !== element).sort(() => Math.random() - 0.5).slice(0, 3).map(e => e.symbol)];
        break;
      case 'number':
        questionText = `${t.quizProtons} ${elementName}?`;
        correctAnswer = element.protons.toString();
        options = [element.protons, element.protons + 1, Math.max(1, element.protons - 1), element.protons + 2].map(String);
        break;
      case 'electrons':
        questionText = `${t.quizElectrons} ${element.symbol}?`;
        correctAnswer = element.electrons[element.electrons.length - 1].toString();
        options = [...new Set([element.electrons[element.electrons.length - 1], 1, 2, 8, 7].slice(0, 4))].map(String);
        break;
      case 'category':
        const catName = lang === 'ru' ? categoryColors[element.category].nameRu : categoryColors[element.category].nameSrb;
        questionText = `${t.quizCategory} ${elementName} (${element.symbol})?`;
        correctAnswer = catName;
        options = Object.values(categoryColors).map(c => lang === 'ru' ? c.nameRu : c.nameSrb).sort(() => Math.random() - 0.5).slice(0, 4);
        if (!options.includes(correctAnswer)) options[0] = correctAnswer;
        break;
      default:
        break;
    }

    setQuestion({ text: questionText, correct: correctAnswer, options: options.sort(() => Math.random() - 0.5) });
    setSelectedAnswer(null);
    setShowResult(false);
  };

  useEffect(() => { generateQuestion(); }, [lang]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    setScore(s => ({
      correct: s.correct + (answer === question.correct ? 1 : 0),
      total: s.total + 1
    }));
  };

  if (!question) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-6 text-white max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">🎯 {t.quiz}</h3>
        <span className="bg-blue-600 px-3 py-1 rounded">
          {t.score}: {score.correct}/{score.total}
        </span>
      </div>

      <p className="text-lg mb-6">{question.text}</p>

      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => !showResult && handleAnswer(option)}
            disabled={showResult}
            className={`p-3 rounded-lg font-bold transition-all ${
              showResult
                ? option === question.correct
                  ? 'bg-green-600'
                  : option === selectedAnswer
                    ? 'bg-red-600'
                    : 'bg-gray-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-4 text-center">
          <p className={`text-lg mb-3 ${selectedAnswer === question.correct ? 'text-green-400' : 'text-red-400'}`}>
            {selectedAnswer === question.correct ? `✓ ${t.correct}` : `✗ ${t.incorrect} ${question.correct}`}
          </p>
          <button
            onClick={generateQuestion}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold"
          >
            {t.next}
          </button>
        </div>
      )}
    </div>
  );
};

// Основной компонент
function PeriodicTableApp() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [highlightCategory, setHighlightCategory] = useState(null);
  const [lang, setLang] = useState('srb');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const t = texts[lang];

  const shellLabels = ['K', 'KL', 'KLM', 'KLMN', 'KLMNO'];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Создание сетки таблицы
  const grid = Array(5).fill(null).map(() => Array(18).fill(null));
  elementsData.forEach(el => {
    if (el.period <= 5) {
      grid[el.period - 1][el.group - 1] = el;
    }
  });

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-2 md:p-3">
      <header className="text-center mb-2">
        <div className="flex justify-center items-center gap-3 mb-1 flex-wrap">
          <h1 className="text-xl md:text-2xl font-bold">🔬 {t.title}</h1>
          <div className="flex bg-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setLang('srb')}
              className={`px-2 py-0.5 text-xs font-bold transition-all ${lang === 'srb' ? 'bg-blue-600' : 'hover:bg-gray-600'}`}
            >
              СРБ
            </button>
            <button
              onClick={() => setLang('ru')}
              className={`px-2 py-0.5 text-xs font-bold transition-all ${lang === 'ru' ? 'bg-blue-600' : 'hover:bg-gray-600'}`}
            >
              РУС
            </button>
          </div>
          <button
            onClick={toggleFullscreen}
            className="px-2 py-1 text-sm font-bold bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
            title={isFullscreen ? 'Излаз' : 'Цео екран'}
          >
            {isFullscreen ? '⛶ Излаз' : '⛶ Цео екран'}
          </button>
        </div>
        <p className="text-gray-400 text-sm">{t.subtitle}</p>
      </header>

      <div className="flex flex-wrap justify-center gap-2 mb-2">
        <button
          onClick={() => setViewMode('table')}
          className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${viewMode === 'table' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          📊 {t.table}
        </button>
        <button
          onClick={() => setViewMode('quiz')}
          className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${viewMode === 'quiz' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          🎯 {t.quiz}
        </button>
      </div>

      {viewMode === 'table' && (
        <>
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            <button
              onClick={() => setHighlightCategory(null)}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${!highlightCategory ? 'bg-white text-gray-900' : 'bg-gray-700'}`}
            >
              {t.all}
            </button>
            {Object.entries(categoryColors).map(([key, { bg, nameRu, nameSrb }]) => (
              <button
                key={key}
                onClick={() => setHighlightCategory(highlightCategory === key ? null : key)}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${highlightCategory === key ? 'ring-2 ring-white' : ''}`}
                style={{ backgroundColor: bg }}
              >
                {lang === 'ru' ? nameRu : nameSrb}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <div className="flex flex-col gap-0.5 mx-auto" style={{ width: 'fit-content' }}>
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-0.5 items-center">
                  <span className="w-5 flex items-center justify-center text-gray-500 text-xs">{rowIndex + 1}</span>
                  <span className="w-12 text-gray-600 text-xs font-mono">{shellLabels[rowIndex]}</span>
                  {row.map((element, colIndex) => (
                    <ElementCell
                      key={colIndex}
                      element={element}
                      onClick={setSelectedElement}
                      isSelected={selectedElement?.number === element?.number}
                      highlightCategory={highlightCategory}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {selectedElement && (
            <div className="flex flex-row gap-4 items-start justify-center mt-2">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold">{t.atomModel}</h3>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-2 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-all"
                    title={isPlaying ? 'Пауза' : 'Пусти'}
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                </div>
                <AtomVisualization element={selectedElement} lang={lang} isPlaying={isPlaying} />
              </div>
              <div className="w-80">
                <ElementInfo element={selectedElement} lang={lang} />
              </div>
            </div>
          )}

          {!selectedElement && (
            <p className="text-center text-gray-500 text-sm mt-4">{t.clickHint}</p>
          )}
        </>
      )}

      {viewMode === 'quiz' && <QuizMode elements={elementsData} lang={lang} />}

      <footer className="text-center text-gray-600 text-xs mt-4">
        <p>{elementsData.length} {t.elements}</p>
      </footer>
    </div>
  );
}

// Expose component globally for use in HTML
window.PeriodicTableApp = PeriodicTableApp;
