export class GithubService {
    public static $inject = ['$q', '$http'];
    public static NAME: string = 'githubService';

    private baseUrl = 'https://api.github.com/';

    constructor(protected $q: ng.IQService, protected $http: ng.IHttpService) {}

    public getAllRepositoriesByUsername(username: string): angular.IHttpPromise<any> {
        return this.$http.get(`${this.baseUrl}users/${username}/repos`);
    }

    public getRepositoryById(id: number): angular.IHttpPromise<any> {
        return this.$http.get(`${this.baseUrl}repositories/${id}`);
    }

    public getRepositoryContributors(username: string, repositoryName: string): angular.IHttpPromise<any> {
        return this.$http.get(`${this.baseUrl}repos/${username}/${repositoryName}/contributors`);
    }

    public getUserByUsername(username: string) {
        return this.$http.get(`${this.baseUrl}users/${username}`);
    }
}
