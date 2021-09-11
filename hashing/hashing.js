"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

const createBlock = (_data) => {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: _data,
		timestamp: Date.now(),
	}

	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
	console.log(block);
	return block;
}
const verifyChain = (blockchain) => {
	let result = true;
	for(let i = 0 ; i < blockchain.length; i++) {
		let BlockVerificationResult = verifyBlock(blockchain[i]);
		if(BlockVerificationResult === false)
		{
			result = false;
		}
	}
	return result;
}

const verifyBlock = (block) => {
	let verification = true;
	if(block.index === 0)
	{
		if(block.hash !== "000000")
			verification = false;
	} else {
		if(block.hash !== blockHash(block)
		 || block.data === ""
		 || block.prevHash === "" 
		 || block.index <= 0) {
			verification = false;
			let prevBlock = Blockchain.blocks[block.index-1];
			if(prevBlock.hash !== blockHash(prevBlock))
				verification = false;
		}
	}
}
// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line);
}


console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		`${bl.index};${bl.prevHash};${bl.data};${bl.timestamp}`
	).digest("hex");
}
