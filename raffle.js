var sha256 = function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};
const HASH_LENGH=64;

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

/** 
 * should append number of people to every id as suffix for better Impartiality
*/
// 所有参与者的 id （以下用名称做演示，开奖时为 Telegram user id）
var idList = ["@CX03_b","@WeakiKim","@feld66","@UletraMan7","@wowwwwww","@uyu","@yuyu","@wwwww"];
idList.sort(function(first, second) {
    var res=0;
    if(first>second) res=-1;
    if(first<second) res=1;
    return res;
  });

var idNum=idList.length;
var lengthForIdInHash=Math.ceil(getBaseLog(36,idNum));
if(lengthForIdInHash<2){
    lengthForIdInHash=2;
}

var stringForHash=idList.join(""); //other info ,like the day can also be append to this string
var hashedResult=sha256(stringForHash);

// console.log(hashedResult);

var iterNum=Math.ceil(idNum*lengthForIdInHash/HASH_LENGH)-1;

var head=hashedResult;
var tail=hashedResult;

while(iterNum-->0){
    head=tail;
    tail=sha256(head);
    hashedResult+=tail;
}
// final hashed string generated!

// console.log(hashedResult);

var id_hash_pair=[];    // use list for the convenience of sort

for(var idx=0;idx<idList.length;idx++){
    id_hash_pair.push([idList[idx],hashedResult.substring(idx*lengthForIdInHash,(idx+1)*lengthForIdInHash)]);
}


// console.log(id_hash_pair);

id_hash_pair.sort(function(first, second) {
    var res=0;
    if(first[1]>second[1]) res=-1;
    if(first[1]<second[1]) res=1;
    return res;
  });
// get final user rank
// console.log(id_hash_pair);

/**
 * process gift allocation
 */


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


for(var rank=0;rank<giftArray.length;rank++){
    console.log(`${rank}: user ${id_hash_pair[rank][0]} get ${giftArray[rank]}`)
}