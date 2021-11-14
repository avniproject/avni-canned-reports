import axios from "axios";
const devEnvUserName = process.env.REACT_APP_DEV_ENV_USER;

const fillHeaders  = () => {
    const headers = {}
    if (devEnvUserName) {
        headers['USER-NAME'] = devEnvUserName;
    }
    return headers;
};

export default {
    fetchActivities: (querySting) => axios.get(`/report/aggregate/activities?${querySting}`)
        .then(res => res.data),
    fetchForms: () => axios.get("/web/forms?size=500", {headers: fillHeaders()})
      .then(res => res.data._embedded.basicFormDetailses),
    searchConcepts: (queryString) => axios.get(`/search/concept?${queryString}`)
      .then(res => (res.data)),
    fetchOperationalModules: () => axios.get('/web/operationalModules')
        .then(res => res.data)
};
