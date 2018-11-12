<?php

	function connect()
	{
		$servername = "localhost";
		$username = "root";
		$password= "root";
		$dbname = "mtgcollection"; 

		$connection = new mysqli($servername, $username, $password, $dbname);

		if ($connection->connect_error)
		{
			return null;
		}
		else
		{	
			return $connection;
		}
	}
	
	

	function attemptUpdateCardGrid($colors, $rarities)
	{
		$cards = array();
		$conn = connect();	

    	$colorString = "('" . implode("','", $colors) . "')";
    	$rareString = "('" . implode("','", $rarities) . "')";

		if ($conn != null)
		{
			$sql = 'SELECT *
		            FROM Cards
		            WHERE Color IN ' . $colorString . 'AND Rarity IN' . $rareString;

		    $result = $conn->query($sql);

		    if ($result-> num_rows > 0)
		    {
		        while($row = $result->fetch_assoc()) 
            	{
	                $response = array('name' => $row['name'], 'color' => $row['color'],'rarity' => $row['rarity'], 'id' => $row['id']);
	                array_push($cards, $response);
            	}
            return array("status" => "SUCCESS", "response" => $cards);
            $conn -> close(); 
		    }
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
		}
		
	}

	function attemptUpdateCollection($username)
	{
		$cards = array();
		$conn = connect();	
		if ($conn != null)
		{
			$sql = "SELECT Collections.username, Cards.id, Cards.name, Cards.color, Cards.rarity, Collections.copies
					FROM Cards
					INNER JOIN Collections ON Cards.id=Collections.cardId
					WHERE Collections.username = '$username' AND Collections.copies > '0'";

		    $result = $conn->query($sql);

		    if ($result-> num_rows > 0)
		    {
		        while($row = $result->fetch_assoc()) 
            	{
	                $response = array('username' => $row["username"], 'id' => $row["id"], 'name' => $row["name"], 'color' => $row["color"],'rarity' => $row["rarity"],'copies' => $row["copies"]);
	                array_push($cards, $response);
            	}
            return array("status" => "SUCCESS", "response" => $cards);
            $conn -> close(); 
		    }

		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

		}
	}

	function attemptUpdateReservations($username)
	{
		$cards = array();
		$conn = connect();	
		if ($conn != null)
		{
			$sql = "SELECT Transactions.seller, Cards.id, Cards.name, Cards.color, Cards.rarity, Transactions.tId, Transactions.listdate, Transactions.price, Users.email
					FROM Cards
					INNER JOIN Transactions ON Cards.id=Transactions.cardId
					INNER JOIN Users ON Users.username=Transactions.seller
					WHERE Transactions.buyer = '$username' AND Transactions.status = 'R'";

		    $result = $conn->query($sql);

		    if ($result-> num_rows > 0)
		    {
		        while($row = $result->fetch_assoc()) 
            	{
	                $response = array('tId' => $row["tId"], 'id' => $row["id"], 'name' => $row["name"], 'color' => $row["color"], 'rarity' => $row["rarity"], 'seller' => $row["seller"], 'listdate' => $row["listdate"],'price' => $row["price"], 'email' => $row["email"]);

	                array_push($cards, $response);
            	}
            return array("status" => "SUCCESS", "response" => $cards);
            $conn -> close(); 
		    }

		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

		}
	}

	function attemptUpdateListings($username)
	{
		$cards = array();
		$conn = connect();	

		if ($conn != null)
		{
			$sql = "SELECT Transactions.seller, Transactions.buyer, Cards.id, Cards.name, Cards.color, Cards.rarity, Transactions.tId, Transactions.listdate, Transactions.price
					FROM Cards
					INNER JOIN Transactions ON Cards.id=Transactions.cardId
					WHERE Transactions.seller = '$username' AND Transactions.status != 'T'";

		    $result = $conn->query($sql);

		    if ($result-> num_rows > 0)
		    {
		        while($row = $result->fetch_assoc()) 
            	{
	                $response = array('tId' => $row["tId"], 'id' => $row["id"], 'name' => $row["name"], 'color' => $row["color"], 'rarity' => $row["rarity"], 'seller' => $row["seller"], 'buyer' => $row["buyer"], 'listdate' => $row["listdate"],'price' => $row["price"]);
	                array_push($cards, $response);
            	}
	            return array("status" => "SUCCESS", "response" => $cards);
	            $conn -> close(); 
		    }

		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

		}
	}

	function attemptUpdateTerminated($username)
	{
		$cards = array();
		$conn = connect();	

		if ($conn != null)
		{
			$sql = "SELECT Transactions.seller, Cards.id, Cards.name, Cards.color, Cards.rarity, Transactions.tId, Transactions.listdate, Transactions.price
					FROM Cards
					INNER JOIN Transactions ON Cards.id=Transactions.cardId
					WHERE Transactions.seller = '$username' AND Transactions.status = 'T'";

		    $result = $conn->query($sql);

		    if ($result-> num_rows > 0)
		    {
		        while($row = $result->fetch_assoc()) 
            	{
	                $response = array('tId' => $row["tId"], 'id' => $row["id"], 'name' => $row["name"], 'color' => $row["color"], 'rarity' => $row["rarity"], 'seller' => $row["seller"], 'listdate' => $row["listdate"],'price' => $row["price"]);
	                array_push($cards, $response);
            	}
	            return array("status" => "SUCCESS", "response" => $cards);
	            $conn -> close(); 
		    }

		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

		}
	}


	function attemptUpdateMarket($colors, $rarities, $username)
	{
		$cards = array();
		$conn = connect();	

		$colorString = "('" . implode("','", $colors) . "')";
    	$rareString = "('" . implode("','", $rarities) . "')";

		if ($conn != null)
		{
			$sql = "SELECT Transactions.seller, Cards.id, Cards.name, Cards.color, Cards.rarity, Transactions.tId, Transactions.listdate, Transactions.price
					FROM Cards
					INNER JOIN Transactions ON Cards.id=Transactions.cardId
					WHERE Transactions.seller != '$username' AND Transactions.status = 'L' AND Cards.color IN " . $colorString . "AND Cards.rarity IN" . $rareString;

		    $result = $conn->query($sql);

		    if ($result-> num_rows > 0)
		    {
		        while($row = $result->fetch_assoc()) 
            	{
	                $response = array('tId' => $row["tId"], 'id' => $row["id"], 'name' => $row["name"], 'color' => $row["color"], 'rarity' => $row["rarity"], 'seller' => $row["seller"], 'listdate' => $row["listdate"],'price' => $row["price"]);
	                array_push($cards, $response);
            	}
	            return array("status" => "SUCCESS", "response" => $cards);
	            $conn -> close(); 
		    }

		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

		}
	}

	function attemptAddCardToCollection($username, $id)
	{
		$conn = connect();

		if ($conn != null)
		{

	        $sql = "SELECT *
                	FROM Collections 
                	WHERE username = '$username' AND cardId = '$id'";

		    $result = $conn->query($sql);

		    if ($result -> num_rows == 0)
		    {
		        $sql = "INSERT INTO Collections (username, cardId, copies) 
		                VALUES ('$username', '$id', '1')";

		        if (mysqli_query($conn, $sql)) 
            	{
	                $conn -> close();
                	return array("status" => "SUCCESS", "response" => "Card Added OK");
            	}  
		    }
		    else
		    {
		        $sql = "UPDATE Collections 
		        		SET Copies = Copies + 1 
		        		WHERE username = '$username' AND cardId = '$id'";

		        if (mysqli_query($conn, $sql)) 
            	{
	                $conn -> close();
                	return array("status" => "SUCCESS", "response" => "Card Added OK");
            	}     
		    }
		}
		else 
        {
            return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

            $conn -> close();
        }  
	}

	function attemptLogin($username, $password, $remember)
	{
		$conn = connect();

		if ($conn != null)
		{
			$sql = "SELECT *
					FROM Users
					WHERE username = '$username'";

			$result = $conn->query($sql);

			if ($result -> num_rows > 0)
			{
				$row = $result->fetch_row();
				if (password_verify($password, $row[2])) {
					session_start();

	                if($remember == "true"){
	                    setcookie("username", $username, time()+86400*30, "/","", 0);
	                }

	                $_SESSION["uName"] = $username;
	                $response = array("username" => $username);

        
					$conn -> close();
					return array("status"=>"SUCCESS", "response" => $response);
				}
				else
				{
					$conn -> close();
					return array("status" => "NOT_FOUND", "code"=>406);
				}
			}
			else
			{
				$conn -> close();
				return array("status" => "NOT_FOUND", "code"=>406);
			} 
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
		}
	}

	function attemptRegister($userName, $userEmail, $userPassword)
	{
		$conn = connect();

		if($conn != null)
		{
			$sql = "SELECT username 
					FROM Users 
					WHERE username = '$userName'";

			$result = $conn->query($sql);

			
			if($result -> num_rows == 0)
			{
				$sql = "INSERT INTO Users (username, email, password)
						VALUES ('$userName', '$userEmail', '$userPassword')";

				if (mysqli_query($conn, $sql)) 
            	{
            		session_start();

                	$_SESSION["uName"] = $userName;
                    
                    $response = array("username" => $userName);
                
	                $conn -> close();
                	return array("status" => "SUCCESS", "response" => $response);
            	}      
			}
			else
			{	
				return array("status" => "NAME_IN_USE", "code"=>409);
				$conn -> close(); 
			}
		}
		else
		{
			return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
		}
	}

	function attemptSellCard($username, $cardId, $price)
	{
		$conn = connect();

		if ($conn != null)
		{

			$sql = "SELECT *
					FROM Collections
					WHERE username = '$username' AND cardId = '$cardId'";


		    $result = $conn->query($sql);

		    if ($result -> num_rows > 0)
		    {
		    	$sql = "INSERT INTO Transactions (seller, cardId, price, listdate, status) 
		        	    VALUES ('$username', '$cardId', '$price', NOW(), 'L')";
		       	mysqli_query($conn, $sql);

		    	$sql = "UPDATE Collections 
		        		SET Copies = Copies - 1 
		        		WHERE username = '$username' AND cardId = '$cardId'";
		        mysqli_query($conn, $sql);

                $conn -> close();
            	return array("status" => "SUCCESS", "response" => "Listing Added OK");
            }
            else
            {
            	$conn -> close();
            	return array("status" => "NOT_ENOUGH_COPIES", "code"=>411);
            }
		}
		else 
        {
            return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

            $conn -> close();
        }  
	}

	function attemptReserveCard($username, $tId)
	{
		$conn = connect();

		if ($conn != null)
		{

			$sql = "SELECT *
					FROM Transactions
					WHERE tId = '$tId'";


		    $result = $conn->query($sql);

		    if ($result -> num_rows > 0)
		    {

		    	$sql = "UPDATE Transactions 
		        		SET status = 'R', buyer = '$username'
		        		WHERE tId = '$tId'";
		        mysqli_query($conn, $sql);

                $conn -> close();
            	return array("status" => "SUCCESS", "response" => "Reservation Added OK");
            }
            else
            {
            	$conn -> close();
            	return array("status" => "NOT_ENOUGH_COPIES", "code"=>411);
            }
		}
		else 
        {
            return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

            $conn -> close();
        }  
	}

	function attemptRemoveReservation($username, $tId)
	{
		$conn = connect();

		if ($conn != null)
		{

			$sql = "SELECT *
					FROM Transactions
					WHERE tId = '$tId'";


		    $result = $conn->query($sql);

		    if ($result -> num_rows > 0)
		    {

		    	$sql = "UPDATE Transactions 
		        		SET status = 'L', buyer = NULL
		        		WHERE tId = '$tId'";
		        mysqli_query($conn, $sql);

                $conn -> close();
            	return array("status" => "SUCCESS", "response" => "Reservation Removed OK");
            }
            else
            {
            	$conn -> close();
            	return array("status" => "NOT_ENOUGH_COPIES", "code"=>411);
            }
		}
		else 
        {
            return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

            $conn -> close();
        }  
	}

	function attemptTerminateListing($username, $tId)
	{
		$conn = connect();

		if ($conn != null)
		{

			$sql = "SELECT *
					FROM Transactions
					WHERE tId = '$tId'";


		    $result = $conn->query($sql);

		    if ($result -> num_rows > 0)
		    {

		    	$sql = "UPDATE Transactions 
		        		SET status = 'T', listdate = NOW()
		        		WHERE tId = '$tId'";
		        mysqli_query($conn, $sql);

                $conn -> close();
            	return array("status" => "SUCCESS", "response" => "Listing Terminated OK");
            }
            else
            {
            	$conn -> close();
            	return array("status" => "NOT_ENOUGH_COPIES", "code"=>411);
            }
		}
		else 
        {
            return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);	

            $conn -> close();
        }  
	}
?>
