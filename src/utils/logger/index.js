
const persistence = process.env.MODE || "PROD"; 

let logger;

switch (persistence) {
    case "TEST":
        const { default: winstonTest} = await import ("./winstronTest.utils.js");
        logger = winstonTest;
        break;
    default:
        const { default: winstonProd} = await import ("./winstronProd.utils.js");
        logger = winstonProd;
        break;
}

export default logger;

