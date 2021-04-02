import React from "react";
import { useForm } from "react-hook-form";

import css from "./BeforeSend.module.css";
import Container from "@components/Container";
import Description from "@components/Description";
import FileUploadWrapper from "@components/FileUploadWrapper";

const BeforeSend = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const diaryFile = watch("diary");
  return (
    <Container className={css.container}>
      <h2>Opis</h2>
      <Description>
        Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin
        porta est convallis lacus blandit pretium sed non enim. Maecenas lacinia
        non orci at aliquam. Donec finibus, urna bibendum ultricies laoreet,
        augue eros luctus sapien, ut euismod leo tortor ac enim. In hac
        habitasse platea dictumst. Sed cursus venenatis tellus, non lobortis
        diam volutpat sit amet. Sed tellus augue, hendrerit eu rutrum in,
        porttitor at metus. Mauris ac hendrerit metus. Phasellus mattis lectus
        commodo felis egestas, id accumsan justo ultrices. Phasellus aliquet,
        sem a placerat dapibus, enim purus dictum lacus, nec ultrices ante dui
        ac ante. Phasellus placerat, urna.
      </Description>
      <h2>Plik dziennika</h2>
      <div className={css.diaryUpload}>
        <FileUploadWrapper inputRef={register} name="diary" accept=".pdf">
          <button>Przeglądaj</button>
        </FileUploadWrapper>
        {diaryFile && diaryFile[0] ? (
          <span>{diaryFile[0].name}</span>
        ) : (
          <span> Nie wysłano pliku</span>
        )}
      </div>
      <button className={css.submit} onClick={handleSubmit(onSubmit)}>
        Wyślij dziennik
      </button>
    </Container>
  );
};

export default BeforeSend;
