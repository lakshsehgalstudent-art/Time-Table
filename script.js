/* ===================================================
   MULTI-PROFILE TIMETABLE — script.js
   --- UPDATED ---
   =================================================== */

/* ---------- DATA ---------- */

const DEFAULT_PROFILES = {

  suhani: {
    mon: [
      {start:"10:45", end:"11:45", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
      {start:"11:45", end:"12:45", subject:"Corporate Accounting", room:"R301", teacher:"Devendra Malapati"},
      {start:"12:45", end:"13:05", subject:"Lunch Break"},
      {start:"13:05", end:"14:05", subject:"GE II", room:"Th321", teacher:"Drishti Joshi"},
      {start:"14:05", end:"15:05", subject:"EVS", room:"R216"},
      {start:"15:05", end:"16:05", subject:"EVS", room:"R216"}
    ],
    tue: [
      {start:"10:45", end:"11:45", subject:"Claw Tutorial G1", room:"R205", teacher:"Sindhu Mani"},
      {start:"11:45", end:"12:45", subject:"HRM Tutorial G1", room:"R202", teacher:"Sunita Chhabra"},
      {start:"12:45", end:"13:05", subject:"Lunch Break"},
      {start:"13:05", end:"14:05", subject:"Corporate Accounting", room:"R202", teacher:"Devendra Malapati"},
      {start:"14:05", end:"15:05", subject:"Company Law", room:"R202", teacher:"Sindhu Mani"},
      {start:"15:05", end:"16:05", subject:"VAC Semester II"},
      {start:"16:05", end:"17:05", subject:"VAC Semester II"}
    ],
    wed: [
      {start:"08:45", end:"09:45", subject:"GE II", room:"Th321", teacher:"Drishti Joshi"},
      {start:"09:45", end:"10:45", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
      {start:"10:45", end:"11:45", subject:"Company Law", room:"R219", teacher:"Sindhu Mani"},
      {start:"11:45", end:"12:45", subject:"Company Law Tutorial G2", room:"R205", teacher:"Sindhu Mani"},
      {start:"12:45", end:"13:05", subject:"Lunch Break"},
      {start:"13:05", end:"14:05", subject:"HRM Tutorial G2", room:"R207", teacher:"Sunita Chhabra"}
    ],
    thu: [
      {start:"08:45", end:"09:45", subject:"EVS", room:"R202"},
      {start:"09:45", end:"10:45", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
      {start:"10:45", end:"11:45", subject:"Corporate Accounting Tutorial", room:"R207", teacher:"P. Chengarayulu"},
      {start:"11:45", end:"12:45", subject:"HRM Tutorial G3", room:"R207", teacher:"Sunita Chhabra"},
      {start:"12:45", end:"13:05", subject:"Lunch Break"},
      {start:"13:05", end:"14:05", subject:"Corporate Accounting Tutorial", teacher:"P. Chengarayulu"}
    ],
    fri: [
      {start:"08:45", end:"09:45", subject:"Corporate Accounting", room:"R201", teacher:"Devendra Malapati"},
      {start:"09:45", end:"10:45", subject:"Break"},
      {start:"10:45", end:"11:45", subject:"Company Law Tutorial G3", room:"R205", teacher:"Sindhu Mani"},
      {start:"11:45", end:"12:45", subject:"Company Law", room:"R321", teacher:"Sindhu Mani"},
      {start:"12:45", end:"13:05", subject:"Lunch Break"},
      {start:"13:05", end:"14:05", subject:"GE II Practical"},
      {start:"14:05", end:"15:05", subject:"GE II Practical"},
      {start:"15:05", end:"16:05", subject:"GE II Practical"}
    ],
    sat: [
      {start:"08:45", end:"09:45", subject:"SEC Semester II"},
      {start:"09:45", end:"10:45", subject:"SEC Semester II"},
      {start:"10:45", end:"11:45", subject:"SEC Semester II"},
      {start:"11:45", end:"12:45", subject:"SEC Semester II"},
      {start:"12:45", end:"13:05", subject:"Lunch Break"},
      {start:"13:05", end:"14:05", subject:"VAC Semester II"},
      {start:"14:05", end:"15:05", subject:"VAC Semester II"},
      {start:"15:05", end:"16:05", subject:"AEC Semester II"},
      {start:"16:05", end:"17:05", subject:"AEC Semester II"}
    ]
  },

  laksh: {
    mon: [
      {start:"08:30", end:"09:30", subject:"HRM", room:"R27", teacher:"Nisha Devi"},
      {start:"09:30", end:"10:30", subject:"Company Law", room:"R1", teacher:"Abhishek"},
      {start:"10:30", end:"11:30", subject:"Break Gap"},
      {start:"11:30", end:"12:30", subject:"VAC - Vedic Maths", room:"R33", teacher:"Priyanka Modi"},
      {start:"13:30", end:"14:00", subject:"Lunch Break"},
      {start:"14:00", end:"15:00", subject:"SEC - Digital Marketing", room:"R18", teacher:"Tanisha"}
    ],
    tue: [
      {start:"08:30", end:"09:30", subject:"PME", room:"R35", teacher:"Kritika"},
      {start:"09:30", end:"10:30", subject:"EVS", room:"Library FF", teacher:"Franky Varah", tag:"lecture"},
      {start:"10:30", end:"11:30", subject:"Corporate Accounting", room:"R27", teacher:"Priya Chaurasia"},
      {start:"11:30", end:"12:30", subject:"Company Law", room:"R2", teacher:"Abhishek"}
    ],
    wed: [
      {start:"08:30", end:"09:30", subject:"PME", room:"R15", teacher:"Kritika"},
      {start:"09:30", end:"10:30", subject:"EVS", room:"SCR4", teacher:"EVSG1", tag:"practical"},
      {start:"10:30", end:"11:30", subject:"Tute Company Law", room:"T9", teacher:"Renu Aggarwal", tag:"tutorial"},
      {start:"11:30", end:"12:30", subject:"HRM", room:"R1", teacher:"Nisha Devi"},
      {start:"12:30", end:"13:30", subject:"Tute PME", room:"T24", teacher:"Anuradha"}
    ],
    thu: [
      {start:"08:30", end:"09:30", subject:"PME", room:"R15", teacher:"Kritika"},
      {start:"09:30", end:"10:30", subject:"Corporate Accounting", room:"R33", teacher:"Priya Chaurasia"},
      {start:"10:30", end:"11:30", subject:"EVS", room:"R30", teacher:"EVSG1", tag:"practical"},
      {start:"11:30", end:"12:30", subject:"Tute HRM", room:"T14", teacher:"Shashank"}
    ],
    fri: [
      {start:"08:30", end:"09:30", subject:"HRM", room:"R18", teacher:"Nisha Devi"},
      {start:"09:30", end:"10:30", subject:"Company Law", room:"R1", teacher:"Abhishek"},
      {start:"10:30", end:"11:30", subject:"Tute Corporate Accounting", room:"T36", teacher:"Saroj"},
      {start:"11:30", end:"12:30", subject:"Break"},
      {start:"12:30", end:"13:30", subject:"Corporate Accounting", room:"R1", teacher:"Priya Chaurasia"},
      {start:"13:30", end:"14:00", subject:"Lunch Break"},
      {start:"14:00", end:"15:00", subject:"VAC - Vedic Maths"}
    ],
    sat: []
  }
};

/* ---------- PART 3: DATA MIGRATION --- NEW CODE ---
   Converts legacy {time} items to {start, end}
   Runs on both DEFAULT_PROFILES and any loaded data.
   -------------------------------------------------- */
function migrateItem(item) {
  if (item.time && !item.start) {
    item.start = item.time;
    // derive end: start + 60 min
    const [h, m] = item.time.split(":").map(Number);
    const endMins = h * 60 + m + 60;
    item.end = `${String(Math.floor(endMins / 60)).padStart(2,"0")}:${String(endMins % 60).padStart(2,"0")}`;
    delete item.time;
  }
  return item;
}

function migrateProfiles(data) {
  for (const prof in data) {
    for (const day in data[prof]) {
      data[prof][day] = data[prof][day].map(migrateItem);
    }
  }
  return data;
}

/* ---------- STATE ---------- */

let currentProfile = "suhani";
let currentDay     = "mon";

/* --- PART 1: FULL STATE STORAGE --- UPDATED ---
   Load full saved state, or fall back to defaults.
   Also run migration in case saved data has old {time} keys.
   ------------------------------------------------ */
const FULL_DATA_KEY = "timetable_full_data";

let profiles = (() => {
  try {
    const saved = localStorage.getItem(FULL_DATA_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return migrateProfiles(parsed);
    }
  } catch (e) {
    console.warn("Could not load saved data, using defaults:", e);
  }
  return migrateProfiles(JSON.parse(JSON.stringify(DEFAULT_PROFILES)));
})();

/* ---------- MODAL STATE ---------- */
let modalDayKey    = null;
let modalItemIndex = null;
let isEditing      = false;
let originalValues = {};

/* ================================================
   HELPERS
   ================================================ */

function toMinutes(t) {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getNow() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

function getToday() {
  const days = ["sun","mon","tue","wed","thu","fri","sat"];
  return days[new Date().getDay()];
}

function formatTime(diff) {
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h > 0 && m > 0) return `${h} hr ${m} min`;
  if (h > 0) return `${h} hr`;
  return `${m} min`;
}

function getTag(item) {
  if (item.tag) return item.tag;
  const s = item.subject.toLowerCase();
  if (s.includes("break") || s.includes("lunch") || s.includes("gap")) return "break";
  if (s.includes("tut") || s.includes("tute")) return "tutorial";
  if (s.includes("practical")) return "tutorial";
  return "lecture";
}

function isValid(value) {
  return value && value !== "-" && value !== "undefined";
}

function isToday(day) {
  return day === getToday();
}

function formatDisplayTime(time) {
  const [h, m] = time.split(":").map(Number);
  const ampm   = h >= 12 ? "PM" : "AM";
  const h12    = h % 12 || 12;
  const mm     = m.toString().padStart(2, "0");
  return `${h12}:${mm}\n${ampm}`;
}

// Convert minutes-since-midnight → "3:45 PM"
function minsToDisplay(mins) {
  const h   = Math.floor(mins / 60);
  const m   = mins % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12  = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2,"0")} ${ampm}`;
}

/* --- NEW CODE: format start→end range for card display --- */
function formatTimeRange(start, end) {
  const fmt = (t) => {
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12  = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2,"0")}`;
  };
  const [, , ampm] = (() => {
    const [h] = end.split(":").map(Number);
    return [null, null, h >= 12 ? "PM" : "AM"];
  })();
  return `${fmt(start)}\n${fmt(end)} ${ampm}`;
}

const DAY_KEYS  = ["mon","tue","wed","thu","fri","sat"];
const DAY_NAMES = ["Mon","Tue","Wed","Thu","Fri","Sat"];

/* ================================================
   FEATURE 1 — NEXT COMMON FREE TIME
   --- UPDATED: uses item.start / item.end ---
   ================================================ */

function getBusyIntervals(profile, dayKey) {
  const dayData = profiles[profile][dayKey];
  if (!dayData) return [];
  return dayData
    .filter(item => getTag(item) !== "break")
    .map(item => {
      // --- UPDATED ---
      const s = toMinutes(item.start);
      const e = toMinutes(item.end);
      return [s, e];
    });
}

function hasClassesRemainingToday(profile, dayKey, nowMins) {
  const dayData = profiles[profile][dayKey];
  if (!dayData) return false;
  // --- UPDATED: use item.end ---
  return dayData.some(item => {
    if (getTag(item) === "break") return false;
    return toMinutes(item.end) > nowMins;
  });
}

function findNextCommonFreeTime() {
  const today    = getToday();
  const todayIdx = DAY_KEYS.indexOf(today);
  if (todayIdx === -1) return null;

  const now = getNow();

  const suhaniHasMore = hasClassesRemainingToday("suhani", today, now);
  const lakshHasMore  = hasClassesRemainingToday("laksh",  today, now);

  if (!suhaniHasMore && !lakshHasMore) return null;

  for (let offset = 0; offset < 7; offset++) {
    const dayIdx       = (todayIdx + offset) % DAY_KEYS.length;
    const dayKey       = DAY_KEYS[dayIdx];
    const isCurrentDay = (offset === 0);

    const sIntervals = getBusyIntervals("suhani", dayKey);
    const lIntervals = getBusyIntervals("laksh",  dayKey);

    const busySet = new Set();
    [...sIntervals, ...lIntervals].forEach(([s, e]) => {
      for (let m = s; m < e; m++) busySet.add(m);
    });

    const startMin = isCurrentDay ? now : 8 * 60;
    const endMin   = 22 * 60;

    for (let m = startMin; m <= endMin; m++) {
      if (!busySet.has(m) && m >= 8 * 60) {
        const dayLabel = offset === 0
          ? "Today"
          : offset === 1
            ? "Tomorrow"
            : DAY_NAMES[dayIdx];
        return `${dayLabel} at ${minsToDisplay(m)}`;
      }
    }
  }

  return "No overlap found this week";
}

function updateFreeTimeDisplay() {
  const row  = document.getElementById("freeTimeRow");
  const text = document.getElementById("freeTimeText");
  if (!row || !text) return;

  const result = findNextCommonFreeTime();

  if (result === null) {
    row.style.display = "none";
  } else {
    row.style.display = "flex";
    text.textContent  = `Next common free time: ${result}`;
  }
}

/* ================================================
   PROFILE SWITCH
   ================================================ */

function switchProfile(profile, btn) {
  currentProfile = profile;
  localStorage.setItem("timetable_profile", profile);

  document.querySelectorAll(".profile-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.body.className = `theme-${profile}`;

  const avatar  = document.getElementById("header-avatar");
  const title   = document.getElementById("header-title");

  if (profile === "suhani") {
    avatar.src        = "https://i.pinimg.com/564x/02/a9/55/02a9551d5605cfb4a3f2ae976905f09e.jpg";
    title.innerHTML   = "Suhani's<br>Timetable";
  } else {
    avatar.src        = "https://i.pinimg.com/originals/f4/2a/f1/f42af16ba580f84430d39a5838ad0c70.jpg";
    title.innerHTML   = "Laksh's<br>Timetable";
  }

  const activeBtn = document.querySelector(`.tabs button[data-day="${currentDay}"]`);
  showDay(currentDay, activeBtn);
  updateBusySection();
}

/* ================================================
   MAIN RENDER
   --- UPDATED: uses item.start / item.end ---
   ================================================ */

function showDay(day, btn = null, direction = null) {
  currentDay = day;
  const container = document.getElementById("schedule");

  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const dayData      = profiles[currentProfile][day];
  const viewingToday = isToday(day);

  if (direction) {
    const outClass = direction === "left" ? "slide-out-left" : "slide-out-right";
    container.classList.add(outClass);

    setTimeout(() => {
      container.classList.remove(outClass);
      const inClass = direction === "left" ? "slide-in-left" : "slide-in-right";
      container.classList.add(inClass);
      renderSchedule(container, dayData, viewingToday, day);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.classList.remove(inClass);
        });
      });
    }, 200);
  } else {
    renderSchedule(container, dayData, viewingToday, day);
  }
}

function renderSchedule(container, dayData, viewingToday, day) {
  container.innerHTML = "";

  if (!dayData || dayData.length === 0) {
    container.innerHTML = `
      <div class="sleep">
        <span class="sleep-emoji">😴</span>
        <div class="sleep-title">Rest Day!</div>
        <div class="sleep-sub">No classes today. Shin-chan approves.</div>
      </div>`;
    updatePopup(null, day);
    return;
  }

  const now = getNow();
  let nextClassTime = null;
  let currentCardId = null;

  dayData.forEach((item, index) => {
    // --- UPDATED: use start/end ---
    const startMin    = toMinutes(item.start);
    const endMin      = toMinutes(item.end);
    const isCurrent   = viewingToday && (now >= startMin && now < endMin);
    const tag         = getTag(item);
    const isBreakCard = (tag === "break");
    const cardId      = `card-${index}`;

    // next upcoming class start
    if (viewingToday && startMin > now && nextClassTime === null) nextClassTime = startMin;
    if (isCurrent) currentCardId = cardId;

    const roomChip    = !isBreakCard && isValid(item.room)    ? `<div class="room">📍 ${item.room}</div>` : '';
    const teacherChip = !isBreakCard && isValid(item.teacher) ? `<div class="teacher">👤 ${item.teacher}</div>` : '';
    const bottomRow   = (roomChip || teacherChip) ? `<div class="bottomRow">${roomChip}${teacherChip}</div>` : '';

    const tagLabel = isCurrent ? 'live' : tag;
    const tagText  = isCurrent ? '🔴 LIVE' : tag.toUpperCase();
    const extraClass = isBreakCard ? ' break-card' : '';

    // --- UPDATED: progress uses actual duration ---
    let progressHTML = '';
    if (isCurrent) {
      const elapsed  = now - startMin;
      const duration = endMin - startMin || 60;
      const pct      = Math.min(100, Math.max(0, (elapsed / duration) * 100));
      const progressColor = currentProfile === "suhani"
        ? `rgba(76,122,255,0.22)`
        : `rgba(201,168,76,0.2)`;
      const gradient = `linear-gradient(90deg,
        ${progressColor} 0%,
        ${progressColor} ${pct}%,
        rgba(255,255,255,0.0) ${pct}%,
        rgba(255,255,255,0.0) 100%)`;
      progressHTML = `<div class="progress-overlay" style="background:${gradient};"></div>`;
    }

    const liveCharSrc = currentProfile === "suhani"
      ? "https://media.tenor.com/oajbons5PGEAAAAC/shinchan-cute.gif"
      : "https://i.pinimg.com/originals/f4/2a/f1/f42af16ba580f84430d39a5838ad0c70.jpg";
    const charHTML = isCurrent
      ? `<div class="shinchan-live"><img src="${liveCharSrc}" alt="character"></div>`
      : '';

    // --- UPDATED: show start→end range on card ---
    const timeDisplay = formatTimeRange(item.start, item.end);

    container.innerHTML += `
      <div id="${cardId}" class="card${isCurrent ? ' current' : ''}${extraClass}"
           onclick="openModal('${day}', ${index})">
        ${progressHTML}
        <div class="time">${timeDisplay}</div>
        <div class="divider"></div>
        <div class="content">
          <div class="subject">${item.subject}</div>
          ${bottomRow}
        </div>
        <div class="tag ${tagLabel}">${tagText}</div>
        ${charHTML}
      </div>
    `;
  });

  if (currentCardId) {
    const el = document.getElementById(currentCardId);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
  }

  updatePopup(nextClassTime, day);
}

/* ================================================
   POPUP
   --- UPDATED: uses item.start ---
   ================================================ */

function updatePopup(nextClassTime, day) {
  const popup = document.getElementById("nextClassPopup");
  const text  = popup.querySelector(".popup-text");
  const icon  = popup.querySelector(".popup-icon");
  const viewingToday = isToday(day);

  if (viewingToday) {
    if (nextClassTime !== null) {
      const diff = nextClassTime - getNow();
      text.textContent = `Next class in ${formatTime(diff)}`;
      icon.textContent = "⏳";
    } else {
      text.textContent = "No more classes today!";
      icon.textContent = "🎉";
    }
  } else {
    const dayData = profiles[currentProfile][day];
    if (dayData && dayData.length > 0) {
      // --- UPDATED: use item.start ---
      const firstClass = dayData.find(item => getTag(item) !== "break");
      if (firstClass) {
        text.textContent = `First class at ${formatDisplayTime(firstClass.start).replace('\n', ' ')}`;
        icon.textContent = "📅";
      } else {
        text.textContent = "No classes this day";
        icon.textContent = "😴";
      }
    } else {
      text.textContent = "No classes this day";
      icon.textContent = "😴";
    }
  }
}

/* ================================================
   WHO'S BUSY
   --- UPDATED: uses item.start / item.end ---
   ================================================ */

function updateBusySection() {
  const today = getToday();
  const now   = getNow();

  const check = (profile) => {
    const dayData = profiles[profile][today];
    if (!dayData) return null;
    for (const item of dayData) {
      // --- UPDATED ---
      const s = toMinutes(item.start);
      const e = toMinutes(item.end);
      if (now >= s && now < e && getTag(item) !== "break") {
        return item.subject;
      }
    }
    return null;
  };

  const suhaniClass = check("suhani");
  const lakshClass  = check("laksh");

  document.getElementById("indicatorSuhani").textContent =
    suhaniClass ? `🔴 In Class – ${suhaniClass}` : "🟢 Free";
  document.getElementById("indicatorLaksh").textContent  =
    lakshClass  ? `🔴 In Class – ${lakshClass}`  : "🟢 Free";

  const sum = document.getElementById("busySummary");
  if (suhaniClass && lakshClass)        sum.textContent = "Both are in class right now 📚";
  else if (!suhaniClass && !lakshClass) sum.textContent = "Both are free right now 🎉";
  else                                  sum.textContent = "";

  updateFreeTimeDisplay();
}

/* ================================================
   FEATURE 3: SWIPE BETWEEN DAYS
   ================================================ */

(function initSwipe() {
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping   = false;
  const THRESHOLD = 50;

  const wrapper = document.getElementById("scheduleWrapper") || document.querySelector("main");

  wrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping   = false;
  }, { passive: true });

  wrapper.addEventListener("touchmove", (e) => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) + 10) {
      isSwiping = true;
    }
  }, { passive: true });

  wrapper.addEventListener("touchend", (e) => {
    if (!isSwiping) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < THRESHOLD) return;

    const currentIdx = DAY_KEYS.indexOf(currentDay);
    if (dx < 0) {
      const nextIdx = (currentIdx + 1) % DAY_KEYS.length;
      const nextDay = DAY_KEYS[nextIdx];
      const btn = document.querySelector(`.tabs button[data-day="${nextDay}"]`);
      showDay(nextDay, btn, "left");
    } else {
      const prevIdx = (currentIdx - 1 + DAY_KEYS.length) % DAY_KEYS.length;
      const prevDay = DAY_KEYS[prevIdx];
      const btn = document.querySelector(`.tabs button[data-day="${prevDay}"]`);
      showDay(prevDay, btn, "right");
    }
    isSwiping = false;
  }, { passive: true });
})();

/* ================================================
   FEATURE 4: EDITABLE SCHEDULE + LOCALSTORAGE
   --- PART 1: FULL STATE STORAGE --- UPDATED ---
   ================================================ */

/* --- UPDATED: Save full profiles state (no diff) --- */
function saveEditsToStorage() {
  try {
    localStorage.setItem(FULL_DATA_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.warn("Could not save data:", e);
  }
}

/* ---- Modal open/close ---- */

/* --- UPDATED: PART 6 — populate start/end fields --- */
function openModal(dayKey, itemIndex) {
  const item = profiles[currentProfile][dayKey][itemIndex];
  if (!item) return;

  modalDayKey    = dayKey;
  modalItemIndex = itemIndex;
  isEditing      = false;

  // Normalize break card data
  const tag = getTag(item);
  if (tag === "break") {
    item.subject = "Break";
    item.room    = "";
    item.teacher = "";
  }

  document.getElementById("edit-subject").value = item.subject || "";
  // --- UPDATED: use start/end ---
  document.getElementById("edit-start").value   = item.start   || "";
  document.getElementById("edit-end").value     = item.end     || "";
  document.getElementById("edit-room").value    = item.room    || "";
  document.getElementById("edit-teacher").value = item.teacher || "";

  const validTags = ["lecture", "tutorial", "break"];
  document.getElementById("editTag").value = validTags.includes(tag) ? tag : "lecture";

  updateModalBreakState(tag === "break", true);

  setReadonly(true);

  document.getElementById("editToggleBtn").style.display = "";
  document.getElementById("saveBtn").style.display       = "none";
  document.getElementById("cancelBtn").style.display     = "none";
  document.getElementById("modalHint").textContent       = "";

  const overlay = document.getElementById("editModal");
  overlay.style.display = "flex";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("open", "visible"));
  });
}

function closeModal() {
  const overlay = document.getElementById("editModal");
  overlay.classList.remove("visible");
  setTimeout(() => {
    overlay.classList.remove("open");
    overlay.style.display = "none";
    isEditing = false;
  }, 250);
}

function handleModalOverlayClick(e) {
  if (e.target === document.getElementById("editModal")) closeModal();
}

/* --- UPDATED: include edit-start / edit-end --- */
function setReadonly(val) {
  ["edit-subject","edit-start","edit-end","edit-room","edit-teacher"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (val) el.setAttribute("readonly", true);
    else     el.removeAttribute("readonly");
  });
  const tagSel = document.getElementById("editTag");
  if (tagSel) tagSel.disabled = val;
}

function updateModalBreakState(isBreak, readonly) {
  const roomField    = document.getElementById("edit-room").closest(".modal-field");
  const teacherField = document.getElementById("edit-teacher").closest(".modal-field");
  const subjectEl    = document.getElementById("edit-subject");
  if (isBreak) {
    roomField.style.display    = "none";
    teacherField.style.display = "none";
    subjectEl.classList.add("break-locked");
  } else {
    roomField.style.display    = "";
    teacherField.style.display = "";
    subjectEl.classList.remove("break-locked");
    if (!readonly) {
      document.getElementById("edit-room").removeAttribute("readonly");
      document.getElementById("edit-teacher").removeAttribute("readonly");
    }
  }
}

function onTagChange() {
  if (!isEditing) return;
  const isBreak = document.getElementById("editTag").value === "break";
  updateModalBreakState(isBreak, false);
  if (isBreak) {
    document.getElementById("edit-subject").value = "Break";
    document.getElementById("edit-room").value    = "";
    document.getElementById("edit-teacher").value = "";
    document.getElementById("edit-subject").setAttribute("readonly", true);
  } else {
    const subjectEl = document.getElementById("edit-subject");
    subjectEl.removeAttribute("readonly");
    if (subjectEl.value === "Break") subjectEl.value = "";
    subjectEl.focus();
  }
}

/* --- UPDATED: store start/end in originalValues --- */
function toggleEdit() {
  isEditing = true;
  originalValues = {
    subject: document.getElementById("edit-subject").value,
    start:   document.getElementById("edit-start").value,
    end:     document.getElementById("edit-end").value,
    room:    document.getElementById("edit-room").value,
    teacher: document.getElementById("edit-teacher").value,
    tag:     document.getElementById("editTag").value,
  };
  setReadonly(false);
  const isBreak = document.getElementById("editTag").value === "break";
  updateModalBreakState(isBreak, false);
  if (isBreak) {
    document.getElementById("edit-subject").setAttribute("readonly", true);
  }
  document.getElementById("editToggleBtn").style.display = "none";
  document.getElementById("saveBtn").style.display       = "";
  document.getElementById("cancelBtn").style.display     = "";
  document.getElementById(isBreak ? "edit-start" : "edit-subject").focus();
}

/* --- UPDATED: restore start/end on cancel --- */
function cancelEdit() {
  document.getElementById("edit-subject").value = originalValues.subject;
  document.getElementById("edit-start").value   = originalValues.start;
  document.getElementById("edit-end").value     = originalValues.end;
  document.getElementById("edit-room").value    = originalValues.room;
  document.getElementById("edit-teacher").value = originalValues.teacher;
  document.getElementById("editTag").value      = originalValues.tag || "lecture";
  const isBreak = (originalValues.tag === "break");
  updateModalBreakState(isBreak, true);
  setReadonly(true);
  isEditing = false;
  document.getElementById("editToggleBtn").style.display = "";
  document.getElementById("saveBtn").style.display       = "none";
  document.getElementById("cancelBtn").style.display     = "none";
  document.getElementById("modalHint").textContent       = "";
}

/* --- UPDATED PART 6: save start/end + PART 7: sort by start --- */
function saveEdit() {
  const hint    = document.getElementById("modalHint");
  const tag     = document.getElementById("editTag").value;
  const isBreak = (tag === "break");

  const subject = isBreak
    ? "Break"
    : document.getElementById("edit-subject").value.trim();
  // --- UPDATED ---
  const start   = document.getElementById("edit-start").value.trim();
  const end     = document.getElementById("edit-end").value.trim();
  const room    = isBreak ? "" : document.getElementById("edit-room").value.trim();
  const teacher = isBreak ? "" : document.getElementById("edit-teacher").value.trim();

  // Validation
  if (!isBreak && !subject) {
    hint.textContent = "Subject cannot be empty.";
    return;
  }
  const timeRe = /^\d{1,2}:\d{2}$/;
  if (!timeRe.test(start)) {
    hint.textContent = "Start time must be in HH:MM format (e.g. 10:45).";
    return;
  }
  if (!timeRe.test(end)) {
    hint.textContent = "End time must be in HH:MM format (e.g. 11:45).";
    return;
  }
  // --- PART 6: end must be > start ---
  if (toMinutes(end) <= toMinutes(start)) {
    hint.textContent = "End time must be after start time.";
    return;
  }
  hint.textContent = "";

  const item = profiles[currentProfile][modalDayKey][modalItemIndex];

  item.subject = subject;
  // --- UPDATED ---
  item.start   = start;
  item.end     = end;
  item.tag     = tag;

  if (isBreak) {
    item.room    = "";
    item.teacher = "";
  } else {
    if (room)    item.room    = room;    else delete item.room;
    if (teacher) item.teacher = teacher; else delete item.teacher;
  }

  // --- PART 7: Sort by item.start ---
  profiles[currentProfile][modalDayKey].sort((a, b) => {
    return toMinutes(a.start) - toMinutes(b.start);
  });

  saveEditsToStorage();

  const activeBtn = document.querySelector(`.tabs button[data-day="${currentDay}"]`);
  showDay(currentDay, activeBtn);

  closeModal();
}

/* ================================================
   AUTO LOAD + INTERVALS
   ================================================ */

window.onload = () => {
  const saved = localStorage.getItem("timetable_profile");
  if (saved && profiles[saved]) {
    currentProfile = saved;
    document.body.className = `theme-${currentProfile}`;
    const profBtn = document.getElementById(`btn-${currentProfile}`);
    if (profBtn) {
      document.querySelectorAll(".profile-btn").forEach(b => b.classList.remove("active"));
      profBtn.classList.add("active");
    }
    const avatar = document.getElementById("header-avatar");
    const title  = document.getElementById("header-title");
    if (currentProfile === "laksh") {
      avatar.src      = "https://i.pinimg.com/originals/f4/2a/f1/f42af16ba580f84430d39a5838ad0c70.jpg";
      title.innerHTML = "Laksh's<br>Timetable";
    }
  }

  const today    = getToday();
  const todayBtn = document.querySelector(`.tabs button[data-day="${today}"]`);
  if (!todayBtn) {
    const monBtn = document.querySelector(`.tabs button[data-day="mon"]`);
    showDay("mon", monBtn);
  } else {
    showDay(today, todayBtn);
  }

  updateBusySection();

  // Refresh every 60s
  setInterval(() => {
    const activeBtn = document.querySelector(".tabs button.active");
    if (activeBtn) {
      const day     = activeBtn.dataset.day;
      const dayData = profiles[currentProfile][day];
      if (!dayData) return;
      const now = getNow();
      let nextClassTime = null;
      if (isToday(day)) {
        dayData.forEach(item => {
          // --- UPDATED: use item.start ---
          const t = toMinutes(item.start);
          if (t > now && nextClassTime === null) nextClassTime = t;
        });
      }
      updatePopup(nextClassTime, day);
    }
    updateBusySection();
  }, 60000);
};
