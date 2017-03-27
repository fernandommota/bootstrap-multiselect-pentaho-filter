# bootstrap-multiselect-pentaho-filter
Add-in for Bootstrap Multiselect plugin to use in Pentaho CDF dashboards.


### Usage ###

Add the follow function in preExecution propertie of multiselect component in a Pentaho CDF/CDA/CDE dashboard.

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
