/**
 * Created by mamok on 9/19/2016.
 */
// dataservice factory
angular
    .module('myApp.core', [])
    .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {
    return {
        getSoftwares: getSoftwares,
        getCategories: getCategories,
        getShortcuts: getShortcuts
    };

    function getSoftwares() {
        return $http.get('softwares')
            .then(getSoftwaresComplete)
            .catch(getSoftwaresFailed);

        function getSoftwaresComplete(response) {
            return response.data.softwares;
        }

        function getSoftwaresFailed(error) {
            console.error('XHR Failed for getSoftwares.' + error.data);
        }
    }

    function getCategories(softwareId) {
        return $http.get('softwares/' + softwareId + '/categories/')
            .then(getCategoriesComplete)
            .catch(getCategoriesFailed);

        function getCategoriesComplete(response) {
            return response.data.categories;
        }

        function getCategoriesFailed(error) {
            console.error('XHR Failed for getCategories.' + error.data);
        }
    }

    function getShortcuts(softwareId) {
        return $http.get('softwares/' + softwareId + '/shortcuts/')
            .then(getShortcutsComplete)
            .catch(getShortcutsFailed);

        function getShortcutsComplete(response) {
            return response.data.shortcuts;
        }

        function getShortcutsFailed(error) {
            console.error('XHR Failed for getShortcuts.' + error.data);
        }
    }
}