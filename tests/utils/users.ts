import { PublicKey, Keypair } from '@solana/web3.js';

const seed = [
  198, 44, 7, 166, 138, 255, 142, 136, 188, 235, 103, 88, 114, 101, 125, 241,
  56, 15, 114, 218, 5, 228, 21, 29, 148, 227, 6, 31, 8, 104, 1, 31, 206, 145,
  205, 30, 167, 20, 125, 71, 143, 125, 130, 56, 158, 111, 106, 184, 87, 119,
  189, 110, 170, 181, 118, 92, 244, 233, 108, 88, 253, 193, 169, 16,
].slice(0, 32);
const receiverSeed = [
  91, 182, 64, 237, 29, 95, 254, 111, 245, 44, 141, 12, 58, 169, 154, 238, 186,
  105, 232, 197, 116, 193, 5, 162, 56, 129, 247, 152, 232, 95, 34, 250,
].slice(0, 32);

export const receiverKeypair = Keypair.fromSeed(Uint8Array.from(receiverSeed));
export const ownerWalletKeypair = Keypair.fromSeed(Uint8Array.from(seed));
