import React, { useCallback } from "react";

import LazyLoad from "react-lazyload";
import {
  Container,
  Image,
  LeftFrame,
  DetailsFrame,
  Title,
  OrderCount,
  Price,
  Delivery,
  ActionGroup,
  LightText,
} from "../ProductListing/ProductStyle";
import { Row } from "../ProductListing/Grid";
import  Button from "../../components/ProductListing/Button";
import  Rating  from "../../components/ProductListing/Rating";

const ImgFrame = React.memo(({ src }) => {
  return (
    <LeftFrame>
      <LazyLoad height={100} once>
        <Image src={src} alt="product" />
      </LazyLoad>
    </LeftFrame>
  );
});

function ProductCard({ product }) {


  return (
    <Container>
      <ImgFrame src={product.imgPath} />

      <DetailsFrame>
        <Title>{product.name}</Title>

        <Row>
          {/* <Rating score={product.rating} /> */}
          <OrderCount>{product.orderCount}</OrderCount>
        </Row>

        <ActionGroup>
          <Price>250</Price>
          <LightText>Save extra with No Cost EMI</LightText>
        </ActionGroup>

        <ActionGroup>
          <LightText>
            Get it by <Delivery>{product.delivery}</Delivery>
          </LightText>
          <LightText>FREE Delivery by Eshopper</LightText>
        </ActionGroup>

        <ActionGroup>
          <Button
            type="button"
            // color={isCartProduct ? "secondary" : "primary"}
            // onClick={isCartProduct ? removeFromCart : addToCart}
          >buy now
            {/* {isCartProduct ? "Remove from Cart" : "Add to Cart"} */}
          </Button>
        </ActionGroup>
      </DetailsFrame>
    </Container>
  );
}

// ProductCard.propTypes = {
//   product: ProductCardPropTypes.isRequired,
// };

export default ProductCard;
