class Sprite
{
    constructor(img, iterations_x, iterations_y) {
        
        // ToDo: Load from server

        function readBytes(string, i_start, length = 1)
        {
            let s = "0x";
            for (let i = i_start + length - 1; i >=  i_start; i--)
                s += string.charAt(i * 2) + string.charAt(i * 2 + 1);
            return parseInt(s);
        }

        let info = img.substring(0, 54 * 2);  // bytes 0 -> 53 store information about the image; 54-byte header; unsigned char 0 -> 255 => size of a byte
        let width = readBytes(img, 18, 4);
        let height = readBytes(img, 22, 4);
        let bitOffset = readBytes(img, 10, 4);

        // Store pixel colors
        
        let rawData = img.substring(bitOffset * 2, img.length);
        let data = []; // y, x, RGB
        
        // In Bitmap, pixels are stored bottom-up, starting in the lower left corner, going from left to right and then row by row from the bottom to the top.
        for (let y = 0; y < height; y++) // Loop for every pixel, where every pixel has three bytes for Red, Green & Blue
        {                   
            data.push([]);         
            for (let x = 0; x < width; x++)
            {
                data[y].push([]);

                let i = (y * width + x) * 3 + y * 2; // Somehow at the end of the line there are two empty bits
                // By default, the first byte is Blue, the second Green, and the third Red; We'll flip them in the usual RGB order

                data[y][x].push(readBytes(rawData, i + 2));  // Red
                data[y][x].push(readBytes(rawData, i + 1));  // Green
                data[y][x].push(readBytes(rawData, i));      // Blue

                //console.log("Read new color: " + data[x][y][0] + ", " + data[x][y][1] + ", " + data[x][y][2]);
            }
        }

        this.data = data;
        this.width = width;
        this.height = height;
        this.iterations_x = iterations_x;
        this.iterations_y = iterations_y;
    }

    getPixel(x_percent, y_percentRelativeToWidth) // x: [0, 1], y: [0, wallHeight]
    {
        let uv_x = Math.floor(x_percent * this.width * this.iterations_x) % this.width;
        let uv_y = Math.floor(y_percentRelativeToWidth * this.height * this.iterations_y) % this.height
        return this.data[uv_y][uv_x];
    }
}

let wallSprite;
let floorSprite;

function spriteReader_init()
{
    wallSprite = new Sprite(wallImgGimp, 2, 2);
    floorSprite = new Sprite(floorImgGimp, 2, 2);
}


//let test2 = "424D92000000000000008A0000007C0000000200000001000000010018000000000008000000232E0000232E000000000000000000000000FF0000FF0000FF000000000000004247527300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000FFFFFF0000";
//let test = "424D9A000000000000008A0000007C0000000200000002000000010018000000000010000000232E0000232E000000000000000000000000FF0000FF0000FF000000000000004247527300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000FFFFFF0000000000000000FFFFFF0000";
//let wallImgShattered = "424D02010000000000008A0000007C0000000600000006000000010018000000000078000000C20E0000C20E000000000000000000000000FF0000FF0000FF000000000000FF424752738FC2F52851B81E151E85EB01333333136666662666666606999999093D0AD703285C8F3200000000000000000000000004000000000000000000000000000000EEEEEEE9E9E9E8E8E8E8E8E8E9E9E9EEEEEE00000039A30039A100389FE6E6E600389F003AA40000003AA40038A000389EE2E2E20038A0003AA40000ECECECE8E8E8E5E5E5E7E7E7E6E6E6EDEDED0000EDEDED0039A3003AA40039A1003AA4003AA50000EFEFEF003BA6003AA5003BA6003AA6003BA70000";
//let wallImg = "424DAA00000000000000920000007C0000000600000006000000010001000000000018000000C30E0000C30E000002000000020000000000FF0000FF0000FF000000000000FF424752738FC2F52851B81E151E85EB01333333136666662666666606999999093D0AD703285C8F3200000000000000000000000004000000000000000000000000000000FFFFFF00003FB20000000000EC000000EC000000000000007C0000007C000000";
let wallImgGimp = "424D02010000000000008A0000007C0000000600000006000000010018000000000078000000232E0000232E000000000000000000000000FF0000FF0000FF000000000000004247527300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000003FA3003FA3003FA3FFFFFF003FA3003FA30000003FA3003FA3003FA3FFFFFF003FA3003FA30000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000FFFFFF003FA3003FA3003FA3003FA3003FA30000FFFFFF003FA3003FA3003FA3003FA3003FA30000";
let floorImgGimp = "424D02010000000000008A0000007C0000000600000006000000010018000000000078000000232E0000232E000000000000000000000000FF0000FF0000FF000000000000004247527300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b900004d4d4d4d4d4d4d4d4db9b9b94d4d4d4d4d4d00004d4d4d4d4d4d4d4d4db9b9b94d4d4d4d4d4d0000b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b90000b9b9b94d4d4d4d4d4d4d4d4d4d4d4d4d4d4d0000b9b9b94d4d4d4d4d4d4d4d4d4d4d4d4d4d4d0000";