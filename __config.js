module.exports = {
    atlas_root: "https://cloud.mongodb.com/api/atlas/v1.0/",
    api_key: "",
    username: "", // public key

    //what you get if you create a cluster but don't include a cluster configuration
    defaultClusterSettings: {
        "providerSettings": {
            "providerName": "AWS",
            "instanceSizeName": "M10",
            "regionName": "US_EAST_2"
        }
    }
}