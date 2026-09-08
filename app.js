/* ===========================================================
   Wayfare — Tourism Management System (prototype)
   Vanilla JS, in-memory state only (no backend — see SRS §8).
   =========================================================== */

/* ---------------------------------------------------------
   1. MOCK DATA  (stands in for the Hotel/Package/User DB —
   see Class Diagram: TravelPackage, Booking, Notification)
   --------------------------------------------------------- */

function buildItinerary(destName, days, pool){
  const list = [];
  for(let d = 1; d <= days; d++){
    let text;
    if(d === 1) text = `Arrive in ${destName}, check in and settle in with an easy evening walk nearby.`;
    else if(d === days) text = `Wrap up souvenir shopping, check out and transfer for departure.`;
    else text = pool[(d - 2) % pool.length];
    list.push({ day: d, activities: text });
  }
  return list;
}

const PACKAGES = [
  {
    id: "pkg-goa", name: "Goa Beach Escape", destination: "Goa", country: "India",
    tags: ["beach", "adventure"], price: 18000, days: 4,
    image: "https://picsum.photos/seed/goa-beach/700/450",
    description: "Sun, surf and seafood along Goa's north and south coastlines, with a paraseiling session and a sunset cruise thrown in.",
    itinerary: buildItinerary("Goa", 4, [
      "Beach-hop across Baga and Anjuna, paragliding in the afternoon.",
      "Old Goa heritage churches, spice plantation lunch, sunset river cruise."
    ])
  },
  {
    id: "pkg-manali", name: "Manali Mountain Retreat", destination: "Manali", country: "India",
    tags: ["mountains", "adventure"], price: 22000, days: 5,
    image: "https://picsum.photos/seed/manali-mountain/700/450",
    description: "Pine forests, river rafting on the Beas and a day trip to snow-capped Solang Valley.",
    itinerary: buildItinerary("Manali", 5, [
      "Local sightseeing: Hadimba Temple, Old Manali cafes.",
      "Full-day Solang Valley trip — cable car and snow activities.",
      "White-water rafting on the Beas river."
    ])
  },
  {
    id: "pkg-jaipur", name: "Jaipur Heritage Trail", destination: "Jaipur", country: "India",
    tags: ["heritage"], price: 15000, days: 3,
    image: "https://picsum.photos/seed/jaipur-fort/700/450",
    description: "The Pink City's forts and palaces, with an evening at a rooftop restaurant overlooking the old city.",
    itinerary: buildItinerary("Jaipur", 3, [
      "Amber Fort in the morning, City Palace and Hawa Mahal in the afternoon."
    ])
  },
  {
    id: "pkg-kerala", name: "Kerala Backwaters Bliss", destination: "Alleppey", country: "India",
    tags: ["wildlife", "spiritual"], price: 26000, days: 4,
    image: "https://picsum.photos/seed/kerala-backwater/700/450",
    description: "A night aboard a traditional houseboat drifting through the backwaters, plus a spice-garden village walk.",
    itinerary: buildItinerary("Alleppey", 4, [
      "Overnight houseboat cruise through the backwaters.",
      "Spice plantation village walk and traditional Kathakali show."
    ])
  },
  {
    id: "pkg-ladakh", name: "Ladakh High Passes", destination: "Leh", country: "India",
    tags: ["mountains", "adventure"], price: 45000, days: 7,
    image: "https://picsum.photos/seed/ladakh-pass/700/450",
    description: "Monasteries, high-altitude passes and the turquoise waters of Pangong Lake.",
    itinerary: buildItinerary("Leh", 7, [
      "Acclimatisation day, Leh Palace and local market.",
      "Nubra Valley via Khardung La — double-hump camels at Hunder.",
      "Pangong Lake day trip, camp overnight by the lake.",
      "Magnetic Hill, Sangam viewpoint, Hall of Fame museum.",
      "Monastery circuit — Thiksey, Hemis and Shey."
    ])
  },
  {
    id: "pkg-rishikesh", name: "Rishikesh Spiritual Sojourn", destination: "Rishikesh", country: "India",
    tags: ["spiritual", "adventure"], price: 13000, days: 3,
    image: "https://picsum.photos/seed/rishikesh-ganga/700/450",
    description: "Riverside yoga sessions, the Ganga Aarti at Triveni Ghat and a rapid-grade rafting run.",
    itinerary: buildItinerary("Rishikesh", 3, [
      "Sunrise yoga session, white-water rafting on the Ganges."
    ])
  },
  {
    id: "pkg-andaman", name: "Andaman Island Hopping", destination: "Port Blair", country: "India",
    tags: ["beach", "wildlife"], price: 38000, days: 6,
    image: "https://picsum.photos/seed/andaman-island/700/450",
    description: "Coral reefs, bioluminescent kayaking and the white sands of Radhanagar Beach.",
    itinerary: buildItinerary("Port Blair", 6, [
      "Cellular Jail and light-and-sound show.",
      "Ferry to Havelock Island, Radhanagar Beach sunset.",
      "Scuba diving / snorkelling at Elephant Beach.",
      "Neil Island — Bharatpur and Laxmanpur beaches."
    ])
  },
  {
    id: "pkg-darjeeling", name: "Darjeeling Tea Trails", destination: "Darjeeling", country: "India",
    tags: ["mountains", "heritage"], price: 21000, days: 4,
    image: "https://picsum.photos/seed/darjeeling-tea/700/450",
    description: "Toy-train rides, working tea estates and sunrise over Kanchenjunga from Tiger Hill.",
    itinerary: buildItinerary("Darjeeling", 4, [
      "Sunrise at Tiger Hill, Batasia Loop, toy-train joy ride.",
      "Tea estate tour and tasting, Padmaja Naidu Zoological Park."
    ])
  },
  {
    id: "pkg-bali", name: "Bali Island Getaway", destination: "Bali", country: "Indonesia",
    tags: ["beach", "heritage"], price: 52000, days: 6,
    image: "https://picsum.photos/seed/bali-temple/700/450",
    description: "Rice-terrace views in Ubud, temple visits and beach clubs along Seminyak.",
    itinerary: buildItinerary("Bali", 6, [
      "Ubud rice terraces and monkey forest.",
      "Tanah Lot and Uluwatu temple sunset tour.",
      "Snorkelling trip to Nusa Penida.",
      "Seminyak beach clubs and spa day."
    ])
  }
];

/* Seed a couple of bookings from other tourists so Agent/Admin
   views have something to work with before the current user
   books anything. */
let bookings = [
  {
    id: "bk-1001", touristName: "Dhananjay Borse", packageId: "pkg-goa",
    packageName: "Goa Beach Escape", destination: "Goa", days: 4,
    travelers: 2, startDate: "2026-10-12", totalPrice: 36000,
    status: "Confirmed", createdAt: Date.now() - 86400000 * 6
  },
  {
    id: "bk-1002", touristName: "Siddhesh Kawad", packageId: "pkg-ladakh",
    packageName: "Ladakh High Passes", destination: "Leh", days: 7,
    travelers: 3, startDate: "2026-11-02", totalPrice: 135000,
    status: "Pending", createdAt: Date.now() - 86400000 * 2
  },
  {
    id: "bk-1003", touristName: "Parth Kokate", packageId: "pkg-jaipur",
    packageName: "Jaipur Heritage Trail", destination: "Jaipur", days: 3,
    travelers: 4, startDate: "2026-09-20", totalPrice: 60000,
    status: "Confirmed", createdAt: Date.now() - 86400000 * 10
  }
];

let users = [
  { id: "u-1", name: "Dhananjay Borse", role: "Tourist", status: "Active" },
  { id: "u-2", name: "Siddhesh Kawad", role: "Tourist", status: "Active" },
  { id: "u-3", name: "Parth Kokate", role: "Tourist", status: "Active" },
  { id: "u-4", name: "Atharva Dherange", role: "Travel Agent", status: "Active" },
  { id: "u-5", name: "Riya Shah", role: "Tourist", status: "Suspended" }
];

let notifications = [];
let notifIdSeq = 1;
let bookingIdSeq = 1004;

function pushNotification(text){
  notifications.unshift({ id: notifIdSeq++, text, time: new Date() });
  renderNotifications();
}

/* ---------------------------------------------------------
   2. APP STATE
   --------------------------------------------------------- */
const STATE = {
  role: null,          // 'tourist' | 'agent' | 'admin'
  user: null,           // { name }
  view: "explore",
  search: { destination: "", duration: "", budget: 50000, interests: new Set() },
  selectedPackageId: null,
  customItinerary: null,
  travelers: 2,
  startDate: ""
};

/* ---------------------------------------------------------
   3. DOM SHORTCUTS
   --------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------------------------------------------------------
   4. AUTH SCREEN
   --------------------------------------------------------- */
function initAuth(){
  $$(".role-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".role-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const role = tab.dataset.role;
      $$("[data-role-form]").forEach(f => {
        f.hidden = !f.dataset.roleForm.split(" ").includes(role);
      });
    });
  });

  $("#tourist-send-otp").addEventListener("click", () => {
    const phone = $("#tourist-phone").value.trim();
    if(phone.length < 10){
      toast("Enter a valid 10-digit phone number.");
      return;
    }
    $("#tourist-otp-wrap").hidden = false;
    $("#tourist-send-otp").hidden = true;
    $("#tourist-continue").hidden = false;
    toast("OTP sent (prototype — enter any 4 digits).");
  });

  $("#form-tourist").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#tourist-name").value.trim() || "Tourist";
    const otp = $("#tourist-otp").value.trim();
    if($("#tourist-otp-wrap").hidden === false && otp.length !== 4){
      toast("Enter the 4-digit code sent to your phone.");
      return;
    }
    login("tourist", { name });
  });

  $("#form-staff").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#staff-name").value.trim() || "Staff";
    const activeTab = $(".role-tab.active").dataset.role;
    login(activeTab, { name });
  });
}

function login(role, user){
  STATE.role = role;
  STATE.user = user;
  $("#auth-screen").hidden = true;
  $("#app-shell").hidden = false;
  $("#current-user-name").textContent = user.name;
  $("#current-user-role").textContent =
    role === "tourist" ? "Tourist" : role === "agent" ? "Travel Agent" : "Admin";
  buildNav();
  const defaultView = role === "tourist" ? "explore" : role === "agent" ? "agent-packages" : "admin-users";
  switchView(defaultView);
  renderNotifications();
  toast(`Welcome, ${user.name.split(" ")[0]}.`);
}

$("#logout-btn").addEventListener("click", () => {
  STATE.role = null;
  STATE.user = null;
  $("#app-shell").hidden = true;
  $("#auth-screen").hidden = false;
});

/* ---------------------------------------------------------
   5. NAV / VIEW SWITCHING
   --------------------------------------------------------- */
const NAV_ITEMS = {
  tourist: [
    { id: "explore", label: "Explore" },
    { id: "trips", label: "My trips" }
  ],
  agent: [
    { id: "agent-packages", label: "Manage packages" },
    { id: "agent-bookings", label: "Booking requests" }
  ],
  admin: [
    { id: "admin-users", label: "Manage users" },
    { id: "admin-reports", label: "Reports" }
  ]
};

function buildNav(){
  const nav = $("#topnav");
  nav.innerHTML = "";
  NAV_ITEMS[STATE.role].forEach(item => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.label;
    btn.dataset.view = item.id;
    btn.addEventListener("click", () => switchView(item.id));
    nav.appendChild(btn);
  });
}

const RENDERERS = {
  explore: renderExplore,
  package: renderPackageDetail,
  trips: renderTrips,
  "agent-packages": renderAgentPackages,
  "agent-bookings": renderAgentBookings,
  "admin-users": renderAdminUsers,
  "admin-reports": renderAdminReports
};

function switchView(viewId){
  STATE.view = viewId;
  $$(".view").forEach(v => v.hidden = true);
  const el = document.getElementById(`view-${viewId}`);
  if(el) el.hidden = false;

  $$("#topnav button").forEach(b => b.classList.toggle("active", b.dataset.view === viewId));

  if(RENDERERS[viewId]) RENDERERS[viewId]();
}

/* ---------------------------------------------------------
   6. TOURIST — EXPLORE / SEARCH
   --------------------------------------------------------- */
function initExploreControls(){
  $("#search-destination").addEventListener("input", (e) => {
    STATE.search.destination = e.target.value.toLowerCase();
    renderExplore();
  });
  $("#search-duration").addEventListener("change", (e) => {
    STATE.search.duration = e.target.value;
    renderExplore();
  });
  $("#search-budget").addEventListener("input", (e) => {
    STATE.search.budget = Number(e.target.value);
    $("#budget-output").textContent = STATE.search.budget.toLocaleString("en-IN");
    renderExplore();
  });
  $$(".chip", $("#interest-chips")).forEach(chip => {
    chip.addEventListener("click", () => {
      const val = chip.dataset.interest;
      if(STATE.search.interests.has(val)){
        STATE.search.interests.delete(val);
        chip.classList.remove("active");
      } else {
        STATE.search.interests.add(val);
        chip.classList.add("active");
      }
      renderExplore();
    });
  });
  $("#back-to-explore").addEventListener("click", () => switchView("explore"));
}

function durationMatches(days, bucket){
  if(!bucket) return true;
  if(bucket === "short") return days <= 3;
  if(bucket === "mid") return days >= 4 && days <= 5;
  if(bucket === "long") return days >= 6;
  return true;
}

function filteredPackages(){
  const { destination, duration, budget, interests } = STATE.search;
  return PACKAGES.filter(p => {
    const matchesText = !destination ||
      p.destination.toLowerCase().includes(destination) ||
      p.name.toLowerCase().includes(destination) ||
      p.tags.some(t => t.includes(destination));
    const matchesBudget = p.price <= budget;
    const matchesDuration = durationMatches(p.days, duration);
    const matchesInterests = interests.size === 0 || p.tags.some(t => interests.has(t));
    return matchesText && matchesBudget && matchesDuration && matchesInterests;
  });
}

function renderExplore(){
  const results = filteredPackages();
  $("#results-count").textContent = results.length;
  const grid = $("#destination-grid");
  grid.innerHTML = "";

  if(results.length === 0){
    grid.innerHTML = `<div class="empty-state">No packages match those filters yet — try widening your budget or clearing an interest tag.</div>`;
    return;
  }

  results.forEach(p => {
    const card = document.createElement("article");
    card.className = "dest-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.destination}">
      <div class="dest-card-body">
        <h3>${p.name}</h3>
        <div class="dest-meta"><span>${p.destination}, ${p.country}</span><span>${p.days} days</span></div>
        <div class="dest-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="dest-price">₹${p.price.toLocaleString("en-IN")} <span>/ person</span></div>
      </div>
    `;
    card.addEventListener("click", () => openPackage(p.id));
    grid.appendChild(card);
  });
}

/* ---------------------------------------------------------
   7. TOURIST — PACKAGE DETAIL / ITINERARY / BOOKING
   --------------------------------------------------------- */
function openPackage(id){
  STATE.selectedPackageId = id;
  const pkg = PACKAGES.find(p => p.id === id);
  STATE.customItinerary = pkg.itinerary.map(d => ({ ...d }));
  STATE.travelers = 2;
  STATE.startDate = "";
  switchView("package");
}

function renderPackageDetail(){
  const pkg = PACKAGES.find(p => p.id === STATE.selectedPackageId);
  const wrap = $("#package-detail");
  if(!pkg){ wrap.innerHTML = ""; return; }

  wrap.innerHTML = `
    <div class="pd-hero">
      <img src="${pkg.image}" alt="${pkg.destination}">
      <p class="ticket-code">${pkg.destination.toUpperCase()} · ${pkg.days} DAYS</p>
      <h2>${pkg.name}</h2>
      <p class="pd-desc">${pkg.description}</p>

      <h3>Customize your itinerary</h3>
      <div class="itinerary-list" id="itinerary-list"></div>
      <div class="itinerary-controls">
        <button class="btn btn-ghost btn-small" id="add-day-btn" type="button">+ Add a day</button>
      </div>
    </div>

    <div class="booking-card">
      <h3>Book this package</h3>
      <label class="field">
        <span>Travel start date</span>
        <input type="date" id="booking-date">
      </label>
      <label class="field">
        <span>Travelers</span>
        <input type="number" id="booking-travelers" min="1" max="12" value="${STATE.travelers}">
      </label>
      <div class="booking-row"><span>Price per person</span><span>₹${pkg.price.toLocaleString("en-IN")}</span></div>
      <div class="booking-row"><span>Duration</span><span>${STATE.customItinerary.length} days</span></div>
      <div class="booking-total"><span>Total<br><span>incl. all itinerary stops</span></span><span id="booking-total-value"></span></div>
      <button class="btn btn-primary" id="book-btn" type="button" style="width:100%; margin-top:16px;">Book trip package</button>
    </div>
  `;

  renderItineraryDays(pkg);
  updateBookingTotal(pkg);

  $("#add-day-btn").addEventListener("click", () => {
    const nextDayNum = STATE.customItinerary.length + 1;
    STATE.customItinerary.push({ day: nextDayNum, activities: "" });
    renderItineraryDays(pkg);
    updateBookingTotal(pkg);
  });

  $("#booking-travelers").addEventListener("input", (e) => {
    STATE.travelers = Math.max(1, Number(e.target.value) || 1);
    updateBookingTotal(pkg);
  });
  $("#booking-date").addEventListener("change", (e) => {
    STATE.startDate = e.target.value;
  });

  $("#book-btn").addEventListener("click", () => bookPackage(pkg));
}

function renderItineraryDays(pkg){
  const list = $("#itinerary-list");
  list.innerHTML = "";
  STATE.customItinerary.forEach((d, idx) => {
    const row = document.createElement("div");
    row.className = "itinerary-day";
    row.innerHTML = `
      <div class="itinerary-day-num">Day ${idx + 1}</div>
      <div style="flex:1;">
        <textarea data-idx="${idx}">${d.activities}</textarea>
        ${STATE.customItinerary.length > 1 ? `<button class="btn btn-ghost btn-small" data-remove="${idx}" style="margin-top:8px;">Remove day</button>` : ""}
      </div>
    `;
    list.appendChild(row);
  });

  $$("textarea", list).forEach(ta => {
    ta.addEventListener("input", (e) => {
      STATE.customItinerary[Number(e.target.dataset.idx)].activities = e.target.value;
    });
  });
  $$("[data-remove]", list).forEach(btn => {
    btn.addEventListener("click", (e) => {
      STATE.customItinerary.splice(Number(e.target.dataset.remove), 1);
      STATE.customItinerary.forEach((d, i) => d.day = i + 1);
      renderItineraryDays(pkg);
      updateBookingTotal(pkg);
    });
  });
}

function updateBookingTotal(pkg){
  const total = pkg.price * STATE.travelers;
  $("#booking-total-value").textContent = `₹${total.toLocaleString("en-IN")}`;
}

function bookPackage(pkg){
  if(!STATE.startDate){
    toast("Choose a travel start date first.");
    return;
  }
  const booking = {
    id: `bk-${bookingIdSeq++}`,
    touristName: STATE.user.name,
    packageId: pkg.id,
    packageName: pkg.name,
    destination: pkg.destination,
    days: STATE.customItinerary.length,
    travelers: STATE.travelers,
    startDate: STATE.startDate,
    totalPrice: pkg.price * STATE.travelers,
    status: "Pending",
    createdAt: Date.now()
  };
  bookings.unshift(booking);
  pushNotification(`Booking request sent for ${pkg.name} (${STATE.travelers} traveler${STATE.travelers > 1 ? "s" : ""}).`);
  toast("Booking request submitted — status: Pending.");
  switchView("trips");
}

/* ---------------------------------------------------------
   8. TOURIST — MY TRIPS
   --------------------------------------------------------- */
function renderTrips(){
  const mine = bookings.filter(b => b.touristName === STATE.user.name);
  const list = $("#trips-list");
  list.innerHTML = "";

  if(mine.length === 0){
    list.innerHTML = `<div class="empty-state">No bookings yet — head to Explore to find a package.</div>`;
    return;
  }

  mine.forEach(b => list.appendChild(ticketNode(b, { cancellable: b.status !== "Cancelled" })));
}

function ticketNode(b, { cancellable, agentControls } = {}){
  const node = document.createElement("div");
  node.className = "ticket";
  node.innerHTML = `
    <div class="ticket-main">
      <h3>${b.packageName}</h3>
      <p class="ticket-sub">Booked by ${b.touristName}</p>
      <div class="ticket-meta-row">
        <div><strong>${b.destination}</strong>Destination</div>
        <div><strong>${b.days} days</strong>Duration</div>
        <div><strong>${b.travelers}</strong>Travelers</div>
        <div><strong>${b.startDate || "—"}</strong>Start date</div>
        <div><strong>₹${b.totalPrice.toLocaleString("en-IN")}</strong>Total</div>
      </div>
    </div>
    <div class="ticket-side">
      <span class="status-badge status-${b.status}">${b.status}</span>
      <div class="ticket-side-actions"></div>
    </div>
  `;

  const actions = $(".ticket-side-actions", node);
  if(cancellable){
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "btn btn-ghost btn-small";
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => {
      b.status = "Cancelled";
      pushNotification(`Booking for ${b.packageName} was cancelled.`);
      toast("Booking cancelled.");
      RENDERERS[STATE.view] && RENDERERS[STATE.view]();
    });
    actions.appendChild(cancelBtn);
  }
  if(agentControls && b.status === "Pending"){
    const confirmBtn = document.createElement("button");
    confirmBtn.className = "btn btn-confirm btn-small";
    confirmBtn.textContent = "Confirm";
    confirmBtn.addEventListener("click", () => {
      b.status = "Confirmed";
      pushNotification(`${b.touristName}'s booking for ${b.packageName} was confirmed.`);
      toast("Booking confirmed.");
      renderAgentBookings();
    });
    const rejectBtn = document.createElement("button");
    rejectBtn.className = "btn btn-danger btn-small";
    rejectBtn.textContent = "Reject";
    rejectBtn.addEventListener("click", () => {
      b.status = "Cancelled";
      pushNotification(`${b.touristName}'s booking for ${b.packageName} was rejected.`);
      toast("Booking rejected.");
      renderAgentBookings();
    });
    actions.appendChild(confirmBtn);
    actions.appendChild(rejectBtn);
  }
  return node;
}

/* ---------------------------------------------------------
   9. AGENT — MANAGE PACKAGES
   --------------------------------------------------------- */
let editingPackageId = null;

function renderAgentPackages(){
  const table = $("#agent-package-table");
  table.innerHTML = "";
  PACKAGES.forEach(p => {
    const row = document.createElement("div");
    row.className = "agent-row";
    row.innerHTML = `
      <img src="${p.image}" alt="${p.destination}">
      <div class="agent-row-info">
        <strong>${p.name}</strong>
        <span>${p.destination} · ${p.days} days · ₹${p.price.toLocaleString("en-IN")}</span>
      </div>
      <div class="agent-row-actions">
        <button class="btn btn-ghost btn-small" data-edit="${p.id}">Edit</button>
        <button class="btn btn-danger btn-small" data-delete="${p.id}">Delete</button>
      </div>
    `;
    table.appendChild(row);
  });

  $$("[data-edit]", table).forEach(btn => btn.addEventListener("click", () => openPackageForm(btn.dataset.edit)));
  $$("[data-delete]", table).forEach(btn => btn.addEventListener("click", () => {
    const idx = PACKAGES.findIndex(p => p.id === btn.dataset.delete);
    if(idx > -1){
      PACKAGES.splice(idx, 1);
      toast("Package deleted.");
      renderAgentPackages();
    }
  }));
}

function openPackageForm(packageId){
  editingPackageId = packageId || null;
  const pkg = packageId ? PACKAGES.find(p => p.id === packageId) : null;
  const wrap = $("#agent-package-form-wrap");
  wrap.hidden = false;
  wrap.innerHTML = `
    <div class="package-form">
      <label class="field"><span>Package name</span><input id="pf-name" value="${pkg ? pkg.name : ""}"></label>
      <label class="field"><span>Destination</span><input id="pf-destination" value="${pkg ? pkg.destination : ""}"></label>
      <label class="field"><span>Country</span><input id="pf-country" value="${pkg ? pkg.country : "India"}"></label>
      <label class="field"><span>Price per person (₹)</span><input id="pf-price" type="number" value="${pkg ? pkg.price : 15000}"></label>
      <label class="field"><span>Duration (days)</span><input id="pf-days" type="number" min="1" value="${pkg ? pkg.days : 3}"></label>
      <label class="field"><span>Tags (comma separated)</span><input id="pf-tags" value="${pkg ? pkg.tags.join(", ") : "beach"}"></label>
      <label class="field full"><span>Description</span><textarea id="pf-desc" rows="2">${pkg ? pkg.description : ""}</textarea></label>
      <div class="package-form-actions">
        <button class="btn btn-primary" id="pf-save" type="button">${pkg ? "Save changes" : "Create package"}</button>
        <button class="btn btn-ghost" id="pf-cancel" type="button">Cancel</button>
      </div>
    </div>
  `;

  $("#pf-cancel").addEventListener("click", () => { wrap.hidden = true; wrap.innerHTML = ""; });
  $("#pf-save").addEventListener("click", () => {
    const name = $("#pf-name").value.trim();
    const destination = $("#pf-destination").value.trim();
    if(!name || !destination){ toast("Package name and destination are required."); return; }
    const days = Math.max(1, Number($("#pf-days").value) || 1);

    const data = {
      name, destination,
      country: $("#pf-country").value.trim() || "India",
      price: Number($("#pf-price").value) || 0,
      days,
      tags: $("#pf-tags").value.split(",").map(t => t.trim().toLowerCase()).filter(Boolean),
      description: $("#pf-desc").value.trim(),
      image: pkg ? pkg.image : `https://picsum.photos/seed/${encodeURIComponent(destination)}/700/450`
    };

    if(pkg){
      Object.assign(pkg, data);
      if(pkg.itinerary.length !== days){
        pkg.itinerary = buildItinerary(destination, days, ["Free day to explore at your own pace."]);
      }
      toast("Package updated.");
    } else {
      PACKAGES.push({
        id: `pkg-${Date.now()}`,
        ...data,
        itinerary: buildItinerary(destination, days, ["Free day to explore at your own pace."])
      });
      toast("Package created.");
    }
    wrap.hidden = true;
    wrap.innerHTML = "";
    renderAgentPackages();
  });
}

function initAgentControls(){
  $("#new-package-btn").addEventListener("click", () => openPackageForm(null));
}

/* ---------------------------------------------------------
   10. AGENT — BOOKING REQUESTS
   --------------------------------------------------------- */
function renderAgentBookings(){
  const list = $("#agent-bookings-list");
  list.innerHTML = "";
  if(bookings.length === 0){
    list.innerHTML = `<div class="empty-state">No bookings yet.</div>`;
    return;
  }
  bookings.forEach(b => list.appendChild(ticketNode(b, { agentControls: true })));
}

/* ---------------------------------------------------------
   11. ADMIN — MANAGE USERS
   --------------------------------------------------------- */
function renderAdminUsers(){
  const table = $("#admin-users-table");
  table.innerHTML = "";
  users.forEach(u => {
    const row = document.createElement("div");
    row.className = "agent-row";
    row.innerHTML = `
      <div class="agent-row-info">
        <strong>${u.name}</strong>
        <span>${u.role}</span>
      </div>
      <span class="status-badge status-${u.status === "Active" ? "Confirmed" : "Cancelled"}">${u.status}</span>
      <div class="agent-row-actions">
        <button class="btn btn-ghost btn-small" data-toggle="${u.id}">${u.status === "Active" ? "Suspend" : "Reactivate"}</button>
      </div>
    `;
    table.appendChild(row);
  });
  $$("[data-toggle]", table).forEach(btn => btn.addEventListener("click", () => {
    const u = users.find(x => x.id === btn.dataset.toggle);
    u.status = u.status === "Active" ? "Suspended" : "Active";
    toast(`${u.name} is now ${u.status.toLowerCase()}.`);
    renderAdminUsers();
  }));
}

/* ---------------------------------------------------------
   12. ADMIN — REPORTS
   --------------------------------------------------------- */
function renderAdminReports(){
  const total = bookings.length;
  const confirmed = bookings.filter(b => b.status === "Confirmed");
  const revenue = confirmed.reduce((sum, b) => sum + b.totalPrice, 0);
  const pending = bookings.filter(b => b.status === "Pending").length;

  $("#report-stats").innerHTML = `
    <div class="stat-card"><strong>${total}</strong><span>Total bookings</span></div>
    <div class="stat-card"><strong>${confirmed.length}</strong><span>Confirmed trips</span></div>
    <div class="stat-card"><strong>${pending}</strong><span>Pending requests</span></div>
    <div class="stat-card"><strong>₹${revenue.toLocaleString("en-IN")}</strong><span>Confirmed revenue</span></div>
  `;

  const counts = {};
  bookings.forEach(b => { counts[b.destination] = (counts[b.destination] || 0) + 1; });
  const max = Math.max(1, ...Object.values(counts));
  const chart = $("#report-chart");
  chart.innerHTML = "";
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([dest, count]) => {
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML = `
        <span class="bar-label">${dest}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${(count / max) * 100}%"></span></span>
        <span class="bar-value">${count}</span>
      `;
      chart.appendChild(row);
    });
  if(Object.keys(counts).length === 0){
    chart.innerHTML = `<div class="empty-state">No bookings recorded yet.</div>`;
  }
}

/* ---------------------------------------------------------
   13. NOTIFICATIONS
   --------------------------------------------------------- */
function renderNotifications(){
  const countEl = $("#notif-count");
  countEl.hidden = notifications.length === 0;
  countEl.textContent = notifications.length;

  const list = $("#notif-list");
  list.innerHTML = notifications.length
    ? notifications.map(n => `<li>${n.text}</li>`).join("")
    : `<li class="empty">Nothing new yet.</li>`;
}

function initNotifBell(){
  $("#notif-bell").addEventListener("click", () => {
    $("#notif-panel").hidden = !$("#notif-panel").hidden;
  });
  document.addEventListener("click", (e) => {
    if(!e.target.closest(".notif-wrap")) $("#notif-panel").hidden = true;
  });
}

/* ---------------------------------------------------------
   14. TOAST
   --------------------------------------------------------- */
let toastTimer = null;
function toast(msg){
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
}

/* ---------------------------------------------------------
   15. BOOT
   --------------------------------------------------------- */
initAuth();
initExploreControls();
initAgentControls();
initNotifBell();
