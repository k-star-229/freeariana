const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  firstname: { type: String},
  lastname: { type: String},
  full_name: { type: String},
  license: { type: String},
  signatures_Require: { type: Number},
  current_sign: { type: Number},
  case_name: { type: String},
  email: { type: String},
  phone: { type: Number },
  zipcode: { type: String },
  state: { type: String},
  country: { type: String },
  user_avatar: { type: String },
  page_title: { type: String },
  page_contents: { type: String  },
  pdf1: { type: String  },
  pdf2: { type: String  },
  pdf3: { type: String  },
  pdf4:{ type: String  },
  pdf1_title: { type: String  },
  pdf2_title: { type: String  },
  pdf3_title: { type: String  },
  pdf4_title: { type: String  },
  address: { type: String }
});

const Profile = mongoose.model('profile', ProfileSchema);
// 'users' is Mongo collection's name

module.exports = Profile;
