// Shared functions for both dashboards
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// === UPDATED BOOKING & PAYMENT FUNCTIONS (Multiple Packages like your rate cards) ===
function showPricing() {
  const category = document.getElementById('categorySelect').value;
  if (!category) {
    document.getElementById('pricingSection').classList.add('hidden');
    return;
  }
  // Package data based on your Adobe rate cards style (you can adjust prices/descriptions anytime)
  const packagesData = {
    wedding: [
      { name: "Bronze Package", price: "GHS 6,000", desc: "6 hours coverage of the bridal preparation, ceremony, reception and couples exclusive session • 120 images (15 retouched) • 1-min  thriller  • HD video of the whole ceremony on a pendrive • IF THE CEREMONY IS TWO DAYS (+GHS 2000)", amountPesewas: 600000 },
      { name: "Silver Package", price: "GHS 7,500", desc: "8 hours coverage of the bridal preparation, ceremony, reception, and the couple's exclusive session • Pre-wedding shoot  • 1photographer, 2videographers, 1min thriller • 150 images (20 retouched) A4-size photobook + all unprocessed jpegs (min.400images) • IF THE CEREMONY IS TWO DAYS (+GHS 2000) ", amountPesewas: 750000 },
      { name: "Gold Package",   price: "GHS 8,000", desc: "Pre-wedding photoshoot, 12 hours coverage of the bridal preparation, ceremony, reception and the couple's exclusive session • 1photgrapher, 2videographers, 1min thriller  • 200 images (35 retouched)  A3-sized photobook + all unprocessed jpegs (min 450)  • HD video  of the whole ceremony on a pendrive • IF THE CEREMONY IS TWO DAYS (+GHS 2000)", amountPesewas: 800000 },
      { name: "Diamond Package", price: "GHS 15,000", desc: "Pre-wedding photoshoot,Save the date flyer,couples couples interview,12hours coverage of the bridal preparation, ceremony, reception and couple's exclusive session. 2photographers, 3videographers, 2mins thriller • 300 images (50 retourched) A3 -sized photobook + all unprocessed jpegs (min.600images) & HD video of the whole ceremony on a pendrive.2large canvas frame + mosiac frame •IF THE CEREmony IS ONE DAYS (+GHS 10,000),IF THE CEREMONY IS MORE THAN TWO DAYS (+GHS 3000)", amountPesewas: 1500000 },
      { name: "Photography Only - Traditional",
       price: "GHS 3,500",
       desc: "Photography coverage for traditional wedding only",
       amountPesewas: 350000
      },
      { name: "Photography Only - White Wedding",
       price: "GHS 3,500",
       desc: "Photography coverage for white wedding only",
       amountPesewas: 350000
      },
      { name: "Videography Only - Traditional",
       price: "GHS 4,000",
       desc: "Videography coverage for traditional wedding only",
       amountPesewas: 400000
      },
      { name: "Videography Only - White Wedding",
       price: "GHS 5,000",
       desc: "Videography coverage for white wedding only",
       amountPesewas: 500000
      },
      { name: "Pre-Wedding Studio Shoot",
       price: "GHS 2,000",
       desc: "Pre-wedding studio photoshoot",
       amountPesewas: 200000
      },
      { name: "Pre-Wedding Outdoor Shoot",
       price: "GHS 2,500",
       desc: "Pre-wedding outdoor photoshoot",
       amountPesewas: 250000
      }
    ],
    funeral: [
      { name: "Basic Memorial", price: "GHS 1,800", desc: "2 hours coverage • 10 retouched dignified portraits", amountPesewas: 180000 },
      { name: "Premium Tribute", price: "GHS 2,500", desc: "3 hours • 15 retouched images • Family group shots", amountPesewas: 250000 }
    ],
    birthday: [
      { name: "Standard Birthday", price: "GHS 1,200", desc: "2 hours • 10 retouched photos • Cake smash session", amountPesewas: 120000 },
      { name: "Premium Birthday",  price: "GHS 1,800", desc: "3 hours • 15 retouched photos • Props & backdrop included", amountPesewas: 180000 }
    ],
    regular: [
      { name: "Studio Portrait", price: "GHS 800", desc: "1 hour • 7 retouched images • 1-2 outfits", amountPesewas: 80000 },
      { name: "Outdoor Portrait", price: "GHS 1,200", desc: "1.5 hours • 10 retouched images", amountPesewas: 120000 }
    ],
    pageant: [
      { name: "Fashion Shoot", price: "GHS 3,000", desc: "2 hours • 15 retouched images • Runway style", amountPesewas: 300000 },
      { name: "Premium Pageant", price: "GHS 4,500", desc: "3 hours • 20 retouched images • Makeup & styling support", amountPesewas: 450000 }
    ]
  };

  const packages = packagesData[category] || [];

  // Update header
  document.getElementById('selectedCategory').textContent = 
    category.charAt(0).toUpperCase() + category.slice(1) + " Packages";

  // Clear and populate package cards
  const container = document.getElementById('packagesContainer');
  container.innerHTML = '';

  packages.forEach(pkg => {
    const card = document.createElement('div');
    card.className = "bg-emerald-50 border border-emerald-200 rounded-3xl p-6 hover:shadow-xl transition-all";
    card.innerHTML = `
      <h4 class="font-semibold text-xl text-emerald-900 mb-3">${pkg.name}</h4>
      <div class="text-4xl font-bold text-emerald-600 mb-4">${pkg.price}</div>
      <p class="text-emerald-700 text-sm leading-relaxed mb-6">${pkg.desc}</p>
      <button onclick="selectPackage(${pkg.amountPesewas}, '${pkg.name}', '${category}')" 
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2">
        <i class="fa-solid fa-credit-card"></i>
        Pay with Paystack
      </button>
    `;
    container.appendChild(card);
  });

  document.getElementById('pricingSection').classList.remove('hidden');
}

function selectPackage(amountPesewas, packageName, category) {
  window.currentBookingAmount = amountPesewas;
  window.currentBookingCategory = category;
  window.currentPackageName = packageName;
  
  payWithPaystack(amountPesewas, `${category} - ${packageName}`);
}

function scheduleShoot() {
  const category = window.currentBookingCategory || "Selected Shoot";
  const date = prompt("Enter preferred date (YYYY-MM-DD):");
  const time = prompt("Enter preferred time (e.g. 10:00 AM):");
  
  if (date && time) {
    alert(`📅 Booking request sent!\n\nCategory: ${category}\nDate: ${date}\nTime: ${time}\n\nAdmin will confirm shortly via WhatsApp.`);
  }
}

// WhatsApp Enquiry with pre-filled message
function bookViaWhatsApp() {
  const category = window.currentBookingCategory || "a shoot";
  const packageName = window.currentPackageName || "a package";

  const message = `Hello TwinxEffect Studio,%0A%0A` +
                  `I would like to book the *${packageName}* for *${category}*.%0A%0A` +
                  `Please let me know the available dates and next steps.%0A%0A` +
                  `Thank you!`;

  const whatsappUrl = `https://wa.me/233243925478?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

// === REAL MEDIA GALLERY - Updated for Vercel (public folder) ===
const mockMedia = {
  wedding: [
     { type: 'video', title: 'Wedding Trailer', url: '/videos/wedding/wedding-trailer.mp4', desc: 'Cinematic wedding highlight reel' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-1.jpeg', desc: 'Traditional Ghanaian wedding' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-2.jpeg', desc: 'Beautiful couple portrait' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-3.jpeg', desc: 'Joyful wedding moment' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-4.jpeg', desc: 'Elegant wedding shot' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-5.jpeg', desc: 'Romantic portrait' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-6.jpeg', desc: 'Bride' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-7.jpeg', desc: 'Bride' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-8.jpeg', desc: 'Bride and groom' },
    { type: 'image', title: 'Wedding image', url: '/images/wedding/wedding-9.jpeg', desc: 'Wedding group shot' }
  ],
  funeral: [
    { type: 'video', title: 'Funeral Trailer', url: '/videos/funeral/The late Mr. seth & Mrs. Rebecca Addy-trailer.mp4', desc: 'Memorial tribute video' }
  ],
  birthday: [
      { type: 'image', title: 'Birthday 1', url: '/images/birthday/birthday-1.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 2', url: '/images/birthday/birthday-2.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 3', url: '/images/birthday/birthday-3.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 4', url: '/images/birthday/birthday-4.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 5', url: '/images/birthday/birthday-5.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 6', url: '/images/birthday/birthday-6.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 7', url: '/images/birthday/birthday-7.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 8', url: '/images/birthday/birthday-8.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 9', url: '/images/birthday/birthday-9.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 10', url: '/images/birthday/birthday-10.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 11', url: '/images/birthday/birthday-11.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 12', url: '/images/birthday/birthday-12.jpeg', desc: 'Cake smash moment' },
      { type: 'image', title: 'Birthday 13', url: '/images/birthday/birthday-13.jpeg', desc: 'Fun birthday session' },
      { type: 'image', title: 'Birthday 14', url: '/images/birthday/birthday-14.jpeg', desc: 'Fun birthday session' }
  ],
  regular: [
    { type: 'image', title: 'Regular Portrait 1', url: '/images/regular/regular-1.jpeg', desc: 'Classic studio portrait' },
    { type: 'image', title: 'Regular Portrait 2', url: '/images/regular/regular-2.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 3', url: '/images/regular/regular-3.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 4', url: '/images/regular/regular-4.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 5', url: '/images/regular/regular-5.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 6', url: '/images/regular/regular-6.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 7', url: '/images/regular/regular-7.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 8', url: '/images/regular/regular-8.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 9', url: '/images/regular/regular-9.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 10', url: '/images/regular/regular-10.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 11', url: '/images/regular/regular-11.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 12', url: '/images/regular/regular-12.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 13', url: '/images/regular/regular-13.jpeg', desc: 'Natural lighting portrait' },
    { type: 'image', title: 'Regular Portrait 14', url: '/images/regular/regular-14.jpeg', desc: 'Natural lighting portrait' }
  ],
  pageant: [
    { type: 'image', title: 'Pageant 1', url: '/images/pageant/pageant-1.jpeg', desc: 'Fashion pageant shoot' },
    { type: 'image', title: 'Pageant 2', url: '/images/pageant/pageant-2.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 3', url: '/images/pageant/pageant-3.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 4', url: '/images/pageant/pageant-4.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 5', url: '/images/pageant/pageant-5.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 6', url: '/images/pageant/pageant-6.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 7', url: '/images/pageant/pageant-7.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 8', url: '/images/pageant/pageant-8.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 9', url: '/images/pageant/pageant-9.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 10', url: '/images/pageant/pageant-10.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 11', url: '/images/pageant/pageant-11.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 12', url: '/images/pageant/pageant-12.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 13', url: '/images/pageant/pageant-13.jpeg', desc: 'Runway glamour' },
    { type: 'image', title: 'Pageant 14', url: '/images/pageant/pageant-14.jpeg', desc: 'Runway glamour' }
  ],
  rifa: [
    { type: 'video', title: 'RIFA Trailer', url: '/videos/rifa/RIFA-trailer.mp4', desc: 'Rifa campaign highlight' },
    { type: 'video', title: 'Selpharma Trailer', url: '/videos/selpharma/selpharma-trailer.MP4', desc: 'Selpharma campaign' }
  ]
};

function loadGallery() {
  const category = document.getElementById('galleryCategory').value;
  const container = document.getElementById('galleryContent');
  container.innerHTML = '';

  if (!category || !mockMedia[category]) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16">
        <p class="text-emerald-600 text-xl">Select a category above to explore our beautiful work ✨</p>
      </div>`;
    return;
  }

  mockMedia[category].forEach((item) => {
    const div = document.createElement('div');
    div.className = "bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition-all cursor-pointer group";

    let mediaHTML = '';
    if (item.type === 'video') {
      mediaHTML = `
        <div class="relative h-64 bg-emerald-100 overflow-hidden">
          <video src="${item.url}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" muted></video>
          <div class="absolute inset-0 flex items-center justify-center bg-black/40">
            <i class="fa-solid fa-play-circle text-white text-6xl"></i>
          </div>
        </div>`;
    } else {
      mediaHTML = `
        <div class="relative h-64 bg-emerald-100 overflow-hidden">
          <img src="${item.url}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
        </div>`;
    }

    div.innerHTML = `
      ${mediaHTML}
      <div class="p-6">
        <p class="font-semibold text-emerald-900 text-lg">${item.title}</p>
        <p class="text-emerald-600 text-sm mt-1">${item.desc}</p>
        <p class="text-xs text-emerald-500 mt-3">${item.type === 'video' ? '▶️ Watch Trailer' : '📸 View Full Photo'}</p>
      </div>
    `;

    div.onclick = () => showMediaPreview(item);
    container.appendChild(div);
  });
}

// Modal Preview (works for both images and local videos)
function showMediaPreview(item) {
  let content = '';

  if (item.type === 'video') {
    content = `
      <video controls autoplay class="w-full max-h-[70vh] rounded-t-3xl" src="${item.url}">
        Your browser does not support the video tag.
      </video>`;
  } else {
    content = `<img src="${item.url}" class="w-full max-h-[70vh] object-contain" alt="${item.title}">`;
  }

  const modalHTML = `
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onclick="this.remove()">
      <div class="bg-white rounded-3xl max-w-4xl w-full overflow-hidden" onclick="event.stopImmediatePropagation()">
        <div class="relative">
          ${content}
          <button onclick="this.closest('.fixed').remove()" 
            class="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg text-emerald-700 hover:bg-emerald-100 transition text-xl">
            ✕
          </button>
        </div>
        <div class="p-8">
          <h3 class="font-semibold text-2xl text-emerald-900">${item.title}</h3>
          <p class="text-emerald-600 mt-3">${item.desc}</p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    const greetingEl = document.getElementById('userGreeting') || document.getElementById('userName');
    if (greetingEl) {
      greetingEl.textContent = user.name || user.email.split('@')[0];
    }
  }
});