import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Staking } from '../target/types/staking';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
} from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { receiverKeypair, ownerWalletKeypair } from './utils/users';

anchor.setProvider(anchor.Provider.env());

const program = anchor.workspace.Staking as Program<Staking>;

const findAta = async (walletPubKey, mintPubKey) => {
  const ata = (
    await program.provider.connection.getParsedTokenAccountsByOwner(
      walletPubKey as PublicKey,
      { mint: mintPubKey }
    )
  ).value;

  return ata;
};

describe('staking', () => {
  const mintPk = new PublicKey('6nuE6ApVfA7pfqZ9nmC86irVnsGxdPUE1LihWKBpGzVP');

  let fromATA;
  let toATA;

  it("sends the token to the receiver using the program's CPI", async () => {
    const fromTokenAccounts = await findAta(
      ownerWalletKeypair.publicKey,
      mintPk
    );
    fromATA = fromTokenAccounts[0];

    const toTokenAccounts = await findAta(receiverKeypair.publicKey, mintPk);
    toATA = toTokenAccounts[0];

    await program.rpc.transferToken({
      accounts: {
        sender: program.provider.wallet.publicKey,
        // owner: ownerWalletKeypair.publicKey,
        senderToken: fromATA.pubkey,
        receiverToken: toATA.pubkey,
        mint: mintPk,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [ownerWalletKeypair],
    });
    console.log(
      'original owner token balance: ',
      await program.provider.connection.getTokenAccountBalance(fromATA.pubkey)
    );
    console.log(
      'receiver token balance: ',
      await program.provider.connection.getTokenAccountBalance(toATA.pubkey)
    );
  });

  it("sends the token back to the owner using the program's CPI", async () => {
    const fromTokenAccounts = await findAta(
      ownerWalletKeypair.publicKey,
      mintPk
    );
    fromATA = fromTokenAccounts[0];

    const toTokenAccounts = await findAta(receiverKeypair.publicKey, mintPk);
    toATA = toTokenAccounts[0];

    await program.rpc.transferToken({
      accounts: {
        sender: program.provider.wallet.publicKey,
        // owner: receiverKeypair.publicKey,
        senderToken: toATA.pubkey,
        receiverToken: fromATA.pubkey,
        mint: mintPk,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [receiverKeypair],
    });
    console.log(
      'original owner token balance: ',
      await program.provider.connection.getTokenAccountBalance(fromATA.pubkey)
    );
    console.log(
      'receiver (sender here) token balance: ',
      await program.provider.connection.getTokenAccountBalance(toATA.pubkey)
    );
  });
});
