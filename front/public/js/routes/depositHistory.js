import { GetCookie } from "./setCookies.js";
import { getDeposits } from "./transactions/getDeposits.js";
import { ValidateLogin } from "./vaidateLogin.js";

const uid = GetCookie("u_id")

ValidateLogin()
getDeposits(uid)