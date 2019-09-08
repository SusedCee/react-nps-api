const express = require('express');
// Next we set up the Router
const router = express.Router();

// require Our Model - Remember Model is
// a representation of our data
// The model should be capitalized
const favorite = require('../models/favorite');
// Creating the index route
// index route should show all the parks


//GET ALL FAVORITES
 router.get('/', async (req, res, next) => {
  // req.body this is from the fetch request
  console.log(req.body, ' this is get all')
     try  {
      const allFavorites = await Favorite.find();
      console.log(req.session, ' this is req.session')
      // This is the response to react
      res.json({
        code: 200,
        message: "Success", // everything worked on the server http codes
        data: allFavorites
      });

    } catch (err){

      res.send(err)

    }
});


// CREATE ONE FAVORITE
router.post('/', async (req, res) => {
console.log(req.body, "req.body")
  try {
    console.log(req.body, ' this is req.body');
    console.log(req.session, ' req.session in post route')
    const createdFavorite = await Favorite.create(req.body);
    
    res.json({
      status: {
        code: 201,
        message: "Success"
      },
      data: createdFavorite
    });

  } catch(err){
    console.log(err);
    res.send(err);
  }
});

// router.post('/', async (req, res) => {
// console.log(req.body, "req.body")
//   try {
//     console.log(req.body, ' this is req.body');
//     console.log(req.session, ' req.session in post route')
//     const createdPark = await Park.create new favorite(req.body);
    
//     res.json({
//       status: {
//         code: 201,
//         message: "Success"
//       },
//       data: createdPark
//     });

//   } catch(err){
//     console.log(err);
//     res.send(err);
//   }
// });





router.get('/:id', async (req, res, next) => {


     try  {

        const foundFavorite = await Favorite.findById(req.params.id);
        res.json({
          status: {
            code: 200,
            message: "Success"
          },
          data: foundFavorite
        });

      } catch (err){
        res.send(err);
      }



});

router.put('/:id', async (req, res) => {

  try {
    const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: {
            code: 200,
            message: "resource updated successfully"
          },
      data: updatedFavorite
    });
  } catch(err){
    res.send(err)
  }
});


// Delete route
router.delete('/:id', async (req, res) => {

  try {
     const deletedFavorite = await Favorite.findByIdAndRemove(req.params.id);
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