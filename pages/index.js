import Product from '../Components/Product';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Banner from '../Components/Banner';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home({ products }) {
  const [visible, setVisible] = useState(10);

  const showMore = () => {
    setVisible((prev) => prev + 5);
  };

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Head>
        <title>IAShop</title>
        <meta
          name="description"
          content="IASHOP Official Site | Buy your favorite products"
        />
      </Head>
      <main className="container">
        <Banner products={products} />
        <section className="my-4">
          <h2 className="text-center mb-4">Our latest products</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { opacity: { duration: 1 } },
            }}
            viewport={{ once: true }}
            className="products-grid"
          >
            {products.slice(0, visible).map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </motion.div>
          <div className="container mx-auto d-flex w-100 my-4">
            {visible === 20 ? null : (
              <button className="btn mx-auto" onClick={showMore}>
                Load more
              </button>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { data: products } = await axios.get(
    'https://fakestoreapi.com/products'
  );
  return {
    props: {
      products,
    },
  };
}
