import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/art1.png";
import projImg2 from "../assets/img/art2.png";
import projImg3 from "../assets/img/art3.png";
import projImg4 from "../assets/img/art4.png";
import projImg6 from "../assets/img/image1.jpg";
import projImg7 from "../assets/img/car1.jpg";
import projImg8 from "../assets/img/car2.jpg";
import projImg9 from "../assets/img/car3.jpg";
import projImg10 from "../assets/img/car4.jpg";
import projImg11 from "../assets/img/car5.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg12 from "../assets/img/image2.jpg";
import projImg14 from "../assets/img/vin1.jpg";
import projImg15 from "../assets/img/vin2.jpeg";
import projImg16 from "../assets/img/vin3.jpg";
import projImg17 from "../assets/img/vin4.png";
import projImg18 from "../assets/img/vin5.jpeg";
import projImg19 from "../assets/img/coll1.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Lady Art",
      description: "Painting",
      imgUrl: projImg1,
    },
    {
      title: "Art of Music",
      description: "Art of Spreading Music",
      imgUrl: projImg3,
    },
    {
      title: "Romentic Art",
      description: "Art of love",
      imgUrl: projImg2,
    },
    {
      title: "Vintage City",
      description: "City Description of old age",
      imgUrl: projImg4,
    },
    {
      title: "Kohli Art",
      description: "Kohli Show Art",
      imgUrl: projImg6,
    },
    {
      title: "Music Art",
      description: "Art Of Music",
      imgUrl: projImg3,
    },
  ];

  const projects1 = [
    {
      title: "Porsche",
      description: "Speedy King",
      imgUrl: projImg7,
    },
    {
      title: "Mitshubi lancer",
      description: "Vintage",
      imgUrl: projImg8,
    },
    {
      title: "Caddilac",
      description: "Sleek and smooth",
      imgUrl: projImg9,
    },
    {
      title: "GTR345",
      description: "Very Fast",
      imgUrl: projImg10,
    },
    {
      title: "Lamborghini",
      description: "Premium",
      imgUrl: projImg11,
    },
    {
      title: "Vitage",
      description: "Premium",
      imgUrl: projImg12,
    },
  ];

  const projects2 = [
    {
      title: "Telescope",
      description: "To see space",
      imgUrl: projImg14,
    },
    {
      title: "CD Player",
      description: "Listen the music",
      imgUrl: projImg15,
    },
    {
      title: "Hand Art",
      description: "Believe in quality",
      imgUrl: projImg16,
    },
    {
      title: "Ancient Clock",
      description: "Don't waste time",
      imgUrl: projImg17,
    },
    {
      title: "Vintage Dinner Table",
      description: "Feel the dinner",
      imgUrl: projImg18,
    },
    {
      title: "Telephone",
      description: "By Alexander Graham Bell",
      imgUrl: projImg19,
    },
  ];
  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Collectibles</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Art Works</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Car Collection</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Vintage Collection</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            projects.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p> */}
                        <Row>
                          {
                            projects1.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p> */}
                        <Row>
                          {
                            projects2.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
