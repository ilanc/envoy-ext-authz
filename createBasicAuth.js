// const name = "Aladdin";
// const password = "OpenSesame";
// const base64d = "QWxhZGRpbjpPcGVuU2VzYW1l";
const name = "ricklee";
const password = "123456";
const base64d = base64(name + ":" + password);
console.log(`Authorization: Basic`, base64d);

function base64(str) {
  return Buffer.from(str).toString("base64");
}
