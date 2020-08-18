import React from "react";
import Layout from '../components/Layout/Layout';

export default function ScoresPage({allScores}) {
  return (
    <Layout>
        <h2 className="title is-3">Top Scores</h2>
        <p>Below are the top 10 results of all logged in players.</p>

        <h3 className="title is-4">Best scores <span className="title is-5">(in seconds)</span></h3>
          <table className="table table--custom is-bordered">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Score</th>
                <th>Username</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {allScores.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.seconds}</td>
                  <td>{item.userID}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </Layout>
  );
}
