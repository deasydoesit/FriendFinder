var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friendFinder", function(req, res) {

        //calculate total score for submitted survey
        var total = req.body.scores.reduce(function(accumulator, current) {
            return accumulator + parseInt(current);
        }, 0);

        //add total score key/value pair to submitted survey object 
        req.body.total = total;

        //create variable index storing index of closest matched friend
        var index;
        //create variable holder storing total score of closest matched friend
        var holder;
        for (var i = 0; i < friends.length; i++) {
            //identify difference between total score for submitted survey and friends from friends array
            var difference = Math.abs(total - friends[i].total);
            if (i === 0) {
                //temporarily store first matched friend
                index = i;
                holder = friends[i].total;
            } else if (difference < holder) {
                index = i;
                holder = friends[i].total
            }
        }
        
        //return identified friend
        res.json(friends[index]);

        //add submitted survey object to friends array
        friends.push(req.body);
    });
  
};
