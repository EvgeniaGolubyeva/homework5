/// <reference path="../refs.ts" />

'use strict';

class DatePickerController {
    private minDate: number;
    private isPopupOpened: boolean;

    constructor() {
        this.minDate = new Date().setHours(0,0,0,0);
        this.isPopupOpened = false;
    }

    private openPopup ($event: ng.IAngularEvent): void {
        $event.preventDefault();
        $event.stopPropagation();

        this.isPopupOpened = true;
    }
}

//angular-ui bootstrap date picker component (input + button) wrapper
function datePickerDirective(): ng.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'views/partial/datePicker.html',
        scope: {
            minDate   : '=min',
            ngModel   : '='
        },
        controller: DatePickerController,
        controllerAs: 'ctrl',
        require: 'ngModel',
        link: function(scope: any, elem, attrs) {
            //By default datePicker validates of it's popup ONLY.
            //It can be seen here: http://angular-ui.github.io/bootstrap/
            //If invalid date is chosen than only popup is considered to be invalid,
            //not the input itself.
            //Add validation to datePicker input and all composite directive
            //may be validation can be checked by inner-inner ul (popup)?...
            var ctrl = elem.controller('ngModel');

            var validate = function(value) {
                var isValid = value >= scope.minDate;
                ctrl.$setValidity('date', isValid);
                return value;
            };

            ctrl.$parsers.unshift(validate);
            ctrl.$formatters.push(validate);

            scope.$watch('ngModel', function (newValue) {
                validate(ctrl.$viewValue);
            });
        }
    }
}

angular.module('auction').directive('auctionDatePicker', datePickerDirective);