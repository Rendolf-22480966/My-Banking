// ==========================================
// FIRST CHOICE CREDIT UNION — U.S. BANK DIRECTORY
// ==========================================

const US_BANKS = [
    { id: "academy", name: "Academy Bank", routing: "101089772", popular: false, color: "#1B4F72" },
    { id: "ally", name: "Ally Bank", routing: "124003116", popular: true, color: "#6B2D5C" },
    { id: "amerant", name: "Amerant Bank", routing: "067092022", popular: false, color: "#0E4D6C" },
    { id: "associated", name: "Associated Bank", routing: "075900575", popular: false, color: "#C41E3A" },
    { id: "axos", name: "Axos Bank", routing: "122287251", popular: false, color: "#00A3E0" },
    { id: "boa", name: "Bank of America", routing: "026009593", popular: true, color: "#012169" },
    { id: "bmo", name: "BMO Bank", routing: "071000288", popular: true, color: "#0079C1" },
    { id: "bok", name: "BOK Financial", routing: "103900036", popular: false, color: "#003366" },
    { id: "cadence", name: "Cadence Bank", routing: "065300279", popular: false, color: "#1A5632" },
    { id: "capitalone", name: "Capital One", routing: "051405515", popular: true, color: "#D03027" },
    { id: "chase", name: "Chase", routing: "021000021", popular: true, color: "#117ACA" },
    { id: "citi", name: "Citibank", routing: "021000089", popular: true, color: "#003B70" },
    { id: "citizens", name: "Citizens Bank", routing: "011401533", popular: false, color: "#00A3E0" },
    { id: "comerica", name: "Comerica Bank", routing: "072000096", popular: false, color: "#C8102E" },
    { id: "discover", name: "Discover Bank", routing: "031100649", popular: true, color: "#FF6000" },
    { id: "fifththird", name: "Fifth Third Bank", routing: "042000314", popular: false, color: "#1E4D2B" },
    { id: "firstcitizens", name: "First Citizens Bank", routing: "053100300", popular: false, color: "#003366" },
    { id: "firsthorizon", name: "First Horizon Bank", routing: "084000026", popular: false, color: "#C8102E" },
    { id: "firstrepublic", name: "First Republic Bank", routing: "321081669", popular: false, color: "#1A1A2E" },
    { id: "flagstar", name: "Flagstar Bank", routing: "272471563", popular: false, color: "#E31837" },
    { id: "frost", name: "Frost Bank", routing: "114000093", popular: false, color: "#006747" },
    { id: "huntington", name: "Huntington Bank", routing: "044000024", popular: false, color: "#5C2D91" },
    { id: "keybank", name: "KeyBank", routing: "041001039", popular: false, color: "#E31837" },
    { id: "m&t", name: "M&T Bank", routing: "022000046", popular: false, color: "#006341" },
    { id: "pnc", name: "PNC Bank", routing: "043000096", popular: true, color: "#F48024" },
    { id: "regions", name: "Regions Bank", routing: "062000019", popular: false, color: "#6B2D5C" },
    { id: "santander", name: "Santander Bank", routing: "231372691", popular: false, color: "#EC0000" },
    { id: "schwab", name: "Charles Schwab Bank", routing: "121202211", popular: false, color: "#00A0DF" },
    { id: "synchrony", name: "Synchrony Bank", routing: "021213591", popular: false, color: "#FF6B00" },
    { id: "td", name: "TD Bank", routing: "031201360", popular: true, color: "#34A853" },
    { id: "truist", name: "Truist Bank", routing: "053101121", popular: true, color: "#5C2D91" },
    { id: "usbank", name: "U.S. Bank", routing: "091000022", popular: true, color: "#0C2074" },
    { id: "usaa", name: "USAA Federal Savings Bank", routing: "314074269", popular: true, color: "#00205B" },
    { id: "wells", name: "Wells Fargo", routing: "121000248", popular: true, color: "#D71E28" },
    { id: "western", name: "Western Alliance Bank", routing: "122105884", popular: false, color: "#003366" },
    { id: "woodforest", name: "Woodforest National Bank", routing: "113008468", popular: false, color: "#2E7D32" },
    { id: "zions", name: "Zions Bank", routing: "124000054", popular: false, color: "#C8102E" },
    { id: "navyfed", name: "Navy Federal Credit Union", routing: "256074974", popular: true, color: "#002868" },
    { id: "penfed", name: "Pentagon Federal Credit Union", routing: "255077370", popular: false, color: "#003366" },
    { id: "fccu", name: "First Choice Credit Union", routing: "231177737", popular: false, color: "#0B3D2E" }
];

const POPULAR_BANK_IDS = ["boa", "chase", "wells", "capitalone", "citi", "pnc", "td", "usbank", "ally", "truist"];

function getBankById(id) {
    return US_BANKS.find(b => b.id === id) || null;
}

function getPopularBanks() {
    return POPULAR_BANK_IDS.map(id => getBankById(id)).filter(Boolean);
}

function searchBanks(query) {
    const q = (query || "").trim().toLowerCase();
    if (!q) return US_BANKS.slice().sort((a, b) => a.name.localeCompare(b.name));
    return US_BANKS
        .filter(b => b.name.toLowerCase().includes(q) || b.routing.includes(q))
        .sort((a, b) => a.name.localeCompare(b.name));
}

function groupBanksByLetter(banks) {
    const groups = {};
    banks.forEach(b => {
        const letter = b.name.charAt(0).toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(b);
    });
    return Object.keys(groups).sort().map(letter => ({ letter, banks: groups[letter] }));
}

function bankInitials(name) {
    const parts = name.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

function bankLogoHTML(bank, size) {
    const s = size || 40;
    const initials = bankInitials(bank.name);
    return `<div class="bank-logo" style="width:${s}px;height:${s}px;background:${bank.color}" title="${bank.name}">${initials}</div>`;
}

/** Mock account verification — deterministic fake holder from account digits */
function verifyExternalAccount(accountNumber, bank) {
    const acct = String(accountNumber || "").replace(/\s/g, "");
    if (acct.length < 6 || acct.length > 17) {
        return { success: false, message: "Enter a valid account number (6–17 digits)." };
    }
    if (!/^\d+$/.test(acct)) {
        return { success: false, message: "Account number must contain digits only." };
    }
    if (!bank) {
        return { success: false, message: "Select a destination bank first." };
    }

    const firstNames = ["John", "Michael", "Sarah", "James", "Emily", "David", "Maria", "Robert", "Jennifer", "William", "Amanda", "Christopher"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Anderson", "Taylor", "Thomas"];
    const types = ["Checking Account", "Savings Account", "Business Checking", "Money Market"];

    let hash = 0;
    for (let i = 0; i < acct.length; i++) hash = (hash * 31 + acct.charCodeAt(i)) >>> 0;
    const first = firstNames[hash % firstNames.length];
    const last = lastNames[(hash >> 4) % lastNames.length];
    const type = types[(hash >> 8) % types.length];

    return {
        success: true,
        holderName: `${first} ${last}`,
        accountType: type,
        accountMasked: "****" + acct.slice(-4),
        bankName: bank.name,
        routing: bank.routing,
        bankId: bank.id
    };
}
