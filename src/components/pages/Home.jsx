import React from 'react';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1>Welcome to Camp Track</h1>
        <p className="lead">Your ultimate camp management solution.</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h2>About Camp Track</h2>
          <p>
            Camp Track is a work-in-progress SaaS product designed to help
            summer camps manage their operations efficiently. Whether it's
            tracking attendance, managing inventory, or keeping camper records,
            Camp Track aims to provide a comprehensive solution tailored to the
            needs of camp administrators.
          </p>
        </div>
        <div className="col-md-6">
          <h2>About the Creator</h2>
          <p>
            My name is Nadif Rahman. I worked at a summer camp for 3 years,
            gaining invaluable experience with the unique software needs of
            camps. Currently, I am a software engineering student at the Toronto
            Metropolitan University, where I am leveraging my experience and
            education to build software that makes camp management easier and
            more effective.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h2>Features</h2>
        <ul>
          <li>Track camper attendance with ease.</li>
          <li>Manage inventory and supplies efficiently.</li>
          <li>
            Maintain detailed camper records, including medical conditions and
            dietary restrictions.
          </li>
          <li>
            User-friendly interface with search and filter functionalities.
          </li>
        </ul>
      </div>

      <div className="mt-5">
        <h2>Tech Stack</h2>
        <p>
          Camp Track is built with a modern tech stack to ensure reliability,
          scalability, and ease of use:
        </p>
        <ul>
          <li>
            <strong>Frontend:</strong> React, Bootstrap 5
          </li>
          <li>
            <strong>Backend:</strong> Node.js, Express.js
          </li>
          <li>
            <strong>Database:</strong> MongoDB
          </li>
          <li>
            <strong>Authentication:</strong> JSON Web Tokens (JWT)
          </li>
        </ul>
      </div>

      <div className="mt-5 text-center">
        <p className="lead">
          Stay tuned as we continue to build and improve Camp Track to meet all
          your camp management needs!
        </p>
      </div>
    </div>
  );
}
