import React from "react";
import { useSelector } from "react-redux";
import { DiCodeigniter } from "react-icons/di";
import "./DashBoard.css";
import Card from "../Card/Card";

// Import images for status and priority icons
import dp from "../../assets/dp.jpg";
import noPriorityImg from "../../assets/No-priority.svg";
import lowPriorityImg from "../../assets/Img - Low Priority.svg";
import medPriorityImg from "../../assets/Img - Medium Priority.svg";
import highPriorityImg from "../../assets/Img - High Priority.svg";
import urgentPriorityImg from "../../assets/SVG - Urgent Priority colour.svg";
import backlogImg from "../../assets/Backlog.svg";
import todoImg from "../../assets/To-do.svg";
import doneImg from "../../assets/Done.svg";
import inProgressImg from "../../assets/in-progress.svg";
import cancelled from "../../assets/Cancelled.svg";

// Import add and three-dot icons
import addIcon from "../../assets/add.svg";
import threeDotIcon from "../../assets/3 dot menu.svg";

// Helper function to render status icons based on status name
const getStatusIcon = (status) => {
  const statusImages = {
    Backlog: backlogImg,
    Todo: todoImg,
    "In progress": inProgressImg,
    Done: doneImg,
  };

  return (
    <img
      src={statusImages[status] || dp} // dp used as a fallback if status is unrecognized
      alt={status}
      style={{ width: "15px", height: "15px" }}
    />
  );
};

// Helper function to render priority icons based on priority level
const getPriorityIcon = (priority) => {
  const priorityImages = {
    None: noPriorityImg,
    Low: lowPriorityImg,
    Medium: medPriorityImg,
    High: highPriorityImg,
    Urgent: urgentPriorityImg,
  };

  return (
    <img
      src={priorityImages[priority] || noPriorityImg} // noPriorityImg as fallback
      alt={priority}
      style={{ width: "24px", height: "24px" }}
    />
  );
};

const DashBoard = () => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );

  return (
    selectedData && (
      <div className="dashContainer">
        {selectedData.map((element, index) => {
          const cardWidthPercentage = 18.7;
          return (
            <div
              key={index}
              className="dashCardContainer"
              style={{ width: `${cardWidthPercentage}%` }}
            >
              <DashCardHeading
                title={element[index]?.title}
                valueLength={element[index]?.value?.length}
                isStatus={isStatus}
                isPriority={isPriority}
                user={user}
              />
              <div className="dashList flex-gap-10">
                {element[index]?.value?.map((cardData) => (
                  <Card
                    key={cardData.id}
                    id={cardData.id}
                    title={cardData.title}
                    tag={cardData.tag}
                    status={cardData.status}
                    priority={cardData.priority}
                  />
                ))}
              </div>
            </div>
          );
        })}
        {isStatus && <StatusSummary />}
      </div>
    )
  );
};

// Component for rendering card heading with icons
const DashCardHeading = ({
  title,
  valueLength,
  isStatus,
  isPriority,
  user,
}) => (
  <div className="dashCardHeading flex-sb">
    <div className="leftView">
      {user ? (
        <div className="imageContainerDash">
          <img className="userImage" src={dp} alt="User" />
        </div>
      ) : isStatus ? (
        <div
          className="cardTitle"
          style={{
            width: "15px",
            height: "15px",
            display: "flex",
            fontWeight: 200,
          }}
        >
          {getStatusIcon(title)}
        </div>
      ) : isPriority ? (
        <div
          className="tags color-grey"
          style={{ width: "35px", height: "30px", display: "flex" }}
        >
          {getPriorityIcon(title)}
        </div>
      ) : (
        <DiCodeigniter />
      )}
      <span>
        {title} {valueLength}
      </span>
    </div>
    <div className="rightView">
      <img src={addIcon} alt="Add" style={{ width: "16px", height: "16px" }} />
      <img
        src={threeDotIcon}
        alt="More options"
        style={{ width: "16px", height: "16px", marginLeft: "8px" }}
      />
    </div>
  </div>
);

// Component for rendering the summary of status items
const StatusSummary = () => (
  <>
    <div className="dashCardHeading flex-sb">
      <div
        className="leftView"
        style={{ fontSize: "15px", marginRight: "90px", wordSpacing: "4px" }}
      >
        <div
          className="cardTitle"
          style={{
            width: "13px",
            height: "13px",
            display: "flex",
            fontWeight: 200,
          }}
        >
          <img
            src={doneImg}
            alt="Done"
            style={{ width: "13px", height: "13px" }}
          />
        </div>{" "}
        <span style={{ fontSize: "13px", fontWeight: "lighter" }}>Done</span>{" "}
        <span style={{ fontSize: "13px", color: "#8F9997" }}> 0</span>
      </div>
      <div className="rightView">
        <img
          src={addIcon}
          alt="Add"
          style={{ width: "16px", height: "16px" }}
        />
        <img
          src={threeDotIcon}
          alt="More options"
          style={{ width: "16px", height: "16px", marginLeft: "8px" }}
        />
      </div>
    </div>
    <div className="dashCardHeading flex-sb">
      <div
        className="leftView"
        style={{ fontSize: "15px", marginRight: "60px", wordSpacing: "4px" }}
      >
        <div
          className="cardTitle"
          style={{
            width: "9px",
            height: "9px",
            display: "flex",
            fontWeight: 200,
          }}
        >
          <img src={cancelled} alt="" />
        </div>{" "}
        <span style={{ fontSize: "13px", fontWeight: "lighter" }}>
          Canceled
        </span>{" "}
        <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
      </div>
    </div>
  </>
);

export default DashBoard;
