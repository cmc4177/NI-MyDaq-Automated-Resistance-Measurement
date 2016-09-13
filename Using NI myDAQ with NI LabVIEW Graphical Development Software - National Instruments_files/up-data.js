/*
 * UP Data
 * @author Keegan Watkins
 * Populates information regarding User Profile.
 *
 * @edited by Helmut Granda
 * - addition: logistics to determine the right environment
 *
 *  * @edited by Cristen Hewett
 * - edit: text changes to comply with SID 
 */

(function(global, $, undef) {
  
  // ECMA compliance
  "use strict";
  
  var upCallback = function(data){}
 
  var HOST_ENVIROMENT = function(hostname) {
    if(hostname.indexOf("-dev") > -1 )
      return "-dev";
    else if(hostname.indexOf("-test") > -1)
      return "-test";
    else if(hostname.indexOf("-preview") > -1)
      return  "";
    else
      return "";
  },
  // Defaults for $.ajax()
  AJAX_OPTIONS = {
    url: "//www" + HOST_ENVIROMENT ( location.hostname ) + ".ni.com/wrapper-up/upData",
      cache: true,
      jsonp: 'callback',
      jsonpCallback : 'upCallback',
      dataType: "jsonp"
    },

    // Templates
		I18N = {
			welcomeTemplates: {
				"en-US": "Hello {firstName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-MX": "Hello {firstName} {lastName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-JP": "Hello {lastName} {firstName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-CN": "Hello {lastName} {firstName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-HK": "Hello {lastName} {firstName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-KR": "Hello {lastName} {firstName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-FR": "Hello {firstName} {lastName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-CA": "Hello {firstName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-DE": "Hello {firstName} {lastName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-IT": "Hello {firstName} {lastName} <a href='{notMePage}'>[ Log out ]</a>",
				"en-BR": "Hello {firstName} {lastName} <a href='{notMePage}'>[ Log out ]</a>",
				"es-MX": "Hola {firstName} {lastName} <a href='{notMePage}'>[ Salir ]</a>",
				"es-ES": "Hola {firstName} {lastName} <a href='{notMePage}'>[ Salir ]</a>",
				"fr-FR": "Bonjour {firstName} {lastName} <a href='{notMePage}'>[ Déconnexion ]</a>",
				"fr-CA": "Bonjour {firstName} {lastName} <a href='{notMePage}'>[ Déconnexion ]</a>",
				"it-IT": "Benvenuto {firstName} {lastName} <a href='{notMePage}'>[ Log out ]</a>",
				"de-DE": "Willkommen, {firstName} {lastName} <a href='{notMePage}'>[ Abmelden ]</a>",
				"ko-KR": "안녕하세요, {lastName}{firstName} 님! <a href='{notMePage}'>[ 로그아웃 ]</a>",
				"ja-JP": "こんにちは、  {lastName} {firstName} 様 <a href='{notMePage}'> [ ログアウト ]</a>",
				"zh-HK": "{lastName} {firstName}，您好。<a href='{notMePage}'>[ 登出 ]</a>",
				"zh-TW": "{lastName} {firstName}，您好。<a href='{notMePage}'>[ 登出 ]</a>",
				"zh-CN": "您好，{lastName} {firstName}。<a href='{notMePage}'>[ 登出 ]</a>",
				"pt-BR": "Olá {firstName} <a href='{notMePage}'>[ Sair ]</a>",
				"pt-PT": "Olá {firstName} <a href='{notMePage}'>[ Sair ]</a>"
			},
			defaultTemplates: {
				"en-US": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-MX": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-JP": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-CN": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-HK": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-KR": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-FR": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-CA": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-DE": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-IT": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"en-BR": "<a href='{logInPage}'>Log in</a> or <a href='{createPage}'>create a new user account.</a>",
				"es-MX": "<a href='{logInPage}'>Inicie una sesión</a> o <a href='{createPage}'>cree una nueva cuenta.</a>",
				"es-ES": "<a href='{logInPage}'>Inicie una sesión</a> o <a href='{createPage}'>cree una nueva cuenta.</a>",
				"fr-FR": "<a href='{logInPage}'>Connectez-vous</a> ou <a href='{createPage}'>créez un compte d'utilisateur.</a>",
				"fr-CA": "<a href='{logInPage}'>Connectez-vous</a> ou <a href='{createPage}'>créez un compte d'utilisateur.</a>",
				"it-IT": "<a href='{logInPage}'>Effettua il log in</a> oppure <a href='{createPage}'>crea un nuovo account.</a>",
				"de-DE": "<a href='{logInPage}'>Melden Sie sich an </a> oder <a href='{createPage}'>erstellen Sie ein Benutzerprofil.</a>",
				"ko-KR": "<a href='{logInPage}'>로그인</a> 하거나  <a href='{createPage}'>새로운 사용자 계정을 생성하십시오.",
				"ja-JP": "<a href='{logInPage}'>ログイン</tag>もしくは、ユーザプロファイルを <a href='{createPage}'>新規作成</a>",
				"zh-HK": "<a href='{logInPage}'>登录 </a> 或 <a href='{createPage}'>创建新用户账号。</a>",
				"zh-TW": "<a href='{logInPage}'>登入</a> 或 <a href='{createPage}'>建立新的使用者帳號。</a>",
				"zh-CN": "<a href='{logInPage}'>登录 </a> 或 <a href='{createPage}'>创建新用户账号。</a>",
				"pt-BR": "<a href='{logInPage}'>Faça login<a/> ou <a href='{createPage}'>crie um perfil de usuário.</a>",
				"pt-PT": "<a href='{logInPage}'>Faça login<a/> ou <a href='{createPage}'>crie um perfil de usuário.</a>"
			},
			defaults: {
				"en": "en-US",
				"es": "es-MX",
				"fr": "fr-FR",
				"de": "de-DE",
				"it": "it-IT",
				"ko": "ko-KR",
				"ja": "ja-JP",
				"cs": "en-US",
				"da": "en-US",
				"fi": "en-US",
				"cr": "en-US",
				"hu": "en-US",
				"nl": "en-US",
				"no": "en-US",
				"pl": "en-US",
				"ro": "en-US",
				"ru": "en-US",
				"sl": "en-US",
				"sr": "en-US",
				"sv": "en-US"
			}
		},

		// The host page's URL
		HREF = global.location.href,

		// Shortcut to global
		ENCODE = global.encodeURIComponent,

		// The environment suffix, i.e: "-dev", "-test", or "" (production)
		TIER = NI.env.tier,

		// Template engine
		MAKE_TEMPLATE = function(str, hash) {
			return str.replace( /{([^\}]+)}/g, function(raw, match) {
				return hash[ match ] || match;
			});
		},

		// The 'this is not me' URL
		NOT_ME_PAGE = "//tesla" + TIER + ".ni.com/niwcf/logout?notMe=true",

		// Generates the 'login' URL
		LOG_IN_PAGE = function(locale) {
			return "https://lumen" + TIER + ".ni.com/nicif/" + ISO_TO_ORACLE( locale ) + "/header_login/content.xhtml?action=login&du=" + ENCODE( HREF );
		},

		// Generates the 'create user profile' URL
		CREATE_PAGE = function(locale) {
			return "https://lumen" + TIER + ".ni.com/nicif/" + ISO_TO_ORACLE( locale ) + "/header_create/content.xhtml?action=create&du=" + ENCODE( HREF );
		},
		
		ISO_TO_ORACLE = function(locale) {
			// Common cases
			var map = {
				en: "us",
				fr: "f",
				de: "d",
				it: "i",
				es: "esa",
				ja: "ja",
				ko: "ko"
			};
			
			// Handle China
			if ( locale === "zh-CN" ) {
				return  "zhs";
			}
			
			// Handle Taiwan/Hong Kong
			if ( locale === "zh-HK" || locale === "zh-TW" ) {
				return "zht";
			}
			
			// Strip down to language
			locale = locale.replace(/\-.*/, "");
			
			return map[ locale ] || "us";
		},

		// Attempts to convert a locale to a template
		NORMALIZE_LOCALE = function(lang) {
			// If `lang` is already in the template map,
			// just use it
			if ( lang in I18N.welcomeTemplates ) {
				return lang;
			}
			
			// Otherwise, strip the country (may or may not be present), and
			// return the default
			return I18N.defaults[ lang.replace(/\-.*/, "") ];
		};
					
	// Create plugin
	$.fn.niUP = function( locale ) {		
		return this.each(function() {
			var el = $( this ),
				request;
			
			// Set up the XHR
			request = $.ajax( AJAX_OPTIONS );

			// Success handler
			request.done(function(data) {
				var loggedIn = data.loggedIn,
					html,
					templates = I18N[ loggedIn ? "welcomeTemplates" : "defaultTemplates" ],
					template = templates[ NORMALIZE_LOCALE( locale ) ];
				
				if ( !template ) {
					return;
				}
								
				html = loggedIn ?
				
					MAKE_TEMPLATE( template, {
						firstName: data.firstName || data.email,
						lastName: data.lastName || ' ',
						notMePage: NOT_ME_PAGE
					}) :
				
					MAKE_TEMPLATE( template, {
						logInPage: LOG_IN_PAGE( locale ),
						createPage: CREATE_PAGE( locale )
					});
				
		        el.html( html );
            });
        });
    };
  
})( this, $ );
