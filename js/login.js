$('#menu > li').on('click', function(event){
	event.preventDefault();

	let $currentElement = $(this);

	let sectionName = $currentElement.attr('class');

	if(sectionName=="transactions" || sectionName=="collection" || sectionName=="market"){
		let jsonToSend ={
			"action" : "requestUpdateSession"
		};
	
		$.ajax({
			url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			dataType : "json",
			contentType : "application/json",
			success : function(data){
				console.log(data);
				$(location).attr('href', './' + sectionName + '.html');
			},
			error: function(err){
				console.log(err);
				alert(err.responseText);
//				$(location).attr("href", "./login.html");
			}
		});
		}
		else{
			$(location).attr('href', './' + sectionName + '.html');
		}
});

//LOG IN BUTTON
$("#loginFormButton").on("click", function(event){
	event.preventDefault();
	var loginFlag = true;
	var rememberFlag = false;
	var logged = true;
	if($("#remember").is(":checked")){
		rememberFlag = true;
	}
	let $loginName = $('#loginName');
	let $errorLoginName = $('#errorLoginName');
	
	if($loginName.val() == ""){
		$errorLoginName.removeClass('hideElement');
		var loginFlag = false;
	}
	else{
		$errorLoginName.addClass('hideElement');
	}
	let $loginPassword = $('#loginPassword');
	let $errorLoginPassword = $('#errorLoginPassword');
	
	if($loginPassword.val() == ""){
		$errorLoginPassword.removeClass('hideElement');
		var loginFlag = false;
	}
	else{
		$errorLoginPassword.addClass('hideElement');
	}

	if(loginFlag == true){
		let jsonToSend ={
						"action" : "login",
						"username" : $("#loginName").val(),
						"password" : $("#loginPassword").val(),
						"remember" : rememberFlag
					};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				alert("Welcome back: " + data.username);
				logged = true;
			},
			error : function(error){
				console.log(error);
				alert("Incorrect username or password");
			}
		});
	}

	/*setTimeout(function() {
		updateSession();
	}, 1000);*/
});

//REGISTER BUTTON
$('#registerFormButton').on('click', function(event){
	event.preventDefault();
	var flagRegister = true;


	let $userName = $('#userName');
	let $errorUserName = $('#errorUserName');
	
	if($userName.val() == ""){
		$errorUserName.removeClass('hideElement');
		var flagRegister = false;
	}
	else
	{
		$errorUserName.addClass('hideElement');
	}


	let $userEmail = $('#userEmail');
	let $errorUserEmail = $('#errorUserEmail');
	
	if($userEmail.val() == ""){
		$errorUserEmail.removeClass('hideElement');
		var flagRegister = false;
	}
	else
	{
		$errorUserEmail.addClass('hideElement');
	}

	let $userPassword = $('#userPassword');
	let $errorUserPassword = $('#errorUserPassword');
	
	if($userPassword.val() == ""){
		$errorUserPassword.removeClass('hideElement');
		var flagRegister = false;
	}
	else
	{
		$errorUserPassword.addClass('hideElement');
	}

	let $userPasswordC = $('#userPasswordC');
	let $errorUserPasswordC = $('#errorUserPasswordC');
	
	if($userPassword.val() == ""){
		$errorUserPasswordC.removeClass('hideElement');
		var flagRegister = false;
	}
	else
	{
		$errorUserPasswordC.addClass('hideElement');
	}

	if($userPassword.val() != $userPasswordC.val())
	{
		var flagRegister = false;
	}

	if (flagRegister == true)
	{
		let jsonToSend ={
							"action" : "register",
							"userName" : $("#userName").val(),
							"userPassword" : $("#userPassword").val(),
							"userEmail" : $("#userEmail").val()
						};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(data){
				console.log(data);
				alert("User registry complete. \n" + data.username + ", Welcome!");
				updateMyFriends();
				updateProfile();
			},
			error : function(error){
				console.log(error);
				alert("Username already exists");
			}
		});
	}
	else
	{
		alert("Missing info or passwords dont match.");
	}

});

$('#logOut').on('click',function(event){
	let jsonToSend ={
			"action" : "logoout"
	};
	
	$.ajax({
			url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			dataType : "json",
			contentType : "application/json",
			success : function(data){
				console.log(data);
				$(location).attr("href", "./login.html");
			},
			error: function(err){
				console.log(err);
				alert(err.responseText);
				$(location).attr("href", "./login.html");
			}
		});
});

function updateSession(){
	let jsonToSend ={
			"action" : "requestUpdateSession"
		};
	$.ajax({
		url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			dataType : "json",
			contentType : "application/json",
			success : function(data){
				console.log(data);
				$('#currentUser').text(data.uName);
			},
			error: function(err){
				console.log(err);
			}
	});
}

//updateSession();
