import React from "react";
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import Container from "@components/Container";
import css from "./ReportPractice.module.css";
import Page from "@components/Page";

const ReportPractice = () => {
  return (
    <Page title="Zgłoś praktykę">
      <Container>
        <div>
          <div className={css.content}>
            <div>
              <Input label="Nazwa firmy" className={css.firmName} labelOnTop />
              <Input label="Adres firmy" labelOnTop />
            </div>

            <div>
              <Textarea label="Opis" labelOnTop />
            </div>
          </div>
          <div className={css.fromToWrapper}>
            <label>Przedział czasowy</label>
            <Input type="date" label="Od" />
            <Input type="date" label="Do" />
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default ReportPractice;
