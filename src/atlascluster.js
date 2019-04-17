const atlasrequest = require('./atlasrequest');
const fs = require('fs');

function getclusterinfo(projectid, clustername, callback) {

    atlasrequest.doGet("/clusters", projectid, function (error, response, body) {
        if (error != null) {
            console.log("Error: " + error);
        }

        callback(JSON.parse(body));

    })
}

function generateCluster(projectid, clusterdefinition) {

}


module.exports = {
    printclusterinfo: function (projectid, clustername) {
        //todo: support looking for specific cluster
        getclusterinfo(projectid, clustername, function (clusterdetails) {
            console.log(JSON.stringify(clusterdetails));
            process.exit();
        })
    },
    getclusternames: function (projectid,callback) {
        getclusterinfo(projectid, null, function (clusterdetails) {
            var names = [];
            clusterdetails.results.forEach(function (cluster) {
                names.push(cluster.name);
            });
            console.log(names);
            if(callback != null){
                callback(names);
            } else {
                process.exit();
            }
        });

    },
    createcluster: function (projectid, clusterdefinition, clusterdefinitionfile) {
        var definition;

        if (clusterdefinition == null && clusterdefinitionfile == null) {

            //generate random name fo cluster, docker style
            var dockerNames = require('docker-names');
            var clustername = dockerNames.getRandomName().replace("_", "-");

            definition = {
                "name": clustername,
                "providerSettings": {
                    "providerName": "AWS",
                    "instanceSizeName": "M10",
                    "regionName": "US_EAST_2"
                }
            }
        }

        if (clusterdefinition != null && clusterdefinitionfile != null) {
            throw new Error("Error: conflicting cluster definition information");
        }

        if (clusterdefinition != null) {
            definition = JSON.parse(clusterdefinition);
        }

        if (clusterdefinitionfile != null) {
            var input = fs.readFileSync(clusterdefinitionfile);
            definition = JSON.parse(input);
        }

        atlasrequest.doPost("/clusters", definition, projectid, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.parse(result.body));
            process.exit();
        });
    },
    deletecluster: function (projectid, clustername, deleteall) {
        if (!deleteall) {
            var endpoint = "/clusters/" + clustername;
            atlasrequest.doDelete(endpoint, projectid, function (err, response) {
                if (err) {
                    console.log(err);
                }
                console.log(response);
            })
        } else if(deleteall){
            this.getclusternames(projectid,function(names){
                names.forEach(function(clustername){
                    var endpoint = "/clusters/" + clustername;
                    atlasrequest.doDelete(endpoint, projectid, function (err, response) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(response);
                        process.exit();
                    })
                })
            })
        }

    },
    modifycluster: function(projectid, clustername, clusterdefinition, clusterdefinitionfile){
        var definition;

        if (clusterdefinition == null && clusterdefinitionfile == null) {
            throw new Error("Invalid argument: must provide cluster definition or path to cluster definition file");
        }

        if (clusterdefinition != null && clusterdefinitionfile != null) {
            throw new Error("Error: conflicting cluster definition information");
        }

        if (clusterdefinition != null) {
            definition = JSON.parse(clusterdefinition);
        }

        if (clusterdefinitionfile != null) {
            var input = fs.readFileSync(clusterdefinitionfile);
            definition = JSON.parse(input);
        }

        atlasrequest.doPatch("/clusters", projectid, clustername, definition, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.parse(result.body));
            process.exit();
        });
    }
}