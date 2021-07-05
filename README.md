# Bootstrap Multiselect Pentaho Filter

### Overview

This plugin apply the [All Member propertie of Mondrian Schema](http://mondrian.pentaho.com/documentation/schema.php#The_all_member) with [Bootstrap Multiselect plugin](http://davidstutz.github.io/bootstrap-multiselect/) creating a better user experience.

<img src="./resources/example_bootstrap-multiselect-pentaho-filter.gif" alt="Example of bootstrap-multiselect-pentaho-filter" title="Plugin Pentaho Filter" align="center" />

If the user select the all options available, the request value parameter will be send with the All Member propertie configured in setup script.

### Setup

- Download the repository as a zip or clone the repository from GitHub, and rename the folder:

  - From

  bootstrap-multiselect-pentaho-filter-master

  - to

  bootstrap-multiselect-pentaho-filter

The final path should be as follow:

```JavaScript
pentaho-solutions/system/bootstrap-multiselect-pentaho-filter/
```
Restart the server.

### Options

#### allMemberName	

- Set the allMemberName property value of your Mondrian Schema.

#### allSelectedText
- Set the label for all options is selected.

#### filterPlaceholderText	
- Set the label for search.

#### nonSelectedText	
- Set the label for none option is selected.

#### nSelectedText
- Set the label for multiple options is selected.

#### useDefaultValue	

- "all" - All options of multiselect will be selected.
- "first" - The first option of multiselect will be selected.
- "last" - The last option of multiselect will be selected.
- "firstOrLastDefaultValues" - The "firstOrLastDefaultValues" property is enabled.

### firstOrLastDefaultValues
- Set the number os options that will be selected, positive values for first options and negative value for last options.
