var imgUrl;
var show;
var word;
var temp,temp2;
var key;
var base = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz`~!@#$%^&*()-_=+[]{}\"\\|;:',.<>/?Ññ’“”\t";
var base1 = base.split('');
var base2 = [6,8,19,22,18,21,7,20,23,12,13,11,9,2,0,1,10,24,27,26,16,17,
    14,15,25,30,31,29,28,35,34,33,3,4,32,5,36,58, 85, 79, 87, 46, 67, 78, 80, 44, 38, 63, 
    53, 41, 49, 52, 72, 47, 40, 48, 60, 39, 82, 76, 83, 45, 43, 50, 73, 84, 77, 54, 94, 66, 81, 74, 86, 61, 68, 88, 57, 
    59, 71, 64, 62, 89, 70, 92, 69, 75, 51, 90, 65, 56, 91, 93, 55, 37 ,95, 42, 96,97,99,98,100];
var wordIndex = [];
var wordSize,keySize;
var i;
var base3 = [];
var container = [],container2=[],keyContainer=[],wordContainer=[],finalContainer=[];
var keyStream=[],finalValues=[];
var sum=[],finalSum=[],newSum=[];
var encrypted,sourced;
function getWord(input) {
    word = document.getElementById("word").value
    wordSize = word.length;
    temp = word.replace(/(\r\n|\n|\r)/gm, "");
    word=temp;
    console.log(word);
}
function getKey(input) {
    key = document.getElementById("key").value;
    keySize = key.length;
    encrypt();
}
function encrypt()
{
    var count = wordSize;
    var j=0;
    while(count!=0)
    {
        keyStream.push(key[j]);
        j++;
        if(j==keySize)
        {
            j=0;
        }
        count--;
    }
    base3 = word.split('');
    for(i=0;i<wordSize;i++)
    {
        container.push(base1.indexOf(base3[i]));
        wordContainer.push(base2[container[i]]);
    }
    for(i=0;i<wordSize;i++)
    {
        container2.push(base1.indexOf(keyStream[i]));
        keyContainer.push(base2[container2[i]]);
    }
    for(i=0;i<wordContainer.length;i++)
    {
        sum.push(wordContainer[i]+keyContainer[i]);
        newSum.push(sum[i]);
    }
    for (i=0;i<newSum.length;i++)
    {
        if(newSum[i]>base1.length-1)
        {
            var diff = newSum[i]-base1.length;
			finalSum.push(diff);
        }
        else
        {
            finalSum.push(newSum[i]);
        }
    }

    for(i=0;i<finalSum.length;i++)
    {
        finalContainer.push(base2.indexOf(finalSum[i]));
        finalValues.push(base1[finalContainer[i]]);
    }
    encrypted=finalValues.join("");
    console.log(encrypted);
}
function getImg(input)
{
    var read = new FileReader();
    read.onload = function(x){
        imgUrl = x.target.result;
        document.querySelector('#img1').src = x.target.result;
    }
    read.readAsDataURL(input.files[0]);
    
}
function hideText()
{
    document.querySelector('#img2').src = steg.encode(encrypted,imgUrl );
    sourced=document.getElementById("img1");
}
function download()
{   
    var download = document.getElementById("download");
    sourced.src = steg.encode(encrypted,imgUrl);
    download.href=sourced.src.replace("image/*","image/octet-stream");
}
function reload()
{
   document.getElementById("word").value='';
   document.getElementById("key").value='';
   window.location.reload(); 
}
   