import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const [productRandom, setProductRandom] = useState([]);
  const { data: products, isLoading, error } = useGetProductsQuery();

  useEffect(() => {
    function getMultipleRandom(arr, num) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, num);
    }
    if (products) {
      const productsRandom = getMultipleRandom(products, 5);
      setProductRandom(productsRandom);
    }
  }, [products]);
  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark mb-4">
      {productRandom.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              height={400}
              width={400}
            />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
