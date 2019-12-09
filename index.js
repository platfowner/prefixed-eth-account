const Web3EthAccounts = require('web3-eth-accounts');
const _ = require("lodash");

const web3EthAccounts = new Web3EthAccounts();

const ADDRESS_PATTERN = /(^[A-Za-z0-9]+$)/

async function createAccount(prefix, isCase) {
  console.log(`Creating an account with prefix ${prefix}..`);
  let count = 0;
  let found = false;
  while(!found) {
    const account = web3EthAccounts.create();
    const address = isCase ? account.address.substring(2) : _.toLower(account.address.substring(2));
    if (_.startsWith(address, prefix)) {
      console.log(`Account: ${JSON.stringify(account, null, 2)}`);
      found = true;
    }
    count++;
    if (count % 10000 === 0) {
      console.log(`Tried ${count} times..`)
    }
  }
}

function processArguments() {
  if (process.argv.length != 3 && process.argv.length != 4) {
    console.log("Example commandline:\n\
      node index.js aAa\n\
      node index.js aAa false\n");
    process.exit(0);
  }
  let isCase = true;
  if (process.argv.length === 4) {
    const inputIsCase = process.argv[3];
    isCase = inputIsCase === 'true';
  }
  console.log(`Case sensitive: ${isCase}`);
  const inputPrefix = isCase ? process.argv[2] : _.toLower(process.argv[2]);
  if (_.isEmpty(inputPrefix)) {
    console.log(`Empty prefix: ${inputPrefix}`)
    process.exit(0);
  }
  if (!ADDRESS_PATTERN.test(inputPrefix)) {
    console.log(`Invalid prefix: ${inputPrefix}`)
    process.exit(0);
  }
  console.log(`Prefix: ${inputPrefix}`);
  return createAccount(inputPrefix, isCase);
}

processArguments();
