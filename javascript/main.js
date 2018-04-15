window.onload = function(){	
	var DOM_pic = document.getElementsByClassName("img-responsive")[0];
	var DOM_answerChoices = document.getElementsByClassName("answer-choice");
	var DOM_answer = document.getElementsByClassName("answer");
	var DOM_countDown = document.getElementById("count-down");
	var temp_outerArrayIndexes = [];
	var temp_innerArrayIndexes = [];
	var numOfQuestions = 5;
	var index = 0;
	var correctedAns = 0;
	
	// preloading the images
	for(let i=0; i<answers.length; i++){		
		new Image().src = answers[i].pic;
	}
	
	// randomly getting the pictures (questions)
	function generateIndex(tempArray, size){
		var randomIndex = Math.floor(Math.random() * size);
		if(tempArray.indexOf(randomIndex) == -1){
			tempArray.push(randomIndex);
			return tempArray;
		} else {
			return generateIndex(tempArray, size);
		}
	}

	for(let i=0; i<numOfQuestions; i++){
		generateIndex(temp_outerArrayIndexes, answers.length);
	}	
	
	nextQuestion();
	
	function delayNextQuestion(){
		this.style.borderColor = "red";
		if(this.children[0].children[0]){
			correctedAns++;
		}
		for(let i=0; i<DOM_answer.length; i++){
			DOM_answerChoices[i].removeEventListener("click", delayNextQuestion);
		}
		
		for(let i=0; i<DOM_answer.length; i++){
			if(DOM_answer[i].children[0]){
				if(DOM_answer[i].children[0].classList.contains("correctAns")){
					DOM_answer[i].children[0].innerHTML += "<span class='fa fa-check' aria-hidden='true'></span>";
				}
			}
		}
		
		if(!this.children[0].children[0]){
			this.children[0].innerHTML += "<span class='fa fa-times' aria-hidden='true'></span>";
		}

		return setTimeout(nextQuestion, 1000);
	}
	
	function nextQuestion(){
		if(index == numOfQuestions){
			DOM_countDown.style.display = "block";
			DOM_countDown.style.backgroundColor = "black";
			DOM_countDown.style.zIndex = 2;
			DOM_countDown.innerHTML += "<p>End of the game</p>";
			DOM_countDown.innerHTML += "<p>You have scored </p>" + correctedAns + " out of " + numOfQuestions;
			DOM_countDown.innerHTML += "<p>Click here to play again</p>";
			DOM_countDown.addEventListener("click", function(){
				location.reload();
			});
			return false;
		}
		DOM_pic.src = answers[temp_outerArrayIndexes[index]].pic;
		for(let i=0; i<DOM_answer.length; i++){	
			generateIndex(temp_innerArrayIndexes, DOM_answerChoices.length);
			DOM_answer[i].innerHTML = answers[temp_outerArrayIndexes[index]].choices[temp_innerArrayIndexes[i]];
		}	
		index++;
		temp_innerArrayIndexes = [];
		for(let i=0; i<4; i++){
			DOM_answerChoices[i].style.borderColor = "green";	
			DOM_answerChoices[i].addEventListener("click", delayNextQuestion);		
		}		
	};
	
}