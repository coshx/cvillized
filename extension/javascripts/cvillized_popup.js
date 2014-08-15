function RuleController($scope) {
}

function RulesController($scope) {
  $scope.rules = []; // this come from background.js
  
  $scope.open = function(rule){
    if ($scope.isOpen(rule)){
      console.log("already open");
      $scope.openRule = undefined;
    } else {
      console.log("setting openRule to " + rule);
      $scope.openRule = rule;
    }        
  };
  
  $scope.isOpen = function(rule){
    return $scope.openRule === rule;
  };
  
  $scope.anyRuleOpen = function() {
    return $scope.openRule !== undefined;
  };
  
  $scope.close = function() {
    $scope.openRule = undefined;
  };

  $scope.refresh = function() {
    var element = angular.element($('.rules'));
    chrome.runtime.sendMessage({rulesRequest: true}, function(response) {
      $scope.rules = response.rules;
      element.scope().$apply();
    });
  };

  $scope.add = function() {
    $scope.rules.push(new Rule({}));
  };

  $scope.save = function() {
    chrome.runtime.sendMessage({rules: $scope.rules}, function(response) {
      console.log("saved rules");
    });
  };

  $scope.refresh();
}

var app = angular.module('cvillized_popup', []);
app.controller('RuleController', ['$scope', RuleController]);
app.controller('RulesController', ['$scope', RulesController]);
