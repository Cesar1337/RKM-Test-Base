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
                /*La coleccion de contribuyentes traidas de la API, NO TRAE los correos para cada
                uno de los contribuyentes, asi que tuve que recurrir a iterar en cada uno
                de los contribuyentes y usar el endpoint de la API de github (users/username)
                para traer los correos de cada contribuyente uno por uno. Tambien hay que destacar
                que la direccion de correo puede estar presente o ser NULL, ya que solo estara
                presente si el usuario configuro un correo publico en su perfil de Github*/
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
