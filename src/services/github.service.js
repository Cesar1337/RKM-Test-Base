var GithubService = /** @class */ (function () {
    function GithubService($q, $http) {
        this.$q = $q;
        this.$http = $http;
        this.baseUrl = 'https://api.github.com/';
    }
    GithubService.prototype.getAllRepositoriesByUsername = function (username) {
        return this.$http.get(this.baseUrl + "users/" + username + "/repos");
    };
    GithubService.prototype.getRepositoryById = function (id) {
        return this.$http.get(this.baseUrl + "repositories/" + id);
    };
    GithubService.prototype.getRepositoryContributors = function (username, repositoryName) {
        return this.$http.get(this.baseUrl + "repos/" + username + "/" + repositoryName + "/contributors");
    };
    GithubService.prototype.getUserByUsername = function (username) {
        return this.$http.get(this.baseUrl + "users/" + username);
    };
    GithubService.$inject = ['$q', '$http'];
    GithubService.NAME = 'githubService';
    return GithubService;
}());
export { GithubService };
//# sourceMappingURL=github.service.js.map