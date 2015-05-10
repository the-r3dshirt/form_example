
/*
Create a label from placeholder text when fields are edited.
*/

/*jslint browser: true, indent: 4, maxlen: 80, plusplus: true, vars: true */
/*global $, console, jQuery,  */

(function () {
    "use strict";

    function toggleLabel(event) {
        var label, target;

        target = event.target;
        label = $('#' + target.id + '_label');
        if (target.value.length > 0) {
            if (label.length === 0) {
                label = $('<label>');
                label.attr('id', target.id + '_label');
                label.attr('for', target.id);
                label[0].textContent = $(target).attr('placeholder');
                $(target).after(label);
            }
        } else {
            label.remove();
        }
    }

    function init() {
        var elements;

        elements = $('input, textarea');
        $(elements).keyup(toggleLabel).change(toggleLabel);
        $(elements).change(); // Handle elements with values onload.
    }

    jQuery(init);

}());
