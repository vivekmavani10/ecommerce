import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductContext } from "./context/productcontext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatPrice";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import Star icons
import AddToCart from "./components/AddToCart";

const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const { id } = useParams();

  const {
    id: alias,
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    image,
    reviews,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, []);

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  // Function to render star ratings
  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5; // Half star condition
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} style={{ color: "#FFD700" }} />
        ))}
        {halfStar && <FaStarHalfAlt style={{ color: "#FFD700" }} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} style={{ color: "#ccc" }} />
        ))}
      </>
    );
  };

  return (
    <Wrapper>
      <PageNavigation title={name} />

      <Container className="container">
        <div className="grid grid-two-column">
          <div
            className="product_images"
            style={{ display: "flex", alignItems: "center" }}
          >
            <MyImage imgs={image} />
          </div>

          <div className="product_data">
            <h2>{name}</h2>
            <div
              className="product-rating"
              style={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <p>
                {renderStars(stars || 0)} {stars}
              </p>{" "}
              {/* Default to 0 if stars is undefined */}
              <p> ({reviews || 0} Reviews)</p> {/* Handle undefined reviews */}
            </div>

            <p style={{ marginTop: "15px" }} className="product-data-price">
              MRP:{" "}
              <del>
                <FormatPrice price={price + 250000} />
              </del>
            </p>
            <p
              style={{ marginTop: "15px", color: "blue" }}
              className="product-data-price  product-data-real-price"
            >
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p style={{ marginTop: "15px" }}>{description}</p>

            <div
              className="product-data-warranty"
              style={{ display: "flex", gap: "12px", marginTop: "15px" }}
            >
              <div className="product-warranty-data">
                <TbTruckDelivery
                  className="warranty-icon"
                  style={{ fontSize: "25px" }}
                />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace
                  className="warranty-icon"
                  style={{ fontSize: "25px" }}
                />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery
                  className="warranty-icon"
                  style={{ fontSize: "25px" }}
                />
                <p>Delivered</p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity
                  className="warranty-icon"
                  style={{ fontSize: "25px" }}
                />
                <p>2 Year Warranty</p>
              </div>
            </div>

            <div className="product-data-info">
              <p style={{ marginTop: "15px" }}>
                Available :
                <span>{stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              {/* <p style={{ marginTop: "15px" }}>
                ID : <span>{alias}</span>
              </p> */}
              <p style={{ marginTop: "15px" }}>
                BRAND : <span>{company}</span>
              </p>
            </div>

            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-rating {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
