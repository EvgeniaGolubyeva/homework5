/// <reference path="../refs.ts" />

'use strict';

//By default datePicker validates of it's popup ONLY.
//It can be seen here: http://angular-ui.github.io/bootstrap/
//If invalid date is chosen than only popup is considered to be invalid,
//not the input itself.
//This custom directive adds validation to datePicker input.

function datePickerInputValidationDirective(): ng.IDirective {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs: any, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                var minDate = scope.$eval(attrs.min);
                ctrl.$setValidity('date', ctrl.$modelValue >= minDate);
            });
        }
    }
}

angular.module('auction').directive('auctionDatePickerValidation', datePickerInputValidationDirective);