# bootstrap-multiselect-pentaho-filter
Add-in for Bootstrap Multiselect plugin (https://github.com/davidstutz/bootstrap-multiselect) to use in Pentaho CDF dashboards.


### Usage ###

Add the follow function in preExecution propertie of multiselect component in a Pentaho CDF/CDA/CDE dashboard.

```JavaScript
function preExecution(){
    var obj = this;
    
    obj.postExecution = function f(){
        postExecutionSelect.call(
            this
	        , '[Dimension Name].[All Member Name]'
	        , 'Find dimension'
	        , 'Select a member'
	        ,'All members'
	        ,' - members selected'
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

For preChange default seleted members is possible to use:

* "all"
* "all"
* "last"
* "last-n"


```JavaScript
    //example for default select the last 4 options in multiselect element.
    obj.postFetch = function postFetch(result){
        postFetchSelect.call(this, result, 'last-4');   
    }; 
```
