# DecenTrust

The code presented in this github repository serves as the base for the connection of the website the the blockchain using MetaMask only - the whole function of the proposed solution is at the given video presentation. This code will show the possibility of connecting to the blockchain for the purpose of buying membership services.

## Requirements For Initial Setup

-   Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
-   Install [Hardhat](https://hardhat.org/)

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

-   To use your address on Metamask, you need to copy its private key and import it into Metamask.
-   After that, connect Metamask to the Hardhat blockchain network by selecting network 127.0.0.1:8545.
-   If Hardhat is not listed on your Metamask, you can add it by opening your browser, clicking the fox icon, and selecting the dropdown menu in the top center that displays all the available networks. Then, choose "Add Network" and fill in the form with the following information: Network Name: "Hardhat", New RPC URL: "http://127.0.0.1:8545", and Chain ID: "31337". Finally, click "Save".

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
