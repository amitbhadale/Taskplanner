import React, { useEffect } from "react";
import Bucket from "../Bucket/Bucket";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBuckets } from "../../Action/Buckes";
import Modal from "../Modal/Modal";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, buckets: buck } = useSelector((state) => state.bucketList);
  const sample = useSelector((state) => state.bucketList);

  const { isModalOpen } = useSelector((state) => state.modalState);
  useEffect(() => {
    dispatch(getBuckets());
  }, [dispatch]);

  return (
    <div className="home">
      {buck && buck.buckets && buck.buckets.length > 0
        ? buck.buckets.map((bucket) => {
            return <Bucket bucket={bucket} key={bucket._id} />;
          })
        : null}
      {isModalOpen ? <Modal /> : null}
    </div>
  );
};

export default Home;
