# NFT Marketplace

## Requirements For Initial Setup

-   Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
-   Install [Hardhat](https://hardhat.org/)
-   npm install --save-dev hardhat@2.8.4

## Setting Up

### 1. Clone/Download the Repository

### 2. Install Dependencies:

<ul>- go to terminal and type in the following</ul>

```
$ npm install --save-dev hardhat@2.8.4
$ npm install
```

### 3. Boot up local development blockchain

```
$ npx hardhat node
```

### 4. Connect development blockchain accounts to Metamask

-   Copy private key of the addresses and import to Metamask
-   Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
-   If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.

### 5. Migrate Smart Contracts

<ul>- go to another terminal and type in the following</ul>

```
npx hardhat run src/backend/scripts/deploy.js --network localhost`
```

### 6. Run Tests (_Optional_)

```
$ npx hardhat test
```

### 7. Launch Frontend

```
$ npm run start
```
