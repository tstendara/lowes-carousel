const faker = require('faker');

let count = 0;
let data = {};
let DB = [];

let x = 1;
let y = 100000;
let interval = 100000;

function resolveAfter2Seconds(start, end) {

  return new Promise(resolve => {
    setTimeout(() => {
      for(i=start; i<=end; i++){
        let alt = faker.commerce.productName(); //same as name
        let src = faker.image.avatar();  //also name of obj as string ex: "0"{"alt": "name of product"}
        let category = faker.commerce.product();
        let subCategory = faker.commerce.department();
        data[i] = {"alt": alt, "src": src, "id": i, "category": category, "subCategory": subCategory, "name": alt}
      }

      resolve(data);
    }, 0);
  });
}

async function asyncCall(start, end) {
  
  var result = await resolveAfter2Seconds(start, end);
  result;
//   console.log(result);
  const Push = await queryTest(data);
  Push;
  data = {};
  count ++;
//   console.log(count);
  if(count !== 100){
    beg = x + (count * interval);
    end = beg + interval - 1;
    console.log(beg, end);
    asyncCall(beg, end);
  }
  // expected output: 'resolved'
}


async function queryTest(data){ //will have DB in it 
    // console.log(data, "should be coming in chunks");
    
    //query here
    // for(let j=0; j<1000000; j++){
    //   console.log(j);
    //   if(j === 200000){
    //     console.log('here');
    //   }else if( j === 999999){
    //     //console.log('done');
    //     //DB.push(data);
    //     //console.log(DB, "with count", count);
    //     //DB = [];
    //   }
    // }
    
      DB.push(data);
      console.log('done');
      if(count % 5 === 0){
        console.log(DB);
      }
      
      DB = [];
   
    // console.log("should empty%%%%%%%%%%", DB);
}


if(count === 0){
  asyncCall(x, y);
}
    

	