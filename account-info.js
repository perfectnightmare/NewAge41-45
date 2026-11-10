// account-info.js
// Read-only: collects account info and logs it to the console.

const BASE = 'https://v3.g.ladypopular.com';
const DIVIDER = '────────────────────────────────────────';

const num = (v) => {
  const n = Number(String(v ?? '').replace(/,/g, '').trim());
  return Number.isFinite(n) ? n : null;
};

// Pull the {...} argument out of LadyHeader.setLadyStats({...}) by matching braces
// (more reliable than a regex because the JSON is large and nested).
function extractLadyStats(html) {
  const marker = html.indexOf('setLadyStats(');
  if (marker === -1) return null;
  const start = html.indexOf('{', marker);
  if (start === -1) return null;

  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return JSON.parse(html.slice(start, i + 1));
    }
  }
  return null;
}

// DOM fallbacks (regex on the raw HTML) in case the JSON is missing a value
const domById = (html, id) => {
  const m = html.match(new RegExp(`id="${id}"[^>]*>\\s*([\\d,]+)`));
  return m ? num(m[1]) : null;
};
const domFashionPoints = (html) => {
  const m = html.match(/data-fashion-points="([\d,]+)"/);
  return m ? num(m[1]) : null;
};
const domAchievements = (html) => {
  const m = html.match(
    /achievements-icon-wrapper[\s\S]*?claim-rewards-indicator">\s*(\d+)/
  );
  return m ? num(m[1]) : null;
};
const domLadyId = (html) => {
  const m = html.match(/var LADY_ID = '(\d+)'/);
  return m ? m[1] : null;
};
const domPlayerId = (html) => {
  const m = html.match(/var PLAYER_ID = '(\d+)'/);
  return m ? m[1] : null;
};

async function getVipShopInfo(page) {
  const res = await page.request.get(`${BASE}/vip_shop.php?tab=dollars`, {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      'upgrade-insecure-requests': '1',
      referer: `${BASE}/ranking/players.php`
    }
  });
  if (!res.ok()) throw new Error(`vip_shop.php returned HTTP ${res.status()}`);

  const html = await res.text();
  const j = extractLadyStats(html);
  if (!j) throw new Error('Could not find LadyHeader.setLadyStats({...}) in page (session expired?)');

  const season = j.fashion_season_data ?? {};
  const chests = season.season_chests_data ?? {};
  const claimable = (list) =>
    (list ?? [])
      .filter((c) => String(c.status) === '1')
      .map((c) => c.level ?? 'repeatable');

  return {
    currencies: {
      dollars: num(j.dollars) ?? domById(html, 'player-dollars'),
      emeralds: num(j.emeralds) ?? domById(html, 'player-emeralds'),
      diamonds: num(j.credits) ?? domById(html, 'player-credits'),
      fashionPoints: num(j.fashion_points) ?? domFashionPoints(html),
      beautyPageantPasses: num(j.beauty_pageant_pass),
      level: num(j.level),
      totalExp: num(j.exp)
    },
    season: {
      achievementsWaiting: domAchievements(html),
      unclaimedChests: chests.seasons_total_unclaimed_count ?? null,
      claimableFreeLevels: claimable(chests.free),
      claimablePremiumLevels: claimable(chests.premium)
    },
    identity: {
      ladyId: j.id ?? domLadyId(html),
      playerId: domPlayerId(html),
      name: j.name ?? null
    }
  };
}

async function getStats(page) {
  const res = await page.request.post(`${BASE}/ajax/main.php`, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'x-requested-with': 'XMLHttpRequest',
      referer: `${BASE}/vip_shop.php?tab=dollars`
    },
    form: { type: 'getStatistics' }
  });
  if (!res.ok()) throw new Error(`getStatistics returned HTTP ${res.status()}`);

  const json = await res.json();
  if (json?.status !== 1 || !json.statsHtml) {
    throw new Error(`getStatistics failed: status=${json?.status}`);
  }

  // Parse statsHtml inside the browser with DOMParser
  return await page.evaluate((statsHtml) => {
    const doc = new DOMParser().parseFromString(statsHtml, 'text/html');
    const n = (t) => {
      const v = Number(String(t ?? '').replace(/,/g, '').trim());
      return Number.isFinite(v) ? v : 0;
    };

    // internal key -> display name
    const names = {
      style: 'Elegance',
      creativity: 'Creativity',
      devotion: 'Confidence',
      beauty: 'Grace',
      generosity: 'Kindness',
      loyalty: 'Loyalty'
    };

    const stats = {};
    for (const [key, label] of Object.entries(names)) {
      const card = doc.querySelector(`.player-stat-${key}`);
      const bonus = (href) => {
        const li = [...(card?.querySelectorAll('.stat-bottom li') ?? [])].find(
          (el) => el.querySelector(`a[href="${href}"]`)
        );
        return n(li?.querySelector('.stat-vallue')?.textContent);
      };

      stats[label] = {
        total: n(doc.querySelector(`#stat_${key}_all`)?.textContent),
        fromFP: n(card?.querySelector('.income-fpoints')?.parentElement
          ?.querySelector('.stat-vallue')?.textContent),
        fromBoyfriend: bonus('/myboy.php'),
        fromClub: bonus('/guild.php'),
        fromBoosters: n(card?.querySelector(`.stat-${key}-booster-value-js.stat-vallue`)
          ?.textContent),
        nextCostFP: n(doc.querySelector(`#practice-fp-${key}`)?.dataset?.fp) || null
      };
    }

    return {
      fpAvailable: n(doc.querySelector('.total-fp-amount-js')?.textContent),
      stats
    };
  }, json.statsHtml);
}

module.exports = async function runAccountInfo(page) {
  console.log('📊 Collecting account info...');

  const payload = { collectedAt: new Date().toISOString() };
  const errors = [];

  // Step 1: VIP shop page
  try {
    Object.assign(payload, await getVipShopInfo(page));
  } catch (err) {
    errors.push(`Step 1: ${err.message}`);
    console.log(`❌ Step 1 (VIP shop) failed: ${err.message}`);
  }

  // Step 2: stats popup
  try {
    payload.popularity = await getStats(page);
  } catch (err) {
    errors.push(`Step 2: ${err.message}`);
    console.log(`❌ Step 2 (stats) failed: ${err.message}`);
  }

  // ---------- Human-readable log ----------
  const { currencies: c, season: s, identity: id, popularity: p } = payload;

  console.log(DIVIDER);
  console.log('📋 ACCOUNT INFO');
  console.log(DIVIDER);

  if (id) {
    console.log(`🪪 Name: ${id.name} | Lady ID: ${id.ladyId} | Player ID: ${id.playerId}`);
  }
  if (c) {
    console.log(
      `💰 Dollars: ${c.dollars} | 💎 Diamonds: ${c.diamonds} | 🟢 Emeralds: ${c.emeralds}`
    );
    console.log(
      `⭐ Level: ${c.level} | Exp: ${c.totalExp} | 👗 FP: ${c.fashionPoints} | 👑 BP passes: ${c.beautyPageantPasses}`
    );
  }
  if (s) {
    console.log(`🏆 Achievements waiting: ${s.achievementsWaiting}`);
    console.log(
      `🎁 Unclaimed season chests: ${s.unclaimedChests}` +
      ` | free levels: [${s.claimableFreeLevels.join(', ')}]` +
      ` | premium levels: [${s.claimablePremiumLevels.join(', ')}]`
    );
  }
  if (p) {
    console.log(`📈 Stats (FP to spend: ${p.fpAvailable})`);
    for (const [label, v] of Object.entries(p.stats)) {
      console.log(
        `   ${label.padEnd(11)} ${String(v.total).padStart(4)}` +
        `  (FP ${v.fromFP}, BF ${v.fromBoyfriend}, Club ${v.fromClub}, Boost ${v.fromBoosters})`
      );
    }
  }

  // ---------- Machine-readable line (for the Google Sheet parser) ----------
  payload.errors = errors;
  console.log(`LP_INFO_JSON ${JSON.stringify(payload)}`);
  console.log(DIVIDER);

  // Let the main script know this step failed if both parts broke
  if (errors.length === 2) {
    throw new Error(errors.join(' | '));
  }
};
