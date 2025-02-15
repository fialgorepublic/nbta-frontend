const { Connection, PublicKey } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

async function getTokenBalance() {
    // Connect to Solana mainnet
    const connection = new Connection('https://api.devnet.solana.com');
    
    // Create PublicKey objects
    const ownerPublicKey = new PublicKey('5nrmn87MudnZa2VGVoyFVbAEaU1RMZQbnjaU9XrDMqs4');
    const tokenMint = new PublicKey('9dMjXyr6CC2mZjkgabVv4cQ1upkzEGpjYywsndcU8qzA');

    // Get all token accounts for this owner
    const tokenAccounts = await connection.getTokenAccountsByOwner(
        ownerPublicKey,
        { programId: TOKEN_PROGRAM_ID }
    );

    // Find the specific token account for our mint
    const tokenAccount = tokenAccounts.value.find(account => {
        const accountData = account.account.data;
        const mint = new PublicKey(accountData.slice(0, 32));
        return mint.toString() === tokenMint.toString();
    });

    if (tokenAccount) {
        const balance = await connection.getTokenAccountBalance(tokenAccount.pubkey);
        console.log(`Token Balance: ${balance.value.uiAmount}`);
    } else {
        console.log('Token account not found');
    }
}

getTokenBalance().catch(console.error);