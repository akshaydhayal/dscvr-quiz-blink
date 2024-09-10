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
    // icon: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png',
    // icon: 'http://localhost:3001/fee3.png',
    icon: new URL(request.url).origin + '/nft2.png',
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

    links: {
      actions: [
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

        {
          label: 'Submit Quiz',
          href: request.url,
          parameters: [
            {
              type: 'select',
              name: 'selected_option',
              label: 'Select Option',
              options: [
                { label: 'Option1 - abc', value: 'abc', selected: true },
                { label: 'Option2 - acb', value: 'acb', selected: true },
                { label: 'Option3 - bbc', value: 'bbc', selected: true },
                { label: 'Option4 - bac', value: 'bac', selected: true },
                { label: 'Option5 - cab', value: 'cab', selected: true },
                { label: 'Option6 - cbc', value: 'cbc', selected: true },
              ],
            },
          ],
        },

      ],
    },
  };
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}


export const OPTIONS = GET;


export async function POST(request: Request) {
  const connection = new Connection(clusterApiUrl('devnet'));
  // const {wallet} =useWallet();
  const reqBody = await request.json();
  console.log(reqBody.data.selected_option);
  const selected_options=reqBody.data.selected_option;
  let correctAns=0;
  if(selected_options[0]=='b') correctAns++;
  if(selected_options[1]=='a') correctAns++;
  if(selected_options[2]=='c') correctAns++;

  let msg;
  if(correctAns>=1){
    msg ='Wooh! You scored ' +correctAns +'/3 Questions correctly. You have recieved the NFT in your wallet';
  }else{
    msg="Oops! You scored 0/3 Questions correctly. You need atleast 1 question right to get the NFT. You can re-attempt the quiz.";
  }

  const emptyTx=new Transaction();
  emptyTx.feePayer=new PublicKey(reqBody.account);
  emptyTx.recentBlockhash=(await connection.getLatestBlockhash()).blockhash;
  const serialisedEmptyTx=emptyTx.serialize({requireAllSignatures:false,verifySignatures:false}).toString("base64");
  
  let serialisedTx;
  if(correctAns>=1){
    serialisedTx=await createAsset(reqBody.account);
  }
  const response: ActionPostResponse = {
    // transaction: Buffer.from(serialisedTx??"").toString("base64"),
    transaction:(correctAns >= 1)? Buffer.from(serialisedTx ?? '').toString('base64') : serialisedEmptyTx,
    message: msg,
    // message: 'Congrats, you recieved the Completion NFT',
  };
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}
