export default class Arrays {
    static getArrayChunks<T>(array: T[], chunkSize: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    // const getArrayAsChunks = (array, chunkSize) => {
    //     let result = [];
    //     let data = array.slice(0);
    //     while (data[0]) {
    //       result.push(data.splice(0, chunkSize));
    //     }
    //     return result;
    //   };

    static removeElement<T>(array: T[], element: T): T[] {
        const index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    }
}