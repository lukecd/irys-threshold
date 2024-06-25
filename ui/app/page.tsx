import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-start justify-between px-24">
			<div className="z-10 w-full max-w-5xl font-mono text-sm lg:flex flex-col space-y-8 rounded shadow-lg">
				<h1 className="text-2xl font-bold">True Decentralized Token-Gating</h1>
				<p className="text-base">
					Token gating ensures that only individuals possessing a specific NFT or ERC20 token can access certain
					content. Unlike traditional token gating platforms that restrict access to a centralized UI, decentralized
					environments require a different approach. In a decentralized setup where content is stored on-chain and
					publicly accessible, simply locking the UI is ineffective as users can directly access the on-chain content.
				</p>
				<p className="">
					To achieve true token gating in a decentralized environment, data must be encrypted before storing it
					on-chain. Only token holders should be able to decrypt this data, ensuring that unauthorized users cannot
					access the content even if they manage to bypass the UI restrictions.
				</p>
				<h2 className="text-xl font-semibold">Benefits of Decentralized Token Gating</h2>
				<ul className="list-disc list-inside space-y-2 ">
					<li>
						<strong>Enhanced Security:</strong> Encrypting data ensures that only authorized token holders can access
						the content, maintaining privacy and security.
					</li>
					<li>
						<strong>Decentralized Control:</strong> No reliance on a central authority to manage access, aligning with
						the principles of decentralization.
					</li>
					<li>
						<strong>Permanent Access:</strong> Encrypted data stored on-chain can remain accessible to token holders
						indefinitely, ensuring long-term data availability.
					</li>
				</ul>
				<h2 className="text-xl font-semibold">TACo (Threshold Access Control)</h2>
				<p className="">
					TACo enables end-to-end encrypted data sharing and communication without requiring trust in a centralized
					authority. It achieves this by distributing sensitive cryptographic operations across a network of independent
					nodes. This decentralized approach ensures that:
				</p>
				<ul className="list-disc list-inside space-y-2 ">
					<li>
						<strong>Key Generation and Decryption:</strong> These processes are handled by a distributed set of
						machines, reducing the risk of a single point of failure or unauthorized access.
					</li>
					<li>
						<strong>Access Control:</strong> Only users who meet specific conditions (e.g., owning a particular NFT) can
						access the decryption keys, providing fine-grained control over data access.
					</li>
					<li>
						<strong>Low Latency:</strong> TACo's low-latency decryption flow ensures rapid access to encrypted data,
						making it practical for real-time applications.
					</li>
				</ul>
				<p className="">
					By integrating TACo with Irys, users can leverage Irys's fast upload and data egress capabilities alongside
					TACo's secure encryption and decryption, ensuring that sensitive data remains private and accessible only to
					those with the appropriate tokens. This combination offers a robust solution for secure, decentralized token
					gating in various applications.
				</p>
			</div>
		</main>
	);
}
