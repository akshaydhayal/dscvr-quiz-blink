'use client';

import Link from 'next/link';
import { AppHero } from '../ui/ui-layout';

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  {
    label: 'Solana Developers GitHub',
    href: 'https://github.com/solana-developers/',
  },
];

export default function DashboardFeature() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center bg-[#121212]">
      {/* Hero Section */}
      <div className="text-center p-6 bg-[#121212] shadow-lg rounded-lg max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-300 mb-4">
          Earn Solana NFTs by Completing Quizzes
        </h1>
        <p className="text-lg text-slate-300 mb-6">
          Answer questions and earn exclusive Solana NFTs as a reward! Test your
          knowledge about Solana, blockchain technology, and more.
        </p>
        <div className="relative w-64 h-64 mx-auto mb-6">
          <img
            src="/nft2.png" // Add the path to your image here
            alt="Quiz Image"
            className="object-contain"
          />
        </div>
        <Link href="/">
          <p className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
            Take the Quiz
          </p>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-3 text-center bg-[#121212]">
        <div className="p-6 bg-[#121212] shadow-lg rounded-lg border border-slate-500">
          <h3 className="text-2xl font-bold mb-2 text-slate-300">
            Beginner NFTs
          </h3>
          <p className="text-gray-400">
            Earn your first NFT by answering 1 question correctly.
          </p>
        </div>
        <div className="p-6  shadow-lg rounded-lg border border-slate-500">
          <h3 className="text-2xl font-bold mb-2 text-slate-300">
            Skilled NFTs
          </h3>
          <p className="text-gray-400">
            Get 2 correct answers to earn a Skilled-level NFT.
          </p>
        </div>
        <div className="p-6  shadow-lg rounded-lg text-slate-200 border border-slate-500">
          <h3 className="text-2xl font-bold mb-2">Expert NFTs</h3>
          <p className="text-gray-400">
            Answer all 3 questions correctly to win an Expert NFT.
          </p>
        </div>
      </div>
    </div>

    // <div>
    //   <AppHero title="gm" subtitle="Say hi to your new Solana dApp." />
    //   <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
    //     <div className="space-y-2">
    //       <p>Here are some helpful links to get you started.</p>
    //       {links.map((link, index) => (
    //         <div key={index}>
    //           <a
    //             href={link.href}
    //             className="link"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             {link.label}
    //           </a>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}
