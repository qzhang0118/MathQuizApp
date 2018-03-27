angular.module('starter.services', [])

.service('Scores', function() {
<<<<<<< HEAD
  // Might use a resource here that returns a JSON array

=======
>>>>>>> c7bcbde5e374a547aed193c247763360d3f5afb0
  var scores = JSON.parse(window.localStorage.getItem('scores'));
  if (scores == null) {
    scores = [];
  }

  this.all = function() {
    return scores;
  };

  this.add = function(score) {
    score.time = (new Date()).toString();
    scores.push(score);
    window.localStorage.setItem('scores', JSON.stringify(scores));
  };
});
