"use static";

import Home     from './views/pages/Home.js';
import BottomMenu   from './views/components/BottomMenu.js';
import Menu from "./views/pages/Menu.js";
import Register from "./views/pages/Register.js";
import List from "./views/pages/List.js";
import Edit from "./views/pages/Edit.js";
import Delete from "./views/pages/Delete.js";

import Utils    from './services/Utils.js';

const routes = {
    '/'             : Home
    , '/menu'       : Menu
    , '/register'   : Register
    , '/list'       : List
    , '/delete'     : Delete
    , '/edit/:id'   : Edit
};

const router = async () => {

    if (globalThis.db == undefined) {
        await openDb();
    }
    const content = null || document.getElementById('page-contents');
    const footer = null || document.getElementById('page-footer');

    // Render the Header and footer of the page
    footer.innerHTML = await BottomMenu.render();
    await BottomMenu.after_render();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Home
    content.innerHTML = await page.render();
    await page.after_render();

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);