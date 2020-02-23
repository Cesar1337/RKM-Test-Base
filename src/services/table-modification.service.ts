export class TableModificationService {
  public static NAME: string = "tableModificationService";
  private sourceData: any;
  private sortAscent: boolean;

  public sortData(data: any, sortBy: string) {
    if (!this.sourceData || this.sourceData !== data) {
      this.sourceData = data;
      this.sortAscent = true;
    } else {
      this.sortAscent = !this.sortAscent;
    }
    const sortedData = data.sort((a, b) => {
      let attr1 = a[sortBy];
      let attr2 = b[sortBy];
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
      } else if (attr2 === null) {
        return -1;
      } else if (attr1 === attr2) {
        return 0;
      }
      return this.sortAscent
        ? attr1 < attr2
          ? 1
          : -1
        : attr1 < attr2
        ? -1
        : 1;
    });
    return { sortedData, sortAscent: this.sortAscent, sortedProperty: sortBy };
  }

  public filterData(data: any, filterString: string, attribute: string) {
    const filteredData = [];
    filterString = filterString.toLocaleLowerCase();

    data.forEach(value => {
      const name = value[attribute].toLocaleLowerCase();
      if (name.indexOf(filterString) !== -1) {
        filteredData.push(value);
      }
    });
    return filteredData;
  }
}
