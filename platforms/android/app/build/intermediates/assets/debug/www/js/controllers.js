angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope, $state, $rootScope) {
  $scope.operation = function(operation){
    $rootScope.operationSelected = operation;
    $state.go('tab.quizzes');
  };
})

.controller('QuizzesCtrl', function($scope, $rootScope, Scores, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.$on('$ionicView.enter', function(e) {
    if ($rootScope.operationSelected == null) {
      $state.go('tab.dash');
    } else {
      var img = document.getElementById("rightOrWrong");
      img.src = "img/thumb.png";
      $scope.inputAnswer = "";
      $scope.message = "";
      var result;
      $scope.newscore = {};
      $scope.newscore.level = 1;
      $scope.numOne = Math.floor(Math.random() * 10 + 1);
      $scope.numTwo = Math.floor(Math.random() * 10 + 1);
      if ($rootScope.operationSelected == 'Addition') {
        result = $scope.numOne + $scope.numTwo;
        $scope.operate = '+';
      } else if ($rootScope.operationSelected == 'Subtraction') {
        result = $scope.numOne - $scope.numTwo;
        $scope.operate = '-';
      } else if ($rootScope.operationSelected == 'Multiplication') {
        result = $scope.numOne * $scope.numTwo;
        $scope.operate = '*';
      } else {
        result = $scope.numOne % $scope.numTwo;
        $scope.operate = '%';
      }
      $scope.guesses = 0;
      $scope.correctAns = 0;
      $scope.newscore.score = $scope.correctAns + ' / ' + $scope.guesses;

      $scope.checkAnswer = function() {
        $scope.guesses++;
        if ($rootScope.operationSelected == 'Addition') {
          result = $scope.numOne + $scope.numTwo;
          $scope.operate = '+';
        } else if ($rootScope.operationSelected == 'Subtraction') {
          result = $scope.numOne - $scope.numTwo;
          $scope.operate = '-';
        } else if ($rootScope.operationSelected == 'Multiplication') {
          result = $scope.numOne * $scope.numTwo;
          $scope.operate = '*';
        } else {
          result = $scope.numOne % $scope.numTwo;
          $scope.operate = '%';
        } 

        if ($scope.guesses >= 10) {
          $scope.newscore.score = (result == this.inputAnswer ? 1 + $scope.correctAns : $scope.correctAns) + ' / 10';
          Scores.add($scope.newscore);

          var newLevel;
          if ($scope.correctAns < 6) {
            newLevel = $scope.newscore.level;
            $scope.message = "You failed this level. Please try again!";
            var audio = new Audio("audio/fail.wav");
            audio.play();
          } else {
            $scope.message = "Congratulations you passed level " + $scope.newscore.level + ".";
            var audio = new Audio("audio/success.wav");
            audio.play();
            newLevel = $scope.newscore.level + 1;
          }

          $scope.newscore = {};
          $scope.newscore.level = newLevel;
          if ($scope.newscore.level >= 4) {
            $rootScope.congratMsg = "Congratulations! You passed all levels in operation " + $scope.operationSelected + "!";
            $state.go('tab.score');
            $scope.newscore.level = 1;
            img.src = "img/thumb.png";
            this.inputAnswer = "";
            $scope.message = "";
          } 
          $scope.newscore.score = '0 / 0';
          $scope.numOne = Math.floor(Math.random() * Math.pow(10, $scope.newscore.level) + 1);
          $scope.numTwo = Math.floor(Math.random() * Math.pow(10, $scope.newscore.level) + 1);
          $scope.guesses = 0;
          $scope.correctAns = 0;        
        } else {
          if ($scope.guesses >= 1) {
            $scope.message = "";
          }
          
          if (result == this.inputAnswer) {
            $scope.correctAns++;
            img.src = 'img/Right.png';
          } else {
            img.src = 'img/Wrong.png';
          }
          $scope.newscore.score = $scope.correctAns + ' / ' + $scope.guesses;
          $scope.numOne = Math.floor(Math.random() * Math.pow(10, $scope.newscore.level) + 1);
          $scope.numTwo = Math.floor(Math.random() * Math.pow(10, $scope.newscore.level) + 1);
        }
      };
    }
  });
})

.controller('ScoreCtrl', function($scope, Scores) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.scores = Scores.all();
  });
});
