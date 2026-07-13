// ==========================================
// LIVE SECURITY CHALLENGES
// Rotates a new puzzle every visit / refresh
// ==========================================

const CHALLENGE_TYPES = ["grid", "slider", "sequence"];
let activeChallenge = null;
let challengeState = null;

document.addEventListener("DOMContentLoaded", () => {
    const session = typeof getActiveSession === "function" ? getActiveSession() : null;
    const signup = localStorage.getItem((typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "fccu_") + "signup_application");
    const next = sessionStorage.getItem((typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "fccu_") + "pending_verify_next");
    if (!session && !signup && next !== "signup-complete") {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("vfSubmit").addEventListener("click", submitChallenge);
    document.getElementById("vfNewChallenge").addEventListener("click", () => loadChallenge(true));
    document.getElementById("vfRefresh").addEventListener("click", () => loadChallenge(true));
    loadChallenge(true);
});

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function loadChallenge(forceNew) {
    document.getElementById("vfError").textContent = "";
    const last = sessionStorage.getItem("fccu_last_challenge_type");
    let pool = CHALLENGE_TYPES.filter(t => t !== last);
    if (!pool.length || !forceNew) pool = CHALLENGE_TYPES.slice();
    activeChallenge = rand(pool);
    sessionStorage.setItem("fccu_last_challenge_type", activeChallenge);

    if (activeChallenge === "grid") buildGridChallenge();
    else if (activeChallenge === "slider") buildSliderChallenge();
    else buildSequenceChallenge();
}

/* ── 1) Visual tile grid (dating-style select-all) ── */
function buildGridChallenge() {
    const targets = [
        { key: "blue", label: "blue shapes", match: c => c.color === "blue" },
        { key: "circle", label: "circles", match: c => c.shape === "circle" },
        { key: "warm", label: "warm colors (red or orange)", match: c => c.color === "red" || c.color === "orange" },
        { key: "square", label: "squares", match: c => c.shape === "square" },
        { key: "green", label: "green shapes", match: c => c.color === "green" }
    ];
    const target = rand(targets);
    const colors = {
        blue: ["#2563eb", "#1d4ed8", "#3b82f6"],
        red: ["#dc2626", "#ef4444", "#b91c1c"],
        orange: ["#ea580c", "#f97316", "#c2410c"],
        green: ["#059669", "#10b981", "#047857"],
        purple: ["#7c3aed", "#8b5cf6", "#6d28d9"],
        slate: ["#64748b", "#475569", "#334155"]
    };
    const shapes = ["circle", "square", "diamond"];
    const colorKeys = Object.keys(colors);

    const cells = [];
    // guarantee 3–4 matches
    const matchCount = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < 9; i++) {
        let color = rand(colorKeys);
        let shape = rand(shapes);
        if (i < matchCount) {
            if (target.key === "blue" || target.key === "green") color = target.key;
            else if (target.key === "warm") color = rand(["red", "orange"]);
            else if (target.key === "circle") shape = "circle";
            else if (target.key === "square") shape = "square";
        } else {
            // avoid accidental match where possible
            let guard = 0;
            do {
                color = rand(colorKeys);
                shape = rand(shapes);
                guard++;
            } while (target.match({ color, shape }) && guard < 8);
        }
        cells.push({ color, shape, fill: rand(colors[color]) });
    }
    const ordered = shuffle(cells);
    const answer = ordered.map((c, i) => target.match(c) ? i : -1).filter(i => i >= 0);

    challengeState = { type: "grid", answer: new Set(answer), selected: new Set() };

    document.getElementById("vfTitle").textContent = "Quick visual check";
    document.getElementById("vfSub").innerHTML = `Select all tiles that contain <strong>${target.label}</strong>. A new set appears every time.`;

    const stage = document.getElementById("vfStage");
    stage.innerHTML = `<div class="vf-grid" id="vfGrid"></div>`;
    const grid = document.getElementById("vfGrid");
    ordered.forEach((c, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "vf-cell";
        btn.style.background = `
            radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 40%),
            linear-gradient(145deg, ${c.fill}, ${shade(c.fill, -25)})`;
        btn.innerHTML = shapeSvg(c.shape);
        btn.addEventListener("click", () => {
            if (challengeState.selected.has(i)) {
                challengeState.selected.delete(i);
                btn.classList.remove("on");
            } else {
                challengeState.selected.add(i);
                btn.classList.add("on");
            }
        });
        grid.appendChild(btn);
    });
}

function shapeSvg(shape) {
    if (shape === "circle") {
        return `<svg viewBox="0 0 100 100" width="56%" height="56%" style="position:absolute;inset:0;margin:auto;opacity:0.95"><circle cx="50" cy="50" r="34" fill="rgba(255,255,255,0.92)"/></svg>`;
    }
    if (shape === "diamond") {
        return `<svg viewBox="0 0 100 100" width="56%" height="56%" style="position:absolute;inset:0;margin:auto"><polygon points="50,12 88,50 50,88 12,50" fill="rgba(255,255,255,0.92)"/></svg>`;
    }
    return `<svg viewBox="0 0 100 100" width="56%" height="56%" style="position:absolute;inset:0;margin:auto"><rect x="18" y="18" width="64" height="64" rx="8" fill="rgba(255,255,255,0.92)"/></svg>`;
}

function shade(hex, amt) {
    const n = hex.replace("#", "");
    const num = parseInt(n, 16);
    let r = Math.min(255, Math.max(0, (num >> 16) + amt));
    let g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
    let b = Math.min(255, Math.max(0, (num & 0xff) + amt));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* ── 2) Slide-to-fit puzzle ── */
function buildSliderChallenge() {
    const targetPct = 55 + Math.floor(Math.random() * 30); // 55–84%
    challengeState = { type: "slider", targetPct, value: 0, passed: false };

    document.getElementById("vfTitle").textContent = "Slide to verify";
    document.getElementById("vfSub").textContent = "Drag the piece into the highlighted slot — like matching a photo puzzle.";

    const stage = document.getElementById("vfStage");
    stage.innerHTML = `
        <div class="vf-slider-wrap">
            <div class="vf-slider-track" id="vfTrack">
                <div class="vf-slider-bg"></div>
                <div class="vf-slider-slot" id="vfSlot"></div>
                <div class="vf-slider-piece" id="vfPiece"></div>
            </div>
            <div class="vf-slider-bar" id="vfBar">
                <div class="vf-slider-fill" id="vfFill"></div>
                <div class="vf-slider-hint">Slide to fit the piece →</div>
                <div class="vf-slider-knob" id="vfKnob">⟫</div>
            </div>
        </div>`;

    requestAnimationFrame(() => {
        const track = document.getElementById("vfTrack");
        const slot = document.getElementById("vfSlot");
        const piece = document.getElementById("vfPiece");
        const maxX = track.clientWidth - 54 - 8;
        const targetX = (targetPct / 100) * maxX;
        slot.style.left = `${8 + targetX}px`;
        wireSlider(maxX, targetX);
    });
}

function wireSlider(maxX, targetX) {
    const knob = document.getElementById("vfKnob");
    const fill = document.getElementById("vfFill");
    const piece = document.getElementById("vfPiece");
    const bar = document.getElementById("vfBar");
    const hint = bar.querySelector(".vf-slider-hint");
    let dragging = false;

    const setPos = (clientX) => {
        const rect = bar.getBoundingClientRect();
        let x = clientX - rect.left - 20;
        x = Math.max(0, Math.min(x, rect.width - 40));
        const pct = x / (rect.width - 40);
        const pieceX = 8 + pct * maxX;
        knob.style.left = `${4 + x}px`;
        fill.style.width = `${40 + x}px`;
        piece.style.left = `${pieceX}px`;
        challengeState.value = pct * 100;
        hint.style.opacity = pct > 0.08 ? "0" : "1";

        const ok = Math.abs(pieceX - (8 + targetX)) <= 10;
        challengeState.passed = ok;
        piece.style.boxShadow = ok
            ? "0 0 0 3px rgba(16,185,129,0.7), 0 8px 20px rgba(0,0,0,0.35)"
            : "0 8px 20px rgba(0,0,0,0.35)";
    };

    const onDown = (e) => {
        dragging = true;
        knob.style.cursor = "grabbing";
        e.preventDefault();
    };
    const onMove = (e) => {
        if (!dragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setPos(clientX);
    };
    const onUp = () => {
        dragging = false;
        knob.style.cursor = "grab";
    };

    knob.addEventListener("mousedown", onDown);
    piece.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    knob.addEventListener("touchstart", onDown, { passive: false });
    piece.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
}

/* ── 3) Live memory sequence ── */
function buildSequenceChallenge() {
    const colors = [
        { name: "Ocean", bg: "#0b5cab" },
        { name: "Forest", bg: "#0f6b3c" },
        { name: "Amber", bg: "#d97706" },
        { name: "Slate", bg: "#334155" }
    ];
    const len = 3 + Math.floor(Math.random() * 2);
    const sequence = Array.from({ length: len }, () => Math.floor(Math.random() * 4));
    challengeState = {
        type: "sequence",
        sequence,
        input: [],
        listening: false,
        passed: false
    };

    document.getElementById("vfTitle").textContent = "Watch, then repeat";
    document.getElementById("vfSub").textContent = "A live pattern will flash. Tap the same order to prove you’re here.";

    const stage = document.getElementById("vfStage");
    stage.innerHTML = `
        <p class="vf-seq-status" id="vfSeqStatus">Get ready…</p>
        <div class="vf-seq-board" id="vfSeqBoard">
            ${colors.map((c, i) => `<button type="button" class="vf-seq-btn" data-i="${i}" style="background:${c.bg}">${c.name}</button>`).join("")}
        </div>`;

    const buttons = [...document.querySelectorAll(".vf-seq-btn")];
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (!challengeState.listening || challengeState.passed) return;
            const i = parseInt(btn.dataset.i, 10);
            flashBtn(btn);
            challengeState.input.push(i);
            const idx = challengeState.input.length - 1;
            if (challengeState.input[idx] !== challengeState.sequence[idx]) {
                document.getElementById("vfSeqStatus").textContent = "Missed it — watch again.";
                challengeState.input = [];
                challengeState.listening = false;
                setTimeout(() => playSequence(), 700);
                return;
            }
            if (challengeState.input.length === challengeState.sequence.length) {
                challengeState.passed = true;
                challengeState.listening = false;
                document.getElementById("vfSeqStatus").textContent = "Pattern matched. You can continue.";
                document.getElementById("vfSeqStatus").style.color = "#0f6b3c";
            } else {
                document.getElementById("vfSeqStatus").textContent = `Good — ${challengeState.input.length}/${challengeState.sequence.length}`;
            }
        });
    });

    setTimeout(() => playSequence(), 650);
}

function flashBtn(btn) {
    btn.classList.add("lit");
    setTimeout(() => btn.classList.remove("lit"), 280);
}

async function playSequence() {
    const status = document.getElementById("vfSeqStatus");
    const buttons = [...document.querySelectorAll(".vf-seq-btn")];
    challengeState.listening = false;
    challengeState.input = [];
    status.textContent = "Watch the pattern…";
    status.style.color = "#475569";
    await wait(400);
    for (const i of challengeState.sequence) {
        flashBtn(buttons[i]);
        await wait(520);
    }
    status.textContent = "Your turn — repeat the order.";
    challengeState.listening = true;
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function submitChallenge() {
    const err = document.getElementById("vfError");
    err.textContent = "";

    let ok = false;
    if (!challengeState) {
        err.textContent = "Challenge still loading. Try again.";
        return;
    }

    if (challengeState.type === "grid") {
        const a = challengeState.answer;
        const s = challengeState.selected;
        ok = a.size === s.size && [...a].every(i => s.has(i));
        if (!ok) err.textContent = "Not quite. Select every matching tile, or try a new challenge.";
    } else if (challengeState.type === "slider") {
        ok = !!challengeState.passed;
        if (!ok) err.textContent = "Slide the piece fully into the highlighted slot.";
    } else if (challengeState.type === "sequence") {
        ok = !!challengeState.passed;
        if (!ok) err.textContent = "Finish the live pattern first — or request a different challenge.";
    }

    if (!ok) {
        if (challengeState.type === "grid") loadChallenge(true);
        return;
    }

    if (typeof markHumanVerified === "function") markHumanVerified();
    const prefix = typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "fccu_";
    const next = sessionStorage.getItem(prefix + "pending_verify_next") || "home.html";
    sessionStorage.removeItem(prefix + "pending_verify_next");
    window.location.href = next === "signup-complete" ? "signup-done.html" : next;
}
