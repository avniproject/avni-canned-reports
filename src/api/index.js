import axios from "axios";

export default {
    fetchActivities: () => axios.get("/report/aggregate/activities")
        .then(res => res.data)
}
