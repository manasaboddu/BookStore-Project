//Created By Group:5

//creating an array with elements
var array=["There is no friend as loyal as a book","A room without books is like a body without a soul.","Good friends, good books, and a sleepy conscience: this is the ideal life","... a mind needs books as a sword needs a whetstone, if it is to keep its edge.","Books may well be the only true magic.","Good books don't give up all their secrets at once.","Books are like mirrors: if a fool looks in, you cannot expect a genius to look out.","The world belongs to those who read!!"];
var imgArray = ["book1.jpg","book2.jpg","book3.jpg","book4.jpg","book5.jpg","book6.jpg","book7.jpg","book8.jpg"];
//creating variables
var timerId=0;

function start(){
	setTimerImg();
	setTimer();
}//end function start
function clearTimer(){
	//clears the timerId
	clearInterval(timerId);
}
//calling the setTimer function to display the quotes one after the other.
function setTimer(){
	var i=0;
	timerId=setInterval(function(){
		if(i >= array.length)
			i=0;
		if(i<array.length){
			document.getElementById("quotes").innerHTML=array[i]+"<br/>";
			i++;
		}//end if
	},2000);
}//end of setTimer 

function setTimerImg(){
	var j=0;
	timerId=setInterval(function(){
		if(j >= imgArray.length)
			j=0;
		if(j<imgArray.length){
		document.getElementById("images").src=imgArray[j];
		j++;
		}//end if
	},2000);
}//end function setTimerImg

//creating a page load event
window.addEventListener("load",start,false);