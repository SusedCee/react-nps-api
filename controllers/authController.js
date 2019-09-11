const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//GET ALL USERS
// require Our Model - Remember Model is
// a representation of our data
// The model should be capitalized
// const users = require('../models/user');
// Creating the index route
// index route should show all the users
 router.get('/', async (req, res, next) => {
  // req.body this is from the fetch request
  console.log(req.body, ' this is get all')
     try  {
      const allUsers = await User.find();
      console.log(req.session, ' this is req.session')
      // This is the response to react
      res.json({
        code: 200,
        message: "Success", // everything worked on the server http codes
        data: allUsers
      });

    } catch (err){

      res.send(err)

    }
});


//GET ONE USER
router.get('/:id', async (req, res, next) => {


     try  {

        const foundUser = await User.findById(req.params.id);
        res.json({
          status: {
            code: 200,
            message: "Success"
          },
          data: foundUser
        });

      } catch (err){
        res.send(err);
      }
});

//EDIT ONE USER
router.put('/:id', (req, res) => {


  try {
    console.log("updating a user with new firstname: " + req.body.firstname);
    //const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    //console.log("new firstname: " + await updatedUser.firstname)
    User.findById(req.params.id, (err, foundUser) =>
    {
    	if (err)
    	{
    		console.log(err);
    	}
    	else
    	{
    		foundUser.username = req.body.username;
    		foundUser.firstname = req.body.firstname;
    		foundUser.lastname = req.body.lastname;
    		foundUser.email = req.body.email;
    		//foundUser.password = req.body.password;
    		foundUser.save();
    		console.log("done");
    		res.json({
		      status: {
		            code: 200,
		            message: "resource updated successfully"
		          },
		      data: foundUser
		    });
    	}
    });
    
  } catch(err){
    res.send(err)
  }
});




//LOGIN ROUTE
router.post('/login', async (req, res) => {

	//First query the database to see if the user exists
	try {

		console.log("trying to find user: " + req.body.username);
		const foundUser = await User.findOne({username: req.body.username});
		console.log(foundUser, 'foundUser');

		//if the user exists we'll use bcrypt to see if their password is valid
		if(foundUser){
			//bcrypt compare returns true or false
			if(bcrypt.compareSync(req.body.password, foundUser.password)){
				//if valid, we'll set the session
				req.session.userId = foundUser._id;
				req.session.username = foundUser.username;
				req.session.logged = true;
				console.log("successfully logged in");
				res.json({
					status: {
						code: 200, 
						message: "User Logged In"
					},
					data: foundUser
				})

			} else {
				//send message back to client that 
				//the username or password is incorrect

				res.json({
					status: {
					code: 200,
					message: "Password is incorrect"
				}
			})
		}


	} else {
		//send message back to the client that 
		//their username or password is oncorrect

		res.json({
			status: {
				code: 200,
				message: "Username is incorrect"
			}
		})
	}

	} catch (err){
		res.send(err);
	}

});

router.post('/register', async (req, res) => {

	//Encrypt our password
	const password = req.body.password;

	//encrypt our password
	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	console.log(hashedPassword)

	req.body.password = hashedPassword;

	//We create our use
	try {
		const createdUser = await User.create(req.body);
		console.log(createdUser, ' created user');

		//set info on the session
		req.session.userId = createdUser._id;
		req.session.username = createdUser.username;
		req.session.logged = true;

		res.json({
			status: {
				code: 200, 
				message: "User logged In"
			}
		})
	} catch (err){
		res.send(err)
	}
});

router.get('/logout', async (req, res) => {
	try{
		await req.session.destroy();
		res.redirect("/")
	} catch(err){
		console.log(err);
		res.send(err);
	}
})



// DELETE ROUTE
router.delete('/:_id', async (req, res) => {

  try {
     const deletedUser = await User.findByIdAndRemove(req.params._id);
      res.json({
        status: {
            code: 200,
            message: "resource deleted successfully"
          }
      });
  } catch(err){
    res.send(err);
  }
});


module.exports = router;











































