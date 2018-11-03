function checkingWeb3() {
  console.log("Web3 check...");
  if(typeof web3 !== 'undefined') web3 = new Web3(web3.currentProvider);
  else web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545');

  if (web3.isConnected()) console.log('connected');
  else {
    console.log('Not connected');
    exit;
  }
  return web3;
}

function showList() {
  const table = document.getElementById('');
}

function addProduct() {
  const title = document.getElementById('title').value;
  const firstName = document.getElementById('fistName').value;
  const LastName = document.getElementById('LastName').value;
  const count = document.getElementById('count').value;
}

document.addEventListener('DOMContentLoaded', () => {
  const web3 = checkingWeb3();

  const contractAddress = "";
  const vc = web3.eth.contract(abi).at(contractAddress);
});