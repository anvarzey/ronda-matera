export default async function useProducts () {
  const pr = fetch('http://localhost:3000/api/products')
    .then(res => res.json)
    .then(json => json)
    .catch(e => e)

  return { pr }
}
