// ==========================================
// FIRST CHOICE CREDIT UNION — LIVE ADVERT ENGINE
// Partner ads: mortgage, security, investment & more
// ==========================================

const PARTNER_ADS = [
    {
        id: "mortgage-liberty",
        category: "Mortgage",
        sponsor: "Liberty Home Mortgage",
        title: "Refinance & Save on Your Home Loan",
        subtitle: "Rates from 5.99% APR · Free consultation for FCCU members · Close in as little as 21 days.",
        cta: "Get a Quote",
        ctaAction: "partner",
        theme: "emerald",
        icon: "🏠"
    },
    {
        id: "mortgage-atlantic",
        category: "Mortgage",
        sponsor: "Atlantic Shore Lending",
        title: "First-Time Homebuyer Programs",
        subtitle: "Low down-payment options across Delaware · Pre-approval in minutes · Partner of First Choice CU.",
        cta: "Apply Today",
        ctaAction: "partner",
        theme: "gold",
        icon: "🔑"
    },
    {
        id: "security-shield",
        category: "Security",
        sponsor: "ShieldGuard Cyber",
        title: "Bank-Grade Identity Protection",
        subtitle: "24/7 dark-web monitoring, $1M insurance, and fraud recovery specialists for your family.",
        cta: "Protect Now",
        ctaAction: "security",
        theme: "blue",
        icon: "🛡️"
    },
    {
        id: "security-sentinel",
        category: "Security",
        sponsor: "Sentinel Home Security",
        title: "Smart Home & Business Alarms",
        subtitle: "Professional monitoring from $29.99/mo · FCCU members get first month free.",
        cta: "Learn More",
        ctaAction: "partner",
        theme: "dark",
        icon: "🔐"
    },
    {
        id: "invest-vanguard-style",
        category: "Investment",
        sponsor: "Harbor Peak Wealth",
        title: "Grow Wealth with Guided Investing",
        subtitle: "Portfolios built for retirement, college, and long-term goals · Fiduciary advisors · Low fees.",
        cta: "Start Investing",
        ctaAction: "partner",
        theme: "purple",
        icon: "📈"
    },
    {
        id: "invest-capital",
        category: "Investment",
        sponsor: "Milton Capital Partners",
        title: "Private Wealth & Brokerage",
        subtitle: "Stocks, bonds, ETFs, and IRAs — seamless transfers from your FCCU checking account.",
        cta: "Open Account",
        ctaAction: "partner",
        theme: "gold",
        icon: "💼"
    },
    {
        id: "insurance-state",
        category: "Insurance",
        sponsor: "Coastal Shield Insurance",
        title: "Home, Auto & Life Coverage",
        subtitle: "Bundle and save up to 25% · Local Delaware agents · Instant online quotes.",
        cta: "Get Quote",
        ctaAction: "partner",
        theme: "blue",
        icon: "☂️"
    },
    {
        id: "insurance-life",
        category: "Insurance",
        sponsor: "Heritage Life Group",
        title: "Protect What Matters Most",
        subtitle: "Term & whole life policies tailored for FCCU members · No medical exam options available.",
        cta: "Compare Plans",
        ctaAction: "partner",
        theme: "emerald",
        icon: "❤️"
    },
    {
        id: "realty-sandhill",
        category: "Real Estate",
        sponsor: "Sand Hill Realty",
        title: "Buy or Sell in Milton & Sussex County",
        subtitle: "Local experts · Free home valuation · Preferred lender network with First Choice CU.",
        cta: "Book Showing",
        ctaAction: "partner",
        theme: "gold",
        icon: "🏡"
    },
    {
        id: "tax-pro",
        category: "Tax & Legal",
        sponsor: "Thatcher & Associates CPA",
        title: "Year-Round Tax & Accounting",
        subtitle: "Personal & small-business returns · Audit support · Member discount with FCCU ID.",
        cta: "Schedule Consult",
        ctaAction: "partner",
        theme: "dark",
        icon: "📋"
    },
    {
        id: "auto-finance",
        category: "Auto",
        sponsor: "Delaware Auto Finance",
        title: "Drive Away with Member Rates",
        subtitle: "New & used vehicle loans · Refinance your car note · Same-day approvals.",
        cta: "Check Rates",
        ctaAction: "partner",
        theme: "emerald",
        icon: "🚗"
    },
    {
        id: "retirement",
        category: "Retirement",
        sponsor: "Golden Years Advisors",
        title: "Plan Your Retirement with Confidence",
        subtitle: "401(k) rollovers, Social Security timing, and income strategies for Delaware members.",
        cta: "Free Review",
        ctaAction: "partner",
        theme: "purple",
        icon: "🌅"
    }
];

// Keep internal FCCU promos as secondary carousel content
const PROMO_CAMPAIGNS = [
    ...PARTNER_ADS,
    {
        id: "mobile-app",
        category: "FCCU",
        sponsor: "First Choice Credit Union",
        title: "Bank on the Go with FCCU Mobile",
        subtitle: "Deposit checks, pay AT&T Wireless and utilities, and send money — all from your phone.",
        cta: "Download Free",
        ctaAction: "app",
        type: "phone",
        theme: "emerald",
        icon: "📱"
    },
    {
        id: "fccu-pay",
        category: "FCCU",
        sponsor: "First Choice Credit Union",
        title: "Send Money Instantly with FCCU Pay",
        subtitle: "Pay friends and family with an email or mobile number. No fees for members.",
        cta: "Send Money Now",
        ctaAction: "zelle",
        type: "standard",
        theme: "gold",
        icon: "⚡"
    }
];

function getPhoneMockupHTML() {
    const brand = typeof BANK_BRAND !== "undefined" ? BANK_BRAND : { shortName: "FCCU", mobileAppName: "FCCU Mobile" };
    return `
        <div class="phone-mockup">
            <div class="phone-frame">
                <div class="phone-notch"></div>
                <div class="phone-screen">
                    <div class="phone-screen-inner">
                        <div class="phone-app-header">
                            <img src="logo.svg" alt="" class="phone-app-logo">
                            <span>${brand.mobileAppName}</span>
                        </div>
                        <div class="phone-balance-label">Available Balance</div>
                        <div class="phone-balance-amount">$400,000.00</div>
                        <div class="phone-quick-row">
                            <div class="phone-quick-item"><span>💸</span><small>Send</small></div>
                            <div class="phone-quick-item"><span>📷</span><small>Deposit</small></div>
                            <div class="phone-quick-item"><span>🧾</span><small>Pay</small></div>
                            <div class="phone-quick-item"><span>📄</span><small>More</small></div>
                        </div>
                        <div class="phone-tx-list">
                            <div class="phone-tx-item"><span class="phone-tx-dot green"></span>Direct Deposit <span class="phone-tx-amt green">+$4,600</span></div>
                            <div class="phone-tx-item"><span class="phone-tx-dot"></span>AT&T Wireless <span class="phone-tx-amt">-$145</span></div>
                            <div class="phone-tx-item"><span class="phone-tx-dot green"></span>FCCU Pay <span class="phone-tx-amt green">+$200</span></div>
                        </div>
                    </div>
                </div>
                <div class="phone-home-bar"></div>
            </div>
            <div class="phone-glow"></div>
        </div>`;
}

function renderPromoSlide(promo, index) {
    const themeClass = `promo-theme-${promo.theme || "emerald"}`;
    const isPhone = promo.type === "phone";
    const active = index === 0 ? " active" : "";
    const category = promo.category || "Partner";
    const sponsor = promo.sponsor || "Featured Partner";
    const icon = promo.icon || getPromoIcon(promo.ctaAction);

    return `
        <div class="promo-slide${active} ${themeClass}" data-promo-id="${promo.id}">
            <div class="promo-slide-content">
                <div class="promo-text">
                    <span class="promo-badge">${category} · Sponsored</span>
                    <p class="promo-sponsor">${sponsor}</p>
                    <h3 class="promo-title">${promo.title}</h3>
                    <p class="promo-subtitle">${promo.subtitle}</p>
                    <button class="promo-cta" onclick="handlePromoCTA('${promo.ctaAction}', '${sponsor.replace(/'/g, "\\'")}')">${promo.cta} &rarr;</button>
                </div>
                ${isPhone
                    ? `<div class="promo-visual">${getPhoneMockupHTML()}</div>`
                    : `<div class="promo-visual promo-icon-visual"><div class="promo-big-icon">${icon}</div></div>`}
            </div>
        </div>`;
}

function getPromoIcon(action) {
    const icons = {
        zelle: "⚡", savings: "📈", security: "🛡️", cards: "💳",
        app: "📱", billpay: "🧾", partner: "✦", mortgage: "🏠"
    };
    return icons[action] || "✨";
}

function initPromoCarousel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Partner ads first for the live advert carousel
    const slides = PARTNER_ADS.length ? PARTNER_ADS : PROMO_CAMPAIGNS;

    container.innerHTML = `
        <div class="promo-carousel">
            <div class="promo-slides">
                ${slides.map((p, i) => renderPromoSlide(p, i)).join("")}
            </div>
            <div class="promo-dots">
                ${slides.map((_, i) => `<button class="promo-dot${i === 0 ? ' active' : ''}" onclick="goToPromoSlide('${containerId}', ${i})" aria-label="Ad ${i + 1}"></button>`).join("")}
            </div>
            <button class="promo-nav promo-prev" onclick="advancePromoSlide('${containerId}', -1)" aria-label="Previous">&lsaquo;</button>
            <button class="promo-nav promo-next" onclick="advancePromoSlide('${containerId}', 1)" aria-label="Next">&rsaquo;</button>
        </div>`;

    if (container._promoInterval) clearInterval(container._promoInterval);
    container._promoInterval = setInterval(() => advancePromoSlide(containerId, 1), 5500);
}

let promoIndices = {};

function advancePromoSlide(containerId, dir) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const slides = container.querySelectorAll(".promo-slide");
    const dots = container.querySelectorAll(".promo-dot");
    if (!slides.length) return;

    if (promoIndices[containerId] === undefined) promoIndices[containerId] = 0;
    slides[promoIndices[containerId]].classList.remove("active");
    dots[promoIndices[containerId]]?.classList.remove("active");

    promoIndices[containerId] = (promoIndices[containerId] + dir + slides.length) % slides.length;

    slides[promoIndices[containerId]].classList.add("active");
    dots[promoIndices[containerId]]?.classList.add("active");
}

function goToPromoSlide(containerId, index) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const slides = container.querySelectorAll(".promo-slide");
    const dots = container.querySelectorAll(".promo-dot");

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    promoIndices[containerId] = index;
    slides[index].classList.add("active");
    dots[index]?.classList.add("active");
}

function initPromoPopup(delayMs = 18000) {
    const dismissed = sessionStorage.getItem("fccu_promo_dismissed");
    if (dismissed) return;

    setTimeout(() => {
        if (sessionStorage.getItem("fccu_promo_dismissed")) return;
        const promo = PARTNER_ADS[Math.floor(Math.random() * PARTNER_ADS.length)];
        showPromoPopup(promo);
    }, delayMs);
}

function showPromoPopup(promo) {
    if (document.getElementById("promoPopup")) return;

    const overlay = document.createElement("div");
    overlay.id = "promoPopup";
    overlay.className = "promo-popup-overlay";
    overlay.innerHTML = `
        <div class="promo-popup promo-theme-${promo.theme || "emerald"}">
            <button class="promo-popup-close" onclick="dismissPromoPopup()">&times;</button>
            <div class="promo-popup-body">
                <div class="promo-popup-icon">${promo.icon || getPromoIcon(promo.ctaAction)}</div>
                <div class="promo-popup-text">
                    <span class="promo-badge">${promo.category || "Partner"} · Sponsored</span>
                    <p class="promo-sponsor" style="margin:6px 0 0;font-size:11px;opacity:0.8">${promo.sponsor || ""}</p>
                    <h3>${promo.title}</h3>
                    <p>${promo.subtitle}</p>
                    <button class="promo-cta" onclick="handlePromoCTA('${promo.ctaAction}', '${(promo.sponsor || "").replace(/'/g, "\\'")}');dismissPromoPopup()">${promo.cta}</button>
                    <button class="promo-dismiss" onclick="dismissPromoPopup()">No thanks, maybe later</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("active"));
}

function dismissPromoPopup() {
    sessionStorage.setItem("fccu_promo_dismissed", "1");
    const popup = document.getElementById("promoPopup");
    if (popup) {
        popup.classList.remove("active");
        setTimeout(() => popup.remove(), 300);
    }
}

function handlePromoCTA(action, sponsor) {
    const name = sponsor || "our partner";
    const actions = {
        app: () => showToast("Redirecting to App Store / Google Play...", "info"),
        zelle: () => { if (typeof openModal === "function") openModal("zelle"); else showToast("Sign in to use FCCU Pay", "info"); },
        savings: () => { if (typeof openModal === "function") openModal("internal"); else showToast("Open a savings account after signing in", "info"); },
        security: () => { if (typeof openModal === "function") openModal("security"); else showToast("Security center available after sign-in", "info"); },
        billpay: () => { if (typeof openModal === "function") openModal("billpay"); else showToast("Sign in to pay bills", "info"); },
        cards: () => { if (typeof openModal === "function") openModal("cards"); else showToast("Apply for a card after signing in", "info"); },
        partner: () => showToast(`Connecting you with ${name}. A specialist will follow up shortly.`, "success")
    };
    (actions[action] || (() => showToast(`Thanks for your interest in ${name}!`, "info")))();
}

function initPromoTicker(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = PARTNER_ADS.map(p =>
        `<span class="ticker-item">✦ <strong>${p.category}</strong> · ${p.sponsor} — ${p.title} · <em>${p.cta}</em></span>`
    ).join("");

    container.innerHTML = `
        <div class="live-ad-bar">
            <span class="live-ad-label"><span class="live-dot"></span> LIVE OFFERS</span>
            <div class="promo-ticker"><div class="ticker-track">${items}${items}</div></div>
        </div>`;
}

function applyBranding() {
    if (typeof BANK_BRAND === "undefined") return;

    const displayName = BANK_BRAND.displayName || BANK_BRAND.name;
    document.querySelectorAll("[data-brand='name']").forEach(el => el.textContent = displayName);
    document.querySelectorAll("[data-brand='name-proper']").forEach(el => el.textContent = BANK_BRAND.name);
    document.querySelectorAll("[data-brand='tagline']").forEach(el => el.textContent = BANK_BRAND.tagline);
    document.querySelectorAll("[data-brand='short']").forEach(el => el.textContent = BANK_BRAND.shortName);
    document.querySelectorAll("[data-brand='pay']").forEach(el => el.textContent = BANK_BRAND.payProduct);
    document.querySelectorAll("[data-brand='mobile']").forEach(el => el.textContent = BANK_BRAND.mobileAppName);
    document.querySelectorAll("[data-brand='phone']").forEach(el => el.textContent = BANK_BRAND.phone);
    document.querySelectorAll("[data-brand='address']").forEach(el => el.textContent = BANK_BRAND.address);
    document.querySelectorAll("[data-brand='year']").forEach(el => el.textContent = new Date().getFullYear());

    const root = document.documentElement;
    root.style.setProperty("--brand-dark", BANK_BRAND.colors.dark);
    root.style.setProperty("--brand-mid", BANK_BRAND.colors.mid);
    root.style.setProperty("--brand-light", BANK_BRAND.colors.light);
    root.style.setProperty("--gold", BANK_BRAND.colors.gold || BANK_BRAND.colors.accent);
    if (BANK_BRAND.colors.accent) root.style.setProperty("--accent", BANK_BRAND.colors.accent);
    if (BANK_BRAND.colors.stone) root.style.setProperty("--stone", BANK_BRAND.colors.stone);

    if (BANK_BRAND.pageTitle && !document.querySelector("[data-brand-skip-title]")) {
        const page = document.body.dataset.page || "Online Banking";
        document.title = `${BANK_BRAND.name} — ${page}`;
    }
}
