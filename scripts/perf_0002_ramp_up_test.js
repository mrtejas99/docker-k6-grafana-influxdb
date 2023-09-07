import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 5 virtual users (VUs) in 5s
      { duration: "10s", target: 5 },
      { duration: "2s", target: 5 },
      // Ramp-up from 5 to 10 virtual users (VUs) in 20s
      { duration: "20s", target: 10 },
      { duration: "2s", target: 5 },
      // Ramp-up from 10 to 20 virtual users (VUs) in 30s
      { duration: "30s", target: 20 }
  ]
};

export default function () {
  const response = http.get("https://test.k6.io", {headers: {Accepts: "application/json"}});
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};
