interface EthereumProvider {
	isMetaMask?: boolean;
	request: (args: { method: string; params?: any[] }) => Promise<any>;
	providers?: EthereumProvider[];
	disconnect?: () => void;
}

interface Window {
	ethereum?: EthereumProvider;
}
