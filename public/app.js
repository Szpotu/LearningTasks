var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import axios from "axios";
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
//fs.writeFile
//fs.readFile
// AXIOS + TRY CATCH + Then + Async
// Then
const functionWithFetchThen = (query) => {
    if (fs.existsSync(`./_cache/${query}.json`)) {
        const pathFile = `./_cache/${query}.json`;
        fs.readFile(pathFile, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                throw new Error(`${err}`);
            }
            console.log(JSON.stringify(data));
        });
    }
    else {
        fetch(apiUrl + query)
            .then((resp) => {
            return resp.status === 200
                ? resp.json()
                : Error(`Could not fetch data`);
        })
            .then((data) => {
            const filePath = `./_cache/${query}.json`;
            fs.writeFile(filePath, JSON.stringify(data), {}, (err) => {
                if (err) {
                    throw new Error(`${err}`);
                }
                else {
                    console.log(`file ${query}.json created`);
                }
            });
        })
            .catch((err) => {
            console.error(err);
        });
    }
};
// TryCatch
const functionWithFetchTryCatch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (fs.existsSync(`./_cache/${query}.json`)) {
        const pathFile = `./_cache/${query}.json`;
        fs.readFile(pathFile, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                throw new Error(`${err}`);
            }
            console.log(JSON.stringify(data));
        });
    }
    else {
        try {
            const fetchedData = yield fetch(apiUrl + query);
            if (!fetchedData.ok) {
                throw new Error("Could not fetch data from api");
            }
            console.log(JSON.stringify(fetchedData.json()));
        }
        catch (err) {
            console.error(err);
        }
    }
});
//AXIOS
const getDataWithAxios = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (fs.existsSync(`./_cache/${query}.json`)) {
        const pathFile = `./_cache/${query}.json`;
        fs.readFile(pathFile, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                throw new Error(`${err}`);
            }
            console.log(JSON.stringify(data));
        });
    }
    else {
        try {
            const response = yield axios({
                method: "get",
                url: `${apiUrl + query}`,
            });
            console.log(JSON.stringify(response.data));
        }
        catch (err) {
            console.error(err);
        }
    }
});
functionWithFetchTryCatch("clarcson");
functionWithFetchThen('dostoyewski');
getDataWithAxios('orwell');
