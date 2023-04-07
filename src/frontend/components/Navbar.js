import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, Form } from "react-bootstrap";
import market from "./market.png";

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>
                <Navbar.Brand href="http://www.dappuniversity.com/bootcamp">
                    <img
                        src={market}
                        width="40"
                        height="40"
                        className=""
                        alt=""
                    />
                    &nbsp; DecenTrust
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* Links to other pages */}
                    {/* <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create
            </Nav.Link>
            <Nav.Link as={Link} to="/my-listed-items">
              My Listed Items
            </Nav.Link>
            <Nav.Link as={Link} to="/my-purchases">
              My Purchases
            </Nav.Link>
          </Nav> */}
                    <Nav>
                        <Form className="d-flex mx-4">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                            />
                            <Button variant="outline-light" type="submit">
                                Search
                            </Button>
                        </Form>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4"
                            >
                                <Button variant="outline-light">
                                    {account.slice(0, 5) +
                                        "..." +
                                        account.slice(38, 42)}
                                </Button>
                            </Nav.Link>
                        ) : (
                            <Button
                                onClick={web3Handler}
                                variant="outline-light"
                            >
                                Connect Wallet
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
