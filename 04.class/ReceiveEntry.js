import readline from "readline";

export class ReceiveEntry{
  constructor(){
    this.rl = readline.createInterface({
      input: process.stdin,
    });
  }
}
