# bootstrap-multiselect-pentaho-filter
Add-in for Bootstrap Multiselect plugin to use in Pentaho CDF dashboards.


### Usage ###

Add the follow function in preExecution propertie of multiselect component in a Pentaho CDF/CDA/CDE dashboard.

/*SELECT Tipo Parceria*/
function preExecution(){
    var obj = this;
    
    obj.postExecution = function f(){
        postExecutionSelect.call(
            this
	        , '[Tipo Parceria Filtro].[Todos os tipos]'
	        , 'Buscar categoria'
	        , 'Selecione uma categoria'
	        ,'Todas as categorias'
	        ,' - categorias selecionados'
	    )
    }

    obj.preChange = function (newChoice){
        return preChangeSelect.call(this,  '[Tipo Parceria Filtro].[Todos os tipos]', newChoice);
    }; 
    
    obj.postFetch = function postFetch(result){
        postFetchSelect.call(this, result, 'all');   
    }; 
} 
