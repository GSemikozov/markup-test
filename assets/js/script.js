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

  // График
  const ctx = document.getElementById('chart').getContext('2d');
  const selectedMonth = document.getElementById('selectedMonth');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  const today = new Date();
  const currentDay = today.getDate();

  const months = [
    `Aug, ${currentDay}`,
    `Sep, ${currentDay}`,
    `Oct, ${currentDay}`,
    `Nov, ${currentDay}`,
    `Dec, ${currentDay}`,
  ];
  let currentMonthIndex = 1;

  function generateRandomData() {
    return Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000));
  }

  let chartData = {
    labels: Array.from(
      { length: 30 },
      (_, i) => `${i + 1} ${months[currentMonthIndex].split(',')[0]}`
    ),
    datasets: [
      {
        label: 'Day Usage',
        borderColor: 'rgb(176, 47, 40)',
        data: generateRandomData(),
        fill: false,
      },
      {
        label: 'Night Usage',
        borderColor: 'rgb(32, 61, 144)',
        data: generateRandomData(),
        fill: false,
      },
    ],
  };

  const chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  function updateChart() {
    selectedMonth.textContent = months[currentMonthIndex];
    chart.data.labels = Array.from(
      { length: 30 },
      (_, i) => `${i + 1} ${months[currentMonthIndex].split(',')[0]}`
    );
    chart.data.datasets[0].data = generateRandomData();
    chart.data.datasets[1].data = generateRandomData();
    chart.update();
  }

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
