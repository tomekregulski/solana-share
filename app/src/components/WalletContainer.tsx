import React, { useState, useEffect } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import {
  TOKEN_PROGRAM_ID,
  Token,
} from '@solana/spl-token';

import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';

import axios from 'axios';

import TokenContainer from './TokenContainer';

import {
  preflightCommitment,
  programID,
  getNft,
  transferToken,
  feePayer,
} from '../utils';
import idl from '../idl.json';
import * as styles from '../styles';
// @ts-ignore

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
);

const MyWallet: React.FC = () => {
  const [nftData, setNftData] = useState<any[]>([]);
  const [nftDisplay, setNftDisplay] = useState<any[]>([]);
  const [destInput, setDestInput] = useState<String>('');
  const [tokenMint, setTokenMint] = useState<String>('');
  const [receiverPk, setReceiverPk] = useState<String>('');

  const TEST_MINT = '6nuE6ApVfA7pfqZ9nmC86irVnsGxdPUE1LihWKBpGzVP';
  const TEST_MINT_PK = new PublicKey(TEST_MINT);

  const devnet = clusterApiUrl('devnet');
  // const mainnet = clusterApiUrl('mainnet-beta');
  const network = devnet;

  const wallet = useAnchorWallet();
  const connection = new Connection(network, preflightCommitment);
  // @ts-ignore
  const provider = new Provider(connection, wallet, preflightCommitment);
  const program = new Program(idl, programID, provider);

  const retrieveTokens = async () => {
    const nftsmetadata = await getNft(connection, provider.wallet.publicKey);
    console.log(nftsmetadata);
    setNftData(nftsmetadata);
  };

  // @ts-ignore
  const setDestination = (e) => {
    e.preventDefault();
    setReceiverPk(destInput);
    setDestInput('');
  };

  const mintValue = (val: String) => {
    setTokenMint(val);
  };

  const testATA = async () => {
    console.log('testing ATA');
    // const toPk = new PublicKey(receiverPk);

    // let fromAta = await getAssociatedTokenAddress(
    //   TEST_MINT_PK, // mint
    //   provider.wallet.publicKey // owner
    // );
    // console.log(`ATA: ${fromAta.toBase58()}`);

    // let toAta = await getAssociatedTokenAddress(
    //   TEST_MINT_PK, // mint
    //   toPk // owner
    // );
    // console.log(`ATA: ${toAta.toBase58()}`);

    // let fromTx = new Transaction().add(
    //   createAssociatedTokenAccountInstruction(
    //     localAccount.publicKey, // payer
    //     fromAta, // ata
    //     provider.wallet.publicKey, // owner
    //     TEST_MINT_PK // mint
    //   )
    // );
    // console.log(
    //   `txhash: ${await connection.sendTransaction(fromTx, [localAccount])}`
    // );

    // let toTx = new Transaction().add(
    //   createAssociatedTokenAccountInstruction(
    //     localAccount.publicKey, // payer
    //     toAta, // ata
    //     toPk, // owner
    //     TEST_MINT_PK // mint
    //   )
    // );
    // console.log(
    //   `txhash: ${await connection.sendTransaction(toTx, [localAccount])}`
    // );
  };

  const initiateTransferToken = async () => {
    console.log('initializing transfer');
    await transferToken(receiverPk, connection, provider, tokenMint, program);
    setTimeout(() => {
      retrieveTokens();
    }, 2000);
  };

  useEffect(() => {
    let arr: [] = [];
    const parseNftData = async () => {
      for (let i = 0; i < nftData.length; i++) {
        let val = await axios.get(nftData[i].data.uri);
        val.data.mint = nftData[i].mint;
        // @ts-ignore
        arr.push(val);
      }
      setNftDisplay(arr);
    };
    parseNftData();
  }, [nftData]);

  return (
    <>
      <div className='multi-wrapper'>
        <div className='button-wrapper'>
          <WalletModalProvider>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '80px',
              }}
            >
              <WalletMultiButton />
            </div>
            {wallet ? (
              <div>
                <div>
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ margin: '10px 0' }}>
                      <button style={styles.btnStyle} onClick={retrieveTokens}>
                        {nftData.length === 0 ? 'Fetch NFTs' : 'Refresh NFts'}
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p>Source Wallet: {wallet.publicKey.toString()}</p>
                    {receiverPk !== '' ? (
                      <div style={styles.row_centered}>
                        <p>Destination Wallet: {receiverPk}</p>
                        <button
                          onClick={() => setReceiverPk('')}
                          style={styles.btnStyle}
                        >
                          Change
                        </button>
                        <button onClick={testATA} style={styles.btnStyle}>
                          Test ATA
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        Destination Wallet:
                        <input
                          onChange={(e) => setDestInput(e.target.value)}
                          style={styles.inputStyle}
                        />
                        <form onSubmit={(e) => setDestination(e)}>
                          <button type='submit' style={styles.btnStyle}>
                            Set
                          </button>
                        </form>
                      </div>
                    )}
                    {nftDisplay.length > 0 && (
                      <TokenContainer
                        callback={mintValue}
                        tokens={nftDisplay}
                      />
                    )}
                  </div>
                  {wallet && receiverPk !== '' && tokenMint !== '' ? (
                    <div>
                      <button
                        onClick={initiateTransferToken}
                        style={styles.btnStyle}
                      >
                        Transfer Token
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <p>Connect your wallet to begin</p>
            )}
          </WalletModalProvider>
        </div>
      </div>
    </>
  );
};

export default MyWallet;
