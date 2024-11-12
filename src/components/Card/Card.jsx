import React from "react";
import "./Card.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import dp from "../../assets/dp.jpg";
import no from "../../assets/No-priority.svg";
import low from "../../assets/Img - Low Priority.svg";
import med from "../../assets/Img - Medium Priority.svg";
import high from "../../assets/Img - High Priority.svg";
import urgentCol from "../../assets/SVG - Urgent Priority colour.svg";
import backlog from "../../assets/Backlog.svg";
import todo from "../../assets/To-do.svg";
import done from "../../assets/Done.svg";
import inProgress from "../../assets/in-progress.svg";

const Card = ({ id, title, tag, status, priority }) => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";

  const statusIcons = {
    Backlog: backlog,
    Todo: todo,
    "In progress": inProgress,
    Done: done,
  };

  const priorityIcons = (priority) => {
    const priorityImages = {
      0: no,
      1: low,
      2: med,
      3: high,
      4: urgentCol,
    };

    return priorityImages[priority] ? (
      <img
        src={priorityImages[priority]}
        alt={`Priority ${priority}`}
        width="20px"
        height="20px"
      />
    ) : (
      <p>...</p>
    );
  };

  return (
    <div className="cardContainer">
      <div className="cardHeader">
        <span className="cardId">{id}</span>
        <div className="tempDivCard">
          <div className="imageContainer">
            <img className="userImage" src={dp} alt="User" />
          </div>
          <div className="showStatus"></div>
        </div>
      </div>

      <div className="cardTitle">
        {!isStatus &&
          (<img src={statusIcons[status]} alt="staus" /> || (
            <IoMdCloseCircleOutline />
          ))}
        <span>{title}</span>
      </div>

      <div className="cardTags">
        {!isPriority && <div className="tags">{priorityIcons(priority)}</div>}
        {tag?.map((element, index) => (
          <div key={index} className="tags">
            <span>•</span> {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
