import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FakeStoreApi } from "../../services/fake-store-api";
import { Item } from "../../components/item";
import { useCart } from "../../context/cart";

const Category = () => {
  const { category } = useParams();
  console.log(category);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const product = await FakeStoreApi.fetchProductsByCategory(category);
      setProducts(product);
      console.log(products);
      setLoading(false);
    };
    fetchProduct().catch(console.error);
  }, [category, products]);
  return (
    <>
      <div className="container">
        <div className="products my-5">
          <div className="grid">
            {loading ? (
              <div className="loader" />
            ) : (
              products.map((product) => (
                <Item
                  key={product.id}
                  data={product}
                  addToCart={() => addToCart(product)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export { Category };
