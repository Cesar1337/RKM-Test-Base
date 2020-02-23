export class GithubService {
  public static $inject = ["$q", "$http"];
  public static NAME: string = "githubService";

  public githubRateLimit: any;

  private baseUrl = "https://api.github.com/";

  constructor(protected $q: ng.IQService, protected $http: ng.IHttpService) {}

  public getAllRepositoriesByUsername(
    username: string
  ): angular.IHttpPromise<any> {
    this.getRateLimit();
    return this.$http.get(`${this.baseUrl}users/${username}/repos`);
  }

  public getRepositoryById(id: number): angular.IHttpPromise<any> {
    this.getRateLimit();
    return this.$http.get(`${this.baseUrl}repositories/${id}`);
  }

  public getRepositoryContributors(
    username: string,
    repositoryName: string
  ): angular.IHttpPromise<any> {
    this.getRateLimit();
    return this.$http.get(
      `${this.baseUrl}repos/${username}/${repositoryName}/contributors`
    );
  }

  public getUserByUsername(username: string) {
    this.getRateLimit();
    return this.$http.get(`${this.baseUrl}users/${username}`);
  }

  public getRateLimit() {
    return this.$http.get(`${this.baseUrl}rate_limit`).then(({ data }: any) => {
      this.githubRateLimit = data.resources.core;
    });
  }
}
