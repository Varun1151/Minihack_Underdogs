var questions = [{
		question:"How many seats did BJP win in 2019 LOK SABHA elections",
		optiona:"a) 353",
		optionb:"b) 330",
		optionc:"c) 303",
		optiond:"d) 310",
		correct:"c) 303",
		description:"BJP won 303 seats,further increasing its substantial majority under Modi's leadership"
	},
	{   question:"Bottommost point of India",
		optiona:"a) Kanyakumari",
		optionb:"b) Indira Point",
		optionc:"c) Rann of Kucch",
		optiond:"d) Tuticorin",
		correct:"b) Indira Point",
		description:"Indira Point is bottommost point of India located in Andamam and Nicobar Islands"
	},
	{
		question:"Which bowler took hattrick on his birthday",
		optiona:"a) Peter Siddle",
		optionb:"b) Gleen Mcgrath",
		optionc:"c) Muttiah Muralidharan",
		optiond:"d) Mohammaed Shami",
		correct:"a) Peter Siddle",
		description:"Peter Siddle - Australian fast bowler took a hattrick against England on his birthday(25th Nov 2010)"
	},
	{
		question:"When did Sachin Tendulkar score 200 in ODI",
		optiona:"a) Mar 10,2012",
		optionb:"b) Feb 24,2010",
		optionc:"c) Mar 10,2010",
		optiond:"d) Feb 24,2012",
		correct:"b) Feb 24,2010",
		description:"Sachin scored the first ODI double hundred against South Africa in Gwalior on Feb 24,2010"
	},
	{
		question:"Who took the first hat-trick in odi cricket for India",
		optiona:"a) Harbhajan Singh",
		optionb:"b) Kapil Dev",
		optionc:"c) Chetan Sharma",
		optiond:"d) Irfan Pathan",
		correct:"c) Chetan Sharma",
		description:"Chetan Sharma was the first Indian to take a hat-trick for India.He did this against New Zealand in Nagpur in the 1987 World Cup"
	},
	{
		question:"Who among the following has completed his full 5 year term as CM of Karnataka",
		optiona:"a) S Nijalingappa",
		optionb:"b) S. R. Bommai",
		optionc:"c) H. D. Deve Gowda",
		optiond:"d) SM Krishna",
		correct:"a) S Nijalingappa",
		description:"S Nijalingappa held the position as CM of Karnataka during 1962-68"
	},
]

var question=document.getElementById("question")
var optiona =document.getElementById("optionA")
var optionb =document.getElementById("optionB")
var optionc =document.getElementById("optionC")
var optiond =document.getElementById("optionD")
var another =document.getElementById("another")
var message =document.getElementById("message")
var select=document.querySelectorAll(".select");
var ans="abcs",msg="abcd";
reset()

function reset(){
	question.style.backgroundColor="blue"
	optiona.style.backgroundColor="grey"
	optionb.style.backgroundColor="grey"
	optionc.style.backgroundColor="grey"
	optiond.style.backgroundColor="grey"
	var ind = Math.floor(Math.random()*6)
	question.textContent=questions[ind].question;
	optiona.textContent=questions[ind].optiona;
	optionb.textContent=questions[ind].optionb;
	optionc.textContent=questions[ind].optionc;
	optiond.textContent=questions[ind].optiond;
	ans=questions[ind].correct;
	msg=questions[ind].description;
	message.textContent=" "
}
for(var i=0;i<4;i++){
	    select[i].addEventListener("click",function(){
		optiona.style.backgroundColor="grey"
		optionb.style.backgroundColor="grey"
		optionc.style.backgroundColor="grey"
		optiond.style.backgroundColor="grey"
		if(this.textContent===ans){
			this.style.backgroundColor="green";
			message.textContent=msg;
		}
		else{
			message.textContent=" "
			this.style.background="red";
		}
	});
}

another.addEventListener("click",function(){
	reset()
})

