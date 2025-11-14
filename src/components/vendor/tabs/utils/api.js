// utils/api.js
export async function acceptRequestAndCreateOrder(bookingId) {
  const response = await fetch(
    `http://localhost:5000/api/servicebookings/accept/${bookingId}`,
    { method: "PUT" }
  );
  if (!response.ok) throw new Error("Failed to accept request");
  return await response.json();
}
