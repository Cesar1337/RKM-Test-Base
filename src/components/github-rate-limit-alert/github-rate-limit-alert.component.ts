import { GithubService } from "../../services/github.service";

class GithubRateLimitAlertController implements ng.IController {
  constructor(private githubService: GithubService) {}

  $onInit() {
    this.githubService.getRateLimit();
  }

  getResetDayAndTime() {
    return new Date(
      this.githubService.githubRateLimit.reset * 1000
    ).toTimeString();
  }
}

export class GithubRateLimitAlertComponent implements ng.IComponentOptions {
  public static NAME: string = "githubRateLimitAlert";
  public controller: any;
  public templateUrl: any;
  constructor() {
    this.controller = GithubRateLimitAlertController;
    this.templateUrl =
      "./src/components/github-rate-limit-alert/github-rate-limit-alert.component.html";
  }
}
