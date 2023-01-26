import styles from './styles.module.css'
import ChevronIcon from '../Icons/ChevronIcon'
import FilterIcon from '../Icons/FilterIcon'
import useFilter from '../../hooks/useFilter'
import CheckSquareIcon from '../Icons/CheckSquareIcon'
import SquareIcon from '../Icons/SquareIcon'
import { useRouter } from 'next/router'

const BRANDS = [
  'Amanda',
  'Canarias',
  'CBSé',
  'Cruz de Malta',
  'La Merced',
  'Mañanita',
  'Playadito',
  'Rosamonte',
  'Taragüi',
  'Verdeflor'
]

const BLENDS = [
  'Compuesta',
  'Intensa',
  'Regular',
  'Saborizada',
  'Suave'
]

const FORMATS = [
  {
    name: 'Paquete regular',
    keyword: 'Regular'
  },
  {
    name: 'Kit yerba + mate + bombilla',
    keyword: 'Kit'
  },
  {
    name: 'Pack de varias unidades',
    keyword: 'Pack'
  },
  {
    name: 'Yerba + yerbero',
    keyword: 'Can'
  }
]

export default function Filters (): React.ReactElement {
  const router = useRouter()
  const {
    brands,
    blends,
    formats,
    handleBlends,
    handleBrands,
    handleFormats,
    handleQueryString
  } = useFilter()

  const handleApplicator = (): void => {
    const urlQueries = handleQueryString()
    router.push('/yerba-mate' + urlQueries).catch(err => err)
  }

  return (
    <div className={styles.container}>
      <input className={styles.filtersCheckbox} type='checkbox' name='filtersCheckbox' id='filtersCheckbox' />
      <label className={styles.filterTitle} htmlFor='filtersCheckbox'>
        <FilterIcon />
        Aplicar filtros
      </label>
      <div className={styles.filterContainer}>
        <h3 className={styles.filterBy}>
          Filtrar por
        </h3>
        <input className={`${styles.checkbox} ${styles.marcaCheckbox}`} type='checkbox' name='marcaCheckbox' id='marcaCheckbox' />
        <label htmlFor='marcaCheckbox' className={styles.filterLabel}>
          <h4 className={styles.specificFilter}>
            Marca
          </h4>
          <span className={styles.arrow}>
            <ChevronIcon />
          </span>
        </label>
        <ul className={`${styles.filters} ${styles.marcaFilters}`}>
          {
            BRANDS.map(brand => {
              return (
                <li className={styles.filterItem} key={brand} onClick={() => handleBrands(brand)}>
                  {brand}
                  {
                    brands.includes(brand)
                      ? <CheckSquareIcon />
                      : <SquareIcon />
                  }
                </li>
              )
            })
          }
        </ul>
        <input className={`${styles.checkbox} ${styles.productoCheckbox}`} type='checkbox' name='productoCheckbox' id='productoCheckbox' />
        <label htmlFor='productoCheckbox' className={styles.filterLabel}>
          <h4 className={styles.specificFilter}>
            Tipo de producto
          </h4>
          <span className={styles.arrow}>
            <ChevronIcon />
          </span>
        </label>
        <ul className={`${styles.filters} ${styles.productoFilters}`}>
          {
            FORMATS.map(format => {
              return (
                <li className={styles.filterItem} key={format.name} onClick={() => handleFormats(format.keyword)}>
                  {format.name}
                  {
                    formats.includes(format.keyword)
                      ? <CheckSquareIcon />
                      : <SquareIcon />
                  }
                </li>
              )
            })
          }
        </ul>
        <input className={`${styles.checkbox} ${styles.yerbaCheckbox}`} type='checkbox' name='yerbaCheckbox' id='yerbaCheckbox' />
        <label htmlFor='yerbaCheckbox' className={styles.filterLabel}>
          <h4 className={styles.specificFilter}>
            Sabor
          </h4>
          <span className={styles.arrow}>
            <ChevronIcon />
          </span>
        </label>
        <ul className={`${styles.filters} ${styles.yerbaFilters}`}>
          {
            BLENDS.map(blend => {
              return (
                <li className={styles.filterItem} key={blend} onClick={() => handleBlends(blend)}>
                  {blend}
                  {
                    blends.includes(blend)
                      ? <CheckSquareIcon />
                      : <SquareIcon />
                  }
                </li>
              )
            })
          }
        </ul>
        <button className={styles.applicator} onClick={handleApplicator}>
          Aplicar Filtros
        </button>
      </div>
    </div>
  )
}
