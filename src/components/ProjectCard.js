import { useContext } from "react";
import { Col } from "react-bootstrap";
import { AuxtionContext } from "../Context/Auctioncontext";

export const ProjectCard = ({ title, description, imgUrl }) => {
  
  const {biding , handleclick , setTitle , setImage} = useContext(AuxtionContext)

  const handlego = () => {
    setImage(imgUrl);
    setTitle(title);
    handleclick();
  }

  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx" onClick={handlego}>
        <img src={imgUrl}  className="projimage"/>
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}
