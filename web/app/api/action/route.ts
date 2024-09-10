import {
  ActionGetResponse,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from '@solana/actions';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
// import { closeEmptyAccounts } from './helper';
import {
  createCloseAccountInstruction,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { createAsset } from './createAsset';
import { useWallet } from '@solana/wallet-adapter-react';

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    title: 'Play this Quiz and Earn a Solana NFT',
    icon: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png',
    // icon: 'http://localhost:3001/fee3.png',
    // icon: new URL(request.url).origin + '/fee5.png',
    description: `
    Q-1) What is the base transaction fee on Solana?
      a) 1,000 lamports   b) 5,000 lamports  c) 10,000 lamports

    Q-2) What is the maximum size of a Solana transaction?
      a) 1232 bytes  b) 1024 bytes  c) 1500 bytes

    Q-3) What happens if an instruction within a transaction fails?
      a) Only the failing instruction is rolled back,
      b) The transaction continues with the remaining instructions,
      c) The entire transaction fails`,

    label: 'BLINK',

    // links: {
    //   actions: [
        // {
        //   label: 'Option ABC',
        //   href: request.url + '?pg=token',
        // },
        // {
        //   label: 'Option ABC',
        //   href: request.url + '?pg=token',
        // },
        // {
        //   label: 'Option ABC',
        //   href: request.url + '?pg=token',
        // },
        // {
        //   label: 'Option ABC',
        //   href: request.url + '?pg=token',
        // },
        // {
        //   label: 'Option ABC',
        //   href: request.url + '?pg=token',
        // },
        // {
        //   label: 'Option ABC',
        //   href: request.url + '?pg=token',
        // },
        // {
        //   label: 'Option ABC',
        //   href: request.url + '?pg=token',
        // },

        // {
        //   label: 'Close Token Program Accounts',
        //   href: request.url + '?pg=token',
        //   parameters: [
        //     {
        //       name: 'ans',
        //       label: 'Answer',
        //     },
        //   ],
        // },

        // {
        //   label: 'Submit Quiz',
        //   href: request.url,
        //   parameters: [
        //     {
        //       type: 'select',
        //       name: 'Correct Answer',
        //       label: 'select Correct Options',
        //       options: [
        //         { label: 'Option1 - aba', value: 'ABC', selected: true },
        //         { label: 'Option2 - abb', value: 'ABC', selected: true },
        //         { label: 'Option3 - abc', value: 'ABC', selected: true },
        //         { label: 'Option4 - bca', value: 'ABC', selected: true },
        //         { label: 'Option5 - bba', value: 'ABC', selected: true },
        //         { label: 'Option6 - bac', value: 'ABC', selected: true },
        //       ],
        //     },
        //   ],
        // },

    //   ],
    // },
  };
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}


export const OPTIONS = GET;


export async function POST(request: Request) {
  const connection = new Connection(clusterApiUrl('devnet'));
  // const {wallet} =useWallet();
  const reqBody = await request.json();
  let sender = new PublicKey(reqBody.account);

  const pg = new URL(request.url).searchParams.get('pg');
  const programId = pg == 'token' ? TOKEN_PROGRAM_ID : TOKEN_2022_PROGRAM_ID;
  // const emptyTAs = await closeEmptyAccounts(connection, sender, programId);

  // const tx = new Transaction();
  // tx.feePayer = sender;
  // const blockHeight = await connection.getLatestBlockhash();
  // tx.recentBlockhash = blockHeight.blockhash;
  // tx.lastValidBlockHeight = blockHeight.lastValidBlockHeight;
  // const ixs = emptyTAs.map((acc) =>
  //   createCloseAccountInstruction(acc, sender, sender, undefined, programId)
  // );

  // if (ixs.length > 0) {
  //   tx.add(...ixs);
  // }
  // const serialisedTx = tx
  //   .serialize({ requireAllSignatures: false, verifySignatures: false })
  //   .toString('base64');
  
  const serialisedTx=await createAsset(reqBody.account);
  const response: ActionPostResponse = {
    transaction: Buffer.from(serialisedTx).toString("base64"),
    // transaction:"",
    message: 'Congrats, you recieved the Completion NFT',
  };
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}
