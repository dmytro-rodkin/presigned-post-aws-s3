import fs from "fs";
import fetch from "node-fetch";
import util from "util";
import * as dotenv from 'dotenv'
dotenv.config()

const readFile = util.promisify(fs.readFile);

 import FormData from 'form-data';

const sendURLfrompresignedURL = async () => {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization:
      process.env.idToken,
  });

  const data = await (
    await fetch(process.env.awsurl, {
      method: "GET",
      headers: myHeaders,
    })
  ).json();
  console.log(data);
  const formData = new FormData();

  const fileStream = await readFile("file.jpeg");
  
  Object.entries(data.fields).forEach(([k, v]) => {
    formData.append(k, v);

  });
  formData.append("x-amz-meta-photoname", "cat1");

  formData.append("file", fileStream);
  
  // console.log(formData);
  
  await formData.submit(data.url, (err, responce) => {
    // console.log(responce);
  })
 
};

sendURLfrompresignedURL();