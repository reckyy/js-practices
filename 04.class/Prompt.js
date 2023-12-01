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
          case '-r': {
            const questions = [
              {
                type: "select",
                name: "chosenMemoId",
                message: "Choose a note you want to see:",
                choices: firstRowsOfMemos,
                result() {
                  return this.focused.id;
                },
              },
            ]
            const answer = await enquirer.prompt(questions);
            console.log(memos[answer.chosenMemoId - 1].content);
            break;  
          }
          case '-d': {
            const questions = [
              {
                type: "select",
                name: "chosenMemoId",
                message: "Choose a note you want to delete:",
                choices: firstRowsOfMemos,
                result() {
                  return this.focused.id;
                },
              },
            ]
            const answer = await enquirer.prompt(questions);
            await sql.run(`delete from memos where id = ${answer.chosenMemoId}`);
            console.log('memo of your choice is deleted!');
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
