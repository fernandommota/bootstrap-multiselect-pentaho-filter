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
    console.log('nOptions', nOptions);
    console.log('nOptions.length', nOptions.length);
    console.log('newChoice', newChoice);
    console.log('newChoice.length', newChoice.length);
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
};

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


var BootstrapMultiselectPentahoFilterComponent = SelectMultiComponent.extend({
    postExecution: function() {
        console.log('postExec');
        optionAllValue = '[Consolidated Date Year Filter].[Todos]';
        filterPlaceholder = 'Buscar Ano';
        nonSelectedText = 'Selecione um Ano';
        allSelectedText = 'Todos os Anos';
        nSelectedText = ' - anos selecionados';

        postExecutionSelect.call(
            this
            // Change to all member propertie of dimension
            , optionAllValue
            // Change the labels about dimension
            , filterPlaceholder, nonSelectedText, allSelectedText, nSelectedText
            // end labels about dimension
        )
    },
    preChange: function(newChoice) {
        console.log('preChange newChoice', newChoice);
        optionAllValue = '[Consolidated Date Year Filter].[Todos]';
        return preChangeSelect.call(this, optionAllValue, newChoice);
    },
    postFetch: function(data) {
        defaultValueOption = 'all';
        //defaultValueOption options
        // all - will select all options in resultset
        // first - will select the first option in resultset
        // first-n - will select the n firsts options in resultset
        // last - will select the last option in resultset
        // last-n - will select the n last options in resultset
        console.log('postFetch');
        postFetchSelect.call(this, data, defaultValueOption);
    },
});