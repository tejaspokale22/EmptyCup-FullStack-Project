let shortlisted = {};
let shortlistFilter = false;

//useEffect on load
document.addEventListener("DOMContentLoaded", () => {
  fetchDesigners();
  // Check and initialize shortlisted in localStorage if not present
  const saved = localStorage.getItem("shortlisted");
  if (saved) {
    shortlisted = JSON.parse(saved);
  } else {
    shortlisted = {};
    localStorage.setItem("shortlisted", JSON.stringify(shortlisted));
  }
  setTimeout(() => {
    const buttons = document.querySelectorAll(".shortlist-btn");
    const cards = document.querySelectorAll(".designer-card");
    cards.forEach((card) => {
      const id = card.dataset.id;
      if (shortlisted[id]) {
        card.classList.add("bg-[#FFFCF2]");
        card.classList.remove("bg-white");
      } else {
        card.classList.add("bg-white");
        card.classList.remove("bg-[#FFFCF2]");
      }
    });
    buttons.forEach((btn) => {
      const id = btn.getAttribute("data-id");
      const img = btn.querySelector("img");
      const p = btn.querySelector("p");

      if (shortlisted[id]) {
        img.src = "./assets/shortlist.svg";
        p.textContent = "Shortlisted";
      } else {
        img.src = "./assets/notShortlist.svg";
        p.textContent = "Shortlist";
      }
    });
  }, 600);
});

// Fetch designer data
async function fetchDesigners() {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/designers");
    const designers = await res.json();
    renderDesigners(designers);
  } catch (err) {
    console.error("Error fetching designers:", err);
  }
}

// Render designers using template
function renderDesigners(designers) {
  const container = document.getElementById("designers-container");

  designers.forEach((d) => {
    const { id, name, years, projects, rating, price, phones } = d;

    // Main card
    const card = document.createElement("div");
    card.className =
      "px-4 py-6 flex gap-3 font-normal w-full border-b border-gray-200 designer-card";
    card.dataset.id = id;

    // Left section
    const left = document.createElement("div");
    left.className = "border-r border-gray-200 px-4 py-3 min-w-[340px]";

    const title = document.createElement("h2");
    title.className = "font-[400] font-bold text-[18px] text-black title";
    title.textContent = name;

    const starsDiv = document.createElement("div");
    starsDiv.className =
      "flex items-center space-x-1 text-yellow-500 text-base mt-1 mb-3";
    // Star ratings
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      const star = document.createElement("img");
      star.src = "./assets/star.svg"; // use your full star asset
      star.alt = "full-star";
      starsDiv.appendChild(star);
    }

    // Add half star if needed
    if (hasHalfStar) {
      const halfStar = document.createElement("img");
      halfStar.src = "./assets/halfStar.svg"; // use your half star asset
      halfStar.alt = "half-star";
      starsDiv.appendChild(halfStar);
    }

    const description = document.createElement("p");
    description.className =
      "text-[10px] text-black mt-4 mb-6 max-w-[211px] description";
    description.textContent = `Passionate team of ${phones.length} designers working out of Bangalore with an experience of ${years} years.`;

    const stats = document.createElement("div");
    stats.className =
      "flex justify-between mt-4 text-center text-sm mb-6 text-black max-w-[190px]";
    stats.innerHTML = `
      <div>
        <div class="font-bold text-[24px] projects">${projects}</div>
        <div class="text-[10px]">Projects</div>
      </div>
      <div>
        <div class="font-bold text-[24px] years">${years}</div>
        <div class="text-[10px]">Years</div>
      </div>
      <div>
        <div class="font-bold text-[24px] price">${price}</div>
        <div class="text-[10px]">Price</div>
      </div>
    `;

    const contact = document.createElement("div");
    contact.className = "mt-4 space-y-1 text-[16px] mb-2 text-black contact";
    phones.forEach((p) => {
      const phone = document.createElement("div");
      phone.textContent = p;
      contact.appendChild(phone);
    });

    left.append(title, starsDiv, description, stats, contact);

    // Right section
    const right = document.createElement("div");
    right.className =
      "text-right text-pink-600 flex flex-col justify-between px-4 pb-4 cursor-pointer";

    const actions = [
      { icon: "arrow", label: "Details", w: 23, h: 22 },
      { icon: "eye", label: "Hide", w: 20, h: 20 },
      {
        icon: "notShortlist",
        label: "Shortlist",
        w: 17.25,
        h: 21,
        class: "shortlist-btn",
        idAttr: true,
      },
      { icon: "report", label: "Report", w: 16, h: 16 },
    ];

    actions.forEach(({ icon, label, w, h, class: extraClass, idAttr }) => {
      const action = document.createElement("div");
      action.className = `flex flex-col items-center gap-1 ${extraClass || ""}`;
      if (idAttr) action.dataset.id = id;

      const img = document.createElement("img");
      img.src = `./assets/${icon}.svg`;
      img.alt = icon;
      img.className = `w-[${w}px] h-[${h}px]`;

      const text = document.createElement("p");
      text.className = "text-[#8D4337] text-[8px]";
      text.textContent = label;

      action.append(img, text);
      right.appendChild(action);
    });

    // Append sections to card
    card.append(left, right);

    // Append card to container
    container.appendChild(card);
  });
}

//Handle shortlist toggle
document.addEventListener("click", (event) => {
  const btn = event.target.closest(".shortlist-btn");
  if (btn) {
    const id = btn.dataset.id;
    if (!id) return;
    const img = btn.querySelector("img");
    const text = btn.querySelector("p");
    const card = document.querySelector(`[data-id="${id}"]`);
    if (shortlisted[id]) {
      shortlisted[id] = false;
      img.src = "./assets/notShortlist.svg";
      text.textContent = "Shortlist";
      card.classList.add("bg-white");
      card.classList.remove("bg-[#FFFCF2]");
    } else {
      shortlisted[id] = true;
      img.src = "./assets/shortlist.svg";
      text.textContent = "Shortlisted";
      card.classList.add("bg-[#FFFCF2]");
      card.classList.remove("bg-white");
    }
    localStorage.setItem("shortlisted", JSON.stringify(shortlisted));
  }
});

// Handle filter toggle
document.addEventListener("click", (event) => {
  shortlistFilter = !shortlistFilter;
  console.log(shortlistFilter);
  const filterBtn = event.target.closest("#filterToggle");
  if (filterBtn) {
    console.log("running");
    const cards = document.querySelectorAll(".designer-card");
    cards.forEach((card) => {
      const id = card.dataset.id;
      const isShortlisted = shortlisted[id];
      if (shortlistFilter) {
        if (!isShortlisted) {
          card.classList.add("hidden");
          card.classList.remove("flex");
        }
      } else {
        card.classList.add("flex");
        card.classList.remove("hidden");
      }
    });
  }
});
