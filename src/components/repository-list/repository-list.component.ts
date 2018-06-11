import { GithubService } from '../../services/github.service';
import { SearchStateService } from '../../services/search-state.service';
import { TableModificationService } from '../../services/table-modification.service';

class RepositoryListController implements ng.IController {
    private searchTerm: string;
    private userRepositories: any;
    private userRepositoriesCopy: any;
    private currentAvatarURL: string;
    private errorMessage: string;
    private filterString: string;

    constructor(private githubService: GithubService, private searchStateService: SearchStateService,
               private tableModificationService: TableModificationService) {
    }

    $onInit(){
        const lastSearch = this.searchStateService.getLastSearch();
        this.searchTerm = lastSearch.searchTerm;
        this.userRepositories = lastSearch.searchData;
        this.currentAvatarURL = lastSearch.avatarURL;
        this.filterString = lastSearch.filterString;
    }

    searchRepositories(){
        if(this.searchTerm !== ""){
            this.githubService.getAllRepositoriesByUsername(this.searchTerm).then(response => {
                this.userRepositories = response.data;
                this.userRepositoriesCopy = this.userRepositories;
                this.currentAvatarURL = this.userRepositories[0].owner.avatar_url;
                this.errorMessage = "";
            }).catch(errorCallBack => {
                this.currentAvatarURL = undefined;
                this.userRepositories = [];
                this.errorMessage = this.searchTerm === "" ? "" : "No se encontraron resultados por ese nombre de usuario";
            });
        }
    }

    saveLastSearch(){
        this.searchStateService.saveSearch(this.searchTerm, this.userRepositories, this.currentAvatarURL, this.filterString);
    }

    sort(sortBy: string){
        this.userRepositories = this.tableModificationService.sortData(this.userRepositories,sortBy);
    }

    filter(filterString: string, attribute: string){
        if(filterString.length < 1){
            this.userRepositories = this.userRepositoriesCopy;
        }
        this.userRepositories = this.tableModificationService.filterData(this.userRepositories,filterString, attribute);
    }
    
}

export class RepositoryListComponent implements ng.IComponentOptions {
    static NAME:string = 'repositoryListView';
    controller:any;
    templateUrl:any;
    constructor() {
       this.controller = RepositoryListController;
       this.templateUrl = './src/components/repository-list/repository-list.component.html';
    }
}