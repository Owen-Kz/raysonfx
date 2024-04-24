import { ENDPOINT, parentDirectoryName } from "./constants.js";
import { createNavigation } from "./navbar.js";
import { GetCookie } from "./setCookies.js";

// ValidateLogin()
const uid = GetCookie("u_id")

createNavigation()