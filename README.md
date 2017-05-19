# Bootstrap Multiselect Pentaho Filter

### Overview ###

This plugin apply the [All Member propertie of Mondrian Schema](http://mondrian.pentaho.com/documentation/schema.php#The_all_member)  with [Bootstrap Multiselect plugin](http://davidstutz.github.io/bootstrap-multiselect/) creating a better user experience.

[Download the follow example ](https://raw.githubusercontent.com/bovbi/bootstrap-multiselect-pentaho-filter/master/resources/Pentaho_filter_example.zip)

<img src="https://raw.githubusercontent.com/bovbi/bootstrap-multiselect-pentaho-filter/master/resources/example_bootstrap-multiselect-pentaho-filter.gif" alt="Example of bootstrap-multiselect-pentaho-filter" title="Plugin Pentaho Filter" align="center" />

If the user select the all options available, the request value parameter will be send with the All Member propertie configured in setup script.

### Talks and Presentations ###
Watch the talk in #PentahoDay2017 of Brazil (slides and audio in portuguese).

[![Plugin Bootstrap Multiselect Pentaho Filter #PentahoDay2017](https://img.youtube.com/vi/cAJBJf_gbFM/0.jpg)](http://www.youtube.com/watch?v=cAJBJf_gbFM)

### Setup ###

* Clone the repository of Bootstrap Multiselect plugin (https://github.com/davidstutz/bootstrap-multiselect) to use in Pentaho CDF dashboards.
* Clone the repository of Bootstrap Multiselect Pentaho Filter plugin (ps://github.com/bovbi/bootstrap-multiselect-pentaho-filter) to use in Pentaho cTools dashboards.
- Import the follow files to your dashboard:

```JavaScript
<!-- Include the plugin CSS and JS: -->
<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
<script type="text/javascript" src="js/bootstrap-multiselect-pentaho-filter.js"></script>
<link rel="stylesheet" href="css/bootstrap-multiselect.css" type="text/css"/>
```

* Add the follow function in preExecution propertie of multiselect component in a Pentaho CDF/CDA/CDE dashboard:

```JavaScript
function preExecution(){
    var obj = this;
    
    obj.postExecution = function f(){
        postExecutionSelect.call(
            	this
		// custom labels
	        , '[Dimension Name].[All Member Name]'
	        , 'Find dimension'
	        , 'Select a member'
	        , 'All members'
	        , ' - members selected'
		// end custom labels
	    )
    }

    obj.preChange = function (newChoice){
        return preChangeSelect.call(this,  '[Dimension Name].[All Member Name]', newChoice);
    }; 
    
    obj.postFetch = function postFetch(result){
    	// configure the option for set the default value of parameter
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
