import { GithubService } from '../../services/github.service';
import { TableModificationService } from '../../services/table-modification.service';

class RepositoryDetailController implements ng.IController {
    private repository: any;
    private contributors: any;
    private contributorsCopy: any;
    private filterString: string;
    constructor(private $stateParams, private githubService: GithubService, 
               private tableModificationService: TableModificationService) {
        
    }

    $onInit(){
        this.githubService.getRepositoryById(this.$stateParams.id).then(response =>{
            this.repository = response.data;
            this.githubService.getRepositoryContributors(this.repository.owner.login, this.repository.name).then(response =>{
                this.contributors = response.data;
                this.contributorsCopy = this.contributors;
                /*La coleccion de contribuyentes traidas de la API, NO TRAE los correos para cada
                uno de los contribuyentes, asi que tuve que recurrir a iterar en cada uno
                de los contribuyentes y usar el endpoint de la API de github (users/username)
                para traer los correos de cada contribuyente uno por uno. Tambien hay que destacar
                que la direccion de correo puede estar presente o ser NULL, ya que solo estara
                presente si el usuario configuro un correo publico en su perfil de Github*/
                this.contributors.map(contributor =>{
                    this.githubService.getUserByUsername(contributor.login).then(response =>{
                        const user: any = response.data;
                        contributor['email'] = user.email;
                    }); 
                });
                
            })
        })
    }

    sort(sortBy: string){
        this.contributors = this.tableModificationService.sortData(this.contributors,sortBy);
    }

    filter(filterString: string, attribute: string){
        if(filterString.length < 1){
            this.contributors = this.contributorsCopy;
        }
        this.contributors = this.tableModificationService.filterData(this.contributors,filterString, attribute);
    }
}

export class RepositoryDetailComponent implements ng.IComponentOptions {
    static NAME:string = 'repositoryDetailView';
    controller:any;
    templateUrl:any;
    constructor() {
       this.controller = RepositoryDetailController;
       this.templateUrl = './src/components/repository-detail/repository-detail.component.html';
    }
}