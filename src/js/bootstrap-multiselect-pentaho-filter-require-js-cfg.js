/*!
 * Copyright 2002 - 2017 Webdetails, a Pentaho company. All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

/** Bootstrap Multiselect Pentaho Filter
 * bovbi.com.br
 * @fernandommota Fernando Maia da Mota
 * RequireJS configuration file for bootstrap-multiselect-pentaho-filter, original file from CTE plugin by Webdetails
 */

(function() {
    if (!requireCfg.map) requireCfg.map = {};
    if (!requireCfg.map['*']) requireCfg.map['*'] = {};
    if (!requireCfg.map['bootstrap-multiselect-pentaho-filter']) requireCfg.map['bootstrap-multiselect-pentaho-filter'] = {};

    requireCfg.config = requireCfg.config || {};

    var requirePaths = requireCfg.paths,
        requireShims = requireCfg.shim,
        requireConfig = requireCfg.config;

    if (!requireConfig['amd']) {
        requireConfig['amd'] = {};
    }
    if (!requireConfig['amd']['shim']) {
        requireConfig['amd']['shim'] = {};
    }
    var amdShim = requireConfig['amd']['shim'];

    var prefix = '';
    if (typeof CONTEXT_PATH !== 'undefined') { // production

        prefix = requirePaths['bootstrap-multiselect-pentaho-filter'] = CONTEXT_PATH + 'api/repos/bootstrap-multiselect-pentaho-filter/src';
    } else if (typeof FULL_QUALIFIED_URL !== 'undefined') { // embedded

        prefix = requirePaths['bootstrap-multiselect-pentaho-filter'] = FULL_QUALIFIED_URL + 'api/repos/bootstrap-multiselect-pentaho-filter/src';
    } else { // build
        prefix = requirePaths['bootstrap-multiselect-pentaho-filter'] = 'bootstrap-multiselect-pentaho-filter';
    }

    // RequireJS amd! loader plugin. Wraps non-AMD scripts as AMD modules on the fly,
    // to be used when a shim isn't enough (see plugin prescript and postscript).
    requirePaths['amd'] = prefix + '/libs/require-amd/nonamd';

    // map bootstrap-multiselect.css
    requirePaths['bootstrap-multiselect-pentaho-filter/css'] = prefix + '/css/bootstrap-multiselect';
    requireCfg.map['bootstrap-multiselect-pentaho-filter']['css'] = 'bootstrap-multiselect-pentaho-filter/css';

    amdShim['cdf/lib/jquery'] = {
        exports: '$',
    };

    requireShims['cdf/Dashboard.Bootstrap'] = {
        deps: [
            'cdf/lib/jquery',
            'css!bootstrap-multiselect-pentaho-filter/css'
        ]
    };

    // map bootstrap-multiselect.js
    requirePaths['bootstrap-multiselect-pentaho-filter/bootstrap-multiselect'] = prefix + '/js/bootstrap-multiselect';
    amdShim['bootstrap-multiselect-pentaho-filter/bootstrap-multiselect'] = {
        exports: '$',
        deps: {
            'cdf/lib/jquery': '$',
            'cdf/Dashboard.Bootstrap': ''
        }
    };

    // map bootstrap-multiselect-pentaho-filter.js as a resource to CDE
    requirePaths['cde/resources/bootstrap-multiselect-pentaho-filter'] = prefix + '/js/bootstrap-multiselect-pentaho-filter';
    requireShims['bootstrap-multiselect-pentaho-filter/plugin'] = {
        deps: [
            'bootstrap-multiselect-pentaho-filter/bootstrap-multiselect'
        ]
    };
})();