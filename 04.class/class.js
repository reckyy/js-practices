import readline from 'readline';
import fs from 'node:fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  fs.appendFile('memo.txt', input + '\n', (err) => {
    if (err) {
      console.error('エラーが発生しました:', err);
    } else {
      console.log('データがファイルに追加されました！');
    }
    rl.close();
  });
});
