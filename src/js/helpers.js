import { TIMEOUT_SEC } from './config';

export async function AJAX(url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}

function timeout(sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
}
