import PdfDocumentExported from '@/components/layouts/Document/pdf-document';
import ReactPDF from '@react-pdf/renderer';
const XLSX = require("xlsx");

export default class Exported {
    static exportExcel(filename : string, rows : any) {        
          const worksheet = XLSX.utils.json_to_sheet(rows);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
          XLSX.writeFile(workbook, filename+".xlsx", { compression: true });
    }

    static exportCsv(filename : string, delimiter : string, items : any) {
        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);
        const csv = this.convertToCSV(jsonObject, delimiter);

        var exportedFilenmae = filename + ".csv" || "export.csv";

        var blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const link = document.createElement("a");
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    static exportPdf(filename : string, rows : any) {
        
    }

    static convertToCSV(objArray : any, delimiter = ",") {
        var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
        var str = "";
        for (var i = 0; i < array.length; i++) {
            var line = "";
            for (var index in array[i]) {
                if (line != "") line += delimiter;
                line += array[i][index];
            }
            str += line + "\r\n";
        }
        return str;
    }
}