var GithubService = /** @class */ (function () {
    function GithubService($q, $http) {
        this.$q = $q;
        this.$http = $http;
        this.baseUrl = "https://api.github.com/";
    }
    GithubService.prototype.getAllRepositoriesByUsername = function (username) {
        this.getRateLimit();
        return this.$http.get(this.baseUrl + "users/" + username + "/repos");
    };
    GithubService.prototype.getRepositoryById = function (id) {
        this.getRateLimit();
        return this.$http.get(this.baseUrl + "repositories/" + id);
    };
    GithubService.prototype.getRepositoryContributors = function (username, repositoryName) {
        this.getRateLimit();
        return this.$http.get(this.baseUrl + "repos/" + username + "/" + repositoryName + "/contributors");
    };
    GithubService.prototype.getUserByUsername = function (username) {
        this.getRateLimit();
        return this.$http.get(this.baseUrl + "users/" + username);
    };
    GithubService.prototype.getRateLimit = function () {
        var _this = this;
        return this.$http.get(this.baseUrl + "rate_limit").then(function (_a) {
            var data = _a.data;
            _this.githubRateLimit = data.resources.core;
        });
    };
    GithubService.$inject = ["$q", "$http"];
    GithubService.NAME = "githubService";
    return GithubService;
}());
export { GithubService };
//# sourceMappingURL=github.service.js.map