import expressRouter from "express";
import my_function from '../services/my_service.js';
const router = expressRouter.Router();

router.get("/", async (req, res) => {
    try {
        console.log("File my_route.js\nInside try. Request:\n" + req);
        console.log("File my_route.js\nInside try. Message:\nWell done, it works");
        const my_result = await my_function("bla bla");
        return res.status(200).json({result: my_result});
    } catch (e) {
        console.error("File my_route.js\nInside catch. Error:\n", e);
        return res.status(400).json(e);
    }
});

export default router;