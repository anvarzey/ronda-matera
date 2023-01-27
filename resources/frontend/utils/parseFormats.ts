export default function parseFormats (format: string, name: string): string {
  let formatParsed = ''

  const regex = /(?<=\s)\d+(?=\sx)/g

  const quantity = name.match(regex)

  if (quantity !== null) {
    switch (format) {
      case 'Pack': formatParsed =
      quantity[0] === null
        ? 'Pack'
        : `Pack de ${quantity[0]} unidades`
        break
      case 'Regular': formatParsed = 'Paquete regular'
        break
      case 'Can': formatParsed = 'Paquete regular + yerbero'
        break
      case 'Kit': formatParsed = 'Kit de mate, yerba y bombilla'
        break
      default: formatParsed = format
    }
  }
  return formatParsed
}
