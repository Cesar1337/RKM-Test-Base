var RepositoryDetailController = /** @class */ (function () {
    function RepositoryDetailController($stateParams, githubService, tableModificationService) {
        this.$stateParams = $stateParams;
        this.githubService = githubService;
        this.tableModificationService = tableModificationService;
    }
    RepositoryDetailController.prototype.$onInit = function () {
        var _this = this;
        this.githubService.getRepositoryById(this.$stateParams.id).then(function (response) {
            _this.repository = response.data;
            _this.githubService.getRepositoryContributors(_this.repository.owner.login, _this.repository.name)
                .then(function (responseContributors) {
                _this.contributors = responseContributors.data;
                _this.contributorsCopy = _this.contributors;
                _this.contributors.map(function (contributor) {
                    _this.githubService.getUserByUsername(contributor.login).then(function (responseUsername) {
                        var user = responseUsername.data;
                        contributor.email = user.email;
                    });
                });
            });
        });
    };
    RepositoryDetailController.prototype.sort = function (sortBy) {
        var _a = this.tableModificationService
            .sortData(this.contributors, sortBy), sortedData = _a.sortedData, sortAscent = _a.sortAscent, sortedProperty = _a.sortedProperty;
        this.contributors = sortedData;
        this.currentSortedProperty = sortedProperty;
        this.sortAscent = sortAscent;
    };
    RepositoryDetailController.prototype.filter = function (filterString, attribute) {
        if (filterString.length < 1) {
            this.contributors = this.contributorsCopy;
        }
        this.contributors = this.tableModificationService.filterData(this.contributors, filterString, attribute);
    };
    RepositoryDetailController.prototype.isCurrentSort = function (property) {
        return this.sortAscent && this.currentSortedProperty === property;
    };
    RepositoryDetailController.prototype.getSortIcon = function (property) {
        if (this.currentSortedProperty === property) {
            return this.sortAscent ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
        }
        else {
            return 'fa fa-sort';
        }
    };
    return RepositoryDetailController;
}());
// tslint:disable-next-line:max-classes-per-file
var RepositoryDetailComponent = /** @class */ (function () {
    function RepositoryDetailComponent() {
        this.controller = RepositoryDetailController;
        this.templateUrl = './src/components/repository-detail/repository-detail.component.html';
    }
    RepositoryDetailComponent.NAME = 'repositoryDetailView';
    return RepositoryDetailComponent;
}());
export { RepositoryDetailComponent };
//# sourceMappingURL=repository-detail.component.js.map