
/*
Covert form select elments that allow for multiple selections, into a pair of
select elements with controls to move options between the two.

eg.

   options    selected
--------------------------
|    opt_1  |   opt_2   |
|    opt_3  |   opt_4   |
|    opt_5  |           |
|           |           |

*/


/*jslint browser: true, indent: 4, maxlen: 80, plusplus: true, vars: true */
/*global $, console, jQuery,  */

(function () {
    "use strict";

    var elements;

    /*
    Take select elements and split options into two. One group with selected
    options, one with un-selected.
    */
    function setup() {
        var available_container, available_select, button_add, button_add_all,
            button_remove, button_remove_all, clones, control_container, forms,
            id, selected, selected_container, unselected, x;

        for (x = 0; x < elements.length; x++) {
            selected = $(elements[x]).find('option[selected]').
                removeAttr('selected');
            unselected = $(elements[x]).find('option').not(selected);
            clones = unselected.clone();

            // Remove selected options from first select.
            unselected.remove();

            // Create a second select with unselected/available options.
            id = elements[x].id;
            available_select = $('<select multiple="multiple">');
            available_select[0].id = id + '-available';
            $(available_select).append(clones);
            available_container = $('<div class="available-container"></div>');
            available_container.append(available_select);
            $(elements[x]).before(available_container);

            // Insert basic add/remove controls.
            button_add = $('<a class="add" data-target="' + id +
                '-available" data-destination="' + id +
                '" href="#">&rarr;</a>');
            button_remove = $('<a class="remove" data-target="' + id +
                '" data-destination="' + id +
                '-available" href="#">&larr;</a>');

            control_container = $('<div class="multi-select-controls"></div>');
            $(control_container).append(button_add);
            $(control_container).append(button_remove);
            $(elements[x]).before(control_container);

            // Wrap a container around existing select element.
            selected_container = $('<div class="selected-container"></div>');
            $(elements[x]).before(selected_container);
            $(selected_container).prepend(elements[x]);

            // Insert add all / remove all controls.
            button_add_all = $('<a class="add-all" data-destination="'+ id +'" href="">Add all</a>');
            button_remove_all = $('<a class="remove-all" data-destination="'+ id +'-available" href="">Remove all</a>');

            $(available_container).append(button_add_all);
            $(selected_container).append(button_remove_all);

            // Events.
            $(button_add).click(move);
            $(button_add_all).click(moveAll);
            $(button_remove).click(move);
            $(button_remove_all).click(moveAll)

            forms = $(elements).parents('form');
            forms.submit(selectData);
        }
    }

    /*
    Move selected options between select elements
    */
    function move(event) {
        var destination, target, options, x;

        target = $(event.target).data('target');
        target = $('#' + target);
        destination = $(event.target).data('destination');
        destination = $('#' + destination);

        options = $(target).find('option');
        for (x = 0; x < options.length; x++) {
            if (options[x].selected === true) {
                $(destination).append($(options[x]).clone());
                $(options[x]).remove();
            }
        }
        return false;
    }

    function moveAll(event) {
        var destination, options;

        destination = $(event.target).data('destination');
        destination = $('#' + destination);
        options = $(event.target).parent().find('option');
        (destination).append($(options).clone());
        $(options).remove();
        return false;
    }

    /*
    Mark options as selected before form post.
    */
    function selectData() {
        var options, x;

        options = $(elements).find('option');
        for (x = 0; x < options.length; x++) {
            options[x].selected = true;
        }
    }


    function init() {
        elements = $('.multi-select');
        if (elements.length < 1) {
            elements = $('select[multiple]');
        }
        setup();
    }

    jQuery(init);

}());
