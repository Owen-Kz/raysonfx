import { GetCookie } from "./setCookies.js";
import { getwithdrawals } from "./transactions/getWithdrawals.js";
import { ValidateLogin } from "./vaidateLogin.js";

const uid = GetCookie("u_id")

ValidateLogin()
getwithdrawals(uid)