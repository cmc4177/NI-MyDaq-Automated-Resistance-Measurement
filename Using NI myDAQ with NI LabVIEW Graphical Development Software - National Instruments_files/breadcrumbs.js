/** * @author paviles * @Date: 10/10/12 * @Time: 2:39 PM */
$(document).ready(function(){    // Write the Breadcumbs to the page    var breadcrumbJson = $('#breadcrumbsJSON').val(),        bcObj = jQuery.parseJSON(breadcrumbJson),        crumbsList = '';
        
    if (bcObj !== null)
    {      bcLength = bcObj.breadcrumbs.length;  
      // Collect the Breadcrumbs and construct markup      $(bcObj.breadcrumbs).each(function(i) {          var $this = jQuery(this),              label = $this[0].label,              link = $this[0].link;  
          if((i+1) == bcLength){              crumbsList += label          }else{              crumbsList += '<a href="'+link+'">'+label+'</a> > '          }      });    }
      // Write out the breadcrumbs to container    $('.global-header-breadcrumb').html(crumbsList);
});