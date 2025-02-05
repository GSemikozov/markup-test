document.addEventListener('DOMContentLoaded', function () {
  const newsSection = document.getElementById('newsSection');
  const chartsSection = document.getElementById('chartsSection');
  const btnNews = document.getElementById('btnNews');
  const btnCharts = document.getElementById('btnCharts');

  function toggleSection(showNews) {
    if (showNews) {
      newsSection.style.display = 'block';
      chartsSection.style.display = 'none';
      btnNews.classList.add('button_active');
      btnCharts.classList.remove('button_active');
    } else {
      newsSection.style.display = 'none';
      chartsSection.style.display = 'block';
      btnNews.classList.remove('button_active');
      btnCharts.classList.add('button_active');
    }
  }

  // News
  const newsContainer = document.getElementById('newsContainer');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  const API_URL = 'https://jsonplaceholder.typicode.com/posts';
  const NEWS_PER_PAGE = 8;
  let allNews = [];
  let currentIndex = 0;

  async function fetchNews() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка загрузки данных');
      allNews = await response.json();
      renderNews();
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error);
    }
  }

  function renderNews() {
    const newsToRender = allNews.slice(currentIndex, currentIndex + NEWS_PER_PAGE);
    newsToRender.forEach((news) => {
      const newsCard = document.createElement('div');
      newsCard.classList.add('news-card');
      newsCard.innerHTML = `
                <a href="news.html" class="news-card">
                  <article class="news-card__body">
                    <img
                      src="https://placehold.co/300x200"
                      alt="news ${news.id}"
                      class="news-card__image"
                    />
                    <h3 class="news-card__title">
                      ${news.title}
                    </h3>
                    <p class="news-card__description">
                      ${news.body}
                    </p>
                    <div class="news-card__meta">1 day ago | Culture</div>
                  </article>
                </a>
            `;
      newsContainer.appendChild(newsCard);
    });

    currentIndex += NEWS_PER_PAGE;

    if (currentIndex >= allNews.length) {
      loadMoreBtn.style.display = 'none';
    }
  }

  btnNews.addEventListener('click', () => toggleSection(true));
  btnCharts.addEventListener('click', () => toggleSection(false));
  loadMoreBtn.addEventListener('click', renderNews);

  toggleSection(true);
  fetchNews();

  // Chart
  const ctx = document.getElementById('chart').getContext('2d');
  const monthsWrapper = document.querySelector('.chart__months-wrapper');
  const monthContainer = document.querySelector('.chart__month-container');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  let currentMonthIndex = today.getMonth();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  months.forEach((month, index) => {
    const btn = document.createElement('button');
    btn.classList.add('chart__selected-range', 'button', 'button_primary', 'button_small');
    btn.textContent = `${month}, ${currentDay}`;
    btn.dataset.month = index;
    if (index === currentMonthIndex) {
      btn.classList.add('chart__selected-range_selected');
    }
    btn.addEventListener('click', () => {
      currentMonthIndex = index;
      updateChart(index);
    });
    monthsWrapper.appendChild(btn);
  });

  const monthButtons = document.querySelectorAll('.chart__selected-range');

  function getDaysInMonth(monthIndex, year = currentYear) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function generateRandomData(days, min = 0, max = 1) {
    return Array.from({ length: days }, () => (Math.random() * (max - min) + min).toFixed(2));
  }

  function updateChart(currentMonthIndex) {
    document
      .querySelector('.chart__selected-range_selected')
      ?.classList.remove('chart__selected-range_selected');
    monthButtons[currentMonthIndex].classList.add('chart__selected-range_selected');

    const daysInMonth = getDaysInMonth(currentMonthIndex, currentYear);

    chart.data.labels = Array.from(
      { length: daysInMonth },
      (_, i) => `${i + 1} ${months[currentMonthIndex].split(',')[0]}`
    );

    chart.data.datasets[0].data = generateRandomData(daysInMonth, 0.1, 1.0);
    chart.data.datasets[1].data = generateRandomData(daysInMonth, 0.05, 0.5);

    chart.update();
  }

  function selectMonth(index) {
    if (index < 0 || index > 11) return;
    currentMonthIndex = index;

    document
      .querySelector('.chart__selected-range_selected')
      ?.classList.remove('chart__selected-range_selected');
    monthButtons[index].classList.add('chart__selected-range_selected');

    updateChart(index);
    ensureVisible(index);
    updateArrowState();
  }

  function shiftMonth(direction) {
    if (direction === 'next' && currentMonthIndex < 11) {
      selectMonth(currentMonthIndex + 1);
    } else if (direction === 'prev' && currentMonthIndex > 0) {
      selectMonth(currentMonthIndex - 1);
    }
  }

  function ensureVisible(index) {
    const button = monthButtons[index];
    button.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  function findNearestVisibleMonth() {
    const containerRect = monthContainer.getBoundingClientRect();
    let newIndex = currentMonthIndex;

    if (!isMonthVisible(currentMonthIndex)) {
      for (let i = 1; i < months.length; i++) {
        if (currentMonthIndex - i >= 0 && isMonthVisible(currentMonthIndex - i)) {
          newIndex = currentMonthIndex - i;
          break;
        }
        if (currentMonthIndex + i <= 11 && isMonthVisible(currentMonthIndex + i)) {
          newIndex = currentMonthIndex + i;
          break;
        }
      }
    }

    if (newIndex !== currentMonthIndex) {
      selectMonth(newIndex);
    }
  }

  function isMonthVisible(index) {
    const button = monthButtons[index];
    const containerRect = monthContainer.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    return buttonRect.left >= containerRect.left && buttonRect.right <= containerRect.right;
  }

  function updateArrowState() {
    prevMonthBtn.disabled = currentMonthIndex === 0;
    nextMonthBtn.disabled = currentMonthIndex === 11;
  }

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Day Usage',
          borderColor: 'rgb(176, 47, 40)',
          data: [],
          fill: false,
        },
        {
          label: 'Night Usage',
          borderColor: 'rgb(32, 61, 144)',
          data: [],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 1,
          ticks: {
            stepSize: 0.1,
            callback: (value) => `${value} TB`,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });

  prevMonthBtn.addEventListener('click', () => shiftMonth('prev'));
  nextMonthBtn.addEventListener('click', () => shiftMonth('next'));

  const resizeObserver = new ResizeObserver(() => {
    findNearestVisibleMonth();
  });
  resizeObserver.observe(monthContainer);

  selectMonth(currentMonthIndex);
  updateArrowState();
});

document.getElementById('legendContainer').innerHTML = `
    <div class="chart__custom-legend">
        <div class="chart__legend-item">
          <div class="chart__legend-title">Chart 1</div>
          <div class="chart__legend-data chart__legend-data_blue">136 GB</div>
        </div>
        <div class="chart__legend-item">
          <div class="chart__legend-title">Chart 2</div>
          <div class="chart__legend-data chart__legend-data_red">42 GB</div>
        </div>
    </div>
`;
