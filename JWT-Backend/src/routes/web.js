import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/home", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUser);
    router.post("/users/create-user", homeController.createUser);
    router.post("/delete-user/:id", homeController.deleteUser);
    router.post("/update-user/:id", homeController.updateUser);
    router.get("/users/get-update-user/:id", homeController.getUpdateUser);
    router.get("/about", (req, res) => {
        return res.send("I'm Pii");
    });
    return app.use("/", router);
}

export default initWebRoutes;