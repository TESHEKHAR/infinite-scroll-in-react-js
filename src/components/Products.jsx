import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Products = () => {
  const totalCount = 100;
  const PAGE_LIMIT = 10;
  const apiPath = 'https://fakestoreapi.com/products';

  const [products, setProducts] = useState([]);

  const getProductList = () => {
    let pageNo = Math.ceil(products.length / PAGE_LIMIT) + 1;

    const queryParam = '?page=' + pageNo + '&limit=' + PAGE_LIMIT;
    const finalUrl = apiPath + queryParam;

    // API call
    axios
      .get(finalUrl)
      .then((res) => {
        const apiRes = res?.data;
        const mergeData = [...products, ...apiRes];
        setProducts(mergeData);
        console.log(mergeData);
      })
      .catch((err) => {
        console.error('error while loading products', err);
      });
  };

  useEffect(() => {
    if (products.length < totalCount) {
      getProductList();
    }
  }, []);

  const fetchMoreData = () => {
    getProductList();
  };

  return (
    <div className='container'>
      <h1>Product Infinite Scroll</h1>
      <div className='row'>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={products.length < totalCount}
          loader={<h4>Loading...</h4>}
        >
          {products &&
            products.length > 0 &&
            products.map((product, index) => {
              return (
                <div className='card' key={`${product.id}-${index}`}>
                  <div className='image-block'>
                  <img src={product?.image} alt='text-image' style={{ width: '100px', height: '100px' }} />
                  </div>
                  <div className='content-block'>
                    <h3>{product?.title}</h3>
                    <h5>Price: {product?.price}</h5>
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Products;
