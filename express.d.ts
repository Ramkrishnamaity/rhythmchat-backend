import { ReqWithAuth } from "./src/lib/types/Common"

// Augment the Request interface to include the custom property
declare module "express" {
    interface Request {
        User?: ReqWithAuth;
    }
}