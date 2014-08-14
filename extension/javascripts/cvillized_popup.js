function ItemController($scope) {
}

function ListController($scope) {
    $scope.items = [
        {name: 'item1', content: 'content1'},
        {name: 'item2', content: 'content2'},
        {name: 'item3', content: 'content3'}
    ];
    
    $scope.open = function(item){
        if ($scope.isOpen(item)){
            $scope.opened = undefined;
        } else {
            $scope.opened = item;
        }        
    };
    
    $scope.isOpen = function(item){
        return $scope.opened === item;
    };
    
    $scope.anyItemOpen = function() {
        return $scope.opened !== undefined;
    };
    
    $scope.close = function() {
        $scope.opened = undefined;
    };
}

