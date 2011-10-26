/*
*
* Copyright (C) 2011, The Locker Project
* All rights reserved.
*
* Please see the LICENSE file for more information.
*
*/

var instagram = require('../../Connectors/Instagram/lib.js');

exports.sync = function(processInfo, cb) {
    instagram.init(processInfo.auth);
    var responseObj = {data : {}, config:{}};
    var since="";
    var posts = [];
    if (processInfo.config && processInfo.config.mediaSince) {
        since = processInfo.config.mediaSince;
        responseObj.config.mediaSince = since;
    }
    instagram.getMedia({min_id:since}, function(post){
        posts.push({'obj' : post, timestamp: new Date(), type : 'new'});
        if(post.id > since) since = post.id;
    }, function(err) {
            if (err) console.error(err);
            responseObj.data.photo = posts;
            responseObj.config.mediaSince = since;
            cb(err, responseObj);
    });


}