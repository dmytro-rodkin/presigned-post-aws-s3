import fs from "fs";
import fetch from "node-fetch";
import util from "util";

const readFile = util.promisify(fs.readFile);

import FormData from "form-data";

const sendURLfrompresignedURL = async () => {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization:
      "eyJraWQiOiI5K01pQUJCV2x4bFBXVzdXR3ZmaGpnXC94YkRkTUVPNHEyem9UT01xeURmYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzNTM2YmM3Yi04MTZiLTRmOTItYTc2NC0zZmUzMTlmOTA0NDIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfUDlBTW42MlpnIiwiY29nbml0bzp1c2VybmFtZSI6ImRpbWFybzAyMTBAZ21pYWwuY29tIiwib3JpZ2luX2p0aSI6IjBjMGE4MmYxLTNmNWQtNDU2Yi1hZGY0LTUwOWI3MGNmZjQxYiIsImF1ZCI6IjJkcnBnb2s4dG4wdWMwZXF0bjByZGluZmJ0IiwiZXZlbnRfaWQiOiJmNGU5OGM3Mi03MjExLTQ2OTUtYTRiYy1mOWI4ZTUzODFhNTciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3MjA2MTA3NCwiZXhwIjoxNjcyMDc5MDc0LCJpYXQiOjE2NzIwNjEwNzQsImp0aSI6IjZlNTUxMDU5LWNkMzEtNDExOC1hY2U1LThhZDdmNzM4ZjhiMSIsImVtYWlsIjoiZGltYXJvMDIxMEBnbWlhbC5jb20ifQ.y2gKsEJIvknbIkX5s8oyW8d9QnvQipneP9Z3TeR0uKieY47q7T9Gl_vp-RRWrnDV7uhA9o301sNTqa5BIQ8r0KrDCEoSID-Z0Zrn5KDQAZ37Cc32X6Se73uILPg3ucISbnb9bt3bgFlG30zErKfUsvAUsWDNbBm2KDCAsNTv6RfEpaFBmI2rQXnr734ZCsxhBsSkhzzyTiLgUkQjQF60UeLZzCd5eUjbCx7HjimOvt8_NDC2i39KqIB3KAL2OjEzNAbNwfHbdDIP225OGXtRxxVn1aswJ1KNAaAtz3S0WH7I_bPn8sqX2QQEbYYICkblccUBHgI3-lsZWqRzvQZL_A",
  });

  const data = await (
    await fetch("https://2rifa8z065.execute-api.eu-central-1.amazonaws.com/dev/user/photos", {
      method: "GET",
      headers: myHeaders,
    })
  ).json();
  console.log(data);
  const formData = new FormData();

  const fileStream = await readFile("doggy.jpg");

  Object.entries(data.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });
  formData.append("x-amz-meta-photoname", "dog1");

  formData.append("file", fileStream);

  // console.log(formData);

  await formData.submit(data.url, (err, responce) => {
    // console.log(responce);
  });
};

sendURLfrompresignedURL();
