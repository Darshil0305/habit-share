import '../styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Habit Tracker</title>
        <meta name="description" content="Futuristic habit tracking app" />
      </Head>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { 
              opacity: 1, 
              y: 0,
              transition: { 
                staggerChildren: 0.1,
                when: "beforeChildren"
              }
            },
            exit: { opacity: 0, y: -20 },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
