import { BASE_URL } from "../config";

export async function getOrders() {
  const res = await fetch(`${BASE_URL}orders/`);
  if (!res.ok) throw await res.json().catch(() => ({}));
  return res.json();
}

export async function createOrder(data) {
  const res = await fetch(`${BASE_URL}orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json().catch(() => ({}));
  return res.json();
}

export const confirmOrder = async (id) => {
  const res = await fetch(`${BASE_URL}orders/${id}/confirm/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to confirm order");
  return res.json();
};

export const deliverOrder = async (id) => {
  const res = await fetch(`${BASE_URL}orders/${id}/deliver/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to deliver order");
  return res.json();
};