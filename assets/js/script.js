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

  btnNews.addEventListener('click', () => toggleSection(true));
  btnCharts.addEventListener('click', () => toggleSection(false));

  toggleSection(true);

  // Chart
  const ctx = document.getElementById('chart').getContext('2d');
  const selectedMonth = document.getElementById('selectedMonth');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  const months = [
    `Jan, ${currentDay}`,
    `Feb, ${currentDay}`,
    `Mar, ${currentDay}`,
    `Apr, ${currentDay}`,
    `May, ${currentDay}`,
    `Jun, ${currentDay}`,
    `Jul, ${currentDay}`,
    `Aug, ${currentDay}`,
    `Sep, ${currentDay}`,
    `Oct, ${currentDay}`,
    `Nov, ${currentDay}`,
    `Dec, ${currentDay}`,
  ];

  let currentMonthIndex = today.getMonth();

  function getDaysInMonth(monthIndex, year = currentYear) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function generateRandomData(days, min = 0, max = 1) {
    return Array.from({ length: days }, () => (Math.random() * (max - min) + min).toFixed(2));
  }

  function updateChart() {
    const daysInMonth = getDaysInMonth(currentMonthIndex, currentYear);

    selectedMonth.textContent = `${months[currentMonthIndex].split(',')[0]}, ${currentDay}`;

    chart.data.labels = Array.from(
      { length: daysInMonth },
      (_, i) => `${i + 1} ${months[currentMonthIndex].split(',')[0]}`
    );

    chart.data.datasets[0].data = generateRandomData(daysInMonth, 0.1, 1.0);
    chart.data.datasets[1].data = generateRandomData(daysInMonth, 0.05, 0.5);

    chart.update();
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

  prevMonthBtn.addEventListener('click', () => {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      updateChart();
    }
  });

  nextMonthBtn.addEventListener('click', () => {
    if (currentMonthIndex < months.length - 1) {
      currentMonthIndex++;
      updateChart();
    }
  });

  updateChart();
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
