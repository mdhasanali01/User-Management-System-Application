const   express = require('express'),
        application     = express(),
        cors    = require("cors");
        var morgan = require('morgan');
        var fs = require('fs');
        var path = require('path');
        const  accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
        const userRouter = require("./Controllers/userController");
        const accountRouter = require("./Controllers/accountController");
        const   corsOptions = {
            origin: 'http://localhost:4200'
            
          };
        application.use(cors(corsOptions));
        application.use(express.json());
        application.use("/api", userRouter);
        application.use(morgan('combined', { stream: accessLogStream }))
        application.use("/api/Account", accountRouter);
        application.use(express.static(__dirname));
        application.listen(8980, ()=>{
            console.log('Server running 8980');
        });