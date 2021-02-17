const initSelect = function(jQuery, logger) {
    $ = jQuery;
    Logger = logger;
}

const isValidPropertyValue = function isValidPropertyValue(
    property,
    cause
) {

    if (typeof property === 'undefined') {
        msg = ''; //TO-DO
        this.trigger("cdf cdf:error", this, msg, cause || null);
        Logger.log(this.name + ': ' + cause, "error");
        return false;
    }

    return true;
};

const postExecutionSelect = function postExecutionSelect() {

    $("#" + this.htmlObject + " select").multiselect({
        includeSelectAllOption: true,
        selectAllValue: this.allMemberName,
        enableFiltering: true,
        filterPlaceholder: this.filterPlaceholderText,
        enableCaseInsensitiveFiltering: true,
        nonSelectedText: this.nonSelectedText,
        allSelectedText: this.allSelectedText,
        selectAllText: this.allSelectedText,
        nSelectedText: this.nSelectedText,
        numberDisplayed: 1,
        buttonWidth: "100%"
    });

    _parameter = this.dashboard.getParameterValue(this.parameter);
    var nOptions = $("#" + this.htmlObject + " option");

    if (_parameter.length <= 0 || _parameter.length === nOptions.length) {
        $("#" + this.htmlObject + " button").removeClass("bootstrap-multiselect-pentaho-filter-changed-alert");
        $("#" + this.htmlObject + " select").multiselect("selectAll", false);
        this.dashboard.setParameter(this.parameter, this.allMemberName);
    } else {
        if (this.allMemberName)
            $("#" + this.htmlObject + " button").addClass("bootstrap-multiselect-pentaho-filter-changed-alert");
        else
            $("#" + this.htmlObject + " button").removeClass("bootstrap-multiselect-pentaho-filter-changed-alert");
        $("#" + this.htmlObject + " select").multiselect("selectAll", true);
        this.dashboard.setParameter(this.parameter, _parameter);
    }

    //update select
    $("#" + this.htmlObject + " select").multiselect("refresh");
};

const preChangeSelect = function preChangeSelect(newChoice) {
    //get the length options of select
    var nOptions = $("#" + this.htmlObject + " option");
    //test if exist unless on eoption
    if (nOptions.length > 0) {
        //test if the number of options selected is equal to number of options available
        if (nOptions.length === newChoice.length) {
            $("#" + this.htmlObject + " button").removeClass("bootstrap-multiselect-pentaho-filter-changed-alert");
            return this.allMemberName;
        } else {
            $("#" + this.htmlObject + " button").addClass("bootstrap-multiselect-pentaho-filter-changed-alert");
            return newChoice;
        }
    };
};

const postFetchSelect = function postFetchSelect(result) {
    //defaultValueOption options
    // all - will select all options in resultset
    // first - will select the first option in resultset
    // first-n - will select the n firsts options in resultset
    // last - will select the last option in resultset
    // last-n - will select the n last options in resultset

    defaultValueOption = this.useDefaultValue;
    if (typeof defaultValueOption === 'undefined') {

        if (typeof this.firstOrLastDefaultValues === 'undefined') {
            msg = this.name;
            cause = 'firstOrLastDefaultValues property must be a valid number!';
            this.trigger("cdf cdf:error", this, msg, cause || null);
            Logger.log(msg + ': ' + cause, "error");
            return;
        } else if (this.firstOrLastDefaultValues >= 0) {
            defaultValueOption = 'first';
            defaultValueOptionLength = this.firstOrLastDefaultValues;
        } else {
            defaultValueOption = 'last';
            defaultValueOptionLength = (this.firstOrLastDefaultValues * -1);
        }
    }

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


if (typeof require === "function" && typeof require.specified === "function") {
    //console.log('requirejs enabled!');
    define('BootstrapMultiselectPentahoFilter', function() {
        return {
            initSelect: initSelect,
            isValidPropertyValue: isValidPropertyValue,
            postExecutionSelect: postExecutionSelect,
            preChangeSelect: preChangeSelect,
            postFetchSelect: postFetchSelect
        };
    });

} else {
    //console.log('requirejs disabled!');
    initSelect($, Dashboards);
    BootstrapMultiselectPentahoFilterComponent = SelectMultiComponent.extend({
        /**
         * 
         * TO-DO extend the original preExec function from pentaho-cdf/js-legacy/components/core.js
         */
        preExec: function(isDataPush) {

            if (isDataPush) {
                this.isDataPush = true;
            }

            /*
             * runCounter gets incremented every time we run a query, allowing us to
             * determine whether the query has been called again after us.
             */
            if (typeof this.runCounter == "undefined") {
                this.runCounter = 0;
            }
            var ret;
            if (typeof this.preExecution == "function") {
                try {
                    ret = this.preExecution();
                    ret = typeof ret == "undefined" || ret;
                } catch (e) {
                    this.error(Dashboards.getErrorObj('COMPONENT_ERROR').msg, e);
                    this.dashboard.log(e, "error");
                    ret = false;
                }
            } else {
                ret = true;
            }
            this.trigger('cdf cdf:preExecution', this, ret);

            if (!ret) {
                this.isDataPush = false;
            }

            // update postFetch function add the postFetchSelect function
            var userPostFetch = this.postFetch;
            // save the reference to the component to be used in the next function
            var mySelf = this;

            this.postFetch = function(data) {

                if (typeof userPostFetch == "function") {
                    var newData = userPostFetch(data);
                    data = (newData === undefined) ? data : newData;

                    //call the plugin
                    postFetchSelect.call(mySelf, data);

                    mySelf.trigger('cdf cdf:postFetch', mySelf, data);
                } else {
                    postFetchSelect.call(mySelf, data);
                }

                return data;
            };

            return ret;
        },
        /**
         * 
         * TO-DO extend the original postExec function from pentaho-cdf/js-legacy/components/core.js
         */
        postExec: function() {
            //validate property values
            validateProperties = [];
            validateProperties.push(isValidPropertyValue.call(this, this.allMemberName, 'allMemberName property must be a valid text!'));
            validateProperties.push(isValidPropertyValue.call(this, this.filterPlaceholderText, 'filterPlaceholderText property must be a valid text!'));
            validateProperties.push(isValidPropertyValue.call(this, this.nonSelectedText, 'nonSelectedText property must be a valid text!'));
            validateProperties.push(isValidPropertyValue.call(this, this.allSelectedText, 'allSelectedText property must be a valid text!'));
            validateProperties.push(isValidPropertyValue.call(this, this.nSelectedText, 'nSelectedText property must be a valid text!'));


            if (validateProperties.filter(function(isValid) { return isValid === false; }).length > 0)
                return;

            postExecutionSelect.call(this);

            this.trigger('cdf cdf:preChange', this.preChangeTeste);

            if (typeof this.postExecution == "function") {
                this.postExecution();
            }
            this.trigger('cdf cdf:postExecution', this);
            this.isDataPush = false;

            // save the reference to the component to be used in the next function
            var mySelf = this;

            // update preChange function add the preChangeSelect function
            if (typeof this.preChange == "function") {
                var userPreChange = this.preChange;
                this.preChange = function(newChoice) {
                    userNewChoice = userPreChange(newChoice);
                    if (typeof userNewChoice === 'undefined')
                        return preChangeSelect.call(mySelf, newChoice);
                    else
                        return preChangeSelect.call(mySelf, userNewChoice);
                }
            } else {
                mySelf.preChange = function(newChoice) {
                    return preChangeSelect.call(mySelf, newChoice);
                }
            }

        },
    });
}