/**
 * securityService.js
 */
MetronicApp.service('securityService', ['$rootScope', function ($rootScope) {
	this.setUserInfo = function getCookieVal(cookieName) {
		var search = cookieName + "="
		var returnvalue = "";
		if (document.cookie.length > 0) {
			offset = document.cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length
				end = document.cookie.indexOf(";",
						offset);
				if (end == -1)
					end = document.cookie.length;
				returnvalue = decodeURIComponent(document.cookie
						.substring(offset, end));
				// unescape(document.cookie.substring(offset,
				// end))
			}
		}
		$rootScope.userInfo = JSON.parse(returnvalue);
		return returnvalue;
	};
}]);