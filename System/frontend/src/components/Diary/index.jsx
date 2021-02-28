import React from "react";

import css from "./Diary.module.css";
import BeforeSend from "./BeforeSend";
import AfterSend from "./AfterSend";

const Diary = ({}) => {
  const sended = true;
  return <>{sended ? <AfterSend /> : <BeforeSend />}</>;
};

export default Diary;
