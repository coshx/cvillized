function RuleController($scope) {
}

function RulesController($scope) {
    $scope.rules = [
        {name: 'poo', description: 'Remove shitty comments'},
        {name: 'f-bomb', description: 'f-bombs are awesome'},
        {name: 'item3', description: 'content3'}
    ];
    
    $scope.open = function(rule){
        if ($scope.isOpen(rule)){
            $scope.openRule = undefined;
        } else {
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
}

angular.module('cvillized_popup', []).
controller('RuleController', ['$scope', RuleController]).
controller('RulesController', ['$scope', RulesController])
