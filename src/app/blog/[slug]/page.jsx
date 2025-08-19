import DateFormat from '@/utils/dateFormat';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import '@/styles/blogContent.css'
import { notFound } from 'next/navigation';

const getBlog = async (slug) => {
    const blog = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/${slug}`, {
        cache: "no-store"
    });
    if (blog.status == 404) {
        notFound();
    }

    const body = await blog.json();
    return body;
}

/**
 * 
 * {
  id: '68a357bda25e23948bdb1905',
  title: 'How to Become a Web3 Developer?',
  slug: 'how-to-become-a-web3-developer',
  content: '<h3>Introduction</h3><p>Web3 is revolutionizing the internet by enabling 
decentralized applications (dApps) built on blockchain technology. Becoming a Web3 developer means learning to work with smart contracts, decentralized networks, and blockchain protocols. Here’s your roadmap to get started.</p><h3>1. Understand Web3 and Blockchain Fundamentals</h3><p>Before coding, learn the basics of:</p><ul><li>What blockchain is and how it works.</li><li>Difference between Web2 and Web3.</li><li>Key concepts: decentralization, consensus, wallets, and tokens.</li></ul><h3>2. Learn Smart Contract Programming</h3><p>Smart contracts are the core of Web3. Start with:</p><ul><li><strong>Solidity</strong> – the most popular smart contract language for Ethereum.</li><li><strong>Vyper</strong> – an alternative for Ethereum smart contracts.</li><li>Explore frameworks like <strong>Hardhat</strong> and <strong>Foundry</strong> for testing and deployment.</li></ul><h3>3. Master Ethereum and Other Blockchains</h3><p>Ethereum is the most widely used blockchain for dApps, but also explore:</p><ul><li><strong>Polygon</strong> (scalability)</li><li><strong>Binance Smart Chain (BSC)</strong></li><li><strong>Solana</strong> (high-performance)</li></ul><h3>4. Learn to Interact with Smart Contracts</h3><p>To connect frontend and blockchain:</p><ul><li>Learn <strong>Ethers.js</strong> or <strong>Web3.js</strong>.</li><li>Practice reading/writing to contracts.</li><li>Understand wallet integration (MetaMask, WalletConnect).</li></ul><h3>5. Explore Decentralized Storage &amp; Tools</h3><p>Web3 is more than just contracts. Learn about:</p><ul><li><strong>IPFS</strong> (InterPlanetary File System).</li><li><strong>The Graph</strong> for indexing blockchain data.</li><li><strong>Chainlink</strong> for oracles and real-world data.</li></ul><h3>6. Build Projects</h3><p>Practical experience is key. Start with projects like:</p><ul><li>A simple ERC-20 or ERC-721 token.</li><li>A decentralized voting app.</li><li>An NFT marketplace.</li><li>A DeFi lending/borrowing protocol (basic version).</li></ul><h3>7. Learn Security Best Practices</h3><p>Web3 development comes with high risks. Learn:</p><ul><li>Smart contract vulnerabilities (reentrancy, overflow).</li><li>Security audits and testing.</li><li>Gas optimization techniques.</li></ul><h3>8. Stay Updated</h3><p>Web3 evolves quickly. Follow Ethereum Improvement Proposals (EIPs), join communities (Discord, Twitter), and read documentation.</p><h3>Conclusion</h3><p>Becoming a Web3 developer requires dedication to blockchain fundamentals, smart contracts, and decentralized tools. Start small, build real projects, and continuously adapt as the ecosystem evolves.</p>',
  thumbnail: 'https://res.cloudinary.com/geekcms/image/upload/v1755535268/blog_posts/qkwpcwkg7ylu4fwfrabk.png',
  desc: 'Learn how to become a Web3 developer by mastering blockchain, Solidity, smart contracts, and dApps to build the future of the decentralized web.',
  keywords: [
    'Web3 Development',
    'Blockchain',
    'Smart Contracts',
    'Solidity',
    'Ethereum',
    'dApps',
    'NFTs',
    'DeFi',
    'Hardhat',
    'Ethers.js'
  ],
  excerpt: 'Web3 development is shaping the future of the internet. This guide shows 
you how to become a Web3 developer — from learning blockchain basics to building smart contracts and decentralized apps.',
  authorId: '68a2fbe311c51af181a71306',
  catslug: 'Web3 Development',
  createdAt: '2025-08-18T16:41:33.822Z',
  status: 'PUBLISHED',
  author: {
    name: 'Uday Singh',
    image: 'https://avatars.githubusercontent.com/u/135746539?v=4'
  }
}
 */


export async function generateMetadata({ params }) {
    const res = await getBlog(params.slug);
    return {
        title: res.title,
        description: res.excerpt,
        openGraph: {
            images: [res.thumbnail],
        },

    }
}

export default async function BlogPage({ params }) {
    const { slug } = params;
    const blog = await getBlog(slug);
    return (
        <section className="min-h-screen bg-[#0f1117] text-gray-200 py-10">
            <div className="container mx-auto flex flex-col items-center justify-center px-4">

                {/* Thumbnail */}
                <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                    <Image
                        src={blog?.thumbnail || "/thumbnails/dreams.png"}
                        alt={blog.title || "Page Title"}
                        width={600}
                        height={400}
                        className="rounded border shadow-lg object-cover"
                    />
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white mb-4">
                    {blog.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-col items-center space-y-4 mb-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={18} />
                        <p>{DateFormat(new Date(blog.createdAt))}</p>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Category:</span>
                        <span className="px-3 py-1 bg-gray-800 text-xs font-medium border border-gray-600 rounded-lg">
                            {blog.catslug}
                        </span>
                    </div>

                    {/* Tags */}
                    {blog?.keywords?.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-gray-400">Tags:</span>
                            {blog.keywords.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-xs font-medium bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-700 transition"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div
                    className="blogContent prose prose-invert prose-sm md:prose-lg prose-h1:text-2xl prose-h2:text-xl prose-p:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-3xl text-justify w-90vw"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="flex items-center gap-3 mt-8 text-gray-400">
                    <Image src={blog.author.image} alt={blog.author.name} width={40} height={40} className="rounded-full" />
                    <span className="font-medium">{blog.author.name}</span>
                </div>
            </div>
        </section>
    );
}
