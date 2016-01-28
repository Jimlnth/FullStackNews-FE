(function() {
	'use strict';

	angular
		.module('app.news')
		.controller('NewsController', NewsController);

	NewsController.$inject = ['NewsService'];

	function NewsController(NewsService) {
		var vm = this;
		NewsService.getNews().then(function(news) {
		 	vm.news = news;
		});

		vm.vote = function(index) {
			NewsService.updateVotes(vm.news[index]._id).then(function() {
				vm.news[index].votes++;
			}).catch(function(err) {
				console.log(err);
			});
		}

		vm.comment = function(index) {
			if (! vm.textComment[index]) {
				return;
			}

			NewsService.addComment(vm.news[index]._id, vm.textComment[index]).then(function(comment) {
				vm.news[index].comments.push(comment);
				vm.textComment[index] = "";
			}).catch(function(err) {
				console.log(err);
			});
		}

		vm.create = function() {
			if (! vm.title || ! vm.link) {
				return;
			}
			NewsService.createNew(vm.title, vm.link).then(function() {
				console.log('ok');
			}).catch(function(err) {
				console.log(err);
			});
		}
	}
})();