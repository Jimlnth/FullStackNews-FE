(function() {
	'use strict';

	angular
		.module('app.news')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
		$stateProvider
    		.state('news', {
    			url: '/news',
			    templateUrl: 'app/news/news.html',
			    controller: 'NewsController',
			    controllerAs: 'news'
			});

		$urlRouterProvider.otherwise('news');
	}
})();