import Irys from '@irys/sdk';
import Query from '@irys/query';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const getIrys = async (privateKey: string) => {
  const url = 'https://node1.irys.xyz';
  const token = 'matic';

  const irys = new Irys({
    url,
    token,
    key: privateKey,
  });
  return irys;
};

const getAddressFromPrivateKey = (privateKey: string): string => {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
};

const uploadFile = async (
  fileToUpload: string,
  privateKey: string,
  tags: { name: string; value: string }[] = [],
): Promise<string | null> => {
  const irys = await getIrys(privateKey);
  try {
    const receipt = await irys.uploadFile(fileToUpload, { tags });
    console.log(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return receipt.id;
  } catch (e) {
    console.log('Error uploading file ', e);
    return null;
  }
};

const createMutableReference = async (filePath: string, privateKey: string): Promise<string | null> => {
  const initialTxId = await uploadFile(filePath, privateKey);
  if (initialTxId) {
    console.log(`Initial TX uploaded ==> https://gateway.irys.xyz/mutable/${initialTxId}`);
  }
  return initialTxId;
};

const addToMutableReference = async (
  rootTxId: string,
  filePath: string,
  privateKey: string,
): Promise<string | null> => {
  const address = getAddressFromPrivateKey(privateKey);
  const irys = await getIrys(privateKey);
  const tags = [{ name: 'Root-TX', value: rootTxId }];
  try {
    const receipt = await irys.uploadFile(filePath, { tags });
    console.log(`New TX uploaded ==> https://gateway.irys.xyz/mutable/${rootTxId}`);
    console.log(`Update made by address: ${address}`);
    return receipt.id;
  } catch (e) {
    console.log('Error uploading file ', e);
    return null;
  }
};

const searchTransactions = async (txID: string, fromAddress: string): Promise<void> => {
  const query = new Query({
    url: 'https://node1.irys.xyz/graphql',
  });
  const results = await query
    .search('irys:transactions')
    .tags([{ name: 'Root-TX', values: [txID] }])
    .from([fromAddress])
    .sort('ASC');

  results.forEach((result: any, i: number) => {
    const formattedTimestamp = new Date(result.timestamp).toLocaleString();
    console.log(`Update ${i + 1}: ID: ${result.id}, Timestamp: ${formattedTimestamp}`);
  });
};

// Usage example:

const filePath = './metadata.json';
const filePath2 = './metadata2.json';
const filePath3 = './metadata3.json';
const privateKey1 = process.env.ETH_PRIVATE_KEY || ''; // Your original private key
const privateKey2 = process.env.TEST_PRIVATE_KEY || ''; // Your test private key

// Create a mutable reference with the initial metadata.json file using the original private key
createMutableReference(filePath, privateKey1).then(async (initialTxId) => {
  if (initialTxId) {
    // Add a new version of the metadata2.json file to the mutable reference chain using the test private key
    await addToMutableReference(initialTxId, filePath2, privateKey2);

    // Add a new version of the metadata3.json file to the mutable reference chain using the original private key
    await addToMutableReference(initialTxId, filePath3, privateKey1);

    // Query the transactions to verify the updates
    const fromAddress = getAddressFromPrivateKey(privateKey1);
    await searchTransactions(initialTxId, fromAddress);
  }
});
