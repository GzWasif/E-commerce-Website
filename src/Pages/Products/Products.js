import { useEffect, useState } from "react";
import { FakeStoreApi } from "../../services/fake-store-api";
import { useSearchParams } from "react-router-dom";
import { Item } from "../../components/item";
import { useCart } from "../../context/cart";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [query] = useSearchParams();
  const { addToCart } = useCart();

  const searchQuery = query.get("q");

  //Controlled dropdown initializations
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //states for filtering
  const [priceAsc, setPriceAsc] = useState(false);
  const [priceDesc, setPriceDesc] = useState(false);
  const [popularityFilter, setPopularityFilter] = useState(false);

  const priceAscfilteredProducts = products
    .slice()
    .sort((p1, p2) => (p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0));

  const priceDescfilteredProducts = products
    .slice()
    .sort((p1, p2) => (p1.price < p2.price ? -1 : p1.price > p2.price ? 1 : 0));

  const popularityFilteredProducts = products
    .slice()
    .sort((p1, p2) =>
      p1.rating.rate < p2.rating.rate
        ? 1
        : p1.rating.rate > p2.rating.rate
        ? -1
        : 0
    );

  function handlePriceAscSort() {
    setPriceDesc(false);
    setPopularityFilter(false);
    setPriceAsc(true);
  }

  function handlePriceDescSort() {
    setPriceAsc(false);
    setPopularityFilter(false);
    setPriceDesc(true);
  }
  function handlePopularitySort() {
    setPriceAsc(false);
    setPriceDesc(false);
    setPopularityFilter(true);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = searchQuery
        ? await FakeStoreApi.fetchProductsBySearchQuery(searchQuery)
        : await FakeStoreApi.fetchAllProducts();
      setProducts(products);
      setLoading(false);
    };
    fetchProducts().catch(console.error);
  }, [searchQuery]);

  if (!loading && searchQuery && !products.length) {
    return (
      <div className="container">
        <div className="product py-2">
          <div className="details p-3">
            No products found matching your query.
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex p-5">
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
          <DropdownToggle caret light>
            Filter By
          </DropdownToggle>
          <DropdownMenu light>
            <DropdownItem onClick={handlePriceAscSort}>
              Price: High to Low
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handlePriceDescSort}>
              Price: Low to High
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handlePopularitySort}>
              Sort by popularity
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {priceAsc ? (
        <div className="container">
          <div className="products my-5">
            <div className="grid">
              {loading ? (
                <div className="loader" />
              ) : (
                priceAscfilteredProducts.map((product) => (
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
      ) : priceDesc ? (
        <div className="container">
          <div className="products my-5">
            <div className="grid">
              {loading ? (
                <div className="loader" />
              ) : (
                priceDescfilteredProducts.map((product) => (
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
      ) : popularityFilter ? (
        <div className="container">
          <div className="products my-5">
            <div className="grid">
              {loading ? (
                <div className="loader" />
              ) : (
                popularityFilteredProducts.map((product) => (
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
      ) : (
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
      )}
    </>
  );
};

export { Products };
