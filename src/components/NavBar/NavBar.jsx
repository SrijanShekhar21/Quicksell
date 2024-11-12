import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { selectData } from "../../Actions/DataAction";
import display from "../../assets/Display.svg";
import down from "../../assets/down.svg";

// Set default localStorage values if they don't exist
if (!localStorage.getItem("group")) localStorage.setItem("group", "status");
if (!localStorage.getItem("order")) localStorage.setItem("order", "priority");

// Helper function for retrieving values from localStorage
const getLocalStorageValue = (key, defaultValue) => {
  return localStorage.getItem(key) || defaultValue;
};

const NavBar = () => {
  // State hooks for managing selected values
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const [groupValue, setGroupValue] = useState(
    getLocalStorageValue("group", "status")
  );
  const [orderValue, setOrderValue] = useState(
    getLocalStorageValue("order", "priority")
  );

  // Reference for the dropdown container
  const dropdownRef = useRef(null);

  // Redux hooks
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);

  // Handler function for handling changes in group and order values
  const handleGroupValue = (e, isGrouping) => {
    const newValue = e.target.value;
    setDisplayOnClick(false);

    if (isGrouping) {
      setGroupValue(newValue);
    } else {
      setOrderValue(newValue);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDisplayOnClick(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Persist groupValue and orderValue to localStorage on change
  useEffect(() => {
    localStorage.setItem("group", groupValue);
  }, [groupValue]);

  useEffect(() => {
    localStorage.setItem("order", orderValue);
  }, [orderValue]);

  // Dispatch selectData action when groupValue or orderValue changes
  useEffect(() => {
    const payload =
      groupValue === "user" ? { allTickets, allUser } : allTickets;
    dispatch(selectData(groupValue, payload, orderValue));
  }, [allTickets, allUser, dispatch, groupValue, orderValue]);

  // JSX rendering
  return (
    <div className="top-header">
      <div className="displayButton">
        <div
          className="insideButton"
          onClick={() => setDisplayOnClick((prev) => !prev)}
        >
          <img src={display} alt="setting" />
          Display
          <img src={down} alt="down" />
        </div>
        {displayOnClick && (
          <div ref={dropdownRef} className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span>Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="selectGroup flex-sb">
              <span>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
