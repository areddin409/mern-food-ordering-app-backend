import { body, validationResult } from "express-validator";
import { RequestHandler } from "express"; // Error handling middleware

// Error handling middleware
const handleValidationErrors: RequestHandler = (req, res, next): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  next();
};

// Validation middleware array
export const validateMyUserRequest: RequestHandler[] = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("state").isString().notEmpty().withMessage("State must be a string"),
  body("zip").isString().notEmpty().withMessage("Zip must be a string"),
  handleValidationErrors,
];
