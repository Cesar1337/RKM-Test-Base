var SearchStateService = /** @class */ (function () {
    function SearchStateService() {
    }
    SearchStateService.prototype.saveSearch = function (searchTerm, searchData, avatarURL, filterString) {
        this.searchTerm = searchTerm;
        this.searchData = searchData;
        this.avatarURL = avatarURL;
        this.filterString = filterString;
    };
    SearchStateService.prototype.getLastSearch = function () {
        return {
            searchTerm: this.searchTerm,
            searchData: this.searchData,
            avatarURL: this.avatarURL,
            filterString: this.filterString
        };
    };
    SearchStateService.NAME = 'searchStateService';
    return SearchStateService;
}());
export { SearchStateService };
//# sourceMappingURL=search-state.service.js.map