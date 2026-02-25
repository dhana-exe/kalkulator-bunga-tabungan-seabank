function calculateTabunganInterest() {
  const amountInput = document.getElementById("amount").value;

  // Check if input is empty or only contains whitespace characters
  if (!amountInput.trim()) {
    return; // Exit the function early if input is empty
  }

  const amount = parseFloat(amountInput.replace(/\D/g, ""));
  const interestRate = 0.025; // 3.75% per tahun

  const dailyInterest = (amount * interestRate) / 365;
  let dailyTax = 0;
  if (amount > 7500000) {
    dailyTax = dailyInterest * 0.2;
  }
  const dailyNetInterest = dailyInterest - dailyTax;

  document.getElementById("tabungan-dailyInterest").innerHTML = `Rp. ${formatNumber(dailyInterest)}`;
  document.getElementById("tabungan-dailyTax").innerHTML = `Rp. ${formatNumber(dailyTax)}`;
  document.getElementById("tabungan-dailyNetInterest").innerHTML = `Rp. ${formatNumber(dailyNetInterest)}`;

  const monthlyInterest = dailyInterest * 30;
  const monthlyTax = dailyTax * 30;
  const monthlyNetInterest = monthlyInterest - monthlyTax;

  document.getElementById("tabungan-monthlyInterest").innerHTML = `Rp. ${formatNumber(monthlyInterest)}`;
  document.getElementById("tabungan-monthlyTax").innerHTML = `Rp. ${formatNumber(monthlyTax)}`;
  document.getElementById("tabungan-monthlyNetInterest").innerHTML = `Rp. ${formatNumber(monthlyNetInterest)}`;

  const quarterlyInterest = monthlyInterest * 3;
  const quarterlyTax = monthlyTax * 3;
  const quarterlyNetInterest = quarterlyInterest - quarterlyTax;

  document.getElementById("tabungan-quarterlyInterest").innerHTML = `Rp. ${formatNumber(quarterlyInterest)}`;
  document.getElementById("tabungan-quarterlyTax").innerHTML = `Rp. ${formatNumber(quarterlyTax)}`;
  document.getElementById("tabungan-quarterlyNetInterest").innerHTML = `Rp. ${formatNumber(quarterlyNetInterest)}`;

  const annualInterest = dailyInterest * 365;
  const annualTax = dailyTax * 365;
  const annualNetInterest = annualInterest - annualTax;

  document.getElementById("tabungan-annualInterest").innerHTML = `Rp. ${formatNumber(annualInterest)}`;
  document.getElementById("tabungan-annualTax").innerHTML = `Rp. ${formatNumber(annualTax)}`;
  document.getElementById("tabungan-annualNetInterest").innerHTML = `Rp. ${formatNumber(annualNetInterest)}`;

  const conclusion = `Jika menabung Rp ${formatNumber(amount)}, di SeaBank, akan mendapatkan keuntungan bersih per harinya Rp ${formatNumber(dailyNetInterest)}`;
  document.getElementById("tabungan-conclusion").innerHTML = `<p>${conclusion}</p>`;
}

// Fungsi untuk menghitung bunga deposito
// Fungsi untuk menghitung bunga deposito
function calculateDepositoInterest() {
  const amountInput = document.getElementById("amount2").value;
  const amount = parseFloat(amountInput.replace(/\D/g, ""));
  if (isNaN(amount)) return;

  // Mengatur suku bunga dan jumlah hari untuk masing-masing periode
  const periods = [
    { duration: "1-month", interestRate: 0.05, days: 30 },
    { duration: "3-months", interestRate: 0.055, days: 90 },
    { duration: "6-months", interestRate: 0.06, days: 180 },
  ];

  periods.forEach((period) => {
    const depositoInterest = amount * period.interestRate * (period.days / 365);
    let depositoTax = 0;
    if (amount > 7500000) {
      depositoTax = depositoInterest * 0.2;
    }
    const depositoNetInterest = depositoInterest - depositoTax;

    document.getElementById(`deposito-${period.duration}-interest`).innerHTML = `Rp ${formatNumber(depositoInterest)}`;
    document.getElementById(`deposito-${period.duration}-tax`).innerHTML = `Rp ${formatNumber(depositoTax)}`;
    document.getElementById(`deposito-${period.duration}-net`).innerHTML = `Rp ${formatNumber(depositoNetInterest)}`;
  });

  // Menghapus kelas 'text-center' saat tombol diklik
  document.getElementById("deposito-conclusion").classList.remove("text-center");

  // Menampilkan conclusion
  const conclusion = `Jika mendepositokan Rp ${formatNumber(amount)} di SeaBank, Anda akan mendapatkan keuntungan bersih sebesar:
  <ul>
    <li>Rp ${formatNumber(parseFloat(document.getElementById("deposito-1-month-net").innerText.replace(/\D/g, "")))} untuk tempo 1 bulan</li>
    <li>Rp ${formatNumber(parseFloat(document.getElementById("deposito-3-months-net").innerText.replace(/\D/g, "")))} untuk tempo 3 bulan</li>
    <li>Rp ${formatNumber(parseFloat(document.getElementById("deposito-6-months-net").innerText.replace(/\D/g, "")))} untuk tempo 6 bulan</li>
  </ul>`;
  document.getElementById("deposito-conclusion").innerHTML = `<div>${conclusion}</div>`;
}

// Menambahkan kelas 'text-center' saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("deposito-conclusion").classList.add("text-center");
});

function formatNumber(number) {
  return number.toFixed(0).replace(/\d(?=(\d{3})+\b)/g, "$&,");
}

function formatInputAmount(input) {
  let value = input.value.replace(/[^0-9.,]/g, "");
  value = value.replace(/,/g, "").replace(/\./, "x").replace(/\./g, "").replace(/x/, ".");
  value = value.replace(/^,/, "").replace(/,$/, "");
  value = value.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
  input.value = value;
}

// Event listener untuk menangani pergantian tab
document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".nav-link");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const mainHeading = document.getElementById("main-heading");

  // Fungsi untuk mengatur judul dan heading
  function setTitleAndHeading(tabName) {
    if (tabName === "tabungan") {
      document.title = "Kalkulator Bunga Tabungan";
      mainHeading.textContent = "Kalkulator Bunga Tabungan";
    } else if (tabName === "deposito") {
      document.title = "Kalkulator Bunga Deposito";
      mainHeading.textContent = "Kalkulator Bunga Deposito";
    } else {
      document.title = "Kalkulator Bunga";
      mainHeading.textContent = "Kalkulator Bunga";
    }
  }

  // Fungsi untuk mengaktifkan tab
  function activateTab(hash) {
    const targetPane = document.querySelector(hash);
    if (!targetPane) return;

    tabLinks.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    tabPanes.forEach((pane) => {
      if (pane.id === targetPane.id) {
        pane.classList.add("show", "active");
        setTitleAndHeading(pane.id.replace("#", ""));
      } else {
        pane.classList.remove("show", "active");
      }
    });
  }

  // Event listener untuk transisi antara tab pane
  tabPanes.forEach((pane) => {
    pane.addEventListener("transitionend", function () {
      if (pane.classList.contains("show")) {
        setTitleAndHeading(pane.id.replace("#", ""));
      }
    });
  });

  // Event listener untuk klik tab
  tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      // Menyimpan tab aktif ke localStorage
      localStorage.setItem("activeTab", href);

      // Mengaktifkan tab
      activateTab(href);
    });
  });

  // Memeriksa localStorage untuk tab aktif
  const activeTab = localStorage.getItem("activeTab");
  if (activeTab) {
    activateTab(activeTab);
  } else if (tabLinks.length > 0) {
    // Jika tidak ada tab yang disimpan, aktifkan tab pertama
    const firstTabHash = tabLinks[0].getAttribute("href");
    activateTab(firstTabHash);
  }
});
