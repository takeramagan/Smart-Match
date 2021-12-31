import { Box, Button } from '@material-ui/core';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <Head>
        <title>{t("index.title")}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {t("index.welcome")}<a href='#'>Smart Match!</a>
        </h1>
        <Box mt={8}>
          <Link href='/report'>
            <Button variant='contained' color='primary' disableElevation>
              {t("index.enter")}
            </Button>
          </Link>
        </Box>
      </main>

      <footer className={styles.footer}>
        {t("index.footer")}
      </footer>
    </div>
  )
}
