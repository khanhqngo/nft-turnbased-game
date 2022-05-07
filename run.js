const main = async () => {
    /*This line of getContractFactory code will actually compile our
    contract and generate the necessary files 
    we need to work with our contract under the artifacts directory.
    */
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    /*What's happening here is Hardhat will create a local Ethereum network for us, 
    but just for this contract. Then, after the script completes it'll destroy that
    local network. So, every time you run the contract, it'll be a fresh blockchain. 
    Whats the point? It's kinda like refreshing your local server every time so you 
    always start from a clean slate which makes it easy to debug errors.
    */
    const gameContract = await gameContractFactory.deploy(
        ["Jack", "Alice", "Break"],       // Names
        ["https://i.imgur.com/LdOERAn.png", // Images
        "https://i.imgur.com/X7D5pHu.png", 
        "https://i.imgur.com/jpUxBGm.png"],
        [100, 200, 400],                    // HP values
        [150, 50, 250],                       // Attack damage values
        "Jabberwocky", // Boss name
        "https://i.imgur.com/EvVVRwm.png", // Boss image
        8000, // Boss hp
        70 // Boss attack damage
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    // Get the value of the NFT's URI.
    // let returnedTokenUri = await gameContract.tokenURI(1);
    // console.log("Token URI:", returnedTokenUri);    
    
    console.log("Done!");
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
  
runMain();
