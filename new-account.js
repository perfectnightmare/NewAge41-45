// new-account.js
const LADY_NAME = 'Odette';           // Step 37
const START_AT = Number(process.env.START_AT || 74);       // test from a step
const STOP_AT = Number(process.env.STOP_AT || 76);      // test up to a step
//74,75 - collect achievement rewards if any
//76 - redistribute stats even if less than 200

const V3 = 'https://v3.g.ladypopular.com';
const BLOCKS = { eventId: 484, zoneId: 1852 };
const BOARD = { eventId: 395, zoneId: 320 };

// ---------------------------------------------------------------- bodies
const SALON_SAVE_3 = 'type=save&appearance%5B0%5D%5Btype%5D=1&appearance%5B0%5D%5Bnum%5D=23&appearance%5B0%5D%5Bcolor%5D=7&appearance%5B0%5D%5Bsize%5D=1&appearance%5B1%5D%5Btype%5D=2&appearance%5B1%5D%5Bnum%5D=19&appearance%5B1%5D%5Bcolor%5D=16&appearance%5B1%5D%5Bsize%5D=1&appearance%5B2%5D%5Btype%5D=3&appearance%5B2%5D%5Bnum%5D=12&appearance%5B2%5D%5Bcolor%5D=&appearance%5B3%5D%5Btype%5D=5&appearance%5B3%5D%5Bnum%5D=191&appearance%5B3%5D%5Bcolor%5D=14&appearance%5B4%5D%5Btype%5D=8&appearance%5B4%5D%5Bnum%5D=1&appearance%5B4%5D%5Bcolor%5D=1&appearance%5B4%5D%5Bsize%5D=0&appearance%5B5%5D%5Btype%5D=9&appearance%5B5%5D%5Bnum%5D=14&appearance%5B5%5D%5Bcolor%5D=2&appearance%5B6%5D%5Btype%5D=11&appearance%5B6%5D%5Bnum%5D=2&appearance%5B6%5D%5Bcolor%5D=12&appearance%5B7%5D%5Btype%5D=4&appearance%5B7%5D%5Bnum%5D=4&appearance%5B7%5D%5Bcolor%5D=1&appearance%5B8%5D%5Btype%5D=10&appearance%5B8%5D%5Bnum%5D=9&appearance%5B8%5D%5Bcolor%5D=34&appearance%5B9%5D%5Btype%5D=12&appearance%5B9%5D%5Bnum%5D=1&appearance%5B9%5D%5Bcolor%5D=12';

// appearance (body/makeup) part of the wardrobe saves - same on every account
const APPEARANCE_20 = '&appearance%5B0%5D%5Btype%5D=1&appearance%5B0%5D%5Bnum%5D=23&appearance%5B0%5D%5Bcolor%5D=7&appearance%5B0%5D%5Bsize%5D=1&appearance%5B1%5D%5Btype%5D=2&appearance%5B1%5D%5Bnum%5D=19&appearance%5B1%5D%5Bcolor%5D=16&appearance%5B1%5D%5Bsize%5D=1&appearance%5B2%5D%5Btype%5D=3&appearance%5B2%5D%5Bnum%5D=12&appearance%5B2%5D%5Bcolor%5D=1&appearance%5B3%5D%5Btype%5D=5&appearance%5B3%5D%5Bnum%5D=191&appearance%5B3%5D%5Bcolor%5D=14&appearance%5B4%5D%5Btype%5D=8&appearance%5B4%5D%5Bnum%5D=1&appearance%5B4%5D%5Bcolor%5D=1&appearance%5B5%5D%5Btype%5D=9&appearance%5B5%5D%5Bnum%5D=14&appearance%5B5%5D%5Bcolor%5D=2&appearance%5B6%5D%5Btype%5D=10&appearance%5B6%5D%5Bnum%5D=9&appearance%5B6%5D%5Bcolor%5D=34&appearance%5B7%5D%5Btype%5D=11&appearance%5B7%5D%5Bnum%5D=2&appearance%5B7%5D%5Bcolor%5D=12&appearance%5B8%5D%5Btype%5D=12&appearance%5B8%5D%5Bnum%5D=1&appearance%5B8%5D%5Bcolor%5D=12&appearance%5B9%5D%5Btype%5D=4&appearance%5B9%5D%5Bnum%5D=4&appearance%5B9%5D%5Bcolor%5D=1';

const APPEARANCE_55 = '&appearance%5B0%5D%5Btype%5D=4&appearance%5B0%5D%5Bnum%5D=4&appearance%5B0%5D%5Bcolor%5D=1&appearance%5B1%5D%5Btype%5D=1&appearance%5B1%5D%5Bnum%5D=23&appearance%5B1%5D%5Bcolor%5D=7&appearance%5B1%5D%5Bsize%5D=1&appearance%5B2%5D%5Btype%5D=2&appearance%5B2%5D%5Bnum%5D=19&appearance%5B2%5D%5Bcolor%5D=16&appearance%5B2%5D%5Bsize%5D=1&appearance%5B3%5D%5Btype%5D=3&appearance%5B3%5D%5Bnum%5D=12&appearance%5B3%5D%5Bcolor%5D=1&appearance%5B4%5D%5Btype%5D=5&appearance%5B4%5D%5Bnum%5D=191&appearance%5B4%5D%5Bcolor%5D=14&appearance%5B5%5D%5Btype%5D=8&appearance%5B5%5D%5Bnum%5D=1&appearance%5B5%5D%5Bcolor%5D=1&appearance%5B6%5D%5Btype%5D=9&appearance%5B6%5D%5Bnum%5D=14&appearance%5B6%5D%5Bcolor%5D=2&appearance%5B7%5D%5Btype%5D=10&appearance%5B7%5D%5Bnum%5D=9&appearance%5B7%5D%5Bcolor%5D=34&appearance%5B8%5D%5Btype%5D=11&appearance%5B8%5D%5Bnum%5D=2&appearance%5B8%5D%5Bcolor%5D=12&appearance%5B9%5D%5Btype%5D=12&appearance%5B9%5D%5Bnum%5D=1&appearance%5B9%5D%5Bcolor%5D=12';

const FILTER_54 = 'isArchive=false&wardrobePage=wardrobe&ajaxPostUrl=%2Fajax%2Fwardrobe%2Flady.php&selectedPet=&isFavourite=false&contentType=&contentId=&hasItems=true&currentPageNum=1&availableFilterColors%5B%5D=1&availableFilterColors%5B%5D=6&availableFilterColors%5B%5D=8&availableFilterColors%5B%5D=13&availableFilterColors%5B%5D=15&availableFilterColors%5B%5D=17&availableFilterColors%5B%5D=19&availableFilterColors%5B%5D=56&availableFilterColors%5B%5D=68&availableFilterColors%5B%5D=85&routeToMall=%2Fmall%2Fmall.php%3FmallType%3D1%26categoryId%3D%2525categoryId%2525&event_id%5B%5D=395&archive=false&favourites=false&pose=false&animated=false&filter_out_tagged=false&pet=0&empty_filter=false&wardrobetype=lady&default_category=false&page=1&hasMore=false&updatePartials%5B%5D=3';

// Step 81 makeup save (from your latest recorded fetch)
const SALON_RQ5 = 'type=save&appearance%5B0%5D%5Btype%5D=1&appearance%5B0%5D%5Bnum%5D=23&appearance%5B0%5D%5Bcolor%5D=7&appearance%5B0%5D%5Bsize%5D=1&appearance%5B1%5D%5Btype%5D=2&appearance%5B1%5D%5Bnum%5D=31&appearance%5B1%5D%5Bcolor%5D=16&appearance%5B1%5D%5Bsize%5D=1&appearance%5B2%5D%5Btype%5D=3&appearance%5B2%5D%5Bnum%5D=10&appearance%5B2%5D%5Bcolor%5D=&appearance%5B3%5D%5Btype%5D=5&appearance%5B3%5D%5Bnum%5D=386&appearance%5B3%5D%5Bcolor%5D=14&appearance%5B4%5D%5Btype%5D=8&appearance%5B4%5D%5Bnum%5D=1&appearance%5B4%5D%5Bcolor%5D=1&appearance%5B5%5D%5Btype%5D=9&appearance%5B5%5D%5Bnum%5D=30&appearance%5B5%5D%5Bcolor%5D=14&appearance%5B6%5D%5Btype%5D=10&appearance%5B6%5D%5Bnum%5D=9&appearance%5B6%5D%5Bcolor%5D=34&appearance%5B7%5D%5Btype%5D=11&appearance%5B7%5D%5Bnum%5D=2&appearance%5B7%5D%5Bcolor%5D=12&appearance%5B8%5D%5Btype%5D=12&appearance%5B8%5D%5Bnum%5D=1&appearance%5B8%5D%5Bcolor%5D=12&appearance%5B9%5D%5Btype%5D=4&appearance%5B9%5D%5Bnum%5D=4&appearance%5B9%5D%5Bcolor%5D=1';

// Step 76 amounts
const AMOUNTS = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  2, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
  49, 52, 55, 58, 61, 64, 67, 70, 73, 77, 81, 85, 89, 93, 97, 101, 105,
  109, 113, 117, 121, 125, 129, 134, 139, 144, 149, 155, 161, 167, 173, 179,
  187, 193, 199, 205, 211, 217, 223, 229, 236, 243, 250, 257, 264, 272, 280,
  288, 296, 304, 312, 321, 330, 339, 348, 357, 366, 375, 385, 395, 405, 415,
  425, 435, 445, 455, 465, 476, 487, 498, 509, 520, 532, 544, 556, 568, 581,
  594, 607, 620, 633, 646, 659, 672, 685, 698, 711, 724, 738, 752, 767, 782,
  797, 812, 827, 842, 858, 874, 890, 906, 922, 939, 956, 973, 990, 1007, 1024,
  1042, 1060, 1078, 1096, 1114, 1132, 1150, 1168, 1187, 1206, 1225, 1244, 1264,
  1284, 1304, 1324, 1346, 1368, 1390, 1412, 1434, 1456, 1478, 1500, 1522, 1544,
  1566, 1588, 1610, 1632, 1656, 1680, 1704, 1728, 1752, 1776, 1800, 1824, 1848,
  1874, 1900, 1926, 1952, 1978, 2000
];

// ---------------------------------------------------------------- GraphQL queries (trimmed to the fields we use)
const Q = {
  enterZone: 'mutation EnterZone($eventId: Int!, $zoneId: Int!) { blocks { EnterZoneMutation(eventId: $eventId, zoneId: $zoneId) { status message zone_info { id map available_clicks } } } }',
  clickBlock: 'mutation ClickBlock($eventId: Int!, $zoneId: Int!, $positionX: Int!, $positionY: Int!, $booster: String!) { blocks { ClickBlockMutation(eventId: $eventId, zoneId: $zoneId, positionX: $positionX, positionY: $positionY, booster: $booster) { status message zone_info { map available_clicks lady_boosters { bomb color_bomb hammer } } } } }',
  buyBooster: 'mutation BuyBoosterPack($eventId: Int!, $booster: String!, $packId: Int!) { blocks { BuyBoosterPackMutation(eventId: $eventId, booster: $booster, packId: $packId) { status message lady_boosters { bomb color_bomb hammer } } } }',
  openSquare: 'mutation OpenBoardSquare($eventId: Int!, $zoneId: Int!, $positionX: Int!, $positionY: Int!) { board { OpenSquareMutation(eventId: $eventId, zoneId: $zoneId, positionX: $positionX, positionY: $positionY) { status message is_zone_completed } } }'
};

// ---------------------------------------------------------------- helpers
const authState = { token: null };
const listening = new WeakSet();

function attachTokenListener(page) {
  if (listening.has(page)) return;
  listening.add(page);
  page.on('request', (req) => {
    if (req.url().includes('/api/graphql')) {
      const a = req.headers()['authorization'];
      if (a) authState.token = a;
    }
  });
}

function jwtExpMs(bearer) {
  try {
    const payload = bearer.replace(/^Bearer\s+/i, '').split('.')[1];
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp * 1000;
  } catch (e) { return Infinity; }
}

async function getToken(page) {
  const fresh = () => authState.token && jwtExpMs(authState.token) - Date.now() > 60000;
  if (fresh()) return authState.token;
  authState.token = null;
  for (let i = 0; i < 3; i++) {
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    for (let t = 0; t < 40 && !authState.token; t++) await page.waitForTimeout(500);
    if (authState.token) return authState.token;
  }
  throw new Error('No GraphQL token seen on this page (the page sent no /api/graphql request).');
}

const sleep = (page, s) => page.waitForTimeout(s * 1000);
const goto = (page, url) => page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
const reload = (page) => page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });

async function postForm(page, path, body) {
  return page.evaluate(async ({ path, body }) => {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body, credentials: 'include'
    });
    const text = await res.text();
    try { return JSON.parse(text); }
    catch (e) { return { __nonjson: true, http: res.status, text: text.slice(0, 300) }; }
  }, { path, body });
}

async function getJson(page, path) {
  return page.evaluate(async (path) => {
    const res = await fetch(path, { headers: { 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
    const text = await res.text();
    try { return JSON.parse(text); }
    catch (e) { return { __nonjson: true, http: res.status, text: text.slice(0, 300) }; }
  }, path);
}

async function gql(page, operationName, query, variables = {}) {
  const token = await getToken(page);
  const json = await page.evaluate(async ({ operationName, query, variables, token }) => {
    const res = await fetch('/api/graphql/index.php', {
      method: 'POST',
      headers: {
        accept: 'application/graphql-response+json,application/json;q=0.9',
        authorization: token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ operationName, variables, query }),
      credentials: 'include'
    });
    const text = await res.text();
    try { return JSON.parse(text); }
    catch (e) { return { __nonjson: true, http: res.status, text: text.slice(0, 300) }; }
  }, { operationName, query, variables, token });
  if (json.__nonjson || json.errors) {
    console.log('❌ GraphQL raw:', JSON.stringify(json).slice(0, 600));
    throw new Error(`${operationName} returned an error`);
  }
  return json;
}

function raw(json) { return JSON.stringify(json).slice(0, 500); }

// status === 1 is success (some BP duel requests legitimately return 3)
function need(json, label, allowed = [1]) {
  if (!json || json.__nonjson || !allowed.includes(json.status)) {
    console.log(`❌ ${label} raw: ${raw(json)}`);
    throw new Error(`${label} failed`);
  }
}
function needReward(json, label) {
  if (!json || json.__nonjson || !Array.isArray(json.reward)) {
    console.log(`❌ ${label} raw: ${raw(json)}`);
    throw new Error(`${label} failed`);
  }
}
function soft(json, label) {   // steps 77-81: log only
  if (!json || json.__nonjson || json.status !== 1) console.log(`⚠️ ${label}: unexpected response ${raw(json)}`);
  else console.log(`✅ ${label}`);
}
function needGql(status, label, raw_) {
  if (status !== 1) {
    console.log(`❌ ${label} raw: ${JSON.stringify(raw_).slice(0, 500)}`);
    throw new Error(`${label} failed`);
  }
}

async function claim(page, questId, waitSec, reloadAfter = false) {
  let json = null;
  for (let attempt = 1; attempt <= 4; attempt++) {
    json = await postForm(page, '/ajax/quests.php', `type=giveTutorialQuestReward&quest_id=${questId}`);
    if (json && !json.__nonjson && Array.isArray(json.reward)) break;
    console.log(`⚠️ Claim quest ${questId} attempt ${attempt}/4 not ready: ${json && json.message ? json.message : raw(json)}`);
    if (attempt < 4) await sleep(page, 10);
  }
  needReward(json, `Claim quest ${questId}`);
  console.log(`🎁 Quest ${questId} claimed`);
  if (reloadAfter) await reload(page);
  await sleep(page, waitSec);
}

// ---------------------------------------------------------------- wardrobe: look up this account's own row IDs
// category ids: 2 bags, 6 bracelets, 9 dresses, 10 earrings, 13 necklaces, 18 shoes
async function loadCategoryTiles(page, categoryId) {
  const json = await postForm(page, '/ajax/wardrobe.php',
    `wardrobetype=lady&category_id%5B%5D=${categoryId}&archive=0&pet=0&updatePartials%5B%5D=10&updatePartials%5B%5D=3`);
  if (!json || json.status !== 1 || !json.partials || !json.partials.partial3) {
    console.log(`❌ wardrobe category ${categoryId} raw: ${raw(json)}`);
    throw new Error(`Wardrobe category ${categoryId} failed`);
  }
  const tiles = {};
  const re = /\$\('#item-(\d+)'\)\.data\('item',\s*(\{[^\n]*?\})\);/g;
  for (const m of json.partials.partial3.matchAll(re)) {
    try { tiles[m[1]] = JSON.parse(m[2]); } catch (e) { /* skip unparsable tile */ }
  }
  return tiles;
}

async function buildWardrobeSave(page, pieces, appearancePart) {
  const cache = {};
  let items = '';
  for (let i = 0; i < pieces.length; i++) {
    const [cat, type, color, offset] = pieces[i];
    const off = offset ?? -(i + 1);
    if (!cache[cat]) cache[cat] = await loadCategoryTiles(page, cat);
    const tile = cache[cat][String(type)];
    const hit = tile && (tile.colors || []).find(c => Number(c.color) === Number(color));
    if (!hit) throw new Error(`Wardrobe: this account does not own item type ${type} in colour ${color} (category ${cat})`);
    console.log(`👗 slot ${i}: type ${type} colour ${color} -> row id ${hit.concrete_id}, offset ${off}`);
    items += `&items%5B${i}%5D%5Bid%5D=${hit.concrete_id}&items%5B${i}%5D%5Boffset%5D=${off}`;
  }
  return 'action=saveChanges&selectedPet=' + items + appearancePart;
}

// ---------------------------------------------------------------- grid helpers
const CODE = { yellow: 'Y', purple: 'P', green: 'G', orange: 'O', red: 'R', blue: 'B' };
function checkGrid(map) {
  if (!Array.isArray(map) || map.length !== 10 || map.some(r => !Array.isArray(r) || r.length !== 10)) {
    console.log('❌ map is not 10x10:', JSON.stringify(map).slice(0, 400));
    throw new Error('Board map is not 10x10');
  }
}
function printGrid(map) {
  map.forEach((row, r) => console.log(`r${r}  ` + row.map(c => CODE[c] || '?').join(' ')));
}
function findFirst(map, color) {
  checkGrid(map);
  printGrid(map);
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 10; c++)
      if (map[r][c] === color) {
        console.log(`🎯 ${color} found at row ${r}, col ${c} -> positionX=${r}, positionY=${c}`);
        return { x: r, y: c };
      }
  throw new Error(`No ${color} block found on the board`);
}

// ---------------------------------------------------------------- BP judging (Steps 7 / 46)
async function judgeOnce(page) {
  const t0 = Date.now();
  while (Date.now() - t0 < 10000) {
    const duel = await page.evaluate(async () => {
      const res = await fetch('/ajax/beauty_pageant.php', {
        method: 'POST', body: new URLSearchParams({ action: 'judgeDuel' }), credentials: 'same-origin'
      });
      try { return await res.json(); } catch (e) { return null; }
    });
    const matches = duel && duel.html ? [...duel.html.matchAll(/<a id="ladyIdContainer-(\d+)-([^"]+)"/g)] : [];
    if (duel && duel.duel_id && matches.length === 2) {
      const pick = matches[Math.random() < 0.5 ? 0 : 1];
      const res = await page.evaluate(async ({ duelId, winnerId, winnerGameId }) => {
        const r = await fetch('/ajax/beauty_pageant.php', {
          method: 'POST',
          body: new URLSearchParams({ action: 'chooseWinner', duel_id: duelId, winner_id: winnerId, winner_game_id: winnerGameId }),
          credentials: 'same-origin'
        });
        try { return await r.json(); } catch (e) { return null; }
      }, { duelId: duel.duel_id, winnerId: pick[1], winnerGameId: pick[2] });
      // success = the game returned a finished duel object (status is not used here)
      if (res && res.duel && res.duel.duel_id) { console.log(`👑 Judged duel ${duel.duel_id} ✔️`); return true; }
      console.log(`⚠️ chooseWinner raw: ${raw(res)}`);
      return false;
    }
    await page.waitForTimeout(500);
  }
  console.log('⚠️ No valid duel within 10s');
  return false;
}

async function judgeThree(page) {
  let ok = 0, cycles = 0;
  while (ok < 3 && cycles < 5) {
    cycles++;
    if (await judgeOnce(page)) ok++;
    await sleep(page, 3);
  }
  console.log(`👑 Successful judgements: ${ok}/3 (cycles used: ${cycles})`);
  if (ok < 3) throw new Error('Could not complete 3 judgements');
  await reload(page);
  await sleep(page, 5);
}

const goBP = async (page) => { await goto(page, `${V3}/beauty_pageant.php`); };

// ---------------------------------------------------------------- achievements (Steps 74 / 75)
async function collectAchievementIds(page) {
  const json = await postForm(page, '/ajax/quests.php', 'type=getAchievementsPopup&tab=main');
  if (!json || json.status !== 1 || !json.html) { console.log(`❌ Step 74 raw: ${raw(json)}`); throw new Error('Step 74 failed'); }
  const ids = await page.evaluate((html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const out = [];
    doc.querySelectorAll('article.single-achievement').forEach(a => {
      if (a.classList.contains('dummy-achievement-tile') || !a.classList.contains('ready')) return;
      const btn = a.querySelector('.achievement-action-button');
      const m = btn && (btn.getAttribute('onclick') || '').match(/this,\s*(\d+)/);
      const h = a.querySelector('.headline');
      if (m) out.push({ id: m[1], headline: h ? h.textContent.trim() : '' });
    });
    return out;
  }, json.html);
  console.log(`📋 Ready achievements: ${ids.length}`);
  ids.forEach(i => console.log(`   ${i.id} | ${i.headline}`));
  await sleep(page, 10);
  return ids.map(i => i.id);
}

async function claimAchievements(page, ids) {
  for (const id of ids) {
    const json = await postForm(page, '/ajax/quests.php', `type=getReward&quest_id=${id}`);
    if (json && json.won_reward && json.won_reward.status === 1) console.log(`🎁 Achievement ${id} claimed`);
    else console.log(`⚠️ Achievement ${id} not claimed: ${raw(json)} (skipping)`);
    await page.waitForTimeout(500);
  }
  await sleep(page, 10);
  await reload(page);
}

// ---------------------------------------------------------------- the script
module.exports = async function runNewAccount(page) {
  attachTokenListener(page);
  const ctx = {};

  const steps = [

    // Steps 1 & 2: nothing to do, just wait
    [1, 'Wait before start', async () => { await sleep(page, 10); }],

    [3, 'Makeup', async () => {
      await goto(page, `${V3}/beauty_salon.php`);       // makes sure we are on the game domain
      const j = await postForm(page, '/ajax/beauty_salon_lady.php', SALON_SAVE_3);
      need(j, 'Step 3 makeup');
      await sleep(page, 10);
      await reload(page);
      await sleep(page, 5);
    }],

    [4, 'Wardrobe page', async () => {
      await goto(page, `${V3}/wardrobe.php?wardrobetype=lady&archive=0&category_id%5B0%5D=9`);
      await reload(page);
      await sleep(page, 5);
    }],

    [5, 'Dress up (2nd saved outfit)', async () => {
      const j = await postForm(page, '/ajax/wardrobe/lady.php', 'action=loadOutfits&offset=0');
      need(j, 'Step 5a loadOutfits');
      if (!Array.isArray(j.outfits) || j.outfits.length < 2) throw new Error('Step 5a: fewer than 2 saved outfits');
      ctx.outfitId = j.outfits[1].id;
      console.log(`👗 2nd outfit id = ${ctx.outfitId}`);
      await sleep(page, 5);
      const k = await postForm(page, '/ajax/wardrobe/lady.php',
        `action=changeOutfit&outfitId=${ctx.outfitId}&wardrobetype=wardrobe&contenttype=&contentid=&page=1&apply_appearance=true`);
      need(k, 'Step 5b changeOutfit');
      await sleep(page, 10);
    }],

    [6, 'Go to BP', async () => { await goBP(page); }],
    [7, 'BP: 3 judgements', async () => { await judgeThree(page); }],

    [8, 'BP: spend 1 ticket', async () => {
      const j = await postForm(page, '/ajax/beauty_pageant.php', 'action=competeInDuel&is_tutorial_competing=true');
      need(j, 'Step 8 competeInDuel', [1, 3]);
      await sleep(page, 5);
    }],

    [9, 'BP: spend all tickets', async () => {
      const j = await postForm(page, '/ajax/beauty_pageant.php', 'action=massCompete&is_tutorial_competing=true');
      need(j, 'Step 9 massCompete', [1, 3]);
      await sleep(page, 10);
    }],

    [10, 'BP: collect dollars', async () => {
      const j = await postForm(page, '/ajax/beauty_pageant.php', 'action=claimAllDuelRewards');
      need(j, 'Step 10 claimAllDuelRewards');
      await reload(page);
      await sleep(page, 10);
    }],

    [11, 'Open tutorial quests popup', async () => {
      const j = await getJson(page, '/ajax/quests.php?type=getTutorialQuestsPopup');
      need(j, 'Step 11 quests popup');
      await sleep(page, 10);
    }],

    [12, 'Claim 200102', async () => { await claim(page, 200102, 10); }],
    [13, 'Claim 200103', async () => { await claim(page, 200103, 10); }],

    [14, 'New collection page', async () => {
      await goto(page, `${V3}/mall/boutique.php`);
      await reload(page);
      await sleep(page, 10);
    }],

    [15, 'Add 4 items to cart', async () => {
      for (const color of [74, 49, 36, 4]) {
        const j = await postForm(page, '/ajax/mall/cart.php',
          `action=addToCart&mallType=1&itemId=19708&itemCategoryId=13&itemCollectionId=301&itemColor=${color}&pageNum=2&collectionsPage=limited&orderBy=&orderType=`);
        need(j, `Step 15 addToCart color ${color}`);
        await sleep(page, 3);
      }
    }],

    [16, 'Load cart', async () => {
      const j = await postForm(page, '/ajax/mall/cart.php', 'action=loadMallContent');
      need(j, 'Step 16 loadMallContent');
      await sleep(page, 10);
    }],

    [17, 'Buy 4 items', async () => {
      const j = await postForm(page, '/ajax/mall/cart.php', 'action=checkoutCart&collectionsPage=limited');
      need(j, 'Step 17 checkoutCart');
      await sleep(page, 10);
    }],

    [18, 'Claim 200105', async () => { await claim(page, 200105, 10, true); }],

    [19, 'Wardrobe necklace page', async () => {
      await goto(page, `${V3}/wardrobe.php?wardrobetype=lady&category_id%5B0%5D=13&archive=0&pet=0&updatePartials%5B0%5D=10&updatePartials%5B1%5D=3`);
      await sleep(page, 10);
    }],

    [20, 'Wear necklace and save look (outfit 1)', async () => {
      // bag, earrings, bought necklace (colour 49), dress, shoes
      const body = await buildWardrobeSave(page, [
        [2, 27230, 46], [10, 28813, 65], [13, 19708, 49], [9, 25834, 49], [18, 27065, 46]
      ], APPEARANCE_20);
      const j = await postForm(page, '/ajax/wardrobe/lady.php', body);
      need(j, 'Step 20 saveChanges');
      await sleep(page, 10);
    }],

    [21, 'Claim 200111', async () => { await claim(page, 200111, 10); }],

    [22, 'BP: spend 1 ticket', async () => {
      await goBP(page);
      const j = await postForm(page, '/ajax/beauty_pageant.php', 'action=competeInDuel');
      need(j, 'Step 22 competeInDuel', [1, 3]);
      await sleep(page, 10);
    }],

    [23, 'Claim 200112', async () => { await claim(page, 200112, 10); }],

    [24, 'Mall', async () => {
      await goto(page, `${V3}/mall/mall.php`);
      await sleep(page, 5);
    }],

    [25, 'Add 1 item to cart', async () => {
      const j = await postForm(page, '/ajax/mall/cart.php',
        'action=addToCart&mallType=1&itemId=23933&itemCategoryId=9&itemCollectionId=3&itemColor=64&pageNum=1&collectionsPage=false&orderBy=id&orderType=desc');
      need(j, 'Step 25 addToCart');
      await sleep(page, 5);
    }],

    [26, 'Cart page', async () => {
      await goto(page, `${V3}/mall/cart.php?action=loadMallContent`);
      await sleep(page, 5);
    }],

    [27, 'Buy from cart', async () => {
      const j = await postForm(page, '/ajax/mall/cart.php', 'action=checkoutCart&collectionsPage=false');
      need(j, 'Step 27 checkoutCart');
      await sleep(page, 5);
    }],

    [28, 'Claim 200113', async () => { await claim(page, 200113, 5); }],

    [29, 'Ladygram page', async () => {
      await goto(page, `${V3}/ladygram.php`);
      await sleep(page, 10);
    }],

    [30, 'Claim 200106', async () => { await claim(page, 200106, 5); }],

    // Steps 31-36 (photobooth, take photo, share, post, claim 200110, delete post)
    // are intentionally skipped - done manually.

    [37, 'Change lady name', async () => {
      await goto(page, `${V3}/settings.php?tab=change_ladyname`);
      await sleep(page, 5);
      const body = new URLSearchParams({ type: 'changeLadyName', newName: LADY_NAME }).toString();
      const j = await postForm(page, '/ajax/settings.php', body);
      need(j, 'Step 37 changeLadyName');
      await sleep(page, 10);
    }],

    [38, 'Claim 200109', async () => { await claim(page, 200109, 5); }],

    [39, 'Blocks event page', async () => {
      await goto(page, `${V3}/events/blocks.php?event_id=${BLOCKS.eventId}`);
      await sleep(page, 10);
    }],

    [40, 'Enter blocks zone, read board, pick yellow', async () => {
      const j = await gql(page, 'EnterZone', Q.enterZone, BLOCKS);
      const map = j.data.blocks.EnterZoneMutation.zone_info.map;
      ctx.yellow = findFirst(map, 'yellow');
      await reload(page);
      await sleep(page, 5);
    }],

    [41, 'Colour bomb on yellow, pick purple', async () => {
      if (!ctx.yellow) throw new Error('Step 41: no yellow position (run Step 40 first)');
      const j = await gql(page, 'ClickBlock', Q.clickBlock,
        { ...BLOCKS, positionX: ctx.yellow.x, positionY: ctx.yellow.y, booster: 'color_bomb' });
      const r = j.data.blocks.ClickBlockMutation;
      needGql(r.status, 'Step 41 colour bomb (yellow)', j);
      ctx.purple = findFirst(r.zone_info.map, 'purple');
      await sleep(page, 10);
    }],

    [42, 'Buy a colour bomb', async () => {
      const j = await gql(page, 'BuyBoosterPack', Q.buyBooster, { eventId: BLOCKS.eventId, booster: 'color_bomb', packId: 1 });
      needGql(j.data.blocks.BuyBoosterPackMutation.status, 'Step 42 buy colour bomb', j);
      await reload(page);
      await sleep(page, 10);
    }],

    [43, 'Colour bomb on purple', async () => {
      if (!ctx.purple) throw new Error('Step 43: no purple position (run Step 41 first)');
      const j = await gql(page, 'ClickBlock', Q.clickBlock,
        { ...BLOCKS, positionX: ctx.purple.x, positionY: ctx.purple.y, booster: 'color_bomb' });
      needGql(j.data.blocks.ClickBlockMutation.status, 'Step 43 colour bomb (purple)', j);
      await sleep(page, 10);
    }],

    [44, 'Claim 200114', async () => { await claim(page, 200114, 5); }],

    [45, 'Go to BP (repeat of step 6)', async () => { await goBP(page); }],
    [46, 'BP: 3 judgements (repeat of step 7)', async () => { await judgeThree(page); }],

    [47, 'Claim 200115', async () => { await claim(page, 200115, 10); }],

    [48, 'Board event page', async () => {
      await goto(page, `${V3}/events/board.php?event_id=${BOARD.eventId}`);
      await sleep(page, 10);
    }],

    [49, 'Board: 9 clicks (a to i)', async () => {
      const clicks = [[0, 0], [1, 1], [2, 2], [1, 0], [0, 2], [2, 0], [2, 1], [0, 1], [1, 2]];
      const labels = 'abcdefghi';
      for (let i = 0; i < clicks.length; i++) {
        await reload(page);
        await sleep(page, 3);
        const [x, y] = clicks[i];
        const j = await gql(page, 'OpenBoardSquare', Q.openSquare, { ...BOARD, positionX: x, positionY: y });
        const r = j.data.board.OpenSquareMutation;
        needGql(r.status, `Step 49${labels[i]} click (${x},${y})`, j);
        console.log(`🟦 Click 49${labels[i]} (${x},${y}) done, zone completed: ${r.is_zone_completed}`);
        await sleep(page, 5);
        if (r.is_zone_completed === true) { console.log('✅ Board completed, no more clicks needed.'); break; }
      }
      await sleep(page, 10);
    }],

    [50, 'Claim 200116', async () => {
      await claim(page, 200116, 10);
      await reload(page);
    }],

    [51, 'Activate talent', async () => {
      await goto(page, `${V3}/vip_shop.php`);
      const j = await postForm(page, '/ajax/vip_shop.php', 'type=buyMaxEnergy&packId=2&energyType=1');
      need(j, 'Step 51 buyMaxEnergy');
      await sleep(page, 5);
    }],

    [52, 'Wardrobe', async () => {
      await goto(page, `${V3}/wardrobe.php?wardrobetype=lady&archive=0&category_id%5B0%5D=9`);
      await sleep(page, 5);
    }],

    [53, 'Filter wardrobe', async () => {
      const j = await postForm(page, '/ajax/wardrobe.php',
        'wardrobetype=lady&archive=0&empty_filter=1&updatePartials%5B%5D=9&updatePartials%5B%5D=3');
      need(j, 'Step 53 filter wardrobe');
      await sleep(page, 5);
    }],

    [54, 'Filter event', async () => {
      const j = await postForm(page, '/wardrobe.php', FILTER_54);
      need(j, 'Step 54 filter event');
      await sleep(page, 5);
    }],

    [55, 'Save look (outfit 2)', async () => {
      // bag, dress, necklace, shoes - no earrings; offsets as recorded
      const body = await buildWardrobeSave(page, [
        [2, 27230, 46, -1], [9, 25834, 49, 118], [13, 19708, 49, -123], [18, 27065, 46, -4]
      ], APPEARANCE_55);
      const j = await postForm(page, '/ajax/wardrobe/lady.php', body);
      need(j, 'Step 55 save look');
      await sleep(page, 5);
    }],

    [56, 'Claim 200121', async () => { await claim(page, 200121, 5); }],

    [57, 'BP: spend 10 tickets', async () => {
      for (let i = 1; i <= 10; i++) {
        const j = await postForm(page, '/ajax/beauty_pageant.php', 'action=competeInDuel');
        need(j, `Step 57 ticket ${i}/10`, [1, 3]);
        console.log(`🎟️ Ticket ${i}/10 spent`);
        if (i < 10) await sleep(page, 5);
      }
      await sleep(page, 5);
    }],

    [58, 'Claim 200117', async () => { await claim(page, 200117, 10); }],

    [59, 'BP: 1 ticket in new theme', async () => {
      const j = await postForm(page, '/ajax/beauty_pageant.php', 'action=competeInDuel');
      need(j, 'Step 59 competeInDuel', [1, 3]);
      await sleep(page, 10);
    }],

    [60, 'Claim 200120', async () => { await claim(page, 200120, 5); }],

    [61, 'Fashion Arena page', async () => {
      await goto(page, `${V3}/duels.php`);
      await sleep(page, 10);
    }],

    [62, 'Show stats popup', async () => {
      const j = await postForm(page, '/ajax/main.php', 'type=getStatistics');
      need(j, 'Step 62 getStatistics');
      await sleep(page, 10);
    }],

    [63, 'Raise stats', async () => {
      const j = await postForm(page, '/ajax/train.php', 'type=distributeAllFP');
      need(j, 'Step 63 distributeAllFP');
      await sleep(page, 10);
    }],

    [64, 'Claim 200122', async () => { await claim(page, 200122, 10); }],

    [65, 'FA: 1 duel', async () => {
      const j = await postForm(page, '/ajax/arena.php', 'action=challenge');
      need(j, 'Step 65 challenge');
      await sleep(page, 10);
    }],

    [66, 'FA: all duels', async () => {
      const j = await postForm(page, '/ajax/arena.php', 'action=massChallenge');
      need(j, 'Step 66 massChallenge');
      await sleep(page, 10);
    }],

    [67, 'Claim 200123', async () => { await claim(page, 200123, 5); }],

    [68, 'Buy a pet', async () => {
      await goto(page, `${V3}/pet_shop.php`);
      const j = await postForm(page, '/ajax/pet_shop.php', 'type=buyPet&pet_id=1');
      need(j, 'Step 68 buyPet');
      await sleep(page, 5);
    }],

    [69, 'Claim 200126', async () => { await claim(page, 200126, 5); }],

    [70, 'Play with pet', async () => {
      await goto(page, `${V3}/pet_shop.php`);
      const j = await postForm(page, '/ajax/pets.php', 'type=trainLoyalty&pet_id=1');
      need(j, 'Step 70 trainLoyalty');
      await sleep(page, 10);
    }],

    [71, 'Claim 200127', async () => { await claim(page, 200127, 10, true); }],

    [72, 'Reset stats', async () => {
      await goto(page, `${V3}/duels.php`);
      const j = await postForm(page, '/ajax/main.php', 'type=resetFashoinPoints');
      need(j, 'Step 72 reset stats');
      await sleep(page, 5);
    }],

    [73, 'Buy 1000 FP', async () => {
      const j = await postForm(page, '/ajax/train.php', 'type=buyFashionPoints&fpToBuy=1000');
      need(j, 'Step 73 buyFashionPoints');
      await sleep(page, 5);
    }],

    [74, 'Collect achievement ids', async () => { ctx.achIds = await collectAchievementIds(page); }],
    [75, 'Claim achievements', async () => { await claimAchievements(page, ctx.achIds || []); }],

    [76, 'Redistribute FP', async () => {
      const result = await page.evaluate(async ({ amounts, rounds }) => {
        const types = ['style', 'creativity', 'devotion', 'beauty'];
        let done = 0;
        for (let round = 0; round < rounds; round++) {
          const amount = amounts[round] ?? 2000;
          for (const t of types) {
            const res = await fetch('/ajax/train.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
              body: new URLSearchParams({ type: 'trainStats', popularityType: t, practiceType: 'fp', amount })
            });
            let data = null;
            try { data = await res.json(); } catch (e) { return { done, stoppedAt: `${t} amount=${amount}`, reason: 'non-JSON' }; }
            if (!data || data.status !== 1) return { done, stoppedAt: `${t} amount=${amount}`, reason: 'status != 1 (out of FP)' };
            done++;
          }
        }
        return { done, stoppedAt: null };
      }, { amounts: AMOUNTS, rounds: 400 });
      console.log(`💪 FP redistribution finished: ${result.done} requests OK. ${result.stoppedAt ? `Stopped at ${result.stoppedAt} - ${result.reason}` : ''}`);
      await reload(page);
    }],

    [77, 'Unlock collection 307', async () => {
      soft(await postForm(page, '/ajax/mall/boutique.php', 'action=unlockCollection&collectionId=307'), 'Step 77');
      await sleep(page, 10);
    }],

    [78, 'Add to cart', async () => {
      soft(await postForm(page, '/ajax/mall/cart.php',
        'action=addToCart&mallType=1&itemId=20152&itemCategoryId=9&itemCollectionId=307&itemColor=12&pageNum=1&collectionsPage=limited&orderBy=&orderType='), 'Step 78');
      await sleep(page, 5);
    }],

    [79, 'Buy from cart', async () => {
      await goto(page, `${V3}/mall/cart.php?action=loadMallContent`);
      soft(await postForm(page, '/ajax/mall/cart.php', 'action=checkoutCart&collectionsPage=limited'), 'Step 79');
      await sleep(page, 10);
    }],

    [80, 'Dress up (final outfit)', async () => {
      await goto(page, `${V3}/wardrobe.php?wardrobetype=lady&archive=0&category_id%5B0%5D=9`);
      try {
        // bag, collection-307 dress, event bracelet, bought necklace, shoes
        const body = await buildWardrobeSave(page, [
          [2, 12394, 23, -1], [9, 20152, 12, 120], [6, 22331, 79, -2], [13, 19708, 49, -120], [18, 27065, 46, -3]
        ], APPEARANCE_55);
        soft(await postForm(page, '/ajax/wardrobe/lady.php', body), 'Step 80');
      } catch (e) {
        console.log(`⚠️ Step 80 skipped: ${e.message}`);
      }
      await sleep(page, 10);
    }],

    [81, 'Salon: unlock items and save makeup', async () => {
      await goto(page, `${V3}/beauty_salon.php`);
      const seq = [
        ['post', '/ajax/beauty_salon_lady.php', 'type=unlockItem&itemType=3&itemNum=10&pageType=surgeries'],
        ['post', '/ajax/beauty_salon_lady.php', 'type=unlockItem&itemType=9&itemNum=30&pageType=makeup'],
        ['post', '/ajax/beauty_salon_lady.php', 'type=unlockItem&itemType=5&itemNum=386&pageType=hair'],
        ['post', '/ajax/beauty_salon_lady.php', 'type=unlockItem&itemType=2&itemNum=31&pageType=surgeries'],
        ['post', '/ajax/beauty_salon_lady.php', SALON_RQ5],
        ['goto', `${V3}/wardrobe.php?wardrobetype=lady&archive=0&category_id%5B0%5D=9`]
        // boyfriend steps removed; the Step 80 outfit stays final
      ];
      for (let i = 0; i < seq.length; i++) {
        const [kind, a, b] = seq[i];
        if (kind === 'post') soft(await postForm(page, a, b), `Step 81 #${i + 1}`);
        else { await goto(page, a); console.log(`✅ Step 81 #${i + 1} (page load)`); }
        await reload(page);
        await sleep(page, 5);
      }
    }],

    [82, 'Repeat 74 and 75', async () => {
      const ids = await collectAchievementIds(page);
      await claimAchievements(page, ids);
    }]
  ];

  for (const [num, name, fn] of steps) {
    if (num < START_AT || num > STOP_AT) continue;
    console.log(`\n🚀 Step ${num} - ${name}`);
    await fn();            // any thrown error stops the whole script
    console.log(`✅ Step ${num} done`);
  }
  console.log('🏁 New-account script finished.');
};
