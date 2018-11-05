console.log('Web3 check...');
if (typeof web3 !== 'undefined') web3 = new Web3(web3.currentProvider);
else web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

if (web3.isConnected()) console.log('connected');
else {
  console.log('Not connected');
  exit;
}

web3.eth.defaultAccount = web3.eth.accounts[0];

const contractAddress = '0x158bd875ebfca54db7be0cae4283050312bcdde6';
const ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_title',
        type: 'string',
      },
      {
        name: '_fName',
        type: 'string',
      },
      {
        name: '_lName',
        type: 'string',
      },
      {
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'voting',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'rtitle',
        type: 'string',
      },
      {
        indexed: false,
        name: 'rfName',
        type: 'string',
      },
      {
        indexed: false,
        name: 'rlName',
        type: 'string',
      },
      {
        indexed: false,
        name: 'ramount',
        type: 'uint256',
      },
    ],
    name: 'recentVoter',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'htitle',
        type: 'string',
      },
      {
        indexed: false,
        name: 'hfName',
        type: 'string',
      },
      {
        indexed: false,
        name: 'hlName',
        type: 'string',
      },
      {
        indexed: false,
        name: 'hamount',
        type: 'uint256',
      },
    ],
    name: 'highestVoter',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'getVoter',
    outputs: [
      {
        name: '',
        type: 'string',
      },
      {
        name: '',
        type: 'string',
      },
      {
        name: '',
        type: 'string',
      },
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
const bidding = web3.eth.contract(ABI).at(contractAddress);

function init() {
  /* init home page */
  const voter = bidding.getVoter().toString();
  const voterInfo = voter.split(',');

  document.getElementById('hTitle').innerText = voterInfo[0];
  document.getElementById('hFname').innerText = voterInfo[1];
  document.getElementById('hLname').innerText = voterInfo[2];
  document.getElementById('hBid').innerText = voterInfo[3];
}

function showList() {
  const eventVote = bidding.recentVoter();
  const highestVote = bidding.highestVoter();

  const highestTitle = document.getElementById('hTitle');
  const highestFname = document.getElementById('hFname');
  const highestLname = document.getElementById('hLname');
  const highestBid = document.getElementById('hBid');

  eventVote.watch((error, result) => {
    console.log(`result = ${result}`);
    if (!error) {
      document.getElementById('rTitle').innerText = result.args.rtitle;
      document.getElementById('rFname').innerText = result.args.rfName;
      document.getElementById('rLname').innerText = result.args.rlName;
      document.getElementById('rAmount').innerText = result.args.ramount;
    } else {
      console.log(error);
    }
  });
  highestVote.watch((error, result) => {
    console.log(`highest result = ${result}`);
    if (!error) {
      highestTitle.innerText = result.args.htitle;
      highestFname.innerText = result.args.hfName;
      highestLname.innerText = result.args.hlName;
      highestBid.innerText = result.args.hamount;
    } else {
      console.log(error);
    }
  });

  /* save your name button */
  const button = document.getElementById('savebutton');

  button.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const fName = document.getElementById('firstName').value;
    const lName = document.getElementById('lastName').value;
    const bid = document.getElementById('bid').value;
    if (web3.personal.unlockAccount(web3.eth.defaultAccount, 'eth', 1000)) {
      bidding.voting(title, fName, lName, bid, {
        gas: 3000000,
      });
      console.log('데이터를 입력했습니다.');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  showList();
});
