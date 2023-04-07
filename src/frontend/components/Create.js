import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = ({ marketplace, nft }) => {
    const [listings, setListings] = useState([]);
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        // fetch the existing listings for Netflix and Disney Plus
        const fetchListings = async () => {
            const netflixListing = await marketplace.fetchItemDetails(
                ethers.utils.formatBytes32String("NETFLIX")
            );
            const disneyPlusListing = await marketplace.fetchItemDetails(
                ethers.utils.formatBytes32String("DISNEY_PLUS")
            );
            setListings([netflixListing, disneyPlusListing]);
        };
        fetchListings();
    }, [marketplace]);

    const uploadToIPFS = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (typeof file !== "undefined") {
            try {
                const result = await client.add(file);
                console.log(result);
                setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
            } catch (error) {
                console.log("ipfs image upload error: ", error);
            }
        }
    };

    const createNFT = async () => {
        if (!image || !price || !name || !description) return;
        try {
            const result = await client.add(
                JSON.stringify({ image, price, name, description })
            );
            mintThenList(result);
        } catch (error) {
            console.log("ipfs uri upload error: ", error);
        }
    };

    const mintThenList = async (result) => {
        const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
        // mint nft
        await (await nft.mint(uri)).wait();
        // get tokenId of new nft
        const id = await nft.tokenCount();
        // approve marketplace to spend nft
        await (await nft.setApprovalForAll(marketplace.address, true)).wait();
        // add nft to marketplace
        const listingPrice = ethers.utils.parseEther(price.toString());
        await (
            await marketplace.makeItem(nft.address, id, listingPrice)
        ).wait();
        // fetch the updated listings and add the new listing to the list
        const newListing = await marketplace.fetchItemDetails(
            ethers.utils.formatBytes32String(name.toUpperCase())
        );
        setListings([...listings, newListing]);
    };

    const createNetflixListing = async () => {
        // create NFT data for Netflix
        const netflixData = {
            image: "https://cdn.vox-cdn.com/thumbor/0H--I9XaXvJlSbe2QYcMbywTY1M=/0x0:2400x1260/920x613/filters:focal(1008x285:1392x669):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/68171386/Screen_Shot_2021_01_20_at_11.52.41_AM.0.png",
            price: 1,
            name: "Netflix NFT",
            description: "An NFT representing a share in Netflix.",
        };

        try {
            const result = await client.add(JSON.stringify(netflixData));
            const uri = `https://ipfs.infura.io/ipfs/${result.path}`;

            // mint Netflix NFT
            await (await nft.mint(uri)).wait();

            // get tokenId of new NFT
            const id = await nft.tokenCount();

            // approve marketplace to spend NFT
            await (
                await nft.setApprovalForAll(marketplace.address, true)
            ).wait();

            // add Netflix NFT to marketplace
            const listingPrice = ethers.utils.parseEther(
                netflixData.price.toString()
            );
            await (
                await marketplace.makeItem(nft.address, id, listingPrice)
            ).wait();

            console.log("Netflix listing created!");
        } catch (error) {
            console.log("Error creating Netflix listing:", error);
        }
    };

    const createDisneyPlusListing = async () => {
        // create NFT data for Netflix
        const netflixData = {
            image: "https://cdn.vox-cdn.com/thumbor/0H--I9XaXvJlSbe2QYcMbywTY1M=/0x0:2400x1260/920x613/filters:focal(1008x285:1392x669):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/68171386/Screen_Shot_2021_01_20_at_11.52.41_AM.0.png",
            price: 1,
            name: "Netflix NFT",
            description: "An NFT representing a share in Netflix.",
        };

        try {
            const result = await client.add(JSON.stringify(netflixData));
            const uri = `https://ipfs.infura.io/ipfs/${result.path}`;

            // mint Netflix NFT
            await (await nft.mint(uri)).wait();

            // get tokenId of new NFT
            const id = await nft.tokenCount();

            // approve marketplace to spend NFT
            await (
                await nft.setApprovalForAll(marketplace.address, true)
            ).wait();

            // add Netflix NFT to marketplace
            const listingPrice = ethers.utils.parseEther(
                netflixData.price.toString()
            );
            await (
                await marketplace.makeItem(nft.address, id, listingPrice)
            ).wait();

            console.log("Netflix listing created!");
        } catch (error) {
            console.log("Error creating Netflix listing:", error);
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <main
                    role="main"
                    className="col-lg-12 mx-auto"
                    style={{ maxWidth: "1000px" }}
                >
                    <div className="content mx-auto">
                        <Row className="g-4">
                            <div className="d-grid px-0">
                                <Button
                                    onClick={createNetflixListing}
                                    variant="primary"
                                    size="lg"
                                >
                                    Create & List Netflix Subscription!
                                </Button>
                            </div>
                            <div className="d-grid px-0">
                                <Button
                                    onClick={createDisneyPlusListing}
                                    variant="primary"
                                    size="lg"
                                >
                                    Create & List Disney+ Subscription!
                                </Button>
                            </div>
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Create;
