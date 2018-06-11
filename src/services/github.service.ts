export class GithubService {
    static $inject = ['$q','$http'];
    static NAME:string = 'githubService';
    constructor(protected $q: ng.IQService, protected $http : ng.IHttpService){

    }

    public getAllRepositoriesByUsername(username: string): angular.IHttpPromise<any>{
        return this.$http.get('https://api.github.com/users/'+username+'/repos');
    }

    public getRepositoryById(id: number): angular.IHttpPromise<any>{
        return this.$http.get('https://api.github.com/repositories/'+id);
    }

    public getRepositoryContributors(username: string, repositoryName: string): angular.IHttpPromise<any>{
        return this.$http.get('https://api.github.com/repos/'+username+'/'+repositoryName+'/contributors');
    }

    public getUserByUsername(username: string){
        return this.$http.get('https://api.github.com/users/'+username);
    }
}