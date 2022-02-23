// @ts-ignore
// const feePayer = program.provider.wallet.payer;

// it('sends the NFT to the receiver account', async () => {
//   const fromTokenAccounts = await findAta(
//     ownerWalletKeypair.publicKey,
//     mintPk
//   );
//   fromATA = fromTokenAccounts[0];

//   const toTokenAccounts = await findAta(receiverKeypair.publicKey, mintPk);
//   toATA = toTokenAccounts[0];

//   let tx = new Transaction().add(
//     Token.createTransferCheckedInstruction(
//       TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
//       // @ts-ignore
//       fromATA.pubkey, // from (should be a token account)
//       mintPk, // mint
//       // @ts-ignore
//       toATA.pubkey, // to (should be a token account)
//       // @ts-ignore
//       ownerWalletKeypair.publicKey, // owner of from
//       [], // for multisig account, leave empty.
//       1, // amount, if your deciamls is 8, send 10^8 for 1 token
//       0 // decimals
//     )
//   );

//   console.log(tx);

//   console.log(
//     `txhash: ${await program.provider.connection.sendTransaction(tx, [
//       // @ts-ignore
//       feePayer,
//       // @ts-ignore
//       ownerWalletKeypair,
//     ])}`
//   );

//   console.log(
//     'original owner token balance: ',
//     await program.provider.connection.getTokenAccountBalance(fromATA.pubkey)
//   );
//   console.log(
//     'receiver token balance: ',
//     await program.provider.connection.getTokenAccountBalance(toATA.pubkey)
//   );
// });

// it('sends the NFT back to the owner account', async () => {
//   const fromTokenAccounts = await findAta(
//     ownerWalletKeypair.publicKey,
//     mintPk
//   );
//   fromATA = fromTokenAccounts[0];

//   const toTokenAccounts = await findAta(receiverKeypair.publicKey, mintPk);
//   toATA = toTokenAccounts[0];

//   console.log(
//     'original owner token balance: ',
//     await program.provider.connection.getTokenAccountBalance(fromATA.pubkey)
//   );
//   console.log(
//     'receiver token balance: ',
//     await program.provider.connection.getTokenAccountBalance(toATA.pubkey)
//   );

//   let tx = new Transaction().add(
//     Token.createTransferCheckedInstruction(
//       TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
//       // @ts-ignore
//       toATA.pubkey, // from (should be a token account)
//       mintPk, // mint
//       // @ts-ignore
//       fromATA.pubkey, // to (should be a token account)
//       // @ts-ignore
//       receiverKeypair.publicKey, // owner of from
//       [], // for multisig account, leave empty.
//       1, // amount, if your deciamls is 8, send 10^8 for 1 token
//       0 // decimals
//     )
//   );

//   console.log(tx);

//   console.log(
//     `txhash: ${await program.provider.connection.sendTransaction(tx, [
//       // @ts-ignore
//       feePayer,
//       // @ts-ignore
//       receiverKeypair,
//     ])}`
//   );
//   console.log(
//     'original owner token balance: ',
//     await program.provider.connection.getTokenAccountBalance(fromATA.pubkey)
//   );
//   console.log(
//     'receiver token balance: ',
//     await program.provider.connection.getTokenAccountBalance(toATA.pubkey)
//   );
// });

// const testFrom = (
//   await PublicKey.findProgramAddress(
//     [
//       // @ts-ignore
//       ownerWallet?.publicKey.toBuffer(),
//       TOKEN_PROGRAM_ID.toBuffer(),
//       mintPk.toBuffer(),
//     ],
//     SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
//   )
// )[0];
