var GithubRateLimitAlertController = /** @class */ (function () {
    function GithubRateLimitAlertController(githubService) {
        this.githubService = githubService;
    }
    GithubRateLimitAlertController.prototype.$onInit = function () {
        this.githubService.getRateLimit();
    };
    GithubRateLimitAlertController.prototype.getResetDayAndTime = function () {
        return new Date(this.githubService.githubRateLimit.reset * 1000).toTimeString();
    };
    return GithubRateLimitAlertController;
}());
var GithubRateLimitAlertComponent = /** @class */ (function () {
    function GithubRateLimitAlertComponent() {
        this.controller = GithubRateLimitAlertController;
        this.templateUrl =
            "./src/components/github-rate-limit-alert/github-rate-limit-alert.component.html";
    }
    GithubRateLimitAlertComponent.NAME = "githubRateLimitAlert";
    return GithubRateLimitAlertComponent;
}());
export { GithubRateLimitAlertComponent };
//# sourceMappingURL=github-rate-limit-alert.component.js.map