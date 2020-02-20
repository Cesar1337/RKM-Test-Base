export class SharedService {
  public static NAME: string = "sharedService";

  public getSortIcon(
    sortAscent: boolean,
    currentSortedProperty: string,
    property: string
  ) {
    if (currentSortedProperty === property) {
      return sortAscent ? "fa fa-sort-asc" : "fa fa-sort-desc";
    } else {
      return "fa fa-sort";
    }
  }
}
