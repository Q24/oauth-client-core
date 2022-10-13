import { configure, getUserInfo, obtainSession } from "../../dist/index";
import {
  configure,
  getUserInfo,
  obtainSession,
} from "../../dist/index.modern.js";

configure({
  client_id: "ilionx",
  redirect_uri: window.location.href,
  response_type: "code",
  scope: "openid",
  debug: true,
  issuer: "https://localhost:8443/test/a/ilionx",
});

document.getElementById("checkSession").onclick = () => {
  obtainSession();
};
document.getElementById("scope").onchange = (e) => {
  configure((currentConfig) => ({
    ...currentConfig,
    scope: e.target.value,
  }));
};
document.getElementById("response_type").onchange = (e) => {
  configure((currentConfig) => ({
    ...currentConfig,
    response_type: e.target.value,
  }));
};
document.getElementById("getUserInfo").onclick = () => {
  getUserInfo().then((userInfo) => {
    console.log(userInfo);
  });
};
