import { PublicKey, Keypair } from '@solana/web3.js';

const OWNER_WALLET_BYTE_ARRAY = [].slice(0, 32);
const RECEIVER_WALLET_BYTE_ARRAY = [].slice(0, 32);

export const receiverKeypair = Keypair.fromSeed(
  Uint8Array.from(OWNER_WALLET_BYTE_ARRAY)
);
export const ownerWalletKeypair = Keypair.fromSeed(
  Uint8Array.from(RECEIVER_WALLET_BYTE_ARRAY)
);
