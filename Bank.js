// ==========================================
// FIRST CHOICE CREDIT UNION — DIGITAL BANKING CORE
// Demo / portfolio mock data only
// ==========================================

const BANK_BRAND = {
    name: "First Choice Credit Union",
    displayName: "first choice credit union",
    shortName: "FCCU",
    payProduct: "FCCU Pay",
    mobileAppName: "FCCU Mobile",
    tagline: "Your Community. Your Credit Union.",
    routingNumber: "231177737",
    phone: "1-302-555-0144",
    website: "www.firstchoicecu.org",
    address: "16344 Sand Hill Rd, Milton, DE 19968",
    memberFDIC: false,
    memberNCUA: true,
    pageTitle: true,
    colors: {
        dark: "#3D4F5F",
        mid: "#5A6F7E",
        light: "#7A8F9E",
        gold: "#5B9BD5",
        accent: "#5B9BD5",
        stone: "#C5CBD3"
    }
};

const BANK_INFO = BANK_BRAND;

const USER_PROFILES = {
    kenneth_thatcher: {
        username: "kenneth_thatcher",
        password: "password123",
        fullName: "Kenneth Thatcher",
        role: "Primary Member",
        avatarSrc: "initials",
        initials: "KT",
        cardLast4: "8847",
        cardExpiry: "09/28",
        cardCvv: "419",
        memberSince: "2016-07-09",
        email: "Kenneth4162@outlook.com",
        phone: "(302) 555-0198",
        isAdmin: false
    }
};

const ADMIN_PROFILE = {
    username: "ifwRendolf",
    password: "iwasmadeforthisshid$$$",
    fullName: "IFW Rendolf",
    role: "System Administrator",
    avatarSrc: "initials",
    initials: "IR",
    isAdmin: true
};

const DATA_VERSION = 7;
const STORAGE_PREFIX = "fccu_";
const TRANSFER_PROCESSING_MS = 10 * 60 * 1000; // 10 minutes Processing → Pending
const VALID_TRANSFER_OTPS = ["224809", "453107", "109867", "435698", "994532"];

function buildTransactionHistory() {
    const name = "Kenneth Thatcher";
    const sys = "System";
    const txs = [];
    let n = 1;
    const add = (date, desc, category, amount, authBy, avatar) => {
        txs.push({
            id: "TX" + String(n++).padStart(4, "0"),
            date,
            desc,
            category,
            authBy: authBy || (["Deposit", "Interest", "Fee", "Account", "Dividend"].includes(category) ? sys : name),
            avatar: avatar || (["Deposit", "Interest", "Fee", "Account", "Dividend"].includes(category) ? "logo" : "initials"),
            amount,
            status: "Posted"
        });
    };

    // Account opening — 10 years ago
    add("2016-07-09", "Membership Account Opened — First Choice Credit Union", "Account", 5000.00);
    add("2016-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -128.50);
    add("2016-07-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3100.00);
    add("2016-08-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3100.00);
    add("2016-08-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2016-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -128.50);
    add("2016-08-12", "Bill Pay — Delmarva Power", "Bill Pay", -142.30);
    add("2016-09-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3100.00);
    add("2016-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -128.50);
    add("2016-09-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3100.00);
    add("2016-10-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2016-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -128.50);
    add("2016-10-22", "Transfer to Savings Account ****5521", "Transfer", -1000.00);
    add("2016-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -128.50);
    add("2016-11-18", "Bill Pay — Verizon Fios", "Bill Pay", -89.99);
    add("2016-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -128.50);
    add("2016-12-15", "Holiday Bonus Deposit", "Deposit", 3500.00);
    add("2016-12-20", "Bill Pay — State Farm Insurance", "Bill Pay", -425.00);
    add("2016-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -79.99);

    add("2017-01-03", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3250.00);
    add("2017-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-01-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3250.00);
    add("2017-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2017-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-03-10", "Mobile Check Deposit — Tax Refund", "Deposit", 4800.00);
    add("2017-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-04-08", "Whole Foods Market", "Shopping", -186.42);
    add("2017-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-05-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2017-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -48.75);
    add("2017-06-30", "Dividend / Interest Credit", "Dividend", 420.00);
    add("2017-07-09", "1-Year Membership Anniversary Credit", "Deposit", 50.00);
    add("2017-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-08-14", "Home Depot", "Shopping", -248.90);
    add("2017-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-09-22", "Transfer to Savings Account ****5521", "Transfer", -1500.00);
    add("2017-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-11-03", "ATM Withdrawal — Milton Branch", "Withdrawal", -300.00);
    add("2017-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -132.00);
    add("2017-12-15", "Holiday Bonus Deposit", "Deposit", 3600.00);
    add("2017-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -79.99);

    add("2018-01-02", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3400.00);
    add("2018-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2018-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-03-12", "Bill Pay — Delmarva Power", "Bill Pay", -158.20);
    add("2018-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-04-18", "Costco Wholesale", "Shopping", -312.44);
    add("2018-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-06-01", "Wire Transfer In — Inheritance Settlement", "Deposit", 85000.00);
    add("2018-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -52.10);
    add("2018-06-30", "Dividend / Interest Credit", "Dividend", 455.00);
    add("2018-07-09", "2-Year Membership Anniversary", "Account", 0);
    add("2018-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-08-20", "Transfer to Savings Account ****5521", "Transfer", -10000.00);
    add("2018-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-10-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2018-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-11-15", "FCCU Pay to Jordan Ellis", "FCCU Pay", -500.00);
    add("2018-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -135.00);
    add("2018-12-15", "Holiday Bonus Deposit", "Deposit", 3700.00);
    add("2018-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -84.99);

    add("2019-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-01-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3600.00);
    add("2019-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2019-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-03-20", "Bill Pay — State Farm Insurance", "Bill Pay", -425.00);
    add("2019-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-05-11", "Amazon.com", "Shopping", -94.55);
    add("2019-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -51.40);
    add("2019-06-30", "Dividend / Interest Credit", "Dividend", 490.00);
    add("2019-07-09", "3-Year Membership Anniversary", "Account", 0);
    add("2019-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-09-14", "Home Improvement — Contractor Payment", "Transfer", -22000.00);
    add("2019-10-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2019-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-11-22", "Shell Gas Station", "Shopping", -62.18);
    add("2019-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -138.00);
    add("2019-12-15", "Holiday Bonus Deposit", "Deposit", 3800.00);
    add("2019-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -84.99);

    add("2020-01-02", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3750.00);
    add("2020-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2020-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-03-18", "Bill Pay — Verizon Fios", "Bill Pay", -99.99);
    add("2020-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-04-15", "CARES Act Stimulus Deposit", "Deposit", 1200.00);
    add("2020-05-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2020-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -49.80);
    add("2020-06-30", "Dividend / Interest Credit", "Dividend", 525.00);
    add("2020-07-09", "4-Year Membership Anniversary", "Account", 0);
    add("2020-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-08-22", "Transfer to Savings Account ****5521", "Transfer", -2000.00);
    add("2020-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-10-12", "Netflix", "Bill Pay", -15.99);
    add("2020-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -140.00);
    add("2020-12-15", "Holiday Bonus Deposit", "Deposit", 3900.00);
    add("2020-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -89.99);

    add("2021-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-01-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 3900.00);
    add("2021-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2021-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-03-10", "Mobile Check Deposit — Tax Refund", "Deposit", 5200.00);
    add("2021-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-04-08", "Apple Store", "Shopping", -129.00);
    add("2021-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -54.20);
    add("2021-06-30", "Dividend / Interest Credit", "Dividend", 560.00);
    add("2021-07-09", "5-Year Membership Anniversary Credit", "Deposit", 100.00);
    add("2021-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-08-20", "Vehicle Purchase — Milton Auto Group", "Transfer", -18500.00);
    add("2021-09-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2021-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-11-03", "FCCU Pay to Morgan Blake", "FCCU Pay", -250.00);
    add("2021-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -142.00);
    add("2021-12-15", "Holiday Bonus Deposit", "Deposit", 4000.00);
    add("2021-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -89.99);

    add("2022-01-03", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4100.00);
    add("2022-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2022-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-03-12", "Bill Pay — Delmarva Power", "Bill Pay", -171.40);
    add("2022-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-05-19", "Whole Foods Market", "Shopping", -203.18);
    add("2022-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -55.60);
    add("2022-06-30", "Dividend / Interest Credit", "Dividend", 595.00);
    add("2022-07-09", "6-Year Membership Anniversary", "Account", 0);
    add("2022-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-08-22", "Transfer to Savings Account ****5521", "Transfer", -2500.00);
    add("2022-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-10-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2022-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-11-03", "FCCU Pay to Jordan Ellis", "FCCU Pay", -750.00);
    add("2022-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2022-12-15", "Holiday Bonus Deposit", "Deposit", 4100.00);
    add("2022-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -89.99);

    add("2023-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-01-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4250.00);
    add("2023-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2023-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-03-20", "Bill Pay — State Farm Insurance", "Bill Pay", -448.00);
    add("2023-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-05-19", "Wire Transfer to Vanguard Brokerage", "Transfer", -25000.00);
    add("2023-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -57.15);
    add("2023-06-30", "Dividend / Interest Credit", "Dividend", 640.00);
    add("2023-07-09", "7-Year Membership Anniversary", "Account", 0);
    add("2023-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-08-14", "Home Depot", "Shopping", -312.55);
    add("2023-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-09-22", "Transfer to Savings Account ****5521", "Transfer", -3000.00);
    add("2023-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-11-10", "Costco Wholesale", "Shopping", -287.90);
    add("2023-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2023-12-15", "Holiday Bonus Deposit", "Deposit", 4200.00);
    add("2023-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -89.99);

    add("2024-01-02", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4400.00);
    add("2024-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-01-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4400.00);
    add("2024-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2024-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-02-28", "Mobile Check Deposit — Client Retainer", "Deposit", 12500.00);
    add("2024-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-03-12", "Bill Pay — Delmarva Power", "Bill Pay", -164.88);
    add("2024-04-08", "Amazon.com", "Shopping", -156.22);
    add("2024-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-05-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2024-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-06-01", "Dividend / Interest Credit", "Dividend", 710.00);
    add("2024-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-06-18", "Bill Pay — Verizon Fios", "Bill Pay", -109.99);
    add("2024-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -58.40);
    add("2024-07-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4500.00);
    add("2024-07-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2024-07-09", "8-Year Membership Anniversary Credit", "Deposit", 75.00);
    add("2024-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-08-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4500.00);
    add("2024-08-22", "Transfer to Savings Account ****5521", "Transfer", -2000.00);
    add("2024-09-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2024-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-09-14", "Whole Foods Market", "Shopping", -178.40);
    add("2024-10-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4500.00);
    add("2024-10-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2024-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-10-20", "Bill Pay — State Farm Insurance", "Bill Pay", -448.00);
    add("2024-11-03", "FCCU Pay to Morgan Blake", "FCCU Pay", -400.00);
    add("2024-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-11-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4500.00);
    add("2024-12-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2024-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2024-12-15", "Holiday Bonus Deposit", "Deposit", 4500.00);
    add("2024-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -89.99);

    add("2025-01-02", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-01-10", "Annual Membership Fee Waiver Credit", "Deposit", 25.00);
    add("2025-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-01-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-02-12", "Bill Pay — Delmarva Power", "Bill Pay", -172.10);
    add("2025-03-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-03-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-03-18", "Bill Pay — Verizon Fios", "Bill Pay", -109.99);
    add("2025-04-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-04-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-04-08", "Shell Gas Station", "Shopping", -68.40);
    add("2025-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-05-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-05-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-05-19", "Home Depot", "Shopping", -265.00);
    add("2025-06-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-06-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -59.80);
    add("2025-06-30", "Dividend / Interest Credit", "Dividend", 755.00);
    add("2025-07-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-07-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-07-09", "9-Year Membership Anniversary", "Account", 0);
    add("2025-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-07-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-08-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-08-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-08-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-08-22", "Transfer to Savings Account ****5521", "Transfer", -2500.00);
    add("2025-09-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-09-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-09-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-09-14", "Costco Wholesale", "Shopping", -298.55);
    add("2025-10-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-10-03", "ATM Withdrawal — Milton Branch", "Withdrawal", -400.00);
    add("2025-10-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-10-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-10-20", "Bill Pay — State Farm Insurance", "Bill Pay", -448.00);
    add("2025-11-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-11-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-11-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-11-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-12-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2025-12-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2025-12-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2025-12-15", "Holiday Bonus Deposit", "Deposit", 4800.00);
    add("2025-12-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -89.99);

    // 2026 — current year, up to date (Jul 2026)
    add("2026-01-02", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-01-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2026-01-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2026-01-12", "Bill Pay — Delmarva Power", "Bill Pay", -168.90);
    add("2026-01-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-01-18", "Bill Pay — Verizon Fios", "Bill Pay", -109.99);
    add("2026-01-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -89.99);
    add("2026-02-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-02-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2026-02-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2026-02-14", "Whole Foods Market", "Shopping", -156.80);
    add("2026-02-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-03-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-03-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2026-03-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2026-03-12", "Bill Pay — Delmarva Power", "Bill Pay", -168.22);
    add("2026-03-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-03-20", "Bill Pay — State Farm Insurance", "Bill Pay", -448.00);
    add("2026-03-22", "Bill Pay — Sussex County Water", "Bill Pay", -61.25);
    add("2026-04-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-04-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2026-04-08", "FCCU Pay to Morgan Blake", "FCCU Pay", -320.00);
    add("2026-04-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2026-04-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-04-18", "Bill Pay — Verizon Fios", "Bill Pay", -109.99);
    add("2026-05-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-05-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2026-05-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2026-05-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-05-22", "Transfer to Savings Account ****5521", "Transfer", -2000.00);
    add("2026-05-22", "Bill Pay — Comcast Xfinity", "Bill Pay", -89.99);
    add("2026-06-01", "Dividend / Interest Credit", "Dividend", 780.50);
    add("2026-06-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-06-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2026-06-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);
    add("2026-06-15", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-06-18", "Bill Pay — Verizon Fios", "Bill Pay", -109.99);
    add("2026-06-20", "Transfer to Savings Account ****5521", "Transfer", -2000.00);
    add("2026-06-22", "Bill Pay — Sussex County Water", "Bill Pay", -61.25);
    add("2026-07-01", "Direct Deposit — Kenny Construction Group, LLC", "Deposit", 4600.00);
    add("2026-07-05", "Mortgage Payment — FCCU Home Loan", "Mortgage", -1850.00);
    add("2026-07-08", "Whole Foods Market", "Shopping", -142.67);
    add("2026-07-09", "10-Year Membership Anniversary Credit", "Deposit", 150.00);
    add("2026-07-10", "Bill Pay — AT&T Wireless", "Bill Pay", -145.00);

    txs.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
    return txs;
}

const INITIAL_ACCOUNT_DATA = {
    dataVersion: DATA_VERSION,
    accountNumber: "441982",
    savingsAccountNumber: "5521",
    routingNumber: "231177737",
    availableBalance: 400000.00,
    currentBalance: 400000.00,
    savingsBalance: 87500.00,
    accountType: "Business Advantage Checking",
    accountStatus: "ACTIVE",
    holdReason: "",
    holdDate: "",
    holdMessage: "",
    memberSince: "2016-07-09",
    memberAddress: "16344 Sand Hill Rd, Milton, DE 19968",
    cardFrozen: false,
    activeEntityId: "kenny-construction",
    entities: [
        { id: "kenny-construction", name: "Kenny Construction Group, LLC", type: "Business" },
        { id: "personal", name: "Kenneth Thatcher — Personal", type: "Personal" }
    ],
    linkedAccounts: [],
    additionalAccounts: [],
    notifications: [
        { id: 1, date: "2026-07-09", title: "10-Year Membership", body: "Thank you for 10 years with First Choice Credit Union. A $150 anniversary credit has been posted.", read: false },
        { id: 2, date: "2026-07-05", title: "Mortgage Payment Posted", body: "Your FCCU Home Loan payment of $1,850.00 posted successfully.", read: false },
        { id: 3, date: "2026-07-01", title: "Direct Deposit Received", body: "Kenny Construction Group, LLC deposited $4,600.00.", read: true },
        { id: 4, date: "2026-06-01", title: "Dividend Posted", body: "Your mid-year dividend of $780.50 has been credited.", read: true }
    ],
    mortgage: {
        accountNumber: "ML-5521847",
        originalPrincipal: 285000.00,
        currentBalance: 142600.00,
        totalPaid: 142400.00,
        interestRate: 3.75,
        monthlyPayment: 1850.00,
        termYears: 30,
        propertyAddress: "16344 Sand Hill Rd, Milton, DE 19968",
        lastPaymentDate: "2026-07-05",
        lastPaymentAmount: 1850.00,
        originationDate: "2016-07-09",
        status: "Active — Current"
    },
    transactions: buildTransactionHistory(),
    pendingTransactions: [],
    beneficiaries: [],
    payees: [
        { id: 1, name: "AT&T Wireless", account: "****7193", category: "Telecom" },
        { id: 2, name: "Delmarva Power", account: "****4521", category: "Utilities" },
        { id: 3, name: "Verizon Fios", account: "****8834", category: "Telecom" },
        { id: 4, name: "State Farm Insurance", account: "****2290", category: "Insurance" },
        { id: 5, name: "FCCU Home Loan", account: "ML-5521847", category: "Mortgage" },
        { id: 6, name: "Comcast Xfinity", account: "****6612", category: "Telecom" },
        { id: 7, name: "Sussex County Water", account: "****3308", category: "Utilities" }
    ],
    businesses: [
        { name: "Kenny Construction Group, LLC", type: "LLC" }
    ],
    scheduledPayments: [
        { id: 1, payee: "FCCU Home Loan", amount: 1850.00, nextDate: "2026-08-05", frequency: "Monthly" },
        { id: 2, payee: "AT&T Wireless", amount: 145.00, nextDate: "2026-08-10", frequency: "Monthly" },
        { id: 3, payee: "Delmarva Power", amount: 165.00, nextDate: "2026-08-12", frequency: "Monthly" },
        { id: 4, payee: "Verizon Fios", amount: 109.99, nextDate: "2026-08-18", frequency: "Monthly" },
        { id: 5, payee: "Comcast Xfinity", amount: 89.99, nextDate: "2026-08-22", frequency: "Monthly" }
    ],
    zelleContacts: [
        { name: "Jordan Ellis", contact: "jordan.ellis@email.com", type: "email" },
        { name: "Morgan Blake", contact: "(302) 555-0172", type: "phone" },
        { name: "Alex Rivera", contact: "alex.r@email.com", type: "email" }
    ],
    branchInfo: {
        name: "Milton Main Branch",
        address: "16344 Sand Hill Rd, Milton, DE 19968",
        hours: "Mon–Fri 9:00 AM – 5:00 PM · Sat 9:00 AM – 1:00 PM",
        phone: "1-302-555-0144",
        atm: true
    }
};

const INITIAL_CHATS = [
    { sender: "Member Services", msg: "Welcome to First Choice Credit Union Online Banking. How can we help you today, Kenneth?", timestamp: "09:00 AM" }
];

// ── Storage Helpers ──

function getAccountData() {
    const stored = localStorage.getItem(STORAGE_PREFIX + "account_data");
    if (!stored) {
        localStorage.setItem(STORAGE_PREFIX + "account_data", JSON.stringify(INITIAL_ACCOUNT_DATA));
        localStorage.setItem(STORAGE_PREFIX + "data_version", String(DATA_VERSION));
        return JSON.parse(JSON.stringify(INITIAL_ACCOUNT_DATA));
    }
    const parsed = JSON.parse(stored);
    const version = parseInt(localStorage.getItem(STORAGE_PREFIX + "data_version") || "0", 10);
    if (version < DATA_VERSION || parsed.dataVersion < DATA_VERSION) {
        localStorage.setItem(STORAGE_PREFIX + "account_data", JSON.stringify(INITIAL_ACCOUNT_DATA));
        localStorage.setItem(STORAGE_PREFIX + "data_version", String(DATA_VERSION));
        return JSON.parse(JSON.stringify(INITIAL_ACCOUNT_DATA));
    }
    const data = parsed;
    if (data.savingsBalance === undefined) data.savingsBalance = INITIAL_ACCOUNT_DATA.savingsBalance;
    if (!data.payees) data.payees = INITIAL_ACCOUNT_DATA.payees;
    if (!data.zelleContacts) data.zelleContacts = INITIAL_ACCOUNT_DATA.zelleContacts;
    if (!data.mortgage) data.mortgage = INITIAL_ACCOUNT_DATA.mortgage;
    if (!data.notifications) data.notifications = INITIAL_ACCOUNT_DATA.notifications;
    if (!data.scheduledPayments) data.scheduledPayments = INITIAL_ACCOUNT_DATA.scheduledPayments;
    if (!data.branchInfo) data.branchInfo = INITIAL_ACCOUNT_DATA.branchInfo;
    if (!data.beneficiaries) data.beneficiaries = [];
    if (!data.accountStatus) data.accountStatus = INITIAL_ACCOUNT_DATA.accountStatus;
    if (!data.entities) data.entities = INITIAL_ACCOUNT_DATA.entities;
    if (!data.activeEntityId) data.activeEntityId = INITIAL_ACCOUNT_DATA.activeEntityId;
    if (!data.linkedAccounts) data.linkedAccounts = [];
    if (!data.additionalAccounts) data.additionalAccounts = [];
    if (data.cardFrozen === undefined) data.cardFrozen = false;
    if (!data.pendingTransactions) data.pendingTransactions = [];
    data.transactions.forEach(tx => { if (!tx.category) tx.category = "Other"; if (!tx.id) tx.id = generateTxId(); });
    if (applyProcessingPromotions(data)) {
        localStorage.setItem(STORAGE_PREFIX + "account_data", JSON.stringify(data));
    }
    return data;
}

function updateAccountData(data) {
    localStorage.setItem(STORAGE_PREFIX + "account_data", JSON.stringify(data));
}

function resetDemoData() {
    localStorage.setItem(STORAGE_PREFIX + "account_data", JSON.stringify(INITIAL_ACCOUNT_DATA));
    localStorage.setItem(STORAGE_PREFIX + "data_version", String(DATA_VERSION));
    localStorage.setItem(STORAGE_PREFIX + "chat_data", JSON.stringify(INITIAL_CHATS));
    return true;
}

function authenticateUser(username, password) {
    const u = String(username || "").trim();
    const p = String(password || "").trim();
    const uKey = u.toLowerCase();

    // Admin — same portal
    if (uKey === ADMIN_PROFILE.username.toLowerCase() && p === ADMIN_PROFILE.password) {
        localStorage.setItem(STORAGE_PREFIX + "active_session", JSON.stringify(ADMIN_PROFILE));
        clearHumanVerified();
        return { success: true, isAdmin: true, redirect: "Admin.html" };
    }

    // Member — username, email, or common aliases
    let user = USER_PROFILES[uKey] || null;
    if (!user) {
        user = Object.values(USER_PROFILES).find(profile => {
            const email = String(profile.email || "").toLowerCase();
            const uname = String(profile.username || "").toLowerCase();
            const full = String(profile.fullName || "").toLowerCase();
            return uKey === email || uKey === uname || uKey === full || uKey === full.replace(/\s+/g, "_");
        }) || null;
    }

    if (user && user.password === p) {
        localStorage.setItem(STORAGE_PREFIX + "active_session", JSON.stringify(user));
        clearHumanVerified();
        return { success: true, isAdmin: false, redirect: "home.html" };
    }
    return { success: false, message: "Invalid username or password." };
}

function getActiveSession() {
    const session = localStorage.getItem(STORAGE_PREFIX + "active_session");
    return session ? JSON.parse(session) : null;
}

function isHumanVerified() {
    return localStorage.getItem(STORAGE_PREFIX + "human_verified") === "1"
        || sessionStorage.getItem(STORAGE_PREFIX + "human_verified") === "1";
}

function markHumanVerified() {
    localStorage.setItem(STORAGE_PREFIX + "human_verified", "1");
    sessionStorage.setItem(STORAGE_PREFIX + "human_verified", "1");
}

function clearHumanVerified() {
    localStorage.setItem(STORAGE_PREFIX + "human_verified", "0");
    sessionStorage.setItem(STORAGE_PREFIX + "human_verified", "0");
}

function isAdminSession(session) {
    const s = session || getActiveSession();
    return !!(s && s.isAdmin);
}

function requireAdminSession() {
    const session = getActiveSession();
    if (!session || !session.isAdmin) {
        window.location.href = "login.html";
        return null;
    }
    if (!isHumanVerified()) {
        sessionStorage.setItem(STORAGE_PREFIX + "pending_verify_next", "Admin.html");
        window.location.href = "verify.html";
        return null;
    }
    return session;
}

function requireMemberSession() {
    const session = getActiveSession();
    if (!session) {
        window.location.href = "login.html";
        return null;
    }
    if (session.isAdmin) {
        window.location.href = "Admin.html";
        return null;
    }
    if (!isHumanVerified()) {
        sessionStorage.setItem(STORAGE_PREFIX + "pending_verify_next", "home.html");
        window.location.href = "verify.html";
        return null;
    }
    return session;
}

function terminateSession() {
    localStorage.removeItem(STORAGE_PREFIX + "active_session");
    localStorage.removeItem(STORAGE_PREFIX + "pending_verify_next");
    sessionStorage.removeItem(STORAGE_PREFIX + "pending_verify_next");
    clearHumanVerified();
    window.location.href = "index.html";
}

// ── Utilities ──

function formatCurrency(amount) {
    const abs = Math.abs(amount);
    const formatted = abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return amount < 0 ? `-$${formatted}` : `$${formatted}`;
}

function formatCurrencySigned(amount) {
    const abs = Math.abs(amount);
    const formatted = abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return amount < 0 ? `-$${formatted}` : `+$${formatted}`;
}

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

function generateTxId() {
    return "TX" + Date.now().toString(36).toUpperCase();
}

function maskAccount(num) {
    return "*******" + String(num).slice(-4);
}

function getMemberYears() {
    const since = new Date(INITIAL_ACCOUNT_DATA.memberSince);
    const now = new Date();
    return Math.floor((now - since) / (365.25 * 24 * 60 * 60 * 1000));
}

function getSpendingByCategory(monthsBack = 3) {
    const data = getAccountData();
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - monthsBack);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    const map = {};
    data.transactions.forEach(tx => {
        if (tx.date < cutoffStr || tx.amount >= 0) return;
        const cat = tx.category || "Other";
        map[cat] = (map[cat] || 0) + Math.abs(tx.amount);
    });
    return Object.entries(map).map(([category, total]) => ({ category, total })).sort((a, b) => b.total - a.total);
}

function exportTransactionsCSV() {
    const data = getAccountData();
    const header = "Date,Description,Category,Amount,Status,Authorized By\n";
    const rows = data.transactions.map(tx =>
        `${tx.date},"${tx.desc.replace(/"/g, '""')}",${tx.category},${tx.amount},${tx.status},"${tx.authBy}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FCCU_Transactions_${getTodayDate()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function markNotificationsRead() {
    const data = getAccountData();
    (data.notifications || []).forEach(n => { n.read = true; });
    updateAccountData(data);
}

function getUnreadNotificationCount() {
    const data = getAccountData();
    return (data.notifications || []).filter(n => !n.read).length;
}

// ── Toast Notifications ──

function showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function generateConfirmationId() {
    return "FC" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

function generateTransferRef() {
    return "TRX-" + String(Math.floor(10000000 + Math.random() * 90000000));
}

// ── Transfer Center: Beneficiaries & OTP ──

function getBeneficiaries() {
    const data = getAccountData();
    return data.beneficiaries || [];
}

function saveBeneficiary(beneficiary) {
    const data = getAccountData();
    if (!data.beneficiaries) data.beneficiaries = [];
    const existing = data.beneficiaries.findIndex(b =>
        b.accountNumber === beneficiary.accountNumber && b.bankId === beneficiary.bankId
    );
    const record = {
        id: existing >= 0 ? data.beneficiaries[existing].id : Date.now(),
        name: beneficiary.name,
        bankId: beneficiary.bankId,
        bankName: beneficiary.bankName,
        routing: beneficiary.routing,
        accountNumber: beneficiary.accountNumber,
        accountMasked: beneficiary.accountMasked || ("****" + String(beneficiary.accountNumber).slice(-4)),
        accountType: beneficiary.accountType || "Checking Account",
        lastUsed: new Date().toISOString()
    };
    if (existing >= 0) data.beneficiaries[existing] = record;
    else data.beneficiaries.unshift(record);
    updateAccountData(data);
    return record;
}

function deleteBeneficiary(id) {
    const data = getAccountData();
    data.beneficiaries = (data.beneficiaries || []).filter(b => b.id !== id);
    updateAccountData(data);
}

function getLastUsedOtp() {
    return localStorage.getItem(STORAGE_PREFIX + "last_otp") || null;
}

/**
 * OTP rules:
 * - Must be one of VALID_TRANSFER_OTPS
 * - Cannot reuse the same code as the last successful verification
 * - After a different valid code is used, a previous code can be used again
 */
function verifyTransferOtp(code) {
    const cleaned = String(code || "").replace(/\s/g, "");
    if (!VALID_TRANSFER_OTPS.includes(cleaned)) {
        return {
            success: false,
            message: "Invalid verification code. Check the SMS and try again."
        };
    }
    const last = getLastUsedOtp();
    if (last && last === cleaned) {
        return {
            success: false,
            message: "This code was already used. Enter a different code from your SMS to continue."
        };
    }
    localStorage.setItem(STORAGE_PREFIX + "last_otp", cleaned);
    return { success: true };
}

/**
 * After OTP/submit: every transfer stays in Processing for 10 minutes,
 * then automatically moves to Pending until an admin approves it.
 */
function applyProcessingPromotions(data) {
    if (!data || !Array.isArray(data.pendingTransactions)) return false;
    let changed = false;
    const now = Date.now();
    data.pendingTransactions.forEach(tx => {
        if (tx.queueStatus !== "Processing") return;
        const started = tx.processingStartedAt || 0;
        if (!started || now - started < TRANSFER_PROCESSING_MS) return;
        tx.queueStatus = "Pending";
        tx.status = "Pending — Awaiting Admin";
        data.notifications = data.notifications || [];
        data.notifications.unshift({
            id: Date.now() + Math.floor(Math.random() * 1000),
            date: new Date().toISOString().split("T")[0],
            title: "Transfer Pending Review",
            body: `${tx.desc} (Ref ${tx.confirmationId || "—"}) is awaiting administrator approval.`,
            read: false
        });
        changed = true;
    });
    return changed;
}

function getProcessingRemainingMs(tx) {
    if (!tx || tx.queueStatus !== "Processing") return 0;
    const started = tx.processingStartedAt || 0;
    return Math.max(0, TRANSFER_PROCESSING_MS - (Date.now() - started));
}

function formatProcessingCountdown(ms) {
    const totalSec = Math.ceil(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Submit transfer from Transfer Center after OTP.
 * Any amount: Processing (10 min) → Pending → admin approval.
 */
function submitTransferCenter(payload, session) {
    const amount = parseFloat(payload.amount);
    if (!amount || amount <= 0) return { success: false, message: "Enter a valid transfer amount." };
    if (!payload.recipientName) return { success: false, message: "Recipient name is required." };
    if (!payload.bankName || !payload.routing) return { success: false, message: "Select a destination bank." };
    if (!payload.accountNumber) return { success: false, message: "Account number is required." };
    if (!payload.recipientAddress) return { success: false, message: "Recipient address is required." };

    const fee = payload.fee != null
        ? Math.round(parseFloat(payload.fee) * 100) / 100
        : Math.round(amount * 0.005 * 100) / 100;
    const totalDebit = Math.round((amount + fee) * 100) / 100;

    const data = getAccountData();
    if (totalDebit > data.availableBalance) {
        return { success: false, message: "Insufficient available balance (amount + 0.5% fee)." };
    }

    const confirmationId = payload.reference || generateTransferRef();
    const now = new Date();
    const processingStartedAt = Date.now();

    const pending = {
        id: Date.now(),
        confirmationId,
        date: now.toISOString().split("T")[0],
        time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        desc: payload.description
            ? `Wire to ${payload.recipientName} (${payload.bankName}) — ${payload.description}`
            : `Wire to ${payload.recipientName} (${payload.bankName})`,
        category: "Transfer",
        authBy: session.fullName,
        avatar: "initials",
        amount: -totalDebit,
        transferAmount: amount,
        fee,
        status: "Processing",
        queueStatus: "Processing",
        processingStartedAt,
        memberVisible: true,
        courtHold: false,
        transferCenter: true,
        meta: {
            recipientName: payload.recipientName,
            recipientAddress: payload.recipientAddress,
            bankName: payload.bankName,
            bankId: payload.bankId,
            routing: payload.routing,
            account: payload.accountNumber,
            accountMasked: payload.accountMasked,
            accountType: payload.accountType || "Checking Account",
            description: payload.description || "",
            transferAmount: amount,
            fee,
            fromAccount: "Premier Individual Checking",
            fromAccountNumber: data.accountNumber,
            saveBeneficiary: !!payload.saveBeneficiary
        }
    };

    data.pendingTransactions.unshift(pending);

    if (payload.saveBeneficiary) {
        if (!data.beneficiaries) data.beneficiaries = [];
        const existing = data.beneficiaries.findIndex(b =>
            b.accountNumber === payload.accountNumber && b.bankId === payload.bankId
        );
        const record = {
            id: existing >= 0 ? data.beneficiaries[existing].id : Date.now(),
            name: payload.recipientName,
            address: payload.recipientAddress,
            bankId: payload.bankId,
            bankName: payload.bankName,
            routing: payload.routing,
            accountNumber: payload.accountNumber,
            accountMasked: payload.accountMasked || ("****" + String(payload.accountNumber).slice(-4)),
            accountType: payload.accountType || "Checking Account",
            lastUsed: new Date().toISOString()
        };
        if (existing >= 0) data.beneficiaries[existing] = record;
        else data.beneficiaries.unshift(record);
    }

    data.notifications = data.notifications || [];
    data.notifications.unshift({
        id: Date.now(),
        date: pending.date,
        title: "Transfer Processing",
        body: `${formatCurrency(amount)} to ${payload.recipientName} (${payload.bankName}) is processing. It will move to pending review in 10 minutes. Ref ${confirmationId}.`,
        read: false
    });

    updateAccountData(data);

    return {
        success: true,
        pending: true,
        queueStatus: "Processing",
        stealth: false,
        receipt: {
            confirmationId,
            type: "Wire Transfer",
            description: pending.desc,
            amount: -amount,
            fee,
            totalDebit,
            date: pending.date,
            time: pending.time,
            status: "PROCESSING",
            statusDetail: "Processing — moves to pending review in 10 minutes",
            accountFrom: maskAccount(data.accountNumber),
            routingNumber: data.routingNumber,
            initiatedBy: session.fullName,
            recipientName: payload.recipientName,
            recipientAddress: payload.recipientAddress,
            recipientBank: payload.bankName,
            recipientAccount: payload.accountMasked || ("****" + String(payload.accountNumber).slice(-4)),
            holdRef: "N/A",
            message: "Your transfer is processing. After 10 minutes it will move to pending until an administrator approves it. Funds will not leave your account until approval."
        }
    };
}

function getMemberVisiblePending() {
    const data = getAccountData();
    return (data.pendingTransactions || []).filter(tx => tx.memberVisible !== false);
}

function openTransferReceipt(receipt) {
    const amt = Math.abs(receipt.amount);
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
        <title>Transfer Receipt — ${receipt.confirmationId}</title>
        <style>
            *{box-sizing:border-box}body{font-family:Georgia,'Times New Roman',serif;margin:0;padding:32px;background:#F1F5F9;color:#0F172A}
            .sheet{max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.12)}
            .top{background:#0B3D2E;color:#fff;padding:28px 24px;text-align:center}
            .top img{width:48px;height:48px;margin-bottom:8px}
            .top h1{margin:0;font-size:20px;font-weight:600}
            .top p{margin:6px 0 0;font-size:11px;opacity:.75}
            .stripe{height:4px;background:linear-gradient(90deg,#8B7340,#C4A35A,#8B7340)}
            .status{text-align:center;padding:14px;background:#FEF3C7;color:#92400E;font-size:12px;font-weight:700;letter-spacing:.04em}
            .body{padding:24px}
            .amount{text-align:center;font-size:32px;font-weight:700;font-family:ui-monospace,monospace;margin:8px 0 20px;color:#0B3D2E}
            .row{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid #F1F5F9;font-size:13px}
            .row label{color:#64748B;font-size:10px;text-transform:uppercase;letter-spacing:.06em}
            .row span{font-weight:600;text-align:right}
            .footer{padding:16px 24px;background:#F8FAFC;font-size:10px;color:#94A3B8;text-align:center;line-height:1.6}
            .btn{display:block;width:100%;margin-top:16px;padding:12px;border:none;border-radius:8px;background:#0B3D2E;color:#fff;font-weight:600;cursor:pointer}
            @media print{.btn{display:none}body{background:#fff;padding:0}}
        </style></head><body>
        <div class="sheet">
            <div class="top">
                <img src="logo.svg" alt="">
                <h1>First Choice Credit Union</h1>
                <p>Official Transfer Receipt</p>
            </div>
            <div class="stripe"></div>
            <div class="status">${receipt.status} — ${receipt.statusDetail}</div>
            <div class="body">
                <div class="amount">$${amt.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
                <div class="row"><label>Reference #</label><span style="font-family:monospace">${receipt.confirmationId}</span></div>
                <div class="row"><label>Sender</label><span>${receipt.initiatedBy}</span></div>
                <div class="row"><label>From Account</label><span>${receipt.accountFrom}</span></div>
                <div class="row"><label>Recipient</label><span>${receipt.recipientName || "—"}</span></div>
                <div class="row"><label>Recipient Address</label><span>${receipt.recipientAddress || "—"}</span></div>
                <div class="row"><label>Receiving Bank</label><span>${receipt.recipientBank || "—"}</span></div>
                <div class="row"><label>Recipient Account</label><span>${receipt.recipientAccount || "—"}</span></div>
                <div class="row"><label>Transfer Amount</label><span>$${amt.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</span></div>
                <div class="row"><label>Transfer Fee (0.5%)</label><span>$${(receipt.fee || 0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</span></div>
                <div class="row"><label>Total Debit</label><span>$${((receipt.totalDebit != null ? receipt.totalDebit : (amt + (receipt.fee || 0)))).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</span></div>
                <div class="row"><label>Date &amp; Time</label><span>${receipt.date} ${receipt.time}</span></div>
                <div class="row"><label>Description</label><span>${receipt.description}</span></div>
                <p style="font-size:11px;color:#64748B;margin-top:16px;line-height:1.5">${receipt.message}</p>
                <button class="btn" onclick="window.print()">Download / Print Receipt</button>
            </div>
            <div class="footer">
                <p>First Choice Credit Union · 16344 Sand Hill Rd, Milton, DE 19968</p>
                <p>1-302-555-0144 · www.firstchoicecu.org · Federally Insured by NCUA</p>
                <p>Retain this receipt for your records.</p>
            </div>
        </div></body></html>`;
    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
}

function isAccountOnHold() {
    const data = getAccountData();
    return data.accountStatus === "ON HOLD";
}

function queueTransaction(txData, session, forceHold) {
    const data = getAccountData();
    if (txData.amount < 0 && Math.abs(txData.amount) > data.availableBalance) {
        return { success: false, message: "Insufficient available balance for this transaction." };
    }

    const confirmationId = generateConfirmationId();
    const now = new Date();
    const onHold = forceHold || isAccountOnHold();
    const processingStartedAt = onHold ? null : Date.now();
    const queueStatus = onHold ? "Pending" : "Processing";
    const memberStatus = onHold ? "Pending Review" : "Processing";

    const pending = {
        id: Date.now(),
        confirmationId,
        date: now.toISOString().split("T")[0],
        time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        desc: txData.desc,
        category: txData.category,
        authBy: session.fullName,
        avatar: session.avatarSrc,
        amount: txData.amount,
        status: memberStatus,
        queueStatus,
        processingStartedAt,
        memberVisible: true,
        courtHold: !!onHold,
        meta: txData.meta || {}
    };
    data.pendingTransactions.unshift(pending);

    data.notifications = data.notifications || [];
    data.notifications.unshift({
        id: Date.now() + 1,
        date: pending.date,
        title: onHold ? "Transaction Pending Review" : "Transaction Processing",
        body: onHold
            ? `${txData.desc} is awaiting administrator approval. Ref ${confirmationId}.`
            : `${txData.desc} is processing. It will move to pending review in 10 minutes. Ref ${confirmationId}.`,
        read: false
    });

    updateAccountData(data);
    return {
        success: true,
        pending: true,
        queueStatus,
        receipt: {
            confirmationId,
            type: txData.category,
            description: txData.desc,
            amount: txData.amount,
            date: pending.date,
            time: pending.time,
            status: onHold ? "PENDING REVIEW" : "PROCESSING",
            statusDetail: onHold
                ? "Awaiting Administrator Approval"
                : "Processing — moves to pending review in 10 minutes",
            accountFrom: maskAccount(data.accountNumber),
            routingNumber: data.routingNumber,
            initiatedBy: session.fullName,
            holdRef: onHold ? (data.holdReason || "Admin Review") : "N/A",
            message: onHold
                ? "Your transaction has been received and is pending administrator approval."
                : "Your transaction is processing. After 10 minutes it will move to pending until an administrator approves it. Funds will not post until approval."
        }
    };
}

function queueCourtHoldTransaction(txData, session) {
    return queueTransaction(txData, session, isAccountOnHold());
}

// ── Banking Operations ──

function submitExternalTransfer(amount, recipientName, routing, account, bankName, session) {
    if (amount <= 0) return { success: false, message: "Enter a valid transfer amount." };
    if (!recipientName) return { success: false, message: "Enter recipient name." };
    if (!routing || routing.length !== 9) return { success: false, message: "Enter a valid 9-digit routing number." };
    if (!account) return { success: false, message: "Enter account number." };

    return queueTransaction({
        desc: `Wire to ${recipientName} (${bankName})`,
        category: "Transfer",
        amount: -amount,
        meta: { routing, account, bankName, recipientName }
    }, session);
}

function submitInternalTransfer(amount, toAccount, session) {
    if (amount <= 0) return { success: false, message: "Enter a valid amount." };

    const isToSavings = toAccount === "savings";
    const data = getAccountData();
    const desc = isToSavings
        ? `Transfer to Savings Account ****${data.savingsAccountNumber}`
        : `Transfer from Savings Account ****${data.savingsAccountNumber}`;

    if (isToSavings && amount > data.availableBalance) {
        return { success: false, message: "Insufficient checking balance." };
    }
    if (!isToSavings && amount > (data.savingsBalance || 0)) {
        return { success: false, message: "Insufficient savings balance." };
    }

    return queueTransaction({
        desc,
        category: "Transfer",
        amount: isToSavings ? -amount : amount,
        meta: { internal: isToSavings ? "toSavings" : "fromSavings" }
    }, session);
}

function submitDeposit(amount, method, memo, session) {
    if (amount <= 0) return { success: false, message: "Enter a valid deposit amount." };
    const desc = `${method} Deposit${memo ? " — " + memo : ""}`;
    return queueTransaction({ desc, category: "Deposit", amount, meta: { method, memo } }, session);
}

function submitBillPayment(payeeId, amount, session) {
    if (amount <= 0) return { success: false, message: "Enter a valid payment amount." };

    const data = getAccountData();
    const payee = data.payees.find(p => p.id === payeeId);
    if (!payee) return { success: false, message: "Select a valid payee." };

    return queueTransaction({
        desc: `Bill Pay — ${payee.name}`,
        category: "Bill Pay",
        amount: -amount,
        meta: { payeeId, payeeName: payee.name }
    }, session);
}

function addPayee(name, account, category) {
    const data = getAccountData();
    const id = data.payees.length ? Math.max(...data.payees.map(p => p.id)) + 1 : 1;
    data.payees.push({ id, name, account, category });
    updateAccountData(data);
    return { success: true };
}

function submitZellePayment(amount, recipientName, contactType, contactValue, memo, session) {
    if (amount <= 0) return { success: false, message: "Enter a valid amount." };
    if (!recipientName) return { success: false, message: "Enter recipient name." };
    if (!contactValue) return { success: false, message: "Enter email or phone number." };

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^[\d\s\-\(\)\+]{10,}$/;
    if (contactType === "email" && !emailRe.test(contactValue)) {
        return { success: false, message: "Enter a valid email address." };
    }
    if (contactType === "phone" && !phoneRe.test(contactValue.replace(/\s/g, ""))) {
        return { success: false, message: "Enter a valid phone number." };
    }

    const data = getAccountData();
    if (amount > data.availableBalance) {
        return { success: false, message: "Insufficient available balance." };
    }

    const desc = `${BANK_BRAND.payProduct} to ${recipientName} (${contactValue})${memo ? " — " + memo : ""}`;

    return queueTransaction({
        desc,
        category: "FCCU Pay",
        amount: -amount,
        meta: { recipientName, contactType, contactValue, memo }
    }, session);
}

function addZelleContact(name, contact, type) {
    const data = getAccountData();
    if (!data.zelleContacts) data.zelleContacts = [];
    data.zelleContacts.push({ name, contact, type });
    updateAccountData(data);
}

function toggleCardFreeze() {
    const data = getAccountData();
    data.cardFrozen = !data.cardFrozen;
    updateAccountData(data);
    return data.cardFrozen;
}

function approveTransaction(index) {
    const data = getAccountData();
    const approved = data.pendingTransactions.splice(index, 1)[0];
    if (!approved) return null;

    data.transactions.unshift({
        id: generateTxId(),
        date: approved.date,
        desc: approved.desc,
        category: approved.category || "Transfer",
        authBy: approved.authBy,
        avatar: approved.avatar,
        amount: approved.amount,
        status: "Posted",
        confirmationId: approved.confirmationId
    });

    data.availableBalance += approved.amount;
    data.currentBalance += approved.amount;

    if (approved.meta && approved.meta.internal === "toSavings") {
        data.savingsBalance = (data.savingsBalance || 0) + Math.abs(approved.amount);
    }
    if (approved.meta && approved.meta.internal === "fromSavings") {
        data.savingsBalance = (data.savingsBalance || 0) - Math.abs(approved.amount);
    }

    data.notifications = data.notifications || [];
    data.notifications.unshift({
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        title: "Transaction Approved",
        body: `${approved.desc} was approved and posted. Ref ${approved.confirmationId || "—"}.`,
        read: false
    });

    updateAccountData(data);
    return approved;
}

function rejectTransaction(index) {
    const data = getAccountData();
    const rejected = data.pendingTransactions.splice(index, 1)[0];
    updateAccountData(data);
    return rejected;
}

// ── Statements ──

function getAvailableStatementMonths() {
    const data = getAccountData();
    const months = new Set();
    data.transactions.forEach(tx => {
        const [y, m] = tx.date.split("-");
        months.add(`${y}-${m}`);
    });
    const now = new Date();
    months.add(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);
    return Array.from(months).sort().reverse();
}

function openTransactionReceipt(receipt) {
    const amtClass = receipt.amount < 0 ? "#DC2626" : "#059669";
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
        <title>Transaction Receipt — ${receipt.confirmationId}</title>
        <style>
            *{box-sizing:border-box}body{font-family:Georgia,serif;margin:0;padding:40px;color:#1E293B;background:#F8FAFC}
            .receipt{max-width:520px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.1)}
            .header{background:#0B3D2E;color:white;padding:24px;text-align:center}
            .header img{width:40px;height:40px;margin-bottom:8px}
            .header h1{font-size:18px;font-weight:300;text-transform:lowercase;margin:0}
            .stripe{height:4px;background:linear-gradient(90deg,#8B7340,#C4A35A,#8B7340)}
            .status{background:#ECFDF5;color:#065F46;padding:12px 24px;font-size:12px;font-weight:600;text-align:center;border-bottom:1px solid #A7F3D0}
            .body{padding:24px}
            .row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #F1F5F9;font-size:13px}
            .row label{color:#64748B;font-size:11px;text-transform:uppercase;letter-spacing:0.05em}
            .row span{font-weight:600;text-align:right;max-width:60%}
            .amount{font-size:28px;font-weight:700;font-family:monospace;text-align:center;padding:20px 0;color:${amtClass}}
            .footer{padding:16px 24px;background:#F8FAFC;font-size:10px;color:#94A3B8;text-align:center;line-height:1.6}
            .btn{display:block;width:100%;padding:12px;margin-top:16px;background:#0B3D2E;color:white;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer}
            @media print{.btn{display:none}body{padding:0;background:white}}
        </style></head><body>
        <div class="receipt">
            <div class="header"><img src="logo.svg" alt=""><h1>${BANK_BRAND.displayName}</h1><p style="font-size:11px;opacity:0.7;margin-top:4px">Official Transaction Receipt</p></div>
            <div class="stripe"></div>
            <div class="status">${receipt.status} — ${receipt.statusDetail}</div>
            <div class="body">
                <div class="amount">${formatCurrencySigned(receipt.amount)}</div>
                <div class="row"><label>Confirmation #</label><span style="font-family:monospace">${receipt.confirmationId}</span></div>
                <div class="row"><label>Transaction Type</label><span>${receipt.type}</span></div>
                <div class="row"><label>Description</label><span>${receipt.description}</span></div>
                <div class="row"><label>Date &amp; Time</label><span>${receipt.date} ${receipt.time}</span></div>
                <div class="row"><label>From Account</label><span>${receipt.accountFrom}</span></div>
                <div class="row"><label>Routing</label><span>${receipt.routingNumber}</span></div>
                <div class="row"><label>Initiated By</label><span>${receipt.initiatedBy}</span></div>
                <p style="font-size:11px;color:#64748B;margin-top:16px;line-height:1.5">${receipt.message}</p>
                <button class="btn" onclick="window.print()">Print Receipt</button>
            </div>
            <div class="footer">
                <p>${BANK_BRAND.name} · ${BANK_BRAND.address}</p>
                <p>${BANK_BRAND.phone} · Federally Insured by NCUA</p>
            </div>
        </div></body></html>`;
    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
}

function getStatementTransactions(year, month) {
    const data = getAccountData();
    const prefix = `${year}-${String(month).padStart(2, "0")}`;
    return data.transactions.filter(tx => tx.date.startsWith(prefix));
}

function openStatement(year, month) {
    const txs = getStatementTransactions(year, month);
    const data = getAccountData();
    const monthName = new Date(year, month - 1).toLocaleString("en-US", { month: "long", year: "numeric" });

    let runningBalance = data.currentBalance;
    txs.forEach(tx => { runningBalance -= tx.amount; });
    let balance = runningBalance;

    const rows = txs.map(tx => {
        balance += tx.amount;
        const amtClass = tx.amount < 0 ? "color:#DC2626" : "color:#059669";
        return `<tr>
            <td style="padding:8px;border-bottom:1px solid #E2E8F0;font-size:13px">${tx.date}</td>
            <td style="padding:8px;border-bottom:1px solid #E2E8F0;font-size:13px">${tx.desc}</td>
            <td style="padding:8px;border-bottom:1px solid #E2E8F0;font-size:13px;text-align:right;${amtClass};font-family:monospace">${formatCurrencySigned(tx.amount)}</td>
            <td style="padding:8px;border-bottom:1px solid #E2E8F0;font-size:13px;text-align:right;font-family:monospace">$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
        </tr>`;
    }).join("");

    const totalDeposits = txs.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const totalWithdrawals = txs.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
        <title>Statement — ${monthName}</title>
        <style>
            body{font-family:Georgia,serif;margin:0;padding:40px;color:#1E293B}
            .header{display:flex;justify-content:space-between;border-bottom:3px solid #0B3D2E;padding-bottom:20px;margin-bottom:30px}
            .logo{font-size:24px;font-weight:bold;color:#0B3D2E}
            table{width:100%;border-collapse:collapse;margin-top:20px}
            th{text-align:left;padding:10px 8px;border-bottom:2px solid #0B3D2E;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748B}
            .summary{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin:30px 0;padding:20px;background:#F8FAFC;border-radius:8px}
            .summary-item label{display:block;font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:1px}
            .summary-item span{font-size:20px;font-weight:bold;font-family:monospace}
            .footer{margin-top:40px;padding-top:20px;border-top:1px solid #E2E8F0;font-size:11px;color:#94A3B8;text-align:center}
            @media print{body{padding:20px}}
        </style></head><body>
        <div class="header">
            <div>
                <div class="logo">${BANK_BRAND.name}</div>
                <div style="font-size:12px;color:#64748B;margin-top:4px">${BANK_BRAND.tagline} — Federally Insured by NCUA</div>
                <div style="font-size:11px;color:#64748B;margin-top:2px">${BANK_BRAND.address}</div>
            </div>
            <div style="text-align:right;font-size:13px">
                <div><strong>Account Statement</strong></div>
                <div>${monthName}</div>
                <div style="margin-top:8px;font-family:monospace">Acct: ${maskAccount(data.accountNumber)}</div>
                <div style="font-family:monospace">Routing: ${data.routingNumber}</div>
                <div>Member: Kenneth Thatcher</div>
            </div>
        </div>
        <div class="summary">
            <div class="summary-item"><label>Opening Balance</label><span>$${runningBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
            <div class="summary-item"><label>Total Deposits</label><span style="color:#059669">+$${totalDeposits.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
            <div class="summary-item"><label>Total Withdrawals</label><span style="color:#DC2626">-$${totalWithdrawals.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
        </div>
        <table><thead><tr><th>Date</th><th>Description</th><th style="text-align:right">Amount</th><th style="text-align:right">Balance</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="4" style="text-align:center;padding:20px;color:#94A3B8">No transactions this period</td></tr>'}</tbody></table>
        <div class="summary" style="margin-top:30px">
            <div class="summary-item"><label>Closing Balance</label><span>$${data.currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
            <div class="summary-item"><label>Available Balance</label><span>$${data.availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
            <div class="summary-item"><label>Transactions</label><span>${txs.length}</span></div>
        </div>
        <div class="footer">
            <p>${BANK_BRAND.name} | ${BANK_BRAND.phone} | ${BANK_BRAND.website}</p>
            <p>${BANK_BRAND.address}</p>
            <p>Generated ${new Date().toLocaleString("en-US")}</p>
        </div>
        <script>window.onload=function(){window.print()}</script>
        </body></html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
}

// ── Business Accounts Portal ──

function getActiveEntity() {
    const data = getAccountData();
    const list = data.entities || INITIAL_ACCOUNT_DATA.entities;
    return list.find(e => e.id === data.activeEntityId) || list[0];
}

function setActiveEntity(entityId) {
    const data = getAccountData();
    data.activeEntityId = entityId;
    updateAccountData(data);
    return getActiveEntity();
}

function getCashFlowSummary(monthsBack) {
    const data = getAccountData();
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - (monthsBack || 1));
    const txs = (data.transactions || []).filter(tx => {
        const d = new Date(tx.date + "T12:00:00");
        return !Number.isNaN(d.getTime()) && d >= cutoff;
    });
    const inflow = txs.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const outflow = txs.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const byDay = {};
    txs.forEach(tx => {
        if (!byDay[tx.date]) byDay[tx.date] = { date: tx.date, in: 0, out: 0 };
        if (tx.amount > 0) byDay[tx.date].in += tx.amount;
        else byDay[tx.date].out += Math.abs(tx.amount);
    });
    return {
        inflow,
        outflow,
        net: inflow - outflow,
        days: Object.values(byDay).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 14)
    };
}

function openNewAccount(accountType, nickname) {
    const data = getAccountData();
    if (!data.additionalAccounts) data.additionalAccounts = [];
    const last4 = String(1000 + Math.floor(Math.random() * 9000));
    const record = {
        id: "acct_" + Date.now(),
        type: accountType,
        nickname: nickname || accountType,
        last4,
        balance: 0,
        openedOn: new Date().toISOString().split("T")[0],
        status: "Open — Pending Funding"
    };
    data.additionalAccounts.unshift(record);
    data.notifications = data.notifications || [];
    data.notifications.unshift({
        id: Date.now(),
        date: record.openedOn,
        title: "New Account Opened",
        body: `Your ${accountType} (****${last4}) is ready. Fund the account to begin using it.`,
        read: false
    });
    updateAccountData(data);
    return { success: true, account: record };
}

function linkExternalAccount(provider, handle) {
    const data = getAccountData();
    if (!data.linkedAccounts) data.linkedAccounts = [];
    const existing = data.linkedAccounts.find(a => a.provider === provider);
    const record = {
        id: existing ? existing.id : "link_" + Date.now(),
        provider,
        handle: handle || "",
        linkedOn: new Date().toISOString().split("T")[0],
        status: "Linked"
    };
    if (existing) Object.assign(existing, record);
    else data.linkedAccounts.unshift(record);
    updateAccountData(data);
    return { success: true, account: record };
}

function unlinkExternalAccount(id) {
    const data = getAccountData();
    data.linkedAccounts = (data.linkedAccounts || []).filter(a => a.id !== id);
    updateAccountData(data);
    return true;
}

// ── Chat ──

function getChatData() {
    if (!localStorage.getItem(STORAGE_PREFIX + "chat_data")) {
        localStorage.setItem(STORAGE_PREFIX + "chat_data", JSON.stringify(INITIAL_CHATS));
    }
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX + "chat_data"));
}

function sendChatMessage(sender, msg) {
    const chats = getChatData();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    chats.push({ sender, msg, timestamp: timeStr });
    localStorage.setItem(STORAGE_PREFIX + "chat_data", JSON.stringify(chats));
}
