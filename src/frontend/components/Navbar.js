import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, Form } from "react-bootstrap";
import logo from "./logos/decentrust_gradient.png";
import shoppingCart from "./logos/shoppingcart.png";

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} className="mr-2" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Form className="d-flex mx-4">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                        />
                        <Button variant="outline-primary" type="submit">
                            Search
                        </Button>
                    </Form>
                    <Nav className="ms-auto">
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4"
                            >
                                <Button variant="outline-primary">
                                    {account.slice(0, 5) +
                                        "..." +
                                        account.slice(38, 42)}
                                </Button>
                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="primary">
                                Connect Wallet
                            </Button>
                        )}
                        <img src={shoppingCart} alt="" className="ml-3" />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
