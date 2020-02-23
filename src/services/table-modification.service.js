var TableModificationService = /** @class */ (function () {
    function TableModificationService() {
    }
    TableModificationService.prototype.sortData = function (data, sortBy) {
        var _this = this;
        if (!this.sourceData || this.sourceData !== data) {
            this.sourceData = data;
            this.sortAscent = true;
        }
        else {
            this.sortAscent = !this.sortAscent;
        }
        var sortedData = data.sort(function (a, b) {
            var attr1 = a[sortBy];
            var attr2 = b[sortBy];
            if (attr1 !== null && attr2 !== null) {
                if (typeof attr1 !== "number") {
                    // If the type is not equal to a number, then treat it as a string, convert it to its lowercase
                    // equivalent. If not then don't run this and process them as numbers for comparison
                    attr1 = attr1.toLocaleLowerCase();
                    attr2 = attr2.toLocaleLowerCase();
                }
            }
            if (attr1 === null) {
                return 1;
            }
            else if (attr2 === null) {
                return -1;
            }
            else if (attr1 === attr2) {
                return 0;
            }
            return _this.sortAscent
                ? attr1 < attr2
                    ? 1
                    : -1
                : attr1 < attr2
                    ? -1
                    : 1;
        });
        return { sortedData: sortedData, sortAscent: this.sortAscent, sortedProperty: sortBy };
    };
    TableModificationService.prototype.filterData = function (data, filterString, attribute) {
        var filteredData = [];
        filterString = filterString.toLocaleLowerCase();
        data.forEach(function (value) {
            var name = value[attribute].toLocaleLowerCase();
            if (name.indexOf(filterString) !== -1) {
                filteredData.push(value);
            }
        });
        return filteredData;
    };
    TableModificationService.NAME = "tableModificationService";
    return TableModificationService;
}());
export { TableModificationService };
//# sourceMappingURL=table-modification.service.js.map