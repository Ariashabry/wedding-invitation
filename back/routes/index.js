import express from "express";
import guestsRoutes from "./guestsRouter.js";
import featureFlagsRouter from "./featureFlagsRouter.js";
import wishesRouter from "./wishesRouter.js";

const indexRouter = express.Router()

indexRouter.get("/", (req, res) => {
     res.send("api invitation")
})

indexRouter.use("/guests", guestsRoutes)
indexRouter.use("/features", featureFlagsRouter)
indexRouter.use("/wishes", wishesRouter)

export default indexRouter;