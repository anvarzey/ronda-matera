export default function formatPrice (price: number): string {
  const { format } = new Intl.NumberFormat('es-ES',
    {
      style: 'currency',
      currency: 'EUR'
    })
  return format(price)
}
