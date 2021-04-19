import { Box, Button } from '@material-ui/core'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='#'>Smart Match!</a>
        </h1>
        <Box mt={8}>
          <Link href='/report'>
            <Button variant='contained' color='primary' disableElevation>
              See demo report
            </Button>
          </Link>
        </Box>
      </main>

      <footer className={styles.footer}>
        More features are coming soon..
      </footer>
    </div>
  )
}
