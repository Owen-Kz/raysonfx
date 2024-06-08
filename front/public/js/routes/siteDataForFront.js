import { GetSiteData } from "./foreman/siteData.js";

const siteData = await GetSiteData()

const emailContainer = document.querySelectorAll(".email_container")
const addressContainer = document.querySelectorAll(".address_container")
const phoneContainer = document.querySelectorAll('.phonenumber_container')


emailContainer.forEach(container =>{
    container.innerText = "info@raysonfinance.org" 
})

addressContainer.forEach(container =>{
    container.innerText = siteData.office
})

phoneContainer.forEach(container =>{
    container.innerText = siteData.phone
})