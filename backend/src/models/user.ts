import mongoose from "mongoose";

//{name,address,city,country} fields aren't required is because whenever the user gets created for the first time the only information that we are going to have is going to be- auth0ID and the email because the creation happens as soon as they register they won't have had the opportunity to go and fill out their profile yet so whenever we get the request we won't have a name, address line, city etc info
const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
