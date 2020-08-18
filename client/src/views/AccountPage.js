import React from 'react'
import Layout from '../components/Layout/Layout';

export default function AccountPage({ userAuthenticated, user, userScores }) {
  const results = 
    <>
    <h3 className="title is-4">Best scores <span className="title is-5">(in seconds)</span></h3>
    <table className="table table--custom is-bordered">
      <thead>
        <tr>
          <th>Nr</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {userScores.best.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.seconds}</td>
            <td>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3 className="title is-4">All scores</h3>
    <table className="table table--custom is-bordered">
      <thead>
        <tr>
          <th>Nr</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {userScores.all.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.seconds}</td>
            <td>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>;

  if (!userAuthenticated) {
    return (
      <div className="container">
        <div className="content">
          <div>Log in to gain access to this page.</div>
          <div>Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
        <h2 className="title is-3">Your account</h2>
        <table className="table table--custom is-bordered">
          <tbody>
            <tr>
              <th scope="row">Username</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th scope="row">Registered</th>
              <td>{user.createdAt}</td>
            </tr>
            <tr>
              <th scope="row">Games finished</th>
              <td>{userScores.all.length}</td>
            </tr>
          </tbody>
        </table>

        {!userScores.best.length && userScores.msg === "" ? (
          <p>Loading data...</p>
        ) : (
         <>
         {userScores.msg !== "" ? (
           <p>No results yet</p>
         ) : (
           <>
            {results}
           </>
         )}
         </>
        )}
</Layout>
  );
}