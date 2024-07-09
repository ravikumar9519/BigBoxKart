import { Nav, ProgressBar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item className="mx-2">
        {step1 ? (
          <>
            <LinkContainer to="/login">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
            <ProgressBar variant="success" now={100} />
          </>
        ) : (
          <>
            <Nav.Link disabled>Sign In</Nav.Link>

            <ProgressBar />
          </>
        )}
      </Nav.Item>
      <Nav.Item className="mx-2">
        {step2 ? (
          <>
            <LinkContainer to="/shipping">
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
            <ProgressBar variant="success" now={100} />
          </>
        ) : (
          <>
            <Nav.Link disabled>Shipping</Nav.Link>

            <ProgressBar />
          </>
        )}
      </Nav.Item>
      <Nav.Item className="mx-2">
        {step3 ? (
          <>
            <LinkContainer to="/payment">
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
            <ProgressBar variant="success" now={100} />
          </>
        ) : (
          <>
            <Nav.Link disabled>Payment</Nav.Link>

            <ProgressBar />
          </>
        )}
      </Nav.Item>
      <Nav.Item className="mx-2">
        {step4 ? (
          <>
            <LinkContainer to="/placeorder">
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
            <ProgressBar variant="success" now={100} />
          </>
        ) : (
          <>
            <Nav.Link disabled>Place Order</Nav.Link>

            <ProgressBar />
          </>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
