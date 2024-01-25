import Block from "./block";

interface BlockChainStruct {
  chain: any;
  addBlock(arg: any): any;
  isValidChain(arg: any): boolean;
}

export default class Blockchain implements BlockChainStruct {
  chain: any;
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data: any) {
    const block = Block.createBlock(this.chain[this.chain.length - 1], data);
    // Save it locally
    this.chain.push(block);

    return block;
  }

  /**
   * Chain Validation
   *
   * Checks the blocks are iterated in for loop, just to check them if hashes
   * are compatible, last hash of next block, should be equal to the hash of the
   * previous one.
   */
  isValidChain(chain: any): boolean {
    if (JSON.stringify(chain[0] !== JSON.stringify(Block.genesis())))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      )
        return false;
    }

    return true;
  }
}
