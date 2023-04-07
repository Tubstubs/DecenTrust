import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button, Carousel, Image } from "react-bootstrap";
import image1 from "./pictures/netflix.png";
import image2 from "./pictures/disney_plus.png";
import image3 from "./pictures/netflix2.png";
import image4 from "./pictures/disney_plus2.png";
import image5 from "./pictures/youtube.png";
const Home = ({ marketplace, nft }) => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const loadMarketplaceItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount();
        let items = [];
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i);
            if (!item.sold) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId);
                // use uri to fetch the nft metadata stored on ipfs
                const response = await fetch(uri);
                const metadata = await response.json();
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId);
                // Add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                });
            }
        }
        setLoading(false);
        setItems(items);
    };

    const buyMarketItem = async (item) => {
        await (
            await marketplace.purchaseItem(item.itemId, {
                value: item.totalPrice,
            })
        ).wait();
        loadMarketplaceItems();
    };

    useEffect(() => {
        loadMarketplaceItems();
    }, []);

    if (loading) {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h2>Loading...</h2>
            </main>
        );
    }
    return (
        <div className="flex justify-center">
            <div className="px-5 container">
                <Row xs={1} md={2} lg={4} className="g-4 py-5">
                    {items.map((item, idx) => (
                        <Col key={idx} className="overflow-hidden">
                            <Card>
                                <div
                                    style={{
                                        height: "250px",
                                        position: "relative",
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={item.image}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <h4
                                        style={{
                                            position: "absolute",
                                            bottom: "0",
                                            left: "0",
                                            width: "100%",
                                            padding: "10px",
                                            margin: "0",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            color: "white",
                                            textAlign: "center",
                                        }}
                                    >
                                        {item.name}
                                    </h4>
                                </div>
                                <Card.Body color="secondary">
                                    <Card.Text>{item.description}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="d-grid">
                                        <Button
                                            onClick={() => buyMarketItem(item)}
                                            variant="primary"
                                            size="lg"
                                        >
                                            Buy for{" "}
                                            {ethers.utils.formatEther(
                                                item.totalPrice
                                            )}{" "}
                                            ETH
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <Carousel>
                <Carousel.Item>
                    <img src={image1} alt="Netflix 1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={image2} alt="Netflix 2" />
                </Carousel.Item>
            </Carousel>
            <div className="d-flex justify-content-center mt-5">
                <a
                    href="./links/netflix.js"
                    className="d-flex align-items-center me-5"
                >
                    <img src={image3} alt="Netflix" width="100%" />
                </a>
                <a
                    href="disney-plus.js"
                    className="d-flex align-items-center me-5"
                >
                    <img src={image4} alt="Disney Plus" width="100%" />
                </a>
                <a
                    href="youtube-premium.js"
                    className="d-flex align-items-center"
                >
                    <img src={image5} alt="Youtube Premium" width="100%" />
                </a>
            </div>
        </div>
    );
};

export default Home;
