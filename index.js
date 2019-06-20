var parseArgs = require('minimist');
var help = require('./src/help');
var atlascluster = require('./src/atlascluster');


// parse command line arguments and route to appropriate action
var args = parseArgs(process.argv.slice(2));

if (args._.length > 1) {
    throw new Error("Error: there should only be one argument");
} else if (args._.length < 1 || args["help"] != null) {
    help.displayHelpMessage(function (message) {
        console.log(message);
        process.exit();
    });
} else {

    switch (args._[0]) {
        case ("getclusterinfo"):
            atlascluster.printclusterinfo(args.projectid, args.clustername);
            break;
        case ("getclusternames"):
            atlascluster.getclusternames(args.projectid);
            break;
        case ("createcluster"):
            atlascluster.createcluster(args.projectid, args.clusterdefinition, args.clusterdefinitionfile);
            break;
        case ("deletecluster"):
            atlascluster.deletecluster(args.projectid, args.clustername, args.hasOwnProperty("all"));
            break;
        case ("modifycluster"):
            atlascluster.modifycluster(args.projectid, args.clustername, args.clusterdefinition, args.clusterdefinitionfile);
            break;
        case ("pausecluster"):
            atlascluster.pausecluster(args.projectid, args.clustername);
            break;
        case ("resumecluster"):
            atlascluster.resumecluster(args.projectid, args.clustername);
            break;
        case ("help"):
            help.displayHelpMessage(function (message) {
                console.log(message);
                process.exit();
            });
            break;
        default:
            throw new Error("Invalid input");
            break;
    }

}