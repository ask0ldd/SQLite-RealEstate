const Host = require('../models/host.model.js')

module.exports = async function initHost(){
    const hosts = await Host.bulkCreate([
    {
        "firstname": "nathalie",
        "lastname": "jean",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg"
    }

    ,{
        "firstname": "della",
        "lastname": "case",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-1.jpg"
    }

    ,{
        "firstname": "franck",
        "lastname": "maher",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-2.jpg"
    }

    ,{
        "firstname": "line",
        "lastname": "rolland",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-3.jpg"
    }

    ,{
        "firstname": "hugo",
        "lastname": "perrier",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-4.jpg"
    }

    ,{
        "firstname": "sébastien",
        "lastname": "fournier",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-5.jpg"
    }

    ,{
        "firstname": "adrien",
        "lastname": "chiran",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-6.jpg"
    }

    ,{
        "firstname": "victor",
        "lastname": "moran",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-7.jpg"
    }

    ,{
        "firstname": "sarah",
        "lastname": "devit",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-8.jpg"
    }

    ,{
        "firstname": "karen",
        "lastname": "guillet",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-9.jpg"
    }

    ,{
        "firstname": "julie",
        "lastname": "donatella",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-10.jpg"
    }

    ,{
        "firstname": "michel",
        "lastname": "romy",
        "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-11.jpg"
    }])
}





