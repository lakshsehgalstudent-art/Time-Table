/* ===================================================
   MULTI-PROFILE TIMETABLE — script.js
   =================================================== */

/* ---------- DATA ---------- */

const DEFAULT_PROFILES = {

  suhani: {
    mon: [
      {time:"10:45", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
      {time:"11:45", subject:"Corporate Accounting", room:"R301", teacher:"Devendra Malapati"},
      {time:"12:45", subject:"Lunch Break"},
      {time:"13:05", subject:"GE II", room:"Th321", teacher:"Drishti Joshi"},
      {time:"14:05", subject:"EVS", room:"R216"},
      {time:"15:05", subject:"EVS", room:"R216"}
    ],
    tue: [
      {time:"10:45", subject:"Claw Tutorial G1", room:"R205", teacher:"Sindhu Mani"},
      {time:"11:45", subject:"HRM Tutorial G1", room:"R202", teacher:"Sunita Chhabra"},
      {time:"12:45", subject:"Lunch Break"},
      {time:"13:05", subject:"Corporate Accounting", room:"R202", teacher:"Devendra Malapati"},
      {time:"14:05", subject:"Company Law", room:"R202", teacher:"Sindhu Mani"},
      {time:"15:05", subject:"VAC Semester II"},
      {time:"16:05", subject:"VAC Semester II"}
    ],
    wed: [
      {time:"08:45", subject:"GE II", room:"Th321", teacher:"Drishti Joshi"},
      {time:"09:45", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
      {time:"10:45", subject:"Company Law", room:"R219", teacher:"Sindhu Mani"},
      {time:"11:45", subject:"Company Law Tutorial G2", room:"R205", teacher:"Sindhu Mani"},
      {time:"12:45", subject:"Lunch Break"},
      {time:"13:05", subject:"HRM Tutorial G2", room:"R207", teacher:"Sunita Chhabra"}
    ],
    thu: [
      {time:"08:45", subject:"EVS", room:"R202"},
      {time:"09:45", subject:"HRM", room:"R202", teacher:"Sunita Chhabra"},
      {time:"10:45", subject:"Corporate Accounting Tutorial", room:"R207", teacher:"P. Chengarayulu"},
      {time:"11:45", subject:"HRM Tutorial G3", room:"R207", teacher:"Sunita Chhabra"},
      {time:"12:45", subject:"Lunch Break"},
      {time:"13:05", subject:"Corporate Accounting Tutorial", teacher:"P. Chengarayulu"}
    ],
    fri: [
      {time:"08:45", subject:"Corporate Accounting", room:"R201", teacher:"Devendra Malapati"},
      {time:"09:45", subject:"Break"},
      {time:"10:45", subject:"Company Law Tutorial G3", room:"R205", teacher:"Sindhu Mani"},
      {time:"11:45", subject:"Company Law", room:"R321", teacher:"Sindhu Mani"},
      {time:"12:45", subject:"Lunch Break"},
      {time:"13:05", subject:"GE II Practical"},
      {time:"14:05", subject:"GE II Practical"},
      {time:"15:05", subject:"GE II Practical"}
    ],
    sat: [
      {time:"08:45", subject:"SEC Semester II"},
      {time:"09:45", subject:"SEC Semester II"},
      {time:"10:45", subject:"SEC Semester II"},
      {time:"11:45", subject:"SEC Semester II"},
      {time:"12:45", subject:"Lunch Break"},
      {time:"13:05", subject:"VAC Semester II"},
      {time:"14:05", subject:"VAC Semester II"},
      {time:"15:05", subject:"AEC Semester II"},
      {time:"16:05", subject:"AEC Semester II"}
    ]
  },

  laksh: {
    mon: [
      {time:"08:30", subject:"HRM", room:"R27", teacher:"Nisha Devi"},
      {time:"09:30", subject:"Company Law", room:"R1", teacher:"Abhishek"},
      {time:"10:30", subject:"Break Gap"},
      {time:"11:30", subject:"VAC - Vedic Maths", room:"R33", teacher:"Priyanka Modi"},
      {time:"13:30", subject:"Lunch Break"},
      {time:"14:00", subject:"SEC - Digital Marketing", room:"R18", teacher:"Tanisha"}
    ],
    tue: [
      {time:"08:30", subject:"PME", room:"R35", teacher:"Kritika"},
      {time:"09:30", subject:"EVS", room:"Library FF", teacher:"Franky Varah", tag:"lecture"},
      {time:"10:30", subject:"Corporate Accounting", room:"R27", teacher:"Priya Chaurasia"},
      {time:"11:30", subject:"Company Law", room:"R2", teacher:"Abhishek"}
    ],
    wed: [
      {time:"08:30", subject:"PME", room:"R15", teacher:"Kritika"},
      {time:"09:30", subject:"EVS", room:"SCR4", teacher:"EVSG1", tag:"practical"},
      {time:"10:30", subject:"Tute Company Law", room:"T9", teacher:"Renu Aggarwal", tag:"tutorial"},
      {time:"11:30", subject:"HRM", room:"R1", teacher:"Nisha Devi"},
      {time:"12:30", subject:"Tute PME", room:"T24", teacher:"Anuradha"}
    ],
    thu: [
      {time:"08:30", subject:"PME", room:"R15", teacher:"Kritika"},
      {time:"09:30", subject:"Corporate Accounting", room:"R33", teacher:"Priya Chaurasia"},
      {time:"10:30", subject:"EVS", room:"R30", teacher:"EVSG1", tag:"practical"},
      {time:"11:30", subject:"Tute HRM", room:"T14", teacher:"Shashank"}
    ],
    fri: [
      {time:"08:30", subject:"HRM", room:"R18", teacher:"Nisha Devi"},
      {time:"09:30", subject:"Company Law", room:"R1", teacher:"Abhishek"},
      {time:"10:30", subject:"Tute Corporate Accounting", room:"T36", teacher:"Saroj"},
      {time:"11:30", subject:"Break"},
      {time:"12:30", subject:"Corporate Accounting", room:"R1", teacher:"Priya Chaurasia"},
      {time:"13:30", subject:"Lunch Break"},
      {time:"14:00", subject:"VAC - Vedic Maths"}
    ],
    sat: []
  }
};

/* ---------- STATE ---------- */

let currentProfile = "suhani";
let currentDay     = "mon";

// Deep-clone defaults, then overlay localStorage edits
let profiles = JSON.parse(JSON.stringify(DEFAULT_PROFILES));
loadEditsFromStorage();

/* ---------- MODAL STATE ---------- */
let modalDayKey    = null;
let modalItemIndex = null;
let isEditing      = false;
let originalValues = {};

/* ================================================
   HELPERS
   ================================================ */

function toMinutes(t) {
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

const DAY_KEYS  = ["mon","tue","wed","thu","fri","sat"];
const DAY_NAMES = ["Mon","Tue","Wed","Thu","Fri","Sat"];

/* ================================================
   FEATURE 1 — FIXED: NEXT COMMON FREE TIME
   ================================================ */

/**
 * Returns all "busy" intervals (as [startMin, endMin]) for a given profile/day.
 * A slot is busy if it's NOT a break.
 * Duration assumed: 60 min per slot.
 */
function getBusyIntervals(profile, dayKey) {
  const dayData = profiles[profile][dayKey];
  if (!dayData) return [];
  return dayData
    .filter(item => getTag(item) !== "break")
    .map(item => {
      const start = toMinutes(item.time);
      return [start, start + 60];
    });
}

/**
 * Check if a profile has any more classes remaining today after `nowMins`.
 * Returns true if there are classes still ahead.
 */
function hasClassesRemainingToday(profile, dayKey, nowMins) {
  const dayData = profiles[profile][dayKey];
  if (!dayData) return false;
  return dayData.some(item => {
    if (getTag(item) === "break") return false;
    const end = toMinutes(item.time) + 60;
    return end > nowMins;
  });
}

/**
 * FIXED: findNextCommonFreeTime
 *
 * CASE 1: Both users have NO more classes today
 *   → return null  (caller hides the row)
 *
 * CASE 2: One or both still have classes left today
 *   → return "Today at X:XX AM/PM" for the next shared free window
 *
 * CASE 3: No overlap found today
 *   → return "Tomorrow at X:XX AM/PM" (or day name)
 */
function findNextCommonFreeTime() {
  const today    = getToday();
  const todayIdx = DAY_KEYS.indexOf(today);
  if (todayIdx === -1) return null; // Sunday — hide row

  const now = getNow();

  // CASE 1: Check if both have zero classes remaining today
  const suhaniHasMore = hasClassesRemainingToday("suhani", today, now);
  const lakshHasMore  = hasClassesRemainingToday("laksh",  today, now);

  if (!suhaniHasMore && !lakshHasMore) {
    // Both are already done for the day → hide the free-time row
    return null;
  }

  // CASE 2 / 3: Find next window where both are free
  for (let offset = 0; offset < 7; offset++) {
    const dayIdx      = (todayIdx + offset) % DAY_KEYS.length;
    const dayKey      = DAY_KEYS[dayIdx];
    const isCurrentDay = (offset === 0);

    const sIntervals = getBusyIntervals("suhani", dayKey);
    const lIntervals = getBusyIntervals("laksh",  dayKey);

    // Build combined busy set for this day
    const busySet = new Set();
    [...sIntervals, ...lIntervals].forEach(([s, e]) => {
      for (let m = s; m < e; m++) busySet.add(m);
    });

    // Start scanning from current minute (today) or 8 AM (other days)
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

/**
 * UPDATED: updateFreeTimeDisplay
 * Hides the row completely when both are already free for the rest of today.
 */
function updateFreeTimeDisplay() {
  const row  = document.getElementById("freeTimeRow");
  const text = document.getElementById("freeTimeText");
  if (!row || !text) return;

  const result = findNextCommonFreeTime();

  if (result === null) {
    // CASE 1: collapse the row with no layout gap
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
   ================================================ */

function showDay(day, btn = null, direction = null) {
  currentDay = day;
  const container = document.getElementById("schedule");

  // Update tab highlight
  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const dayData      = profiles[currentProfile][day];
  const viewingToday = isToday(day);

  /* ---- SWIPE TRANSITION ---- */
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
    const t           = toMinutes(item.time);
    const isCurrent   = viewingToday && (now >= t && now < t + 60);
    const tag         = getTag(item);
    const isBreakCard = (tag === "break");
    const cardId      = `card-${index}`;

    if (viewingToday && t > now && nextClassTime === null) nextClassTime = t;
    if (isCurrent) currentCardId = cardId;

    const roomChip    = isValid(item.room)    ? `<div class="room">📍 ${item.room}</div>` : '';
    const teacherChip = isValid(item.teacher) ? `<div class="teacher">👤 ${item.teacher}</div>` : '';
    const bottomRow   = (roomChip || teacherChip) ? `<div class="bottomRow">${roomChip}${teacherChip}</div>` : '';

    const tagLabel = isCurrent ? 'live' : tag;
    const tagText  = isCurrent ? '🔴 LIVE' : tag.toUpperCase();
    const extraClass = isBreakCard ? ' break-card' : '';

    let progressHTML = '';
    if (isCurrent) {
      const elapsed  = now - t;
      const pct      = Math.min(100, Math.max(0, (elapsed / 60) * 100));
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

    const timeDisplay = formatDisplayTime(item.time);

    const editIcon = !isBreakCard
      ? `<div class="edit-hint">✏️</div>`
      : '';

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
      const firstClass = dayData.find(item => getTag(item) !== "break");
      if (firstClass) {
        text.textContent = `First class at ${formatDisplayTime(firstClass.time).replace('\n', ' ')}`;
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
   ================================================ */

function updateBusySection() {
  const today = getToday();
  const now   = getNow();

  const check = (profile) => {
    const dayData = profiles[profile][today];
    if (!dayData) return null;
    for (const item of dayData) {
      const t = toMinutes(item.time);
      if (now >= t && now < t + 60 && getTag(item) !== "break") {
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
   ================================================ */

const EDIT_STORAGE_KEY = "timetable_edits_v1";

function loadEditsFromStorage() {
  try {
    const saved = localStorage.getItem(EDIT_STORAGE_KEY);
    if (!saved) return;
    const edits = JSON.parse(saved);
    for (const prof in edits) {
      for (const day in edits[prof]) {
        for (const idx in edits[prof][day]) {
          const i = parseInt(idx, 10);
          if (profiles[prof] && profiles[prof][day] && profiles[prof][day][i]) {
            Object.assign(profiles[prof][day][i], edits[prof][day][idx]);
          }
        }
      }
    }
  } catch (e) {
    console.warn("Could not load edits:", e);
  }
}

function saveEditsToStorage() {
  try {
    const edits = {};
    for (const prof in profiles) {
      for (const day in profiles[prof]) {
        const arr = profiles[prof][day];
        arr.forEach((item, idx) => {
          const def = DEFAULT_PROFILES[prof][day] && DEFAULT_PROFILES[prof][day][idx];
          if (!def) return;
          const diff = {};
          ["subject","time","room","teacher"].forEach(k => {
            if ((item[k] || "") !== (def[k] || "")) diff[k] = item[k];
          });
          if (Object.keys(diff).length > 0) {
            if (!edits[prof]) edits[prof] = {};
            if (!edits[prof][day]) edits[prof][day] = {};
            edits[prof][day][idx] = diff;
          }
        });
      }
    }
    localStorage.setItem(EDIT_STORAGE_KEY, JSON.stringify(edits));
  } catch (e) {
    console.warn("Could not save edits:", e);
  }
}

/* ---- Modal open/close ---- */

function openModal(dayKey, itemIndex) {
  const item = profiles[currentProfile][dayKey][itemIndex];
  if (!item) return;

  if (getTag(item) === "break") return;

  modalDayKey    = dayKey;
  modalItemIndex = itemIndex;
  isEditing      = false;

  document.getElementById("edit-subject").value  = item.subject  || "";
  document.getElementById("edit-time").value     = item.time     || "";
  document.getElementById("edit-room").value     = item.room     || "";
  document.getElementById("edit-teacher").value  = item.teacher  || "";
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

/* FEATURE 3 FIX: fast 0.25s close */
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

function setReadonly(val) {
  ["edit-subject","edit-time","edit-room","edit-teacher"].forEach(id => {
    const el = document.getElementById(id);
    if (val) el.setAttribute("readonly", true);
    else     el.removeAttribute("readonly");
  });
}

function toggleEdit() {
  isEditing = true;
  originalValues = {
    subject: document.getElementById("edit-subject").value,
    time:    document.getElementById("edit-time").value,
    room:    document.getElementById("edit-room").value,
    teacher: document.getElementById("edit-teacher").value,
  };
  setReadonly(false);
  document.getElementById("editToggleBtn").style.display = "none";
  document.getElementById("saveBtn").style.display       = "";
  document.getElementById("cancelBtn").style.display     = "";
  document.getElementById("edit-subject").focus();
}

function cancelEdit() {
  document.getElementById("edit-subject").value = originalValues.subject;
  document.getElementById("edit-time").value    = originalValues.time;
  document.getElementById("edit-room").value    = originalValues.room;
  document.getElementById("edit-teacher").value = originalValues.teacher;
  setReadonly(true);
  isEditing = false;
  document.getElementById("editToggleBtn").style.display = "";
  document.getElementById("saveBtn").style.display       = "none";
  document.getElementById("cancelBtn").style.display     = "none";
  document.getElementById("modalHint").textContent       = "";
}

/* FEATURE 2 FIX: sort cards after save */
function saveEdit() {
  const hint    = document.getElementById("modalHint");
  const subject = document.getElementById("edit-subject").value.trim();
  const time    = document.getElementById("edit-time").value.trim();
  const room    = document.getElementById("edit-room").value.trim();
  const teacher = document.getElementById("edit-teacher").value.trim();

  if (!subject) {
    hint.textContent = "Subject cannot be empty.";
    return;
  }
  if (!/^\d{1,2}:\d{2}$/.test(time)) {
    hint.textContent = "Time must be in HH:MM format (e.g. 10:45).";
    return;
  }
  hint.textContent = "";

  // Apply to data
  const item     = profiles[currentProfile][modalDayKey][modalItemIndex];
  item.subject   = subject;
  item.time      = time;
  if (room)    item.room    = room;    else delete item.room;
  if (teacher) item.teacher = teacher; else delete item.teacher;

  // --- NEW: sort the day's schedule by time after edit ---
  profiles[currentProfile][modalDayKey].sort((a, b) => {
    return toMinutes(a.time) - toMinutes(b.time);
  });

  saveEditsToStorage();

  // Re-render current view (use active tab button)
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
          const t = toMinutes(item.time);
          if (t > now && nextClassTime === null) nextClassTime = t;
        });
      }
      updatePopup(nextClassTime, day);
    }
    updateBusySection();
  }, 60000);
};
