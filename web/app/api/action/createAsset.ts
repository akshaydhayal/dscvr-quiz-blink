import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  create,
  fetchAsset,
  fetchCollection,
} from '@metaplex-foundation/mpl-core';
import { base58, base64 } from '@metaplex-foundation/umi/serializers';
// import { createNoopSigner, createSignerFromKeypair, generateSigner, publicKey, signerIdentity } from '@metaplex-foundation/umi';
import { createNoopSigner, createSignerFromKeypair, generateSigner, publicKey, signerIdentity } from '@metaplex-foundation/umi';
import { createSignerFromWalletAdapter, walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { assetMetadataUri } from './assetMetadata';
import { Keypair, PublicKey } from '@solana/web3.js';
import { walletSecret } from './wallet';

// export async function createAsset(wallet: any) {
export async function createAsset(user:string) {
    console.log("Start of createAsset fn : ");
//   if (!wallet) {
//     await wallet.connect();
//   }
  // Setup Umi
  const umi = createUmi('https://api.devnet.solana.com', 'confirmed');
  const keypair = umi.eddsa.createKeypairFromSecretKey(
    Uint8Array.from(walletSecret)
  );
  
  const adminSigner = createSignerFromKeypair(umi, keypair);
//   const b = publicKey(user); // This works if 'user' is a valid public key string
//   const a = createNoopSigner(b);
  umi.use(signerIdentity(createNoopSigner(publicKey(user))));

  //   umi.use(walletAdapterIdentity(wallet));

  const assetMetadataLink =
    'https://arweave.net/zzXHoRWMMN09H8KiAK3aUV_FEfhl5uy_pKHiKjHp1vo';

  // Generate the Asset KeyPair
  const asset = generateSigner(umi);
  console.log('This is your asset address', asset.publicKey.toString());

  // Generate the Asset
  try {
    const tx = await create(umi, {
      asset,
      name: 'Solana Blinkk',
      uri: assetMetadataLink,
      authority:adminSigner
    }).buildAndSign(umi);
    // }).sendAndConfirm(umi);

    // console.log('tx : ',tx);

    // Deserialize the Signature from the Transaction
    // console.log(
    //   'Asset Created: https://solana.fm/tx/' +
    //     base58.deserialize(tx.signature)[0] +
    //     '?cluster=devnet-alpha'
    // );

    // const assetdetails = await fetchAsset(umi, asset.publicKey, {
    //   skipDerivePlugins: false,
    // });
    // console.log('fetched asset details : ', assetdetails);
    // base64.serialize(tx)

    console.log(Buffer.from(umi.transactions.serialize(tx)).toString("base64"));
    // console.log(umi.transactions.serialize(tx).toString());

    // console.log(base64.serialize())
    return umi.transactions.serialize(tx);

  } catch (error) {
    console.error('Error creating asset:', error);
  }
}
