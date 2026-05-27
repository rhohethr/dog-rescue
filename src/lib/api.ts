export type Donation = {
  date: string;
  donator: string;
  amount: string;
};

export type Expense = {
  date: string;
  made_to: string;
  amount: string;
  comments: string;
  bill_link: string;
  prescription_link: string;
};

export type DailyUpdate = {
  date: string;
  images: string[];
  note: string;
};

const API_URL =
  'https://script.google.com/macros/s/AKfycbxBHTow0LM0vG31mNNgdDf5xNJxVOhQtN-niyCriRGMni5CdVkpyMJxQDilvK10ElRW/exec';

let _cached: { donations: Donation[]; expenses: Expense[]; updates: DailyUpdate[] } | null = null;
let _loading = false;
let _error: string | null = null;

export async function fetchAllData() {
  if (_cached) return _cached;
  if (_loading) {
    // wait for existing fetch — simplified by just re-reading cache after
    await new Promise((r) => setTimeout(r, 500));
    return _cached;
  }
  _loading = true;
  _error = null;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    _cached = await res.json();
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    _error = `Failed to fetch live data from Google Sheets (${msg}). Showing cached data.`;
    console.error('API fetch failed:', e);
    // _cached stays null — callers should use mock fallback
  } finally {
    _loading = false;
  }

  return _cached;
}

export function getCachedData() {
  return _cached;
}

export function getError() {
  return _error;
}

export function clearCache() {
  _cached = null;
  _error = null;
  _loading = false;
}
