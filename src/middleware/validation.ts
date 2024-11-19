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

export const validateMyRestaurantRequest: RequestHandler[] = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("state").isString().notEmpty().withMessage("State must be a string"),
  body("zip").isString().notEmpty().withMessage("Zip must be a string"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery Time must be a positive number"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems")
    .isArray()
    .withMessage("Menu Items must be an array")
    .not()
    .isEmpty()
    .withMessage("Menu Items array cannot be empty"),
  body("menuItems.*.name")
    .isString()
    .notEmpty()
    .withMessage("Menu Item Name must be a string"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item Price must be a positive number"),
  handleValidationErrors,
];
