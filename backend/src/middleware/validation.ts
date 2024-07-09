import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check for any errors in req using the validationResult()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

//whenever we receive a request to update the user's profile then Express validator is going to check the request based on the things that we have to find in here and on once it's done that then it's going to call handle validation errors which is a function up here and it's going to add all the errors to the request so then in our function we're checking the request for any errors using the validation result and if there are errors then we'll send a 400 response back to the calling client or in this case it's going to be the front end with all the missing fields and any fields that have the wrong types
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];
