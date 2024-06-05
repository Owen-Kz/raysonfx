import { parentDirectoryName } from "../constants.js"
import { VAlidateAdmin } from "./validateAdminLogin.js"


VAlidateAdmin()

// CHECK FOR ACTIVE PAGES 
function getURL(){
    return window.location.pathname
}

const url = getURL()
let dashboardActive, WithdrawActive, UsersActive, alertNamesACtive, InvestmentActive, ReferralsActive
if(url === `${parentDirectoryName}/foreman/settings/`){
    InvestmentActive = 'active'
}

if(url === `${parentDirectoryName}/foreman/users/`){
    UsersActive = 'active'
}

if(url === `${parentDirectoryName}/foreman/dashboard/`){
    dashboardActive = 'active'
}

if(url === `${parentDirectoryName}/foreman/withdrawals/`){
    WithdrawActive = 'active'
}


if(url === `${parentDirectoryName}/foreman/alertNames/` || url === `${parentDirectoryName}/foreman/names/`){
    alertNamesACtive = 'active'
}


function createNavigation(){
    const NavigationContainer = document.getElementById("userMenu")


const navItems  = `  <span class="sidebar-menu__close d-xl-none d-block"><i class="las la-times"></i></span>
<!-- Sidebar Logo Start -->
<div class="sidebar-logo">
    <a href="${parentDirectoryName}/index.html" class="sidebar-logo__link"> <img src="${parentDirectoryName}/assets/images/logoIcon/logo.png" alt="site-logo"></a>
</div>

<!-- ========= Sidebar Menu Start ================ -->
<ul class="sidebar-menu-list mt-5">
    <li class="sidebar-menu-list__item ${dashboardActive} ">
        <a href="${parentDirectoryName}/foreman/dashboard/" class="sidebar-menu-list__link ">
            <span class="icon"><i class="fas fa-tachometer-alt"></i></span>
            <span class="text">Dashboard</span>
        </a>
    </li>
    <li class="sidebar-menu-list__item  ${UsersActive}">
        <a href="${parentDirectoryName}/foreman/users/" class="sidebar-menu-list__link ">
            <span class="icon"><i class="fas fa-users"></i></span>
            <span class="text">Users</span>
        </a>
    </li>
    <li class="sidebar-menu-list__item  ${WithdrawActive}">
    <a href="${parentDirectoryName}/foreman/withdrawals/" class="sidebar-menu-list__link ">
        <span class="icon"><i class="fas fa-wallet"></i></span>
        <span class="text">Withdrawals</span>
    </a>
</li>
    <li class="sidebar-menu-list__item has-dropdown ${alertNamesACtive}" >
    <a href="javascript:void(0)" class="sidebar-menu-list__link">
        <span class="icon"><i class="fas fa-users"></i></span>
        <span class="text">Alerts</span>
    </a>
    <div class="sidebar-submenu">
        <ul class="sidebar-submenu-list">
            <li class="sidebar-submenu-list__item ">
                <a href="${parentDirectoryName}/foreman/alertNames" class="sidebar-submenu-list__link">Create Alert Names</a>
            </li>
            <li class="sidebar-submenu-list__item ">
                <a href="${parentDirectoryName}/foreman/names" class="sidebar-submenu-list__link">Alert Name History</a>
            </li>
        </ul>
    </div>
</li>
    <li class="sidebar-menu-list__item  ${InvestmentActive}">
    <a href="${parentDirectoryName}/foreman/settings/" class="sidebar-menu-list__link ">
        <span class="icon"><i class="fas fa-cog"></i></span>
        <span class="text">Settings</span>
    </a>
</li>



    

    <li class="sidebar-menu-list__item">
        <a href="${parentDirectoryName}/foreman/logout" class="sidebar-menu-list__link">
            <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
            <span class="text">Logout</span>
        </a>
    </li>
</ul>

<div class="bottom-footer py-3">
    <div class="container">
        <div class="row gy-3">
            <div class="col-md-12 text-center">
                <div class="bottom-footer-text text-white"> &copy; 2024
                    <a href="${parentDirectoryName}">Rayson Finance</a> All Rights Reserved.
                </div>
            </div>
        </div>
    </div>
</div>`



NavigationContainer.innerHTML = navItems

function makeActive(){
    const item = NavigationContainer.querySelectorAll(".has-dropdown")
    item.forEach(dropdown =>{
        dropdown.addEventListener("click", function(){
            if(dropdown.classList == "sidebar-menu-list__item has-dropdown undefined" || dropdown.classList == "sidebar-menu-list__item has-dropdown"){
                dropdown.removeAttribute('class')
                dropdown.setAttribute("class", "sidebar-menu-list__item has-dropdown active")
            }
            else{
                dropdown.removeAttribute('class')
                dropdown.setAttribute("class", "sidebar-menu-list__item has-dropdown")
            }
        })
        
    })
}

makeActive()
}






export {
    createNavigation,
}