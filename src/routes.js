/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import KidsList from "./views/Kids/KidsList";
import CreateKid from "./views/Kids/CreateKid";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    hideInSideBar: true,
  },
  {
    path: "/kids",
    name: "Kids",
    icon: "ni ni-bullet-list-67 text-red",
    component: KidsList,
    layout: "/admin",
  },
  {
    path: "/kids-create",
    name: "Create Kid",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreateKid,
    layout: "/admin",
    hideInSideBar: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    hideInSideBar: true,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    hideInSideBar: true,
  },
];
export default routes;
