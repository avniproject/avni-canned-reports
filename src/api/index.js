import axios from "axios";

const devEnvUserName = process.env.REACT_APP_DEV_ENV_USER;
axios.defaults.headers.common["user-name"] = devEnvUserName;

const setAuth = (location) => {
    const authToken = new URLSearchParams(location.search).get('authToken');
    if (authToken) {
        localStorage.setItem("authToken", authToken);
    }
};

const get = (url) => {
    const headers = {};
    let authToken = localStorage.getItem("authToken");
    if (authToken) {
        headers['AUTH-TOKEN'] = authToken;
    }
    return axios.get(url, {headers});
};

const getData = (url) => get(url).then(res => res.data);

const apis = {
    setAuth,
    fetchActivities: (queryString) => getData(`/report/aggregate/activities?${queryString}`),
    fetchForms: () => getData("/web/forms?size=500").then(res => res._embedded.basicFormDetailses),
    searchConcepts: (queryString) => getData(`/search/concept?${queryString}`),
    fetchOperationalModules: () => getData('/web/operationalModules')

};

export default apis;
