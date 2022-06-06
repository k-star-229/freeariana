const express = require('express');
const router = express.Router();
const User = require('../models/users');
const RecallUser = require('../models/recalluser');
const Profile = require('../models/profile');

router.get('/', (req, res) => {
  Profile.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'No user found' }));
});

// Incase we need this API
router.get('/:userId', (req, res) => {
  User.findById({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: 'No user found by this id' }));
});

router.get('/profile/:userId', (req, res) => {
  Profile.findById({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: 'No user found by this id' }));
});

// search by Fname, Lname, Sex, and Age -- { query: input }
// Just naive search, for high level search, need rewrite
router.post('/search', (req, res) => {
  User.find()
    .then(users =>
      users.filter(
        user =>
          user.firstname
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.lastname
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.sex
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.age.toString().indexOf(req.body.query.toString()) !== -1
      )
    )
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'No user found' }));
});

// Sort user by fn, ln, sex, age -- by attribute
router.post('/sort', (req, res) => {
  // console.log(req.body.attribute);
  User.find()
    .then(users => {
      switch (req.body.attribute) {
        // Don't change the USERS array!
        case 'firstname':
          return [...users].sort((a, b) =>
            a.firstname > b.firstname
              ? 1
              : a.firstname === b.firstname
              ? a.lastname > b.lastname
                ? 1
                : a.lastname === b.lastname
                ? a.age > b.age
                  ? 1
                  : a.age === b.age
                  ? a.sex > b.sex
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
          );

        case 'lastname':
          return [...users].sort((a, b) =>
            a.lastname > b.lastname
              ? 1
              : a.lastname === b.lastname
              ? a.firstname > b.firstname
                ? 1
                : a.firstname === b.firstname
                ? a.age > b.age
                  ? 1
                  : a.age === b.age
                  ? a.sex > b.sex
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
          );

        case 'sex':
          return [...users].sort((a, b) =>
            a.sex > b.sex
              ? 1
              : a.sex === b.sex
              ? a.firstname > b.firstname
                ? 1
                : a.firstname === b.firstname
                ? a.lastname > b.lastname
                  ? 1
                  : a.lastname === b.lastname
                  ? a.age > b.age
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
          );

        case 'age':
          // console.log([...users][0].age);
          return [...users].sort((a, b) =>
            a.age > b.age
              ? 1
              : a.age === b.age
              ? a.firstname > b.firstname
                ? 1
                : a.firstname === b.firstname
                ? a.lastname > b.lastname
                  ? 1
                  : a.lastname === b.lastname
                  ? a.sex > b.sex
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
          );

        default:
          return [...users];
      }
    })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: 'Failed to sort' }));
});

// Create user
router.post('/', (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });
  newUser
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to create' + err }));
});

// Create recall User
router.post('/recall', (req, res) => {
  const newRecallUser = new RecallUser({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    zipcode: req.body.zipcode,
    state: req.body.user_state,
    profile_id: req.body.person,
    address: req.body.address
  });
  newRecallUser
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to create' + err }));
});


// Edit user
// router.put('/:userId', (req, res) => {
//   User.findByIdAndUpdate(req.params.userId, {
//     $set: {
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       sex: req.body.sex,
//       age: req.body.age,
//       password: req.body.password
//     }
//   })
//     .then(user => res.status(200).json(user))
//     .catch(err => res.status(500).json({ error: 'Failed to edit' }));
// });



// Delete user
router.delete('/:userId', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to delete' }));
});




router.post('/createprofile', (req, res) => {
  const newProfile = new Profile({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    full_name: req.body.full_name,
    license: req.body.license,
    signatures_Require: req.body.signatures_Require,
    current_sign: 0,
    case_name: req.body.case_name,
    email: req.body.email,
    phone: req.body.phone,
    zipcode: req.body.zipcode,
    state: req.body.state,
    country: req.body.country,
    user_avatar: req.body.user_avatar,
    page_title: req.body.page_title,
    page_contents: req.body.page_contents,
    pdf1: req.body.pdf1,
    pdf2: req.body.pdf2,
    pdf3: req.body.pdf3,
    pdf4: req.body.pdf4,
    pdf1_title: req.body.pdf1_title,
    pdf2_title: req.body.pdf2_title,
    pdf3_title: req.body.pdf3_title,
    pdf4_title: req.body.pdf4_title,
    address: req.body.address
  });
  newProfile
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to create' + err }));
});


router.put('/updateProfile/:userId', (req, res) => {

  Profile.findByIdAndUpdate(req.params.userId, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      zipcode: req.body.zipcode,
      address: req.body.address,
      current_sign: req.body.current_sign+1,
      state: req.body.user_state
    }
  })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to edit' }));
});


router.get('/findprofile/:query', (req, res) => {
  const query = req.params.query;
  Profile.find({
      'state': query
  }, function(err, result) {
      if (err) throw err;
      if (result) {
          res.json(result)
      } else {
          res.send(JSON.stringify({
              error : 'Error'
          }))
      }
  })
})

router.get('/findsigner/:query', (req, res) => {
  const query = req.params.query;
  RecallUser.find({
      'profile_id': query
  }, function(err, result) {
      if (err) throw err;
      if (result) {
          res.json(result)
      } else {
          res.send(JSON.stringify({
              error : 'Error'
          }))
      }
  })
})


router.get('/findemailsigner/:query', (req, res) => {
  const query = req.params.query;
  const email = query.split('&')[0]
  const profileid = query.split('&')[1]

  RecallUser.find({
      'email': email,
      'profile_id':profileid
  }, function(err, result) {
      if (err) throw err;
      if (result) {
          res.json(result)
      } else {
          res.send(JSON.stringify({
              error : 'Error'
          }))
      }
  })
})
router.get('/findphonesigner/:query', (req, res) => {
  const query = req.params.query;
  const phone = query.split('&')[0]
  const profileid = query.split('&')[1]
  RecallUser.find({
      'phone': phone,
      'profile_id':profileid
  }, function(err, result) {
      if (err) throw err;
      if (result) {
          res.json(result)
      } else {
          res.send(JSON.stringify({
              error : 'Error'
          }))
      }
  })
})

module.exports = router;
