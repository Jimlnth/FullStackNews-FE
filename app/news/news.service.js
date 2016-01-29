(function() {
	'use strict';

	angular
		.module('app.news')
		.service('NewsService', NewsService);

	NewsService.$inject = ['$resource'];

	function NewsService($resource) {
		var resource = $resource('http://localhost:3000/news');

		var commentResource = $resource('http://localhost:3000/new/:id/comment', {id: '@id'}, {
				'update': {method:'PUT'}
			});

		var newRessource = $resource('http://localhost:3000/new/')
		
		var putResource = $resource('http://localhost:3000/new/:id/vote', {id: '@id'}, {
				'update': {method:'PUT'}
			});


		this.getNews = function() {
			return resource.query().$promise;
		};

		this.addComment = function(id, comment) {
			return commentResource.update({id: id}, {content: comment}).$promise;
		};

		this.createNew = function(title, link) {
			return newRessource.save({title: title, link: link, votes: 0, comment: []}).$promise;
		};

		this.updateVotes = function(id) {
			return putResource.update({id: id}).$promise;
		};
	}
})();