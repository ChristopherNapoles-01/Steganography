var mess;
var word;
var temp,temp2;
var key;
var base = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz`~!@#$%^&*()-_=+[]{}\|;:',.<>/?Ññ";
var base1 = base.split('');
var base2 = [6,8,19,22,18,21,7,20,23,12,13,11,9,2,0,1,10,24,27,26,16,17,
  14,15,25,30,31,29,28,35,34,33,3,4,32,5,36,58, 85, 79, 87, 46, 67, 78, 80, 44, 38, 63, 
  53, 41, 49, 52, 72, 47, 40, 48, 60, 39, 82, 76, 83, 45, 43, 50, 73, 84, 77, 54, 94, 66, 81, 74, 86, 61, 68, 88, 57, 
  59, 71, 64, 62, 89, 70, 92, 69, 75, 51, 90, 65, 56, 91, 93, 55, 37, 42];
var wordIndex = [];
var wordSize,keySize;
var i;
var base3 = [];
var container = [],container2=[],keyContainer=[],wordContainer=[],finalContainer=[];
var keyStream=[],finalValues=[];
var diff=[],finalDiff=[],newDiff=[];
var decrypted;

function handleFileSelect(evt) {
  var original = document.getElementById("original"),
    stego = document.getElementById("stego"),
    img = document.getElementById("img"),
    message = document.getElementById("message");
  if(!original || !stego) return;
  var files = evt.target.files; 
  for (var i = 0, f; f = files[i]; i++) {
    if (!f.type.match('image.*')) {
      continue;
    }
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        img.src = e.target.result;
        img.title = escape(theFile.name);
        stego.className = "half invisible";
        message.innerText="";
        message.parentNode.className="invisible";
      };
    })(f);
    reader.readAsDataURL(f);
  }
}
function read() {
  var img = document.getElementById("img"),
    message = document.getElementById("message");
  if(img && message) {
    message.innerText = steg.decode(img);
    if(message.innerText !== "") {
      message.parentNode.className="";
      message.value = message.innerText
    }
  }
  mess = message.value;
  word = document.getElementById("message").value;

  key = document.getElementById("key").value;
  keySize = key.length;
  decrypt(); 
}

function decrypt()
{
  var count = word.length;
  var j = 0;
  base3=word.split('');
  while (count!=0)
  {
    keyStream.push(key[j]);
    j++;
    if(j==key.length)
    {
      j=0;
    }
    count--;
  }
  for (i=0;i<word.length;i++)
  {
    container.push(base1.indexOf(base3[i]));
    wordContainer.push (base2[container[i]]);
  }
  for (i=0;i<wordContainer.length;i++)
  {
      diff.push(wordContainer[i]);
  }

  for (i=0;i<keyStream.length;i++)
  {
    keyContainer.push(base1.indexOf(keyStream[i]));
    container2.push(base2[keyContainer[i]]);
  }
  
  for(i=0;i<container2.length;i++)
  {
    newDiff.push(diff[i]-container2[i])
    if(newDiff[i]<0)
    {
      finalDiff.push(newDiff[i]+(base1.length));
    }
    else
    {
      finalDiff.push(newDiff[i]);
    }
  }
  for (i=0;i<finalDiff.length;i++)
  {
    finalContainer.push(base2.indexOf(finalDiff[i]));
    finalValues.push(base1[finalContainer[i]]);
  }
  decrypted=finalValues;
  document.getElementById("text").value=decrypted.join("");
}
function reload()
{
   document.getElementById("key").value='';
   window.location.reload(); 
}

window.onload = function(){
  document.getElementById('file').addEventListener('change', handleFileSelect, false);
  document.getElementById('read').addEventListener('click', read, false);
  document.getElementById('reload').addEventListener('click', reload,false);
  
};




