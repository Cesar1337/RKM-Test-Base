export class TableModificationService {
    public static NAME: string = 'tableModificationService';
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
                 if (typeof(attr1) !== 'number') {
                     // Si el dato es distinto de numero poner a lowercase, si no entonces no hacer nada
                     // y procesarlos como numeros directamente para su comparacion
                    attr1 = attr1.toLocaleLowerCase();
                    attr2 = attr2.toLocaleLowerCase();
                }
            }
            if (attr1 === attr2) {
                return 0;
            } else if (attr1 === null) {
                return 1;
            } else if (attr2 === null) {
                return -1;
            }
            return this.sortAscent ? attr1 < attr2 ? 1 : -1 : attr1 < attr2 ? -1 : 1;
        });
        return {sortedData, sortAscent: this.sortAscent, sortedProperty: sortBy };
    }

    public filterData(data: any, filterString: string, attribute: string) {
        const filteredData = [];

        data.forEach((value) => {
            const name = value[attribute].toLocaleLowerCase();
            if (name.indexOf(filterString) !== -1) {
                filteredData.push(value);
            }
        });
        return filteredData;
    }
}
