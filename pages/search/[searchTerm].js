import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Product from '../../Components/Product';
import axios from 'axios';
import NoResults from '../../Components/NoResults';
import Loader from '../../Components/Loader';

const SearchPage = ({ products }) => {
  const { query, back } = useRouter();
  const searchTerm = query.searchTerm;

  const filteredProducts = products?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );
  return (
    <main className="container min-vh-100">
      <button className="btn mt-4" onClick={() => back()}>
        Go Back
      </button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { opacity: { duration: 1 } },
        }}
        className="products-grid my-4"
      >
        {!filteredProducts ? (
          <Loader />
        ) : (
          filteredProducts?.map((product) => (
            <Product product={product} key={product.id} />
          ))
        )}
      </motion.div>
      {filteredProducts.length === 0 && <NoResults term={searchTerm} />}
    </main>
  );
};

export default SearchPage;

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
