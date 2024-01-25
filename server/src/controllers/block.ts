import SHA256 from "crypto-js/sha256";

/** Single ‌Block Structure */
interface SingleBlock {
  timestamp: string;
  transactions: any[];
  previousHash: string;
  hash: string;
  nonce: number;
  validator: string;
  signature: string;
  toString(): string;
}

export default class Block implements SingleBlock {
  timestamp: string;
  transactions: any[];
  previousHash: string;
  hash: string;
  nonce: number;
  validator: string;
  signature: string;

  constructor(
    timestamp: string,
    transactions: any[],
    previousHash: string,
    hash: string,
    nonce: number,
    validator: string,
    signature: string
  ) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = hash;
    this.nonce = nonce;
    this.validator = validator;
    this.signature = signature;
  }

  toString(): string {
    return `Block - 
        Timestamp   : ${this.timestamp}
        Last hash   : ${this.previousHash} 
        Hash        : ${this.hash}
        Data        : ${this.transactions}
        Validator   : ${this.validator}
        Signature   : ${this.signature}
      `;
  }

  /** First Block of Block chain */
  static genesis() {
    return new this(
      "Genesis time",
      ["Genesis block"],
      "Genesis block",
      this.hash("Genesis time", "", []),
      1,
      "Genesis block",
      "Genesis block"
    );
  }

  /** Generates new hash */
  static hash(timestamp: string, lastHash: string, data: any[]) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static createBlock(lastBlock: any, data: any[]) {
    let hash;
    const timestamp = Date.now().toString();
    const lastHash = lastBlock.hash;
    hash = this.hash(timestamp, lastHash, data);

    // nonce will increase
    return new this(timestamp, [], lastHash, hash, 1, "", "");
  }

  static blockHash(block: any) {
    const { timestamp, lastHash, data } = block;
    return this.hash(timestamp, lastHash, data);
  }
}
