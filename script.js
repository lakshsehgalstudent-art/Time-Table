/* ===================================================
   MULTI-PROFILE TIMETABLE — script.js
   =================================================== */

/* ---------- DATA ---------- */

const profiles = {

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

let currentProfile = "suhani";
let currentDay     = "mon";

/* ---------- HELPERS ---------- */

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
  // Respect explicit tag override
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

/* ---------- PROFILE SWITCH ---------- */

function switchProfile(profile, btn) {
  currentProfile = profile;
  localStorage.setItem("timetable_profile", profile);

  // Update button states
  document.querySelectorAll(".profile-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // Update theme
  document.body.className = `theme-${profile}`;

  // Update header avatar + title
  const avatar = document.getElementById("header-avatar");
  const title  = document.getElementById("header-title");
  const peekImg = document.getElementById("peekImg");

  if (profile === "suhani") {
    avatar.src  = "https://i.pinimg.com/564x/02/a9/55/02a9551d5605cfb4a3f2ae976905f09e.jpg";
    title.innerHTML = "Suhani's<br>Timetable";
    peekImg.src = "https://media.tenor.com/YYkyc0OvkG0AAAAC/shinchan-anime.gif";
  } else {
    avatar.src  = "https://i.pinimg.com/originals/f4/2a/f1/f42af16ba580f84430d39a5838ad0c70.jpg";
    title.innerHTML = "Laksh's<br>Timetable";
    peekImg.src = "https://i.pinimg.com/originals/f4/2a/f1/f42af16ba580f84430d39a5838ad0c70.jpg";
  }

  // Re-render current day
  const activeBtn = document.querySelector(`.tabs button[data-day="${currentDay}"]`);
  showDay(currentDay, activeBtn);

  // Update busy section
  updateBusySection();
}

/* ---------- MAIN RENDER ---------- */

function showDay(day, btn = null) {
  currentDay = day;
  const container = document.getElementById("schedule");
  container.innerHTML = "";

  // Update active tab
  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const dayData  = profiles[currentProfile][day];
  const viewingToday = isToday(day);

  // Sunday / no data / empty sat
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
    const t      = toMinutes(item.time);
    // Only mark as live if viewing today
    const isCurrent = viewingToday && (now >= t && now < t + 60);
    const tag    = getTag(item);
    const isBreakCard = tag === "break";
    const cardId = `card-${index}`;

    // Track next class (only for today popup)
    if (viewingToday && t > now && nextClassTime === null) {
      nextClassTime = t;
    }

    if (isCurrent) currentCardId = cardId;

    // Build chips
    const roomChip    = isValid(item.room)    ? `<div class="room">📍 ${item.room}</div>` : '';
    const teacherChip = isValid(item.teacher) ? `<div class="teacher">👤 ${item.teacher}</div>` : '';
    const bottomRow   = (roomChip || teacherChip)
      ? `<div class="bottomRow">${roomChip}${teacherChip}</div>` : '';

    const tagLabel = isCurrent ? 'live' : tag;
    const tagText  = isCurrent ? '🔴 LIVE' : tag.toUpperCase();
    const extraClass = isBreakCard ? ' break-card' : '';

    // Live character animation on live card
    const liveCharSrc = currentProfile === "suhani"
      ? "https://media.tenor.com/oajbons5PGEAAAAC/shinchan-cute.gif"
      : "https://i.pinimg.com/originals/f4/2a/f1/f42af16ba580f84430d39a5838ad0c70.jpg";

    const charHTML = isCurrent
      ? `<div class="shinchan-live"><img src="${liveCharSrc}" alt="character"></div>`
      : '';

    // Format time display (replace space with newline for two-line display)
    const timeDisplay = formatDisplayTime(item.time);

    container.innerHTML += `
      <div id="${cardId}" class="card${isCurrent ? ' current' : ''}${extraClass}">
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

  // Scroll to live card
  if (currentCardId) {
    const el = document.getElementById(currentCardId);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    }
  }

  updatePopup(nextClassTime, day);
}

function formatDisplayTime(time) {
  const [h, m] = time.split(":").map(Number);
  const ampm   = h >= 12 ? "PM" : "AM";
  const h12    = h % 12 || 12;
  const mm     = m.toString().padStart(2, "0");
  return `${h12}:${mm}\n${ampm}`;
}

/* ---------- POPUP ---------- */

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
    // Future or past day — show first class timing relative info
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

/* ---------- WHO'S BUSY ---------- */

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

  const elS = document.getElementById("indicatorSuhani");
  const elL = document.getElementById("indicatorLaksh");
  const sum = document.getElementById("busySummary");

  elS.textContent = suhaniClass ? `🔴 In Class – ${suhaniClass}` : "🟢 Free";
  elL.textContent = lakshClass  ? `🔴 In Class – ${lakshClass}`  : "🟢 Free";

  if (suhaniClass && lakshClass) {
    sum.textContent = "Both are in class right now 📚";
  } else if (!suhaniClass && !lakshClass) {
    sum.textContent = "Both are free right now 🎉";
  } else {
    sum.textContent = "";
  }
}

/* ---------- AUTO LOAD ---------- */

window.onload = () => {
  // Restore saved profile
  const saved = localStorage.getItem("timetable_profile");
  if (saved && profiles[saved]) {
    currentProfile = saved;
    document.body.className = `theme-${currentProfile}`;
    const profBtn = document.getElementById(`btn-${currentProfile}`);
    if (profBtn) {
      document.querySelectorAll(".profile-btn").forEach(b => b.classList.remove("active"));
      profBtn.classList.add("active");
    }
    // Sync header
    const avatar  = document.getElementById("header-avatar");
    const title   = document.getElementById("header-title");
    const peekImg = document.getElementById("peekImg");
    if (currentProfile === "laksh") {
      avatar.src  = "https://i.pinimg.com/originals/f4/2a/f1/f42af16ba580f84430d39a5838ad0c70.jpg";
      title.innerHTML = "Laksh's<br>Timetable";
      peekImg.src = "https://i.pinimg.com/originals/f4/2a/f1/f42af16ba580f84430d39a5838ad0c70.jpg";
    }
  }

  // Open today's tab
  const today = getToday();
  const todayBtn = document.querySelector(`.tabs button[data-day="${today}"]`);

  // If Sunday, default to mon
  if (!todayBtn) {
    const monBtn = document.querySelector(`.tabs button[data-day="mon"]`);
    showDay("mon", monBtn);
  } else {
    showDay(today, todayBtn);
  }

  // Initial busy section
  updateBusySection();

  // Refresh popup + busy every 60 seconds
  setInterval(() => {
    const activeBtn = document.querySelector(".tabs button.active");
    if (activeBtn) {
      const day = activeBtn.dataset.day;
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
