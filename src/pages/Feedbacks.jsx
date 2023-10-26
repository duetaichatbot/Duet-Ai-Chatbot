import React from "react";
import Header from "../components/Header";
import axiosInstance from "../../axiosConfig";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFeedbacks,
  delFeedbacks,
  newFeedback,
  updateFeedbackx,
} from "../redux/feedbackSlice";
import { useState } from "react";

const Feedbacks = () => {
  const [uFeedback, setUFeedback] = useState("");
  const [updateFeedback, setUpdateFeedback] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const feedback = useSelector((state) => state?.feedbackData);
  const user = useSelector((state) => state?.userData?.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosInstance.get(`/api/feedback/get-feedbacks`);
        dispatch(setFeedbacks(res.data.feedbacks));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // handle post feedback...
  const handlePostFeedback = async () => {
    try {
      const res = await axiosInstance.post(`/api/feedback/post-feedback`, {
        email: user.email,
        feedback: uFeedback,
      });
      // console.log(res.data.feedback);
      dispatch(newFeedback(res.data.feedback));

      console.log(res.data.feedback, "post successfully");
    } catch (error) {
      console.log(error);
    }
  };
  // handle delete feedback...
  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const res = await axiosInstance.delete(
        `/api/feedback/delete-feedback/${feedbackId}/${user?._id}`
      );
      dispatch(delFeedbacks(res.data.deletedFeedback));
    } catch (error) {
      console.log(error);
    }
  };

  // handle Update
  const toggleUpdateModal = (item) => {
    setUpdateModal(true);
    setUpdateFeedback(item.feedback);
    setUpdateItem(item._id);
  };

  const handleUpdateFeedback = async () => {
    try {
      const res = await axiosInstance.patch(
        `/api/feedback/update-feedback/${updateItem}/${user?._id}`,
        {
          feedback: updateFeedback,
        }
      );

      console.log(res.data.updateFeedback, "response update");
      dispatch(updateFeedbackx(res.data.updateFeedback));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(feedback, "feeeddd");
  return (
    <>
      <Header />
      <div className="container">
        <h1>Feedback</h1>
        <hr />
        <input
          type="text"
          placeholder="Write Feedback"
          name="uFeedback"
          value={uFeedback}
          onChange={(e) => setUFeedback(e.target.value)}
        />
        <button onClick={handlePostFeedback}>POST</button>
        <hr />
        <br />
        <ul>
          {feedback?.feedbacks?.map((item) => (
            <li key={item?._id}>
              {item?.feedback}{" "}
              <button onClick={() => handleDeleteFeedback(item._id)}>
                Delete{" "}
              </button>{" "}
              <button onClick={() => toggleUpdateModal(item)}>Update </button>{" "}
            </li>
          ))}
        </ul>
      </div>
      <hr />
      {updateModal && (
        <div>
          <input
            type="text"
            name="updateFeedback"
            value={updateFeedback}
            onChange={(e) => setUpdateFeedback(e.target.value)}
          />
          <button onClick={handleUpdateFeedback}>Update</button>
        </div>
      )}
    </>
  );
};

export default Feedbacks;
