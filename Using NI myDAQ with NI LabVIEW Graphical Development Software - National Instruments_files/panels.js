  var globalName, locale, deliveredby, rootpath;
  //**Determine Page Type//**
  //check to see if deliveredby meta exists and assign it a variable

  function deliveryMethod() {
      if ($('meta[name=DeliveredBy]').data()) {
          deliveredby = $('meta[name=DeliveredBy]').attr("content")
      } else {
          deliveredby = $('meta[name=deliveredby]').attr("content");
      }
      //now check to see if the variable matches one of our SAAS solutions & load full paths if so
      if (deliveredby === "RMS") {
          rootpath = "//www.ni.com/"
        globalSearch()
          notifications()
      }
       else if (deliveredby === "community" || deliveredby === "supportforum") {
          rootpath = "//www.ni.com/"
      
          notifications()
      } else {
          rootpath = "/"
          //console.log("rootpath = " + rootpath)
        globalSearch()
          notifications()
   
      }
  }
  //**RUNS FIRST**//
  $(function() {
      //console.log("mainPanelNav running")
      $(document).on("mainNavPanel", mainNavPanel);

      function mainNavPanel() {
          //first hide all panels on page load
          $(".gg-panel").hide();
          $("#panels > div").hide();
          // initiate the current position of the panels - we start with 0
          var currentPanel = 0;
          var n = $('.current').index(); //saves index of site section
          //*****NAVIGATION PANELS*****
          //first hide all panels on page load
          //actions that apply on click of any of the buttons
          $(document).on("click", '#panelcontrols li.navButtons', function(event) {
              //stops click events on all objects from propagating back up the tree to the document root.
              event.stopImmediatePropagation();
              //turn off the link so it doesn't try to jump down the page
              event.preventDefault();
              //un-highlight the buttons
              $("li.navButtons").removeClass("selected caret");
              //hide all the panels
              $("#panels > div").hide();
              //highlight the current button
              $(this).addClass('selected caret');
              $("li.navButtons").removeClass("current");
              //get the index of the current button...
              var index = $('#panelcontrols li.navButtons').index(this);
              if (currentPanel == $(this).index()) {
                  $("li.navButtons").removeClass("selected caret");
                  $("#panels > div").hide();
                  currentPanel = 0;
                  $("li.navButtons:eq(" + (n - 1) + ")").addClass("selected"); // turns currentSection highlight back on
              } else {
                  //and use that index to show the corresponding panels
                  $('#panels > div:eq(' + index + ')').show();
                  currentPanel = $(this).index();
              }
          });
          $(document).on("click", function(event) {
              $("#panels > div").hide();
              $("li.navButtons").removeClass("selected caret");
              currentPanel = 0;
              $("li.navButtons:eq(" + (n - 1) + ")").addClass("selected"); // turns currentSection highlight back on
          });
          $('.global-header-nav-primary-panel').on("click", function(e) {
              e.stopPropagation();
          });
      }
      mainNavPanel();
      deliveryMethod()
         
  });
  //*****CRISTEN'S GLOBAL GATEWAY PANEL ***********
  $(function() {
      $(document).on("globalGatewayPanel", globalGatewayPanel);

      function globalGatewayPanel() {
          var utilsGG, ggPanel, timer, country,
              utilsGG = $(".utils-gg");
          ggPanel = $(".gg-panel");
          country = $(".country");
          timer = 0;
          //show panel when hovering over GG link -- sets timeout for gap between link and panel
          $('.utils-gg').hover(function() {
              clearTimeout(timer);
              ggPanel.show();
              utilsGG.css('color', 'white');
          }, function() {
              timer = setTimeout(function() {
                  ggPanel.hide();
              }, 200);
          });
          //show panel when mouse enters element
          ggPanel.mouseenter(function() {
              clearTimeout(timer);
              ggPanel.show();
              utilsGG.css('color', 'white');
          });
          //hide panel when leaving
          $('.gg-panel').mouseleave(function() {
              clearTimeout(timer);
              $(ggPanel).hide();
              $(country).css('color', 'rgba(255, 255, 255, 0.65)');
          });
          // GLOBAL GATEWAY PANEL LOGIC
          NI.require({
              js: rootpath + "javascript/pnx/utils.js",
              priority: "high"
          }, function() {
              // Get the locale
              locale = PNX.utils.Cookie.get("locale"),
              uri = rootpath + "wrapper-gg/ggData?locale=" + locale,
              gg = $(".global-gateway");
              // Add return path to the end of the GG link
              gg
                  .attr("href", function(i, val) {
                  return val + "?rtrn=" + encodeURIComponent(window.location.href);
              });
              dualByteAdjustment(locale)
              // Abort if a locale is not set
              if (!locale) {
                  return;
              }
              // Initiate request
              $.ajax({
                  url: uri,
                  dataType: "jsonp"
              }).then(function(data) {
                  // Update the country label
                  gg
                      .find(".country")
                      .text(data.countryName);
              });
          });
          $(".gg-panel ul li a").click(function(e) {
              // If we have the attribute data-locale then we proceed to change the locale cookie
              // This will prevent us from triggering a false positive for other anchor tags such as "more"
              if ($(this).attr("data-locale")) {
                  e.preventDefault();
                  // Get the locale information from the anchor tag
                  var locale = $(this).data("locale");
                  // Update the locale cookie with the new information
                  var localeCookieDate = new Date;
                  localeCookieDate.setFullYear(localeCookieDate.getFullYear() + 2);
                  PNX.utils.Cookie.set("locale", locale, {
                      "domain": ".ni.com",
                      "path": "/",
                      "expires": localeCookieDate.toGMTString()
                  });
                  // checks to see if this is a regional page...if so, redirects to ni.com
                  if ($('meta[name=Country]').data()) {
                      globalName = $('meta[name=Country]').attr("content")
                      if (!globalName || globalName == "US") {
                          //Reload the page
                          location.reload();
                      }
                      //
                      else {
                          location.href = "http://www.ni.com"
                      }
                  } else {
                      location.reload();
                  }
              }
          });
      }
      globalGatewayPanel();
  });
  //*****HELMUT'S SCRIPT TO EVEN SPACING FOR MAIN NAVIGATION****

  function adjustMenuSpacing() {
      var new_width = 0;
      var space = 0;
      var viewWidth = 980;
      var logoWidth = 145;
      var totalwidth = viewWidth - (logoWidth + 155); //logo + search box
      $("#panelcontrols li.navButtons").each(function() {
          var span = $(this).children('a').children('span');
          new_width += $(span).width();
      });
      space = (totalwidth - new_width) / 12;
      $("#panelcontrols li.navButtons").each(function() {
          var currentWidth = $(this).children('a').children('span').width();
          var newWidth = currentWidth + (space * 2)
          $(this).width(newWidth);
          $(this).css('cssText', 'width: ' + (newWidth) + 'px !important;');
      });
      $("#panelcontrols .logo").css('cssText', 'width: ' + logoWidth + 'px !important;');
      $("#panelcontrols .ni_logo").css('cssText', 'width: ' + logoWidth + 'px !important;');
  }
  //**RUNS THIRD**//
  //*****CRISTEN'S LANG DETECTION FOR PRIMARY NAV ***********

  function dualByteAdjustment(pageLang) {
      $('ul#panelcontrols li.navButtons').attr('lang', pageLang);
      adjustMenuSpacing();
  };
  //function to add user profile (UP) login to utility nav

  //function runUpData() {
  //    NI.require({
  //        js: rootpath + "widgets/pnx/1.0/js/up-data.js",
  //        priority: "high"
  //    }, function() {
  //        $('.global-header-nav-up-wrap').niUP('${.locale?replace("_", "-")}');
  //        console.log(rootpath + "widgets/pnx/1.0/js/up-data.js")
  //    });
  //};

  function notifications() {
      //console.log("notifications is running!!")
      NI.require({
          js: [rootpath + "javascript/pnx/utils.js"]
      }, function() {
          $(".global-header-nav-notifications a")
              .click(function(e) {
              // Open call-me page in popup window
              PNX.utils.Popup($(this).attr("href"), "Notifications", {
                  width: 590,
                  height: 560,
                  scrollbars: "yes",
                  resizable: 1
              }).focus();
              return false;
          });
      });
  }

    
$( document ).ready(function() {
    NI.pnx.autocomplete.initialize();
        $( ".icon-search" ).click(function() {
        $(this).closest('form').submit();
        });
    })                       

function globalSearch() {
       NI.require({
         //DEV ONLY PATH!!
         //css: "//www-dev.ni.com/widgets/pnx/1.0/css/jqueryui.autocomplete.css"

          css: rootpath + "widgets/pnx/1.0/css/jqueryui.autocomplete.css"
           });
       }
        
        
   
  
        
        
        