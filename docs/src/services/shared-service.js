var SharedService = /** @class */ (function () {
    function SharedService() {
    }
    SharedService.prototype.getSortIcon = function (sortAscent, currentSortedProperty, property) {
        if (currentSortedProperty === property) {
            return sortAscent ? "fa fa-sort-asc" : "fa fa-sort-desc";
        }
        return "fa fa-sort";
    };
    SharedService.NAME = "sharedService";
    return SharedService;
}());
export { SharedService };
//# sourceMappingURL=shared-service.js.map