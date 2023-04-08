import {FastAverageColor} from "fast-average-color";
// Determination of the main background color
const findBackgroundColor = async (img: string): Promise<string> => {
    try {
        const averageColor = new FastAverageColor();
        const color = await averageColor.getColorAsync(img).catch(() => {
            throw img;
        });

        return color.hex;
    } catch (error) {
        console.warn(
            `Image analysis error. \n image path - ${error} \n просто обработка ошибки если будет ошибка в данных`
        );
        throw error;
    }
};

export default findBackgroundColor;
