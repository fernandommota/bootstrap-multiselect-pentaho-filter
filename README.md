# Bootstrap Multiselect Pentaho Filter


### Overview ###

This plugin apply the All Member propertie of Mondrian Schema with a better user experience.

<img src="https://raw.githubusercontent.com/bovbi/bootstrap-multiselect-pentaho-filter/master/resources/plugin_example.png" alt="Example of bootstrap-multiselect-pentaho-filter" title="Plugin Pentaho Filter" align="center" height="200"/>

If a user select the all options available, the request value parameter will be send with the All Member propertie configured in this plugin.

<img src="https://raw.githubusercontent.com/bovbi/bootstrap-multiselect-pentaho-filter/master/resources/post_request_example.png" alt="Example of bootstrap-multiselect-pentaho-filter" title="Plugin Pentaho Filter" align="center" height="100"/>

### Setup ###

* Install add-in for Bootstrap Multiselect plugin (https://github.com/davidstutz/bootstrap-multiselect) to use in Pentaho CDF dashboards.
- Import the follow files:

```JavaScript
<!-- Include the plugin CSS and JS: -->
<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" href="css/bootstrap-multiselect.css" type="text/css"/>
```

* Add the follow function in preExecution propertie of multiselect component in a Pentaho CDF/CDA/CDE dashboard:

```JavaScript
function preExecution(){
    var obj = this;
    
    obj.postExecution = function f(){
        postExecutionSelect.call(
            this
	        , '[Dimension Name].[All Member Name]'
	        , 'Find dimension'
	        , 'Select a member'
	        , 'All members'
	        , ' - members selected'
	    )
    }

    obj.preChange = function (newChoice){
        return preChangeSelect.call(this,  '[Dimension Name].[All Member Name]', newChoice);
    }; 
    
    obj.postFetch = function postFetch(result){
        postFetchSelect.call(this, result, 'all');   
    }; 
} 
```

### Options ###

If the parameter of filter is empty is possible in preChange function to configure who options by default wil be selected, the options are:

* "all" - All options of multiselect will be selected.
* "first" - The first option of multiselect will be selected.
* "first-n" - The first n options of multiselect will be selected.
* "last" - The last option of multiselect will be selected.
* "last-n" - The last n options of multiselect will be selected.


```JavaScript
    //example for default select the last 4 options in multiselect element.
    obj.postFetch = function postFetch(result){
        postFetchSelect.call(this, result, 'last-4');   
    }; 
```
