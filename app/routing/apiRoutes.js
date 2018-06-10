var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friendFinder", function(req, res) {

        var total = req.body.scores.reduce(function(accumulator, current) {
            return accumulator + parseInt(current);
        }, 0);
        req.body.total = total;
        console.log("The total score for the survey is " + total)

        var holder;
        var index;
        for (var i = 0; i < friends.length; i++) {
            var difference = Math.abs(total - friends[i].total);
            if (i === 0) {
                holder = difference;
                index = i;
            } else if (difference < holder) {
                holder = difference;
                index = i;
            }
        }

        console.log("The difference between the total score for the survey and the next cloesest is " + holder);
        console.log("The index of the closest match is " + index);
        console.log(friends[index]);
        
        res.json(friends[index]);
        friends.push(req.body);

        console.log(friends);
    });
  
};
