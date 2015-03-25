﻿(function(a){a.ig.KnockoutDataSource=a.ig.KnockoutDataSource||a.ig.DataSource.extend({init:function(b){if(b.observableDataSource===null||b.observableDataSource===undefined){this.kods=b.dataSource;b.dataSource=ko.mapping.toJS(b.dataSource)}else{this.kods=b.observableDataSource;b.dataSource=ko.mapping.toJS(b.observableDataSource)}this._super(b);return this},setCellValue:function(d,c,e,b){this._super(d,c,e,b)},_setCellValue:function(g,c,h){var b,f=this.settings.primaryKey,d=this.kods;d=ko.isObservable(d)?d():d;if(this.settings.responseDataKey){if(ko.isObservable(d[this.settings.responseDataKey])){d=d[this.settings.responseDataKey]()}else{if(d[this.settings.responseDataKey]){d=d[this.settings.responseDataKey]}}}if(f){for(var e=0;e<d.length;e++){b=ko.isObservable(d[e][f])?d[e][f]():d[e][f];if(b===g){if(ko.isObservable(d[e][c])){d[e][c](h)}else{d[e][c]=h}break}}}else{d[g][c](h)}},deleteRow:function(c,b){this._super(c,b)},_deleteRow:function(c){var b=this.settings.primaryKey;if(ko.isObservable(this.kods)){if(!this._koUpdate){this.kods.remove(function(d){return(ko.isObservable(d[b])?d[b]():d[b])===c})}else{this._koUpdate=false}}else{this._super(c)}},addRow:function(c,d,b){this._super(c,d,b)},_addRow:function(c,b){if(ko.isObservable(this.kods)){if(!this._koUpdate){this.kods.push(c)}else{this._koUpdate=false;this._super(c,b)}}else{this._super(b,c)}},updateRow:function(c,d,b){this._super(c,d,b)},_updateRow:function(g,h){var b,e=this.settings.primaryKey,c=this.kods,f;c=ko.isObservable(c)?c():c;if(this.settings.responseDataKey&&c[this.settings.responseDataKey]){c=c[this.settings.responseDataKey]}if(e){for(var d=0;d<c.length;d++){b=ko.isObservable(c[d][e])?c[d][e]():c[d][e];if(b===g){for(f in h){if(ko.isObservable(c[d][f])){c[d][f](h[f])}else{c[d][f]=h[f]}}break}}}else{for(f in h){if(ko.isObservable(c[g][f])){c[g][f](h[f])}else{c[g][f]=h[f]}}}},_commitTransaction:function(e){var b,c,d;if(this.settings.primaryKey===null){d=this._data[parseInt(e.rowId,10)]}else{d=this.findRecordByKey(e.rowId)}if(e.type==="cell"){d[e.col]=e.value;this._setCellValue(e.rowId,e.col,e.value)}else{if(e.type==="row"){if(a.type(e.row)==="array"){for(b=0;b<e.row.length;b++){d[b]=e.row[b]}}else{for(c in e.row){if(e.row.hasOwnProperty(c)){d[c]=e.row[c]}}this._updateRow(e.rowId,e.row)}}else{if(e.type==="deleterow"){if(this.settings.primaryKey===null){this.removeRecordByIndex(parseInt(e.rowId,10))}else{this.removeRecordByKey(e.rowId)}this._deleteRow(e.rowId)}else{if(e.type==="newrow"){this._addRow(e.row,e.rowId)}else{if(e.type==="insertrow"){this._addRow(e.row,e.rowIndex)}}}}}this._removeTransactionByTransactionId(e.tid)},dataAt:function(q,n){var g=this.kods,r=q.split("/"),o=n.split("/"),m,h,s,l,b=null,c=this.settings.primaryKey,e="",d=[],f=[],p=false;g=ko.isObservable(g)?g():g;for(h=0;h<r.length;h++){c=r[h].split(":")[0];e=r[h].split(":")[1];if(r[h]!==""){for(l=0;g&&l<g.length;l++){if(c&&c.indexOf(",")!==-1){d=c.split(",");f=e.split(",");for(m=0;m<d.length;m++){s=g[l][d[m]];s=ko.isObservable(s)?s():s;if(!s.charAt&&f[m].charAt){f[m]=parseInt(f[m],10)}p=(s===f[m]);if(!p){break}}}else{s=g[l][c];s=ko.isObservable(s)?s():s;if(s!==undefined&&!s.charAt&&e.charAt){e=parseInt(e,10)}p=(s===e)}if(p){b=g[l][o[h]];if(r.length>1&&h<r.length-1&&this.settings.responseDataKey&&a.type(b)!=="array"&&b[this.settings.responseDataKey]){b=b[this.settings.responseDataKey]}break}}g=b}}return b}})}(jQuery));