// Nomor WhatsApp toko. Format: 62xxxxxxxxxx tanpa + dan tanpa 0 di depan.
const whatsappNumber = "628813071270";

// Data nama, foto, deskripsi, pilihan porsi, dan harga setiap menu.
const menuDimsum = [
  {
    name: "Dimsum Original",
    image: "dimsum%20original.jpg",
    desc: "Dimsum kukus isi ayam dengan topping wortel, keju, dan sosis.",
    options: [
      ["Isi 4", 10000],
      ["Isi 6", 14000],
      ["Isi 10", 22000]
    ]
  },
  {
    name: "Dimsum Kuah",
    image: "dimsum%20kuah.jpg",
    desc: "Dimsum dalam kuah gurih pedas dengan taburan daun bawang.",
    options: [
      ["Isi 4", 13000],
      ["Isi 6", 18000],
      ["Isi 10", 28000]
    ]
  },
  {
    name: "Dimsum Goreng",
    image: "dimsum%20goreng.jpg",
    desc: "Dimsum goreng renyah di luar, lembut di dalam, dengan saus sambal.",
    options: [
      ["Isi 4", 12000],
      ["Isi 6", 17000],
      ["Isi 10", 26000]
    ]
  },
  {
    name: "Dimsum Mentai",
    image: "dimsum%20mentai.jpg",
    desc: "Dimsum dengan saus mentai creamy yang dibakar dan taburan parsley.",
    options: [
      ["Isi 4", 16000],
      ["Isi 6", 23000],
      ["Isi 10", 36000]
    ]
  },
  {
    name: "Dimsum Lava",
    image: "dimsum%20lava.jpg",
    desc: "Dimsum dengan saus lava pedas gurih dan taburan parsley.",
    options: [
      ["Isi 4", 16000],
      ["Isi 6", 23000],
      ["Isi 10", 36000]
    ]
  }
];

// Harga tambahan jika pelanggan memilih chili oil.
const chiliOilPrice = 3000;

// Mengubah angka menjadi format mata uang Rupiah.
function formatRupiah(amount) {
  return "Rp" + amount.toLocaleString("id-ID");
}

// Membuat tautan WhatsApp dengan pesan yang sudah diisi.
function createWhatsAppLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Menyusun kartu menu beserta pilihan porsi dan chili oil.
function buildMenuCard(item) {
  const optionList = item.options
    .map(
      ([label, price]) => `
        <li>
          <span>${label} · <b>${formatRupiah(price)}</b></span>
          <button type="button" data-menu-item="${item.name}" data-option="${label}" data-price="${price}">
            Pesan
          </button>
        </li>
      `
    )
    .join("");

  // Setiap kartu menu menempati satu kolom pada grid dua kolom.
  return `
    <div class="col-12 col-sm-6 col-lg-4">
    <article class="card h-100">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="body">
        <h3>${item.name}</h3>
        <p class="desc">${item.desc}</p>
        <label class="chili-oil-option">
          <img src="chili%20oil.jpg" alt="" loading="lazy">
          <span><b>Extra Chili Oil</b><small>Tambah ${formatRupiah(chiliOilPrice)}</small></span>
          <input class="chili-oil-checkbox" type="checkbox" aria-label="Tambah extra chili oil">
        </label>
        <ul class="opts">
          ${optionList}
        </ul>
      </div>
    </article>
    </div>
  `;
}

// Menampilkan semua kartu menu di bagian menu halaman.
function renderMenu() {
  const container = document.getElementById("dimsum-grid");
  container.innerHTML = menuDimsum.map(buildMenuCard).join("");
}

// Membuka WhatsApp dan menghitung chili oil jika opsi tambahan dipilih.
function handleOrderClick(event) {
  const orderButton = event.target.closest("[data-order], [data-menu-item]");
  if (!orderButton) return;

  event.preventDefault();
  let message = orderButton.dataset.order;

  if (orderButton.dataset.menuItem) {
    const card = orderButton.closest(".card");
    const chiliOilAdded = card.querySelector(".chili-oil-checkbox").checked;
    const basePrice = Number(orderButton.dataset.price);
    const totalPrice = basePrice + (chiliOilAdded ? chiliOilPrice : 0);
    const extraText = chiliOilAdded ? ` + Extra Chili Oil (${formatRupiah(chiliOilPrice)})` : "";
    message = `Halo Dimsum Story, saya mau pesan ${orderButton.dataset.menuItem} ${orderButton.dataset.option}${extraText}. Total: ${formatRupiah(totalPrice)}.`;
  }

  window.open(createWhatsAppLink(message), "_blank");
}

// Mengatur buka-tutup navigasi pada layar kecil.
function setupMobileMenu() {
  const burgerButton = document.getElementById("burger");
  const navMenu = document.getElementById("nav");

  if (!burgerButton || !navMenu) return;

  burgerButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navMenu.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      navMenu.classList.remove("open");
    }
  });
}

// Menyiapkan menu dan memasang interaksi tombol halaman.
renderMenu();
document.addEventListener("click", handleOrderClick);
setupMobileMenu();