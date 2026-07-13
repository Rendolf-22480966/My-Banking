// ==========================================
// LIVE SECURITY CHALLENGES (reliable)
// New puzzle every visit — still passable
// ==========================================

const CHALLENGE_TYPES = ["grid", "slider", "sequence"];
let activeChallenge = null;
let challengeState = null;

document.addEventListener("DOMContentLoaded", () => {
    const prefix = typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "fccu_";
    const session = typeof getActiveSession === "function" ? getActiveSession() : null;
    const signup = localStorage.getItem(prefix + "signup_application");
    const next = sessionStorage.getItem(prefix + "pending_verify_next");

    if (!session && !signup && next !== "signup-complete") {
        // Recover pending next from localStorage backup
        const backupNext = localStorage.getItem(prefix + "pending_verify_next");
        if (!backupNext) {
            window.location.href = "login.html";
            return;
        }
        sessionStorage.setItem(prefix + "pending_verify_next", backupNext);
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
    let pool = CHALLENGE_TYPES.filter(t => forceNew && t !== last);
    if (!pool.length) pool = CHALLENGE_TYPES.slice();
    activeChallenge = rand(pool);
    sessionStorage.setItem("fccu_last_challenge_type", activeChallenge);

    if (activeChallenge === "grid") buildGridChallenge();
    else if (activeChallenge === "slider") buildSliderChallenge();
    else buildSequenceChallenge();
}

function buildGridChallenge() {
    const modes = [
        { label: "blue shapes", color: "blue" },
        { label: "green shapes", color: "green" },
        { label: "red shapes", color: "red" }
    ];
    const mode = rand(modes);
    const palette = {
        blue: "#2563eb",
        green: "#059669",
        red: "#dc2626",
        slate: "#64748b",
        purple: "#7c3aed",
        orange: "#ea580c"
    };
    const shapes = ["circle", "square", "diamond"];
    const matchIdx = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 3);
    const matchSet = new Set(matchIdx);

    const cells = Array.from({ length: 9 }, (_, i) => {
        if (matchSet.has(i)) {
            return { color: mode.color, shape: rand(shapes), fill: palette[mode.color], match: true };
        }
        const otherColors = Object.keys(palette).filter(c => c !== mode.color);
        const color = rand(otherColors);
        return { color, shape: rand(shapes), fill: palette[color], match: false };
    });

    challengeState = { type: "grid", answer: matchSet, selected: new Set() };

    document.getElementById("vfTitle").textContent = "Quick visual check";
    document.getElementById("vfSub").innerHTML = `Select all tiles with <strong>${mode.label}</strong>, then continue.`;

    const stage = document.getElementById("vfStage");
    stage.innerHTML = `<div class="vf-grid" id="vfGrid"></div>`;
    const grid = document.getElementById("vfGrid");

    cells.forEach((c, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "vf-cell";
        btn.setAttribute("aria-label", `${c.color} ${c.shape}`);
        btn.style.background = `linear-gradient(145deg, ${c.fill}, ${shade(c.fill, -28)})`;
        btn.innerHTML = shapeSvg(c.shape);
        btn.addEventListener("click", () => {
            if (challengeState.selected.has(i)) {
                challengeState.selected.delete(i);
                btn.classList.remove("on");
            } else {
                challengeState.selected.add(i);
                btn.classList.add("on");
            }
            document.getElementById("vfError").textContent = "";
        });
        grid.appendChild(btn);
    });
}

function shapeSvg(shape) {
    if (shape === "circle") {
        return `<svg viewBox="0 0 100 100" width="56%" height="56%" style="position:absolute;inset:0;margin:auto"><circle cx="50" cy="50" r="34" fill="rgba(255,255,255,0.92)"/></svg>`;
    }
    if (shape === "diamond") {
        return `<svg viewBox="0 0 100 100" width="56%" height="56%" style="position:absolute;inset:0;margin:auto"><polygon points="50,12 88,50 50,88 12,50" fill="rgba(255,255,255,0.92)"/></svg>`;
    }
    return `<svg viewBox="0 0 100 100" width="56%" height="56%" style="position:absolute;inset:0;margin:auto"><rect x="18" y="18" width="64" height="64" rx="8" fill="rgba(255,255,255,0.92)"/></svg>`;
}

function shade(hex, amt) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
    const b = Math.min(255, Math.max(0, (num & 0xff) + amt));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function buildSliderChallenge() {
    const targetPct = 60 + Math.floor(Math.random() * 25);
    challengeState = { type: "slider", targetPct, passed: false };

    document.getElementById("vfTitle").textContent = "Slide to verify";
    document.getElementById("vfSub").textContent = "Drag until the piece locks into the highlighted slot.";

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

    const init = () => {
        const track = document.getElementById("vfTrack");
        if (!track || track.clientWidth < 80) {
            setTimeout(init, 50);
            return;
        }
        const maxX = Math.max(40, track.clientWidth - 62);
        const targetX = (targetPct / 100) * maxX;
        document.getElementById("vfSlot").style.left = `${8 + targetX}px`;
        wireSlider(maxX, targetX);
    };
    requestAnimationFrame(() => requestAnimationFrame(init));
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
        const travel = Math.max(1, rect.width - 40);
        let x = clientX - rect.left - 20;
        x = Math.max(0, Math.min(x, travel));
        const pct = x / travel;
        const pieceX = 8 + pct * maxX;
        knob.style.left = `${4 + x}px`;
        fill.style.width = `${40 + x}px`;
        piece.style.left = `${pieceX}px`;
        hint.style.opacity = pct > 0.05 ? "0" : "1";
        const ok = Math.abs(pieceX - (8 + targetX)) <= 14;
        challengeState.passed = ok;
        piece.style.boxShadow = ok
            ? "0 0 0 3px rgba(16,185,129,0.75), 0 8px 20px rgba(0,0,0,0.35)"
            : "0 8px 20px rgba(0,0,0,0.35)";
        if (ok) document.getElementById("vfError").textContent = "";
    };

    const onDown = (e) => { dragging = true; e.preventDefault(); };
    const onMove = (e) => {
        if (!dragging) return;
        setPos(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const onUp = () => { dragging = false; };

    [knob, piece].forEach(el => {
        el.addEventListener("mousedown", onDown);
        el.addEventListener("touchstart", onDown, { passive: false });
    });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
}

function buildSequenceChallenge() {
    const colors = [
        { name: "Ocean", bg: "#0b5cab" },
        { name: "Forest", bg: "#0f6b3c" },
        { name: "Amber", bg: "#d97706" },
        { name: "Slate", bg: "#334155" }
    ];
    const sequence = Array.from({ length: 3 }, () => Math.floor(Math.random() * 4));
    challengeState = { type: "sequence", sequence, input: [], listening: false, passed: false };

    document.getElementById("vfTitle").textContent = "Watch, then repeat";
    document.getElementById("vfSub").textContent = "A short pattern will flash. Tap the same order.";

    document.getElementById("vfStage").innerHTML = `
        <p class="vf-seq-status" id="vfSeqStatus">Get ready…</p>
        <div class="vf-seq-board" id="vfSeqBoard">
            ${colors.map((c, i) => `<button type="button" class="vf-seq-btn" data-i="${i}" style="background:${c.bg}">${c.name}</button>`).join("")}
        </div>`;

    document.querySelectorAll(".vf-seq-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (!challengeState.listening || challengeState.passed) return;
            const i = parseInt(btn.dataset.i, 10);
            flashBtn(btn);
            challengeState.input.push(i);
            const idx = challengeState.input.length - 1;
            if (challengeState.input[idx] !== challengeState.sequence[idx]) {
                document.getElementById("vfSeqStatus").textContent = "Missed — watch again.";
                challengeState.input = [];
                challengeState.listening = false;
                setTimeout(() => playSequence(), 600);
                return;
            }
            if (challengeState.input.length === challengeState.sequence.length) {
                challengeState.passed = true;
                challengeState.listening = false;
                const s = document.getElementById("vfSeqStatus");
                s.textContent = "Matched — tap Verify and continue.";
                s.style.color = "#0f6b3c";
            } else {
                document.getElementById("vfSeqStatus").textContent =
                    `${challengeState.input.length}/${challengeState.sequence.length}`;
            }
        });
    });

    setTimeout(() => playSequence(), 500);
}

function flashBtn(btn) {
    btn.classList.add("lit");
    setTimeout(() => btn.classList.remove("lit"), 260);
}

async function playSequence() {
    const status = document.getElementById("vfSeqStatus");
    const buttons = [...document.querySelectorAll(".vf-seq-btn")];
    challengeState.listening = false;
    challengeState.input = [];
    status.textContent = "Watch the pattern…";
    status.style.color = "#475569";
    await wait(350);
    for (const i of challengeState.sequence) {
        flashBtn(buttons[i]);
        await wait(480);
    }
    status.textContent = "Your turn.";
    challengeState.listening = true;
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function finishVerified() {
    if (typeof markHumanVerified === "function") markHumanVerified();
    const prefix = typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "fccu_";
    const next = sessionStorage.getItem(prefix + "pending_verify_next")
        || localStorage.getItem(prefix + "pending_verify_next")
        || "home.html";
    sessionStorage.removeItem(prefix + "pending_verify_next");
    localStorage.removeItem(prefix + "pending_verify_next");
    window.location.href = next === "signup-complete" ? "signup-done.html" : next;
}

function submitChallenge() {
    const err = document.getElementById("vfError");
    err.textContent = "";
    if (!challengeState) {
        err.textContent = "Challenge still loading — try again.";
        return;
    }

    let ok = false;
    if (challengeState.type === "grid") {
        const a = challengeState.answer;
        const s = challengeState.selected;
        ok = a.size > 0 && a.size === s.size && [...a].every(i => s.has(i));
        if (!ok) err.textContent = "Select every matching tile, then continue.";
    } else if (challengeState.type === "slider") {
        ok = !!challengeState.passed;
        if (!ok) err.textContent = "Slide the piece into the highlighted slot until it glows green.";
    } else if (challengeState.type === "sequence") {
        ok = !!challengeState.passed;
        if (!ok) err.textContent = "Finish the pattern first, or try a different challenge.";
    }

    if (!ok) return;
    finishVerified();
}
