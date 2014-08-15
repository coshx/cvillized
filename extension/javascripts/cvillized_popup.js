function RuleController($scope) {
}

function RulesController($scope) {
  $scope.rules = [
    {name: 'poo', description: 'Remove shitty comments', search: '', replace: '', enabled: true},
    {name: 'f-bomb', description: 'f-bombs are awesome', search: '', replace: '', enabled: true},
    {name: 'item3', description: 'content3', search: '', replace: '', enabled: false}
  ];
  
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
    debugger
    chrome.runtime.sendMessage({rulesRequest: true}, function(response) {
      debugger
      $scope.rules = response.rules;
    });
  }
}

angular.module('cvillized_popup', []).
controller('RuleController', ['$scope', RuleController]).
controller('RulesController', ['$scope', RulesController])
