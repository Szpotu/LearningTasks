import fs from "fs";
import axios from "axios";

const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";

type arrOrString = ArrayBufferView | string;

//fs.writeFile
//fs.readFile
// AXIOS + TRY CATCH + Then + Async

// Then
const functionWithFetchThen = (query: string): void => {
  if (fs.existsSync(`./_cache/${query}.json`)) {
    const pathFile = `./_cache/${query}.json`;
    fs.readFile(pathFile, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        throw new Error(`${err}`);
      }
      console.log(JSON.stringify(data));
    });
  } else {
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
          } else {
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
const functionWithFetchTryCatch = async (query: string) => {
  if (fs.existsSync(`./_cache/${query}.json`)) {
    const pathFile = `./_cache/${query}.json`;
    fs.readFile(pathFile, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        throw new Error(`${err}`);
      }
      console.log(JSON.stringify(data));
    });
  } else {
    try {
      const fetchedData = await fetch(apiUrl + query);
      if (!fetchedData.ok) {
        throw new Error("Could not fetch data from api");
      }
      console.log(JSON.stringify(fetchedData.json()));
    } catch (err) {
      console.error(err);
    }
  }
};

//AXIOS

const getDataWithAxios = async (query: string): Promise<void> => {
  if (fs.existsSync(`./_cache/${query}.json`)) {
    const pathFile = `./_cache/${query}.json`;
    fs.readFile(pathFile, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        throw new Error(`${err}`);
      }
      console.log(JSON.stringify(data));
    });
  } else {
    try {
      const response = await axios({
        method: "get",
        url: `${apiUrl + query}`,
      });
      console.log(JSON.stringify(response.data));
    } catch (err) {
      console.error(err);
    }
  }
};
functionWithFetchTryCatch("clarcson");
functionWithFetchThen('dostoyewski');
getDataWithAxios('orwell');
