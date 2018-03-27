angular.module('starter.services', [])

.service('Scores', function() {
  // Might use a resource here that returns a JSON array

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
