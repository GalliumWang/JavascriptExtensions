function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

/** 
 * should append number of people to every id as suffix for better Impartiality
*/
// 所有参与者的 id （以下用名称做演示，开奖时为 Telegram user id）
var idList = ["@CX03_b","@WeakiKim","@feld66","@UltraMan7","@wowwwwwwwwwwww","@uyu","@yuyu","@wwwww"];
var idNum=idList.length;

var lengthForIdInHash=Math.ceil(getBaseLog(36,idNum));
var stringForHash=idList.join(""); //other info ,like the day can also be append to this string


// 奖品名称及对应的数量
var giftAmount = {
    "A": 1,
    "B": 1 ,
    "C": 3
}


// generate prize list from amount above
var giftArray = []

for(giftName of Object.keys(giftAmount)){
    amount=giftAmount[giftName];
    while(amount-->0){
        giftArray.push(giftName)
    }
}
// console.log(giftArray);

