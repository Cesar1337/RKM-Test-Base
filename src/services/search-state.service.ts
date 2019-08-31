export class SearchStateService {
    public static NAME: string = 'searchStateService';
    private searchTerm: string;
    private searchData: any;
    private avatarURL: string;
    private filterString: string;

    public saveSearch(searchTerm: string, searchData: any, avatarURL: string, filterString: string) {
        this.searchTerm = searchTerm;
        this.searchData = searchData;
        this.avatarURL = avatarURL;
        this.filterString = filterString;
    }

    public getLastSearch() {
        return {
            searchTerm: this.searchTerm,
            searchData: this.searchData,
            avatarURL: this.avatarURL,
            filterString: this.filterString
        };
    }
}
