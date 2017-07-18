'use strict';
angular.module('confusionApp').controller('MenuController',['$scope','menuFactory', function($scope,menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';
  
  $scope.dishes= [];
  menuFactory.getDishes()
  .then(
      function(response) {
          $scope.dishes = response.data;
          $scope.showMenu = true;
      },
      function(response){
         $scope.message = "Error: "+response.status + " " + response.statusText;
      }
  );
  


  $scope.select = function(setTab) {
    $scope.tab = setTab;
    $scope.showDetails = false;
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } 
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };
  
  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
}]).
controller('ContactController', ['$scope', function($scope)
 {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
  }]).
controller('FeedbackController', ['$scope', function($scope) {
     $scope.sendFeedback = function() {
         console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
           $scope.invalidChannelSelection = true;
                    console.log('incorrect');
        }
        else {
            console.log("correct")
            $scope.invalidChannelSelection = false;
            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
            $scope.feedback.mychannel="";

            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
     }
  }]).
  controller('DishDetailController', ['$scope','$stateParams', 'menuFactory',function($scope,$stateParams,menuFactory) {
      $scope.dish = {};
      $scope.showDish = false;
      $scope.message="Loading ...";
      menuFactory.getDish(parseInt($stateParams.id,0))
      .then(
          function(response){
              $scope.dish = response.data;
              $scope.showDish=true;
          },
          function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
          }
      );
      $scope.postComment = function(){
        console.log($scope.comment);
        $scope.invalidChannelSelection = false;
        var comment = {};
        comment.author = $scope.comment.author;
        comment.rating = $scope.comment.rating;
        comment.comment =  $scope.comment.comment;
        comment.date = new Date();
        $scope.dish.comments.push(comment);
        $scope.comment = "";

        $scope.commentForm.$setPristine();
      }
  }]).
  controller('AboutController',['$scope','corporateFactory',function($scope,corporateFactory){
    debugger;
    console.log('aboutus');
    var a =12;
    $scope.leaders = corporateFactory.getLeaders();
  }]).
  controller('IndexController',['$scope','menuFactory','corporateFactory',function($scope,menuFactory,corporateFactory){
    console.log('index');
    $scope.dish = {};
    $scope.showDish = false;
    $scope.message="Loading ...";
    menuFactory.getDish(0)
    .then(
        function(response){
            $scope.dish = response.data;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );
    $scope.promotion = menuFactory.getPromotion();
    $scope.leader = corporateFactory.getLeader(0);
    console.log($scope.promotion);
    
  }])
  

;

