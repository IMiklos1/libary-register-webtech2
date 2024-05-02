import { AuthUserController } from "./controller/auth-user.controller";
import { UserController } from "./controller/user.controller";
import { connectToMongoDB } from "./data-source";
import { AuthUser } from "./entity/AuthUser";
import { Item } from "./entity/Item"
import { User } from "./entity/User"
import { handleAuthorizationError } from "./protect-routes";
import { getRouter } from "./routes";
import express = require("express");



async function main() {

    //connectToMongoDB();

    const app = express();

    app.use(express.json());

    const cors = require('cors');
    const corsOptions = {
        origin: 'http://localhost:4200',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }
    app.use(cors(corsOptions));

    //app.use('/api', getRouter());
    app.use('/api', getRouter(), handleAuthorizationError);
    app.listen(3000, () => {
        console.log('Listening on :3000 ...');
    });
}

main();


