import axios from "axios";

export default {
    fetchActivities: (querySting) => axios.get(`/report/aggregate/activities?${querySting}`)
        .then(res => res.data),
    fetchForms: () => axios.get("/web/forms?size=500", {headers: {'USER-NAME': 'priyankaK@shelter'}})
      .then(res => res.data._embedded.basicFormDetailses),
    searchConcepts: (queryString) => axios.get(`/search/concept?${queryString}`)
      .then(res => (res.data)),
    fetchOperationalModules: () => axios.get('/web/operationalModules')
        .then(res => res.data)
}
