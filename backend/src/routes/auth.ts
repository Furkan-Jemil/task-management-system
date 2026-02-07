import { Router } from "express";
import { auth } from "../config/auth";
import { toNodeHandler } from "better-auth/node";

const authRouter = Router();

/**
 * Better-Auth handles all auth routes automatically via its node handler.
 * This includes /register, /login, /logout, /session, etc.
 */
authRouter.all("*", async (req, res) => {
    return toNodeHandler(auth)(req, res);
});

export default authRouter;
