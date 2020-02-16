var RepositoryListController = /** @class */ (function() {
  function RepositoryListController(
    githubService,
    searchStateService,
    tableModificationService
  ) {
    this.githubService = githubService;
    this.searchStateService = searchStateService;
    this.tableModificationService = tableModificationService;
  }
  RepositoryListController.prototype.$onInit = function() {
    var lastSearch = this.searchStateService.getLastSearch();
    this.searchTerm = lastSearch.searchTerm;
    this.userRepositories = lastSearch.searchData;
    this.currentAvatarURL = lastSearch.avatarURL;
    this.filterString = lastSearch.filterString;
  };
  RepositoryListController.prototype.searchRepositories = function() {
    var _this = this;
    if (this.searchTerm !== "") {
      this.loading = true;
      this.githubService
        .getAllRepositoriesByUsername(this.searchTerm)
        .then(function(response) {
          _this.userRepositories = response.data;
          _this.userRepositoriesCopy = _this.userRepositories;
          _this.currentAvatarURL = _this.userRepositories[0].owner.avatar_url;
          _this.errorMessage = "";
          _this.loading = false;
        })
        .catch(function() {
          _this.currentAvatarURL = null;
          _this.userRepositories = null;
          _this.errorMessage =
            _this.searchTerm === "" ? "" : "No results found";
          _this.loading = false;
        });
    } else {
      this.errorMessage = "";
    }
  };
  RepositoryListController.prototype.saveLastSearch = function() {
    this.searchStateService.saveSearch(
      this.searchTerm,
      this.userRepositories,
      this.currentAvatarURL,
      this.filterString
    );
  };
  RepositoryListController.prototype.sort = function(sortBy) {
    var _a = this.tableModificationService.sortData(
        this.userRepositories,
        sortBy
      ),
      sortedData = _a.sortedData,
      sortAscent = _a.sortAscent,
      sortedProperty = _a.sortedProperty;
    this.userRepositories = sortedData;
    this.currentSortedProperty = sortedProperty;
    this.sortAscent = sortAscent;
  };
  RepositoryListController.prototype.filter = function(
    filterString,
    attribute
  ) {
    if (filterString.length < 1) {
      this.userRepositories = this.userRepositoriesCopy;
    }
    this.userRepositories = this.tableModificationService.filterData(
      this.userRepositories,
      filterString,
      attribute
    );
  };
  RepositoryListController.prototype.isCurrentSort = function(property) {
    return this.sortAscent && this.currentSortedProperty === property;
  };
  RepositoryListController.prototype.getSortIcon = function(property) {
    if (this.currentSortedProperty === property) {
      return this.sortAscent ? "fa fa-sort-asc" : "fa fa-sort-desc";
    } else {
      return "fa fa-sort";
    }
  };
  return RepositoryListController;
})();
// tslint:disable-next-line:max-classes-per-file
var RepositoryListComponent = /** @class */ (function() {
  function RepositoryListComponent() {
    this.controller = RepositoryListController;
    this.templateUrl =
      "./src/components/repository-list/repository-list.component.html";
  }
  RepositoryListComponent.NAME = "repositoryListView";
  return RepositoryListComponent;
})();
export { RepositoryListComponent };
//# sourceMappingURL=repository-list.component.js.map
