<?php
	header('Content-type: application/json');
	header('Accept: application/json');

	require_once __DIR__ . '/dataLayer.php';

	$requestMethod = $_SERVER['REQUEST_METHOD'];

	switch ($requestMethod)
	{
		case "GET" : $action = $_GET["action"];
					 getRequests($action);
					 break;
		case "POST" :$action = $_POST["action"];
					 getRequests($action);
					 break;
		case "PUT" : $action = $_PUT["action"];
					 getRequests($action);
					 break;
	}

	function getRequests($action)
	{
		switch($action)
		{
			case "requestUpdateSession" : requestUpdateSession();
				break;
			case "updateCardGrid": requestUpdateCardGrid();
				break;
			case "updateMarket" : requestUpdateMarket();
				break;
			case "updateCollection": requestUpdateCollection();
				break;
			case "addCardToCollection" : requestAddCardToCollection();
				break;
			case "login" : requestLogin();
				break;
			case "logoout" : requestLogout();
				break;
			case "register" : requestRegister();
				break;
			case "sellCard" : requestSellCard();
				break;
			case "reserveCard" : requestReserveCard();
				break;
			case "updateReservations" : requestUpdateReservations();
				break;
			case "updateListings" : requestUpdateListings();
				break;
			case "updateTerminated" : requestUpdateTerminated();
				break;
			case "removeReservation" : requestRemoveReservation();
				break;
			case "terminateListing" : requestTerminateListing();
				break;
		}
	}

	function requestUpdateSession()
	{
		session_start();
		if (isset($_SESSION["uName"]))
		{
			$response = array("uName" => $_SESSION["uName"], "session" => "online");
			echo json_encode($response);
		}
		else
		{
			$response = array("status" => "INTERNAL_SERVER_ERROR", "code"=>999);
			errorHandler($response["status"], $response["code"]);
		}
	}
	
	function requestUpdateCardGrid()
	{
		$colors = $_GET["colors"];
		$rarities = $_GET["rarities"];
		$response = attemptUpdateCardGrid($colors, $rarities);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestUpdateMarket()
	{
		session_start();

		$colors = $_GET["colors"];
		$rarities = $_GET["rarities"];
		$username = $_SESSION["uName"];

		$response = attemptUpdateMarket($colors, $rarities, $username);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestUpdateCollection()
	{
		session_start();
		$username = $_SESSION["uName"];

		$response = attemptUpdateCollection($username);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestUpdateReservations()
	{
		session_start();
		$username = $_SESSION["uName"];

		$response = attemptUpdateReservations($username);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestUpdateListings()
	{
		session_start();

		$username = $_SESSION["uName"];

		$response = attemptUpdateListings($username);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestUpdateTerminated()
	{
		session_start();

		$username = $_SESSION["uName"];

		$response = attemptUpdateTerminated($username);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	
	function requestAddCardToCollection()
	{
		session_start();
		$username = $_SESSION["uName"];
		$id = $_GET["id"];

		$response = attemptAddCardToCollection($username, $id);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestLogin()
	{
		$username = $_GET["username"];
		$password = $_GET["password"];
		$remember = $_GET["remember"];
		$response = attemptLogin($username, $password, $remember);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestLogout()
	{
		session_start();
		if (isset($_SESSION["uName"]))
		{
			unset($_SESSION["uName"]);
			session_destroy();
			$response = array("session" => "offline");
			echo json_encode($response);
		}
		else
		{
			$response = array("status" => "INTERNAL_SERVER_ERROR", "code"=>998);
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestRegister()
	{
		$username = $_POST['userName'];
		$userPasswordUnsafe = $_POST['userPassword'];
		$userEmail = $_POST['userEmail'];

		$userPassword = password_hash($userPasswordUnsafe, PASSWORD_DEFAULT);	

		$response = attemptRegister($username, $userEmail, $userPassword);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestSellCard()
	{
		session_start();
		$username = $_SESSION["uName"];
		$cardId = $_GET['cardId'];
		$price = $_GET['price'];

		$response = attemptSellCard($username, $cardId, $price);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestReserveCard()
	{
		session_start();
		$username = $_SESSION["uName"];
		$tId = $_GET['transactionId'];

		$response = attemptReserveCard($username, $tId);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestRemoveReservation()
	{
		session_start();
		$username = $_SESSION["uName"];
		$tId = $_GET['tId'];

		$response = attemptRemoveReservation($username, $tId);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function requestTerminateListing()
	{
		session_start();
		$username = $_SESSION["uName"];
		$tId = $_GET['tId'];

		$response = attemptTerminateListing($username, $tId);

		if ($response["status"] == "SUCCESS")
		{
			echo json_encode($response["response"]);
		}
		else
		{
			errorHandler($response["status"], $response["code"]);
		}
	}

	function errorHandler($status, $code)
	{
		switch ($code) 
		{
			case 404:	header("HTTP/1.1 $code User $status");
						die("Not Found");
						break;
			case 406:	header("HTTP/1.1 $code User $status");
						die("User doesn't exist or wrong credentials provided");
						break;
			case 409:	header("HTTP/1.1 $code User $status.");
						die("Username already in use");
						break;
			case 411:	header("HTTP/1.1 $code User $status.");
						die("Not enough copies");
						break;
			case 500:	header("HTTP/1.1 $code $status. Bad connection, portal is down");
						die("The server is down, we couldn't retrieve data from the data base");
						break;	
			case 998:	header("HTTP/1.1 $code $status. Bad connection, portal is down");
						die("Session already dropped.");
						break;	
			case 999:	header("HTTP/1.1 $code $status. Bad connection, portal is down");
						die("Please login to access.");
						break;	
		}
	} 

?>
