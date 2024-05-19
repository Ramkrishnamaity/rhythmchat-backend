import { ReqWithAuth } from "./src/lib/DataTypes/Common"

// Augment the Request interface to include the custom property
declare module "express" {
    interface Request {
        User?: ReqWithAuth;
    }
}