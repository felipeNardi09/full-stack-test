export async function getBeers() {
  const res = await fetch(
    "https://app2.mytapp.com.br/api/app/getTaps?e_id=456",
  );

  const data = await res.json();

  return data;
}
