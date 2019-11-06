import { GithubService } from '../../services/github.service';
import { TableModificationService } from '../../services/table-modification.service';

class RepositoryDetailController implements ng.IController {
    public sortAscent: boolean;
    public currentSortedProperty: string;
    private repository: any;
    private contributors: any;
    private contributorsCopy: any;
    private filterString: string;
    constructor(private $stateParams, private githubService: GithubService,
        private tableModificationService: TableModificationService) {
    }

    public $onInit() {
        this.githubService.getRepositoryById(this.$stateParams.id).then((response) => {
            this.repository = response.data;
            this.githubService.getRepositoryContributors(this.repository.owner.login, this.repository.name)
                .then((responseContributors) => {
                    this.contributors = responseContributors.data;
                    this.contributorsCopy = this.contributors;
                    this.contributors.map((contributor) => {
                        this.githubService.getUserByUsername(contributor.login).then((responseUsername) => {
                            const user: any = responseUsername.data;
                            contributor.email = user.email;
                        });
                    });
                });
        });
    }

    public sort(sortBy: string) {
        const { sortedData, sortAscent, sortedProperty } = this.tableModificationService
            .sortData(this.contributors, sortBy);
        this.contributors = sortedData;
        this.currentSortedProperty = sortedProperty;
        this.sortAscent = sortAscent;
    }

    public filter(filterString: string, attribute: string) {
        if (filterString.length < 1) {
            this.contributors = this.contributorsCopy;
        }
        this.contributors = this.tableModificationService.filterData(this.contributors, filterString, attribute);
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
export class RepositoryDetailComponent implements ng.IComponentOptions {
    public static NAME: string = 'repositoryDetailView';
    public controller: any;
    public templateUrl: any;
    constructor() {
        this.controller = RepositoryDetailController;
        this.templateUrl = './src/components/repository-detail/repository-detail.component.html';
    }
}
