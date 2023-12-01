import enquirer from "enquirer";

export class Prompt{
  constructor(){
    this.option = process.argv[2];
  }


  pattern_by_prompt(sql){
    (async () => {
      const memos = await sql.all();
      const firstRowsOfMemos = memos.map(({id, content}) => ({
        id: id,
        value: content.split('\n')[0],
      }));
      try{
        switch(this.option){
          case '-l': {
            firstRowsOfMemos.forEach((row) => console.log(row.value));
            break;
          }
        }
      }catch(err){
        console.error(err);
      }finally{
        sql.close();
      }
    })();
  }
}
