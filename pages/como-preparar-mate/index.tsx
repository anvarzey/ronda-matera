import Head from 'next/head'
import Header from '../../resources/frontend/components/Header'
import styles from './styles.module.css'
import MobileNavbar from '../../resources/frontend/components/MobileNavbar'
import Image from 'next/image'
import TopButton from '../../resources/frontend/components/TopButton'

export default function PrepareitorHandler (): React.ReactElement {
  return (
    <>
      <Head>
        <title>
          Como preparar un mate - Ronda Matera
        </title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Header />
      <main className={styles.body}>
        <h1 className={styles.title}>Como preparar un mate</h1>
        <section className={styles.extraContainer}>
          <div className={styles.text}>
            El saber preparar bien un mate puede parecer una tontería, o algo muy complicado, depende como se lo vea 👀 Pero no es para tanto, solo hay que prestar atención a unos pequeños detalles. ¿Por qué es importante? Bueno porque cebar (preparar) bien el mate marca la diferencia en el sabor y en cuanto te dura el mate sin que se te &quot;lave&quot; o, en otras palabras, que tarde más en llegar al punto en que la yerba deje de absorber el agua y empiece a desprender un gusto feo.
          </div>
          <div className={styles.imageContainer}>
            <Image className={styles.image} src='/instrucciones.jpeg' alt='Instrucciones' fill />
          </div>
          <ol className={styles.stepsContainer}>
            <li className={`${styles.step} ${styles.firstStep}`}>
              Calentar el agua a una temperatura entre 70º y 75º centígrados, 80º como mucho. <b>No hervirla</b>.
            </li>
            <li className={styles.step}>
              Llenar el mate hasta 2/3 de su capacidad.
            </li>
            <li className={styles.step}>
              Agitar un poco para quitar el exceso de polvo.
            </li>
            <li className={styles.step}>
              Poner de costado el mate y formar una montaña a un lado del mate.
            </li>
            <li className={styles.step}>
              Introducir la bombilla en la parte que menos yerba tiene.
            </li>
            <li className={styles.step}>
              Verter un poco de <b>agua tibia</b> del mismo lado de la bombilla, luego <b>llenar con agua caliente</b>. Cubrir unas 3/4 partes de la yerba (o un poco más), lo importante es <b>no cubrir toda la yerba con el agua</b>. A partir del segundo mate, continuar siempre con agua caliente.
            </li>
            <li className={`${styles.step} ${styles.lastStep}`}>
              Para mate dulce, agregar media cucharadita de azúcar (o lo equivalente a otro endulzante) antes de poner agua. Repetir a gusto.
            </li>
          </ol>
        </section>
      </main>
      <TopButton />
      <MobileNavbar actual='prepare' />
    </>
  )
}
