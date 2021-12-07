import axios from "axios";

const devEnvUserName = process.env.REACT_APP_DEV_ENV_USER;
axios.defaults.headers.common["user-name"] = devEnvUserName;

const get = (url) => {
    const headers = {};
    let authToken = localStorage.getItem("authToken");
    let organisationUUID = localStorage.getItem("ORGANISATION_UUID");
    if (authToken) {
        headers['AUTH-TOKEN'] = authToken;
    }
    if (organisationUUID) {
        headers['ORGANISATION-UUID'] = organisationUUID;
    }
    return axios.get(url, {headers});
};

const getData = (url) => get(url).then(res => res.data);

const apis = {
    fetchActivities: (queryString) => getData(`/report/aggregate/activities?${queryString}`),
    fetchForms: () => getData("/web/forms?size=500").then(res => res._embedded.basicFormDetailses),
    searchConcepts: (queryString) => getData(`/search/concept?${queryString}`),
    fetchOperationalModules: () => getData('/web/operationalModules'),
    fetchFormData: (form) => getData(`/report/aggregate/codedConcepts?formUUID=${form.uuid}`)
};

export default apis;
