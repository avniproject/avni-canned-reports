import axios from "axios";

const devEnvUserName = process.env.REACT_APP_DEV_ENV_USER;
axios.defaults.headers.common["user-name"] = devEnvUserName;

const apis = {
    fetchActivities: (querySting) => axios.get(`/report/aggregate/activities?${querySting}`)
        .then(res => res.data),
    fetchForms: () => axios.get("/web/forms?size=500")
      .then(res => res.data._embedded.basicFormDetailses),
    searchConcepts: (queryString) => axios.get(`/search/concept?${queryString}`)
      .then(res => (res.data)),
    fetchOperationalModules: () => axios.get('/web/operationalModules')
        .then(res => res.data)
};

export default apis;
