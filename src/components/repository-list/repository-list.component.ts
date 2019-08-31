import { GithubService } from '../../services/github.service';
import { SearchStateService } from '../../services/search-state.service';
import { TableModificationService } from '../../services/table-modification.service';

class RepositoryListController implements ng.IController {
    public loading: boolean;
    public sortAscent: boolean;
    public currentSortedProperty: string;
    private searchTerm: string;
    private userRepositories: any;
    private userRepositoriesCopy: any;
    private currentAvatarURL: string;
    private errorMessage: string;
    private filterString: string;

    constructor(private githubService: GithubService, private searchStateService: SearchStateService,
                private tableModificationService: TableModificationService) {
    }

    public $onInit() {
        const lastSearch = this.searchStateService.getLastSearch();
        this.searchTerm = lastSearch.searchTerm;
        this.userRepositories = lastSearch.searchData;
        this.currentAvatarURL = lastSearch.avatarURL;
        this.filterString = lastSearch.filterString;
    }

    public searchRepositories() {
        if (this.searchTerm !== '') {
            this.loading = true;
            this.githubService.getAllRepositoriesByUsername(this.searchTerm).then((response) => {
                this.userRepositories = response.data;
                this.userRepositoriesCopy = this.userRepositories;
                this.currentAvatarURL = this.userRepositories[0].owner.avatar_url;
                this.errorMessage = '';
                this.loading = false;
            }).catch(() => {
                this.currentAvatarURL = null;
                this.userRepositories = null;
                this.errorMessage = this.searchTerm === '' ?
                                                        '' : 'No se encontraron resultados por ese nombre de usuario';
                this.loading = false;
            });
        } else {
            this.errorMessage = '';
        }
    }

    public saveLastSearch() {
        this.searchStateService.saveSearch(this.searchTerm, this.userRepositories,
                                        this.currentAvatarURL, this.filterString);
    }

    public sort(sortBy: string) {
        const { sortedData, sortAscent, sortedProperty } = this.tableModificationService
                                                               .sortData(this.userRepositories, sortBy);
        this.userRepositories = sortedData;
        this.currentSortedProperty = sortedProperty;
        this.sortAscent = sortAscent;
    }

    public filter(filterString: string, attribute: string) {
        if (filterString.length < 1) {
            this.userRepositories = this.userRepositoriesCopy;
        }
        this.userRepositories = this.tableModificationService.filterData(this.userRepositories,
                                                                         filterString, attribute);
    }

    public isCurrentSort(property: string) {
        return this.sortAscent && this.currentSortedProperty === property;
    }

    public getSortIcon(property: string) {
        if (this.currentSortedProperty === property) {
            return this.sortAscent ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
        } else {
            return 'fa fa-sort';
        }
    }

}

// tslint:disable-next-line:max-classes-per-file
export class RepositoryListComponent implements ng.IComponentOptions {
    public static NAME: string = 'repositoryListView';
    public controller: any;
    public templateUrl: any;
    constructor() {
       this.controller = RepositoryListController;
       this.templateUrl = './src/components/repository-list/repository-list.component.html';
    }
}
