/*!
 * Copyright Fernando Maia da Mota from BovBI company. All rights reserved.
 * bovbi.com.br
 * @fernandommota Fernando Maia da Mota
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

define([
    'amd!bootstrap-multiselect-pentaho-filter/bootstrap-multiselect'
], function($) {

    const postExecutionSelect = function postExecutionSelect(
        optionAllValue,
        filterPlaceholder,
        nonSelectedText,
        allSelectedText,
        nSelectedText
    ) {
        $("#" + this.htmlObject + " select").multiselect({
            includeSelectAllOption: true,
            selectAllValue: optionAllValue,
            enableFiltering: true,
            filterPlaceholder: filterPlaceholder ? filterPlaceholder : "Buscar",
            enableCaseInsensitiveFiltering: true,
            nonSelectedText: nonSelectedText ? nonSelectedText : "Selecione",
            allSelectedText: allSelectedText ? allSelectedText : "Todos",
            selectAllText: allSelectedText ? allSelectedText : "Todos",
            nSelectedText: nSelectedText ? nSelectedText : " - selecionados",
            numberDisplayed: 1,
            buttonWidth: "100%"
        });

        _parameter = this.dashboard.getParameterValue(this.parameter);
        var nOptions = $("#" + this.htmlObject + " option");

        if (_parameter.length <= 0 || _parameter.length === nOptions.length) {
            $("#" + this.htmlObject + " button").removeClass("bootstrap-multiselect-pentaho-filter-changed-alert");
            $("#" + this.htmlObject + " select").multiselect("selectAll", false);
            this.dashboard.setParameter(this.parameter, optionAllValue);
        } else {
            if (optionAllValue)
                $("#" + this.htmlObject + " button").addClass("bootstrap-multiselect-pentaho-filter-changed-alert");
            else
                $("#" + this.htmlObject + " button").removeClass("bootstrap-multiselect-pentaho-filter-changed-alert");
            $("#" + this.htmlObject + " select").multiselect("selectAll", true);
            this.dashboard.setParameter(this.parameter, _parameter);
        }

        //update select
        $("#" + this.htmlObject + " select").multiselect("refresh");
    };

    const preChangeSelect = function preChangeSelect(optionAllValue, newChoice) {
        //get the length options of select
        var nOptions = $("#" + this.htmlObject + " option");

        //test if exist unless on eoption
        if (nOptions.length > 0) {
            //test if the number of options selected is equal to number of options available
            if (nOptions.length === newChoice.length) {
                $("#" + this.htmlObject + " button").removeClass("bootstrap-multiselect-pentaho-filter-changed-alert");
                return optionAllValue;
            } else {
                $("#" + this.htmlObject + " button").addClass("bootstrap-multiselect-pentaho-filter-changed-alert");
                return newChoice;
            }
        };
    }

    const postFetchSelect = function postFetchSelect(result, defaultValueOption) {
        //defaultValueOption options
        // all - will select all options in resultset
        // first - will select the first option in resultset
        // first-n - will select the n firsts options in resultset
        // last - will select the last option in resultset
        // last-n - will select the n last options in resultset

        defaultValueOptionLength =
            defaultValueOption.split("-").length > 1 ?
            defaultValueOption.split("-")[1] :
            0;
        defaultValueOption =
            defaultValueOptionLength > 0 ?
            defaultValueOption.split("-")[0].toString() :
            defaultValueOption;

        //get the parameter mapped in component
        _parameter = this.dashboard.getParameterValue(this.parameter);
        if (_parameter.length <= 0) {
            var options = [];
            var resultset = result.resultset;
            if (defaultValueOption === "first") {
                if (defaultValueOptionLength > 0) {
                    for (
                        var i = 0; i < defaultValueOptionLength && i < resultset.length; i++
                    )
                        options.push(resultset[i][0]);
                } else options.push(resultset[0][0]);
            } else if (defaultValueOption === "last") {
                if (defaultValueOptionLength > 0) {
                    for (
                        var i = resultset.length - 1; i > resultset.length - 1 - defaultValueOptionLength && i >= 0; i--
                    )
                        options.push(resultset[i][0]);
                } else options.push(resultset[resultset.length - 1][0]);
            } else {
                // all option or none selected
                $.each(result.resultset, function(index, value) {
                    options.push(value[0]);
                });
            }

            this.dashboard.setParameter(this.parameter, options);
        } else {
            this.dashboard.setParameter(this.parameter, _parameter);
        }
    };

    return {
        postExecutionSelect: postExecutionSelect,
        preChangeSelect: preChangeSelect,
        postFetchSelect: postFetchSelect
    };
});