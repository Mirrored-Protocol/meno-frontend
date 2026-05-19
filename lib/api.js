const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export async function fetchCollections() {
  return apiFetch('/api/collections');
}

export async function fetchCollection(id) {
  return apiFetch(`/api/collections/${id}`);
}

export async function fetchListings() {
  return apiFetch('/api/listings');
}

export async function fetchAssets() {
  return apiFetch('/api/assets');
}

export async function createPayoutRequest(payload) {
  const res = await fetch(`${BASE_URL}/api/payouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: /api/payouts`);
  return res.json();
}

export async function fetchPayouts(wallet) {
  return apiFetch(`/api/payouts/${wallet}`);
}
