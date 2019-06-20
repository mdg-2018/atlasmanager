Atlas Manager
=============

This app was built to provide an example of how one might use the Atlas API to manage their Atlas clusters. This app contains example code to create, modify, and delete clusters in a project.

For more information about MongoDB Atlas, check out <a href="https://cloud.mongodb.com">https://cloud.mongodb.com</a>

Atlas Manager Usage
===================

To get started, rename __config.js to config.js, then specify your username and api key in the config.js file. Run npm install to install dependencies.

> node index.js [argument] [options]  
> example: node index.js createcluster --projectid projectIdHere

## Arguments

***getclusterinfo***  
  purpose: lists detailed information about clusters in project  
  options:  
&nbsp;&nbsp;required: --projectid [yourProjectId]  
&nbsp;&nbsp;optional: --clustername [nameOfCluster]  
  notes: If cluster name is not specified, info for all clusters in the project will be displayed  

***getclusternames***  
  purpose: returns array containing the names of clusters in the project  
  options:  
    &nbsp;&nbsp;required: --projectid [yourProjectId]  

***createcluster***  
  purpose: create a new cluster in a project  
  options:  
  &nbsp;&nbsp;required: --projectid [yourProjectId]  
   &nbsp;&nbsp;optional: --clusterdefintion [definitionJsonHere] --clusterdefintionfile [filePath]  
    notes: clusterdefintion is a string of json defining the cluster configuration, clusterdefintionfile  
           is a path to a json file containing the cluster definition. Only pass in one of these arguments!  
           If not cluster definition of any kind is provided, an M10 with a random name will be created.  

***deletecluster***  
  purpose: deletes one or all clusters  
  options:   
    &nbsp;&nbsp;required: --projectid [yourProjectId]  
    &nbsp;&nbsp;optional: --clustername [nameOfCluster] --all  
    notes: Pass in clustername to delete specific cluster, --all will delete all clusters in project permanently!  

***modifycluster***  
  purpose: changes configuration of existing cluster  
  options:  
    &nbsp;&nbsp;required: --projectid [yourProjectId] --clustername [nameOfCluster]  
    &nbsp;&nbsp;          Either --clusterdefinition [definitionJsonHere] OR --clusterdefintionfile [filePath]  

***pausecluster***  
  purpose: pauses a cluster  
  options:  
    &nbsp;&nbsp;required: --projectid [yourProjectId] --clustername [nameOfCluster]

***resumecluster***  
  purpose: resumes a cluster  
  options:  
    &nbsp;&nbsp;required: --projectid [yourProjectId] --clustername [nameOfCluster]

