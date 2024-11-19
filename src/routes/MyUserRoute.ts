import express, { NextFunction, Request, Response } from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// GET /api/my/user
// Retrieves the current user information
router.get(
  "/",
  jwtCheck,
  jwtParse,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await MyUserController.getCurrentUser(req, res);
    } catch (error) {
      next(error);
    }
  },
);

// POST /api/my/user
// Creates a new user
router.post(
  "/",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await MyUserController.createCurrentUser(req, res);
    } catch (error) {
      next(error);
    }
  },
);

// PUT /api/my/user
// Updates the current user information
router.put(
  "/",
  jwtCheck,
  jwtParse,
  ...validateMyUserRequest,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await MyUserController.updateCurrentUser(req, res);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
