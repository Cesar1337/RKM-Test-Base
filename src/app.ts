import * as angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import './styles/app.less';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { RepositoryDetailComponent } from './components/repository-detail/repository-detail.component';
import { GithubService } from '../src/services/github.service';
import { SearchStateService } from '../src/services/search-state.service';
import { TableModificationService } from '../src/services/table-modification.service';

export const AppModule = angular.module('app', [uiRouter])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider.state({
            name: 'repository-list',
            url: '/repository-list',
            component: RepositoryListComponent.NAME,
        });
        $stateProvider.state({
            name: 'repository-detail',
            url: '/repository-detail/:id',
            component: RepositoryDetailComponent.NAME
        });
        $urlRouterProvider.otherwise('/repository-list');
    }])
    .component(RepositoryListComponent.NAME, new RepositoryListComponent())
    .component(RepositoryDetailComponent.NAME, new RepositoryDetailComponent())
    .service(GithubService.NAME, GithubService)
    .service(SearchStateService.NAME, SearchStateService)
    .service(TableModificationService.NAME, TableModificationService)


