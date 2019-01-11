import React, { Component } from "react";
import { Row, Col, Panel } from "react-bootstrap";

class About extends Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <Panel>
          <Row>
            <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
              <Panel.Body>
                <Panel.Title>Functionality</Panel.Title>
                <p>
                  This website is built with responsive design and allows users
                  to keep track of the jobs they apply to by entering it in the
                  list that can be saved to their user account. This list can be
                  accessed on any device with a browser.
                </p>
                <Panel.Title>Motivation</Panel.Title>
                <p>
                  The main goal in building this website was for me to improve
                  my web development skills and learn React. Although I had
                  developed a web application in a group project prior to this
                  one, that project was much larger in terms of scale, so most
                  of us had a more focused goal and didn't have that much time
                  to meddle with other parts of the application. For me, that
                  meant that I was mainly developing a page for one of the
                  site's many features, but I didn't understand well how the
                  backend worked, especially, the page routing and user
                  authorization. Even after reading through the back-end code,
                  it was hard to fully understand what every line in the code
                  doing, especially since I was new to javascript. I believe
                  that the only way to fully understand something new, in this
                  case--setting up user authorization, developing the api,
                  configuring express for the backend, and setting up routing
                  between the pages--is to implement it yourself. So that's why
                  I made this website. As for why I chose React, I wanted to
                  learn a front-end framework or library, and this one seems to
                  be the most popular one due to its use of reusable components.
                </p>
                <Panel.Title> Technologies Used</Panel.Title>
                <ul>
                  <li>React</li>
                  <li>Bootstrap/React-Bootstrap</li>
                  <li>Nodejs/Express</li>
                  <li>PostgreSQL</li>
                  <li>Auth0</li>
                  <li>Heroku</li>
                </ul>
                <Panel.Title>Struggles</Panel.Title>
                <p>There were a lot of struggles(elaborate later).</p>
              </Panel.Body>
            </Col>
          </Row>
        </Panel>
      </div>
    );
  }
}

export default About;
