export class SearchStateService {
    static NAME:string = 'searchStateService';
    private searchTerm: string;
    private searchData: any;
    private originalData: any;
    private avatarURL: string;
    private filterString: string;
    constructor(){

    }

    saveSearch(searchTerm: string, searchData: any, avatarURL: string, filterString: string){
        this.searchTerm = searchTerm;
        this.searchData = searchData;
        this.avatarURL = avatarURL;
        this.filterString = filterString;
    }

    getLastSearch(){
        return {
            searchTerm: this.searchTerm,
            searchData: this.searchData,
            avatarURL: this.avatarURL,
            filterString: this.filterString
        }
    }
   

}