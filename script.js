import { sleep } from "k6";
import http from "k6/http";

export const options = {
  thresholds: {
    error_rate: ['rate < 0.01'],
  },
  stages: [
    { duration: "30s", target: 250 },
    { duration: "30s", target: 500 },
    { duration: "30s", target: 1000 },
    { duration: "10m", target: 1000 },
    { duration: "30s", target: 1500 },
    { duration: "10m", target: 1500 },
    { duration: "30s", target: 250 },
  ],
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
};

export default function main() {
  let response;

  response = http.get("http://localhost:5000/api/products/10000000");

  // Automatically added sleep
  sleep(.1);
}
