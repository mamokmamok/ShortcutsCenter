'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl',
    controllerAs: 'vm'
  });
}])

.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'dataService'];

function MainCtrl($scope, dataService) {
  var vm = this;
  vm.softwares = [];
  vm.categories = [];
  vm.shortcuts = [];
  vm.setSoftware = setSoftware;
  activate();
  init();

  function activate() {
    return getSoftwares().then(function() {
      console.info('Activated Software  View');
    });
  }

  function getCategories() {
    return dataService.getCategories(vm.currSoftware.softwareId)
        .then(function(data) {
          vm.categories = data;
          vm.categories[0] && (vm.currCategory = vm.categories[0]);
          return vm.categories;
        });
  }

  function getShortcuts() {
    return dataService.getShortcuts(vm.currSoftware.softwareId)
        .then(function(data) {
          vm.shortcuts = data;
          return vm.shortcuts;
        });
  }

  function getSoftwares() {
    return dataService.getSoftwares()
        .then(function(data) {
          vm.softwares = data;
          vm.softwares[0] && setSoftware(vm.softwares[0]);
          return vm.softwares;
        });
  }

  function setSoftware(software){
    vm.currSoftware = software;
    getCategories();
    getShortcuts();
  }



  function init(){

    $(function() {
      var isXS = false;
      var $accordionXSCollapse = $('.accordion-xs-collapse');

      // Window resize event (debounced)
      var timer;
      $(window).resize(function () {
        if (timer) { clearTimeout(timer); }
        timer = setTimeout(function () {

          isXS = Modernizr.mq('only screen and (max-width: 767px)');
          var $accordionXSCollapse = $('.accordion-xs-collapse');
          // Add/remove collapse class as needed
          if (isXS) {
            $accordionXSCollapse.addClass('collapse');
          } else {
            $accordionXSCollapse.removeClass('collapse');
          }
        }, 100);
      }).trigger('resize'); //trigger window resize on pageload

      // Initialise the Bootstrap Collapse
      $accordionXSCollapse.each(function () {
        $(this).collapse({ toggle: false });
      });

      // <a href="http://www.jqueryscript.net/accordion/">Accordion</a> toggle click event (live)
      $(document).on('click', '.accordion-xs-toggle', function (e) {
        e.preventDefault();

        var $thisToggle = $(this),
            $targetRow = $thisToggle.parent('.tr'),
            $targetCollapse = $targetRow.find('.accordion-xs-collapse');

        if (isXS && $targetCollapse.length) {
          var $siblingRow = $targetRow.siblings('.tr'),
              $siblingToggle = $siblingRow.find('.accordion-xs-toggle'),
              $siblingCollapse = $siblingRow.find('.accordion-xs-collapse');

          $targetCollapse.collapse('toggle'); //toggle this collapse
          $siblingCollapse.collapse('hide'); //close siblings

          $thisToggle.toggleClass('collapsed'); //class used for icon marker
          $siblingToggle.removeClass('collapsed'); //remove sibling marker class
        }
      });
    });

  }
}

